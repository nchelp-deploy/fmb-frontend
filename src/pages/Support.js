import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const Support = () => {
  const navigate = useNavigate();

  const supportCategories = [
    {
      id: 'chat',
      title: 'Chat Support',
      description: 'Chat with our support team',
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
      color: 'from-blue-600 to-blue-400'
    },
    {
      id: 'call',
      title: 'Phone Support',
      description: 'Call our support line',
      icon: <PhoneIcon className="h-6 w-6" />,
      color: 'from-green-600 to-green-400'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us an email',
      icon: <EnvelopeIcon className="h-6 w-6" />,
      color: 'from-purple-600 to-purple-400'
    },
    {
      id: 'video',
      title: 'Video Call',
      description: 'Schedule a video call',
      icon: <VideoCameraIcon className="h-6 w-6" />,
      color: 'from-pink-600 to-pink-400'
    }
  ];

  const faqItems = [
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your email.'
    },
    {
      question: 'How do I transfer money?',
      answer: 'To transfer money, go to the dashboard and select "Send Money" from the quick actions. Follow the prompts to complete your transfer.'
    },
    {
      question: 'Is my money safe?',
      answer: 'Yes, we use industry-standard security measures and are FDIC insured up to $250,000.'
    },
    {
      question: 'How do I report suspicious activity?',
      answer: 'If you notice any suspicious activity, immediately contact our 24/7 fraud department or use the "Report" feature in the Security section.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Support Center</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {supportCategories.map((category) => (
            <motion.button
              key={category.id}
              className={`bg-gradient-to-br ${category.color} p-6 rounded-xl text-white shadow-sm`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/10 p-3 rounded-full mb-3">
                  {category.icon}
                </div>
                <span className="font-medium">{category.title}</span>
                <span className="text-sm opacity-80 mt-1">{category.description}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <h3 className="font-medium text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Help Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Help Center
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/help/guides')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                  <span className="font-medium text-gray-900">User Guides</span>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </button>
              <button
                onClick={() => navigate('/help/tutorials')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <VideoCameraIcon className="h-6 w-6 text-gray-400" />
                  <span className="font-medium text-gray-900">Video Tutorials</span>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Support; 