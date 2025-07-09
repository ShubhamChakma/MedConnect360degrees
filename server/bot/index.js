import {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';
import cron from 'node-cron';

import Appointment from '../src/models/Appointment.js';
import ChatLog from '../src/models/ChatLog.js';

dotenv.config();

let sock;

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

const getTextFromMessage = (msg) => {
  const msgContent = msg.message;
  if (!msgContent) return '';
  if (msgContent.conversation) return msgContent.conversation;
  if (msgContent.extendedTextMessage?.text) return msgContent.extendedTextMessage.text;
  if (msgContent.imageMessage?.caption) return msgContent.imageMessage.caption;
  if (msgContent.videoMessage?.caption) return msgContent.videoMessage.caption;
  if (msgContent.documentMessage?.caption) return msgContent.documentMessage.caption;
  return '';
};

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: state,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log("📱 Scan this QR code to connect:");
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect =
        (lastDisconnect?.error instanceof Boom &&
          lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut);
      console.log('❌ Connection closed | Reconnect:', shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('✅ WhatsApp bot connected successfully!');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const isGroup = msg.key.remoteJid?.endsWith('@g.us');
    const textRaw = getTextFromMessage(msg);
    const lowerText = textRaw.toLowerCase();

    const botNumber = sock.user?.id?.split(':')[0];
    const botName = sock.user?.name?.toLowerCase() || '';

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const isTagged = mentioned.includes(`${botNumber}@s.whatsapp.net`) || lowerText.includes(botName);

    if (isGroup && !isTagged) return;

    const sender = msg.key.remoteJid;
    const cleanText = lowerText.replace(/@\S+/g, '').trim();

    // ✅ Log message
    try {
      await ChatLog.create({
        sender: msg.key.participant || msg.key.remoteJid,
        message: textRaw,
        isGroup,
        groupName: isGroup ? sender : null,
      });
      console.log(`📝 Logged: ${textRaw}`);
    } catch (err) {
      console.error('❌ Chat log failed:', err.message);
    }

    // 🤖 Command handling
    if (cleanText === 'hello') {
      await sock.sendMessage(sender, {
        text: '👋 Hello! I am *MedConnect360 Bot*. How can I help you today?',
      });
    } else if (cleanText.includes('appointment')) {
      await sock.sendMessage(sender, {
        text: '📅 Book appointments here: http://localhost:5173/appointments',
      });
    } else if (cleanText === 'send report') {
      const filePath = path.resolve('bot/assets/sample_report.pdf');
      if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath);
        await sock.sendMessage(sender, {
          document: file,
          mimetype: 'application/pdf',
          fileName: 'MedConnect_Report.pdf',
        });
      } else {
        await sock.sendMessage(sender, {
          text: '⚠️ Report not found.',
        });
      }
    } else if (cleanText === 'help') {
      await sock.sendMessage(sender, {
        text: `🤖 Available Commands:
- *hello*: Greet the bot
- *appointment*: Appointment booking link
- *send report*: Get a sample PDF report
- *help*: Show this help menu`,
      });
    } else {
      await sock.sendMessage(sender, {
        text: `❓ Unknown command. Type *help* to see available commands.`,
      });
    }
  });
};

// 🔁 Appointment reminders every minute
const sendReminders = async () => {
  const now = new Date();
  const upcoming = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  const appointments = await Appointment.find({
    time: { $gte: now, $lte: upcoming },
  });

  for (const appt of appointments) {
    const jid = `${appt.phoneNumber}@s.whatsapp.net`;
    const timeStr = new Date(appt.time).toLocaleString();
    const msg = `⏰ Reminder: Appointment with *${appt.doctorName}* at *${timeStr}*. – MedConnect360`;

    try {
      await sock.sendMessage(jid, { text: msg });
      console.log(`✅ Reminder sent to ${appt.patientName}`);
    } catch (err) {
      console.error(`❌ Failed for ${appt.patientName}:`, err.message);
    }
  }
};

cron.schedule('* * * * *', () => {
  console.log('🕐 Running reminder job...');
  sendReminders();
});

// Start services
await connectMongo();
await startBot();
