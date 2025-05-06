import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const VideoTutorials = () => {
  const navigate = useNavigate();

  const tutorials = [
    {
      title: 'Getting Started with FundMeBank',
      duration: '5:30',
      thumbnail: 'https://placehold.co/600x400/png',
      views: '1.2k',
      category: 'Basics'
    },
    {
      title: 'How to Make Your First Transfer',
      duration: '4:15',
      thumbnail: 'https://placehold.co/600x400/png',
      views: '956',
      category: 'Transfers'
    },
    {
      title: 'Security Best Practices',
      duration: '7:45',
      thumbnail: 'https://placehold.co/600x400/png',
      views: '2.1k',
      category: 'Security'
    },
    {
      title: 'Managing Your Cards',
      duration: '3:20',
      thumbnail: 'https://placehold.co/600x400/png',
      views: '789',
      category: 'Cards'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/support')}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Video Tutorials</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="grid gap-6">
              {tutorials.map((tutorial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-lg overflow-hidden mb-3">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlayIcon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                      {tutorial.duration}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tutorial.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {tutorial.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{tutorial.views} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default VideoTutorials; 