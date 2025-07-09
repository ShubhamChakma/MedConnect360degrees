import cron from 'node-cron';
import Appointment from '../src/models/Appointment.js';
import { format } from 'date-fns';

// Send reminder message using your existing Baileys socket
export const scheduleReminders = (sock) => {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    try {
      const upcomingAppointments = await Appointment.find({
        appointmentDate: {
          $gte: now,
          $lte: twoHoursLater,
        },
        paymentStatus: 'completed',
      });

      for (const appt of upcomingAppointments) {
        const formattedDate = format(new Date(appt.appointmentDate), 'dd MMM yyyy');
        const msg = `🔔 Reminder: You have an appointment with *Dr. ${appt.doctorName}* on *${formattedDate}* at *${appt.timeSlot}*.\n\n- MedConnect360`;

        await sock.sendMessage(`${appt.phoneNumber}@s.whatsapp.net`, { text: msg });

        console.log(`✅ Reminder sent to ${appt.phoneNumber} for appointment on ${formattedDate} at ${appt.timeSlot}`);
      }
    } catch (err) {
      console.error('🚨 Error in reminder scheduler:', err.message || err);
    }
  });
};
