import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, User, Bot, Heart, AlertTriangle, CheckCircle, Clock, Home, Calendar, Stethoscope, Sparkles, Brain, Send } from 'lucide-react';

const SymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [textInput, setTextInput] = useState('');
  const chatContainerRef = useRef(null);
  const questions = [
    {
      id: 'primary_symptom',
      question: "What is your primary symptom that's bothering you the most?",
      type: 'text',
      placeholder: "Describe your main symptom in detail..."
    },
    {
      id: 'duration',
      question: "How long have you been experiencing this symptom?",
      type: 'select',
      options: ['Less than 1 day', '1-3 days', '4-7 days', '1-2 weeks', 'More than 2 weeks']
    },
    {
      id: 'severity',
      question: "On a scale of 1-10, how severe is your discomfort?",
      type: 'scale',
      min: 1,
      max: 10
    },
    {
      id: 'additional_symptoms',
      question: "Are you experiencing any of these additional symptoms?",
      type: 'multiple',
      options: [
        'Runny nose', 'Sore throat', 'Body aches', 'Chills', 'Sweating', 
        'Loss of appetite', 'Difficulty sleeping', 'Skin rash'
      ]
    },
    {
      id: 'fever_check',
      question: "Have you measured your temperature recently?",
      type: 'select',
      options: ['No fever (below 100°F)', 'Low fever (100-101°F)', 'Moderate fever (101-103°F)', 'High fever (above 103°F)', 'Haven\'t checked']
    },
    {
      id: 'appetite',
      question: "How has your appetite been affected?",
      type: 'select',
      options: ['Normal appetite', 'Slightly decreased', 'Significantly decreased', 'No appetite at all', 'Increased appetite']
    },
    {
      id: 'sleep_pattern',
      question: "How has your sleep been affected?",
      type: 'select',
      options: ['Normal sleep', 'Difficulty falling asleep', 'Frequent waking', 'Sleeping more than usual', 'Severe insomnia']
    },
    {
      id: 'activity_level',
      question: "How has this affected your daily activities?",
      type: 'select',
      options: ['No impact', 'Slightly limited', 'Moderately limited', 'Severely limited', 'Unable to perform activities']
    },
    {
      id: 'triggers',
      question: "Do you notice anything that makes your symptoms worse?",
      type: 'multiple',
      options: ['Movement', 'Rest', 'Eating', 'Stress', 'Weather changes', 'Time of day', 'Nothing specific']
    },
    {
      id: 'medical_history',
      question: "Do you have any relevant medical history?",
      type: 'multiple',
      options: ['Diabetes', 'High blood pressure', 'Heart disease', 'Asthma', 'Allergies', 'Previous infections', 'None']
    },
    {
      id: 'medications',
      question: "Are you currently taking any medications?",
      type: 'select',
      options: ['No medications', 'Over-the-counter pain relievers', 'Prescription medications', 'Vitamins/supplements', 'Multiple medications']
    },
    {
      id: 'age_group',
      question: "What is your age group?",
      type: 'select',
      options: ['Under 18', '18-30', '31-50', '51-65', 'Over 65']
    },
    {
      id: 'recent_travel',
      question: "Have you traveled recently or been exposed to illness?",
      type: 'select',
      options: ['No recent travel or exposure', 'Recent domestic travel', 'Recent international travel', 'Known exposure to illness', 'Large gatherings recently']
    },
    {
      id: 'stress_level',
      question: "How would you rate your current stress level?",
      type: 'scale',
      min: 1,
      max: 10
    },
    {
      id: 'improvement',
      question: "Have your symptoms been getting better, worse, or staying the same?",
      type: 'select',
      options: ['Getting better', 'Staying the same', 'Getting worse', 'Fluctuating', 'Just started']
    }
  ];

  const diagnoseCondition = (responses) => {
    const severity = parseInt(responses.severity) || 5;
    const duration = responses.duration || '';
    const primarySymptom = responses.primary_symptom || '';
    const fever = responses.fever_check || '';
    const additionalSymptoms = responses.additional_symptoms || [];

    // Simple diagnostic logic (in real app, this would use ML/AI)
    if (primarySymptom.toLowerCase().includes('fever') && additionalSymptoms.includes('Body aches')) {
      return {
        condition: 'Viral Infection (Flu-like illness)',
        probability: 85,
        severity: severity >= 7 ? 'High' : severity >= 4 ? 'Moderate' : 'Mild',
        description: 'Based on your symptoms, you likely have a viral infection causing flu-like symptoms.',
        urgency: severity >= 8 ? 'urgent' : severity >= 6 ? 'moderate' : 'low'
      };
    } else if (primarySymptom.toLowerCase().includes('headache') && severity >= 7) {
      return {
        condition: 'Tension Headache / Migraine',
        probability: 80,
        severity: 'Moderate to High',
        description: 'Your symptoms suggest a tension headache or possible migraine.',
        urgency: severity >= 9 ? 'urgent' : 'moderate'
      };
    } else if (primarySymptom.toLowerCase().includes('cough') && additionalSymptoms.includes('Sore throat')) {
      return {
        condition: 'Upper Respiratory Infection',
        probability: 78,
        severity: 'Mild to Moderate',
        description: 'You appear to have an upper respiratory infection, likely viral.',
        urgency: 'low'
      };
    } else if (primarySymptom.toLowerCase().includes('chest') && primarySymptom.toLowerCase().includes('pain')) {
      return {
        condition: 'Chest Discomfort (Multiple causes possible)',
        probability: 70,
        severity: 'Moderate to High',
        description: 'Chest pain can have various causes and should be evaluated.',
        urgency: 'urgent'
      };
    } else {
      return {
        condition: 'General Malaise / Non-specific symptoms',
        probability: 65,
        severity: severity >= 6 ? 'Moderate' : 'Mild',
        description: 'Your symptoms are non-specific and could be related to various conditions.',
        urgency: severity >= 8 ? 'moderate' : 'low'
      };
    }
  };

  const getRecommendations = (diagnosis) => {
    const { condition, severity, urgency } = diagnosis;

    const recommendations = {
      immediate: [],
      home: [],
      future: [],
      doctor: ''
    };

    if (condition.includes('Viral Infection')) {
      recommendations.immediate = [
        'Rest and stay hydrated',
        'Take acetaminophen or ibuprofen for fever',
        'Use throat lozenges for sore throat',
        'Apply warm compress to aching muscles'
      ];
      recommendations.home = [
        'Drink plenty of fluids (water, herbal tea, soup)',
        'Get adequate sleep (8+ hours)',
        'Eat light, nutritious foods',
        'Use a humidifier',
        'Gargle with warm salt water'
      ];
      recommendations.future = [
        'Continue rest until fever-free for 24 hours',
        'Gradually return to normal activities',
        'Monitor symptoms for worsening',
        'Consider flu vaccination next season'
      ];
      recommendations.doctor = urgency === 'urgent' ? 'Seek immediate medical attention' : 'Consider telemedicine consultation or visit primary care physician if symptoms worsen or persist beyond 7-10 days';
    } else if (condition.includes('Headache')) {
      recommendations.immediate = [
        'Rest in a quiet, dark room',
        'Apply cold compress to forehead',
        'Stay hydrated',
        'Take over-the-counter pain reliever'
      ];
      recommendations.home = [
        'Practice relaxation techniques',
        'Maintain regular sleep schedule',
        'Avoid known triggers',
        'Stay hydrated throughout the day'
      ];
      recommendations.future = [
        'Keep a headache diary',
        'Manage stress levels',
        'Regular exercise routine',
        'Limit screen time'
      ];
      recommendations.doctor = urgency === 'urgent' ? 'Seek immediate medical attention for severe headache' : 'Consult a neurologist if headaches are frequent or severe';
    } else if (condition.includes('Respiratory')) {
      recommendations.immediate = [
        'Stay hydrated',
        'Use throat lozenges',
        'Rest your voice',
        'Breathe humid air (shower steam)'
      ];
      recommendations.home = [
        'Honey and warm water',
        'Herbal teas with ginger',
        'Avoid irritants (smoke, dust)',
        'Use saline nasal rinse'
      ];
      recommendations.future = [
        'Continue treatment until symptoms resolve',
        'Avoid close contact with others',
        'Hand hygiene',
        'Consider vitamins C and D'
      ];
      recommendations.doctor = 'Consult primary care physician if symptoms persist beyond 10 days or worsen';
    } else {
      recommendations.immediate = [
        'Rest and monitor symptoms',
        'Stay hydrated',
        'Take temperature regularly',
        'Avoid strenuous activities'
      ];
      recommendations.home = [
        'Maintain good nutrition',
        'Get adequate sleep',
        'Practice stress management',
        'Stay hydrated'
      ];
      recommendations.future = [
        'Monitor symptom progression',
        'Maintain healthy lifestyle',
        'Consider underlying factors',
        'Follow up if symptoms persist'
      ];
      recommendations.doctor = urgency === 'urgent' ? 'Seek immediate medical attention' : 'Consider consulting healthcare provider for proper evaluation';
    }

    return recommendations;
  };

  const addMessage = (message, isUser = false) => {
    setChatHistory(prev => [...prev, { message, isUser, timestamp: new Date() }]);
  };

  const handleAnswer = (answer) => {
    const question = questions[currentStep];
    const newResponses = { ...responses, [question.id]: answer };
    setResponses(newResponses);
    
    addMessage(Array.isArray(answer) ? answer.join(', ') : answer, true);
    
    if (currentStep < questions.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setCurrentStep(currentStep + 1);
        addMessage(questions[currentStep + 1].question, false);
      }, 1000);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const diagnosisResult = diagnoseCondition(newResponses);
        setDiagnosis(diagnosisResult);
        setShowResults(true);
      }, 1500);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleAnswer(textInput.trim());
      setTextInput('');
    }
  };

  useEffect(() => {
    if (questions.length > 0) {
      addMessage("Hello! I'm your AI Health Assistant. I'll ask you a series of questions to help understand your symptoms better. Let's start:", false);
      setTimeout(() => {
        addMessage(questions[0].question, false);
      }, 1000);
    }
  }, []);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);


  const currentQuestion = questions[currentStep];
  const recommendations = diagnosis ? getRecommendations(diagnosis) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">AI Health Assistant</h1>
            <div className="p-3 bg-purple-100 rounded-full">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-600 text-lg">Advanced symptom analysis with personalized recommendations</p>
        </div>

        {!showResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chat Interface */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Health Assessment</h2>
              </div>
              
              <div ref={chatContainerRef} className="h-96 overflow-y-auto mb-4 space-y-4 custom-scrollbar">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex gap-3 ${chat.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-xs ${chat.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${chat.isUser ? 'bg-blue-500' : 'bg-gray-500'}`}>
                        {chat.isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                      </div>
                      <div className={`p-3 rounded-lg ${chat.isUser ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-800'}`}>
                        {chat.message}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Answer Interface */}
              {currentQuestion && !showResults && (
                <div className="space-y-4">
                  {currentQuestion.type === 'text' && (
                    <form onSubmit={handleTextSubmit} className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          placeholder={currentQuestion.placeholder}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          disabled={!textInput.trim()}
                          className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 rounded-lg text-white transition-all duration-200 flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}
                  
                  {currentQuestion.type === 'select' && (
                    <div className="grid grid-cols-1 gap-2">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 transition-all duration-200 text-left border border-gray-200 hover:border-blue-300"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {currentQuestion.type === 'scale' && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-600 text-sm">
                        <span>Mild</span>
                        <span>Severe</span>
                      </div>
                      <div className="flex gap-2">
                        {[...Array(10)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handleAnswer(i + 1)}
                            className="w-8 h-8 bg-gray-100 hover:bg-blue-100 rounded-full text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300 transition-all duration-200"
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentQuestion.type === 'multiple' && (
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-500 rounded"
                            onChange={(e) => {
                              const current = responses[currentQuestion.id] || [];
                              const updated = e.target.checked 
                                ? [...current, option]
                                : current.filter(item => item !== option);
                              setResponses(prev => ({...prev, [currentQuestion.id]: updated}));
                            }}
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                      <button
                        onClick={() => handleAnswer(responses[currentQuestion.id] || [])}
                        className="w-full mt-4 p-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-all duration-200"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Progress & Info */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Question {currentStep + 1} of {questions.length}</span>
                    <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Assessment Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Comprehensive symptom analysis</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>Personalized recommendations</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Stethoscope className="w-5 h-5 text-blue-500" />
                    <span>Doctor referral guidance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Results Display */
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`p-3 rounded-full ${diagnosis.urgency === 'urgent' ? 'bg-red-100' : diagnosis.urgency === 'moderate' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                    <AlertTriangle className={`w-8 h-8 ${diagnosis.urgency === 'urgent' ? 'text-red-500' : diagnosis.urgency === 'moderate' ? 'text-yellow-500' : 'text-green-500'}`} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Assessment Results</h2>
                </div>
                <p className="text-gray-600 text-lg">Based on your responses, here's what I found:</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl font-bold text-gray-800">{diagnosis.probability}%</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{diagnosis.condition}</h3>
                    <p className="text-gray-600">Confidence Level</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{diagnosis.description}</p>
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${diagnosis.urgency === 'urgent' ? 'bg-red-100 text-red-600' : diagnosis.urgency === 'moderate' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                    Severity: {diagnosis.severity}
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${diagnosis.urgency === 'urgent' ? 'bg-red-100 text-red-600' : diagnosis.urgency === 'moderate' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                    Priority: {diagnosis.urgency.charAt(0).toUpperCase() + diagnosis.urgency.slice(1)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-orange-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Immediate Relief</h3>
                </div>
                <ul className="space-y-2">
                  {recommendations.immediate.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Home Care</h3>
                </div>
                <ul className="space-y-2">
                  {recommendations.home.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Follow-up Care</h3>
                </div>
                <ul className="space-y-2">
                  {recommendations.future.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Doctor Recommendation */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Stethoscope className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold text-gray-800">Medical Consultation</h3>
              </div>
              <p className="text-gray-700 text-lg">{recommendations.doctor}</p>
            </div>
            
            {/* Disclaimer */}
            <div className="bg-red-50 backdrop-blur-md rounded-2xl p-6 border border-red-200 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-semibold text-red-600">Important Disclaimer</h3>
              </div>
              <p className="text-red-700">
                This assessment is for informational purposes only and should not replace professional medical advice. 
                Always consult with qualified healthcare providers for proper diagnosis and treatment. 
                In case of emergency, contact emergency services immediately.
              </p>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setResponses({});
                  setChatHistory([]);
                  setShowResults(false);
                  setDiagnosis(null);
                  setTextInput('');
                  setTimeout(() => {
                    addMessage("Let's start a new assessment. How are you feeling today?", false);
                    addMessage(questions[0].question, false);
                  }, 500);
                }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
              >
                Start New Assessment
              </button>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default SymptomChecker;