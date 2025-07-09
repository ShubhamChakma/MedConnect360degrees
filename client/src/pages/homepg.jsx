import React, { useState, useEffect } from 'react';
import { Activity, Calendar, Pill, Apple, Video, BarChart3, Users, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const [liveStats, setLiveStats] = useState({
    activeUsers: 47832,
    symptomsChecked: 1284957,
    appointmentsBooked: 23847,
    userSatisfaction: 96
  });

  // Simulate live tracking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        symptomsChecked: prev.symptomsChecked + Math.floor(Math.random() * 10),
        appointmentsBooked: prev.appointmentsBooked + Math.floor(Math.random() * 3),
        userSatisfaction: Math.min(99, prev.userSatisfaction + (Math.random() > 0.7 ? 1 : 0))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Activity,
      title: "AI Symptom Checker",
      description: "Get instant preliminary health assessments with our advanced AI that analyzes symptoms and provides smart recommendations for your next steps.",
      color: "bg-green-500"
    },
    {
      icon: Calendar,
      title: "Smart Appointments",
      description: "Book, reschedule, and manage doctor appointments with real-time availability. Get WhatsApp reminders and queue updates.",
      color: "bg-blue-500"
    },
    {
      icon: Pill,
      title: "Medicine Tracker",
      description: "Never miss a dose with intelligent medication reminders, OCR prescription scanning, and adherence tracking.",
      color: "bg-green-600"
    },
    {
      icon: Apple,
      title: "Personalized Diet",
      description: "Get AI-generated meal plans tailored to your health goals, allergies, and medical conditions for optimal wellness.",
      color: "bg-blue-600"
    },
    {
      icon: Video,
      title: "Telemedicine",
      description: "Connect with healthcare providers through secure video consultations with pre-visit questionnaires and follow-ups.",
      color: "bg-green-700"
    },
    {
      icon: BarChart3,
      title: "Health Analytics",
      description: "Track your health journey with comprehensive dashboards, progress monitoring, and personalized insights.",
      color: "bg-blue-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">


      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-blue-100/50 transform -skew-y-1"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Complete{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Healthcare Companion
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered symptom checker, smart appointment booking, medication tracking, 
            and personalized diet planning - all in one intelligent platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                {liveStats.activeUsers.toLocaleString()}+
              </div>
              <div className="text-green-100 flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                Active Users
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                {Math.floor(liveStats.symptomsChecked / 1000)}K+
              </div>
              <div className="text-blue-100 flex items-center justify-center gap-2">
                <Activity className="w-4 h-4" />
                Symptoms Checked
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                {liveStats.appointmentsBooked.toLocaleString()}+
              </div>
              <div className="text-green-100 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Appointments Booked
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                {liveStats.userSatisfaction}%
              </div>
              <div className="text-blue-100 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                User Satisfaction
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your health in one intelligent platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-green-200"
              >
                <div className="relative mb-6">
                  <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mt-6 flex items-center text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn more</span>
                  <div className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already managing their health smarter with HealthConnect 360
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span>Free 30-day trial</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Your Free Trial
          </button>
        </div>
      </section>


    </div>
  );
};

export default HomePage;