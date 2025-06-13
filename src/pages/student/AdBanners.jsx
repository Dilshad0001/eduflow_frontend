import React from 'react';

const AdBanners = () => {
  return (
    <div className="pt-5 px-1 pb-10 bg-gray-100  flex flex-col items-center gap-5  ">


      <div className="w-full max-w-full h-48 bg-gradient-to-br from-pink-300 via-purple-200 to-indigo-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg relative group">
        {/* Floating decoration */}
        <div className="absolute top-5 -left-12 w-24 h-24 bg-white bg-opacity-30 rounded-full animate-bounce opacity-60"></div>
        
        <div className="flex items-center justify-between h-fullx px-10 relative z-10">
          <div className="text-gray-800">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Smart Study Tools</h2>
            <p className="text-lg mb-4 text-gray-700">Flashcards, quizzes, and progress tracking</p>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-gray-900 hover:scale-105">
              Try Free for 30 Days
            </button>
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-white bg-opacity-40 rounded-lg flex items-center justify-center text-xl animate-bounce">
              📚
            </div>
            <div className="w-10 h-10 bg-white bg-opacity-40 rounded-lg flex items-center justify-center text-xl animate-bounce" style={{animationDelay: '0.3s'}}>
              🧠
            </div>
            <div className="w-10 h-10 bg-white bg-opacity-40 rounded-lg flex items-center justify-center text-xl animate-bounce" style={{animationDelay: '0.6s'}}>
              📈
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship Ad */}

      <div className="w-full max-w-full h-48 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg relative group">
        {/* Sparkling decoration */}
        <div className="absolute top-8 right-24 text-2xl text-white animate-ping opacity-75">
          ✦
        </div>
        
        <div className="flex items-center justify-between h-full px-10 relative z-10">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">$10,000 Scholarship</h2>
            <p className="text-lg mb-4 opacity-90">Apply now for our annual student grant program</p>
            <button className="bg-white bg-opacity-20 border-2 border-white border-opacity-40 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-white hover:text-red-500">
              Apply Now
            </button>
          </div>
          <div className="text-6xl animate-pulse">
            🎓
          </div>
        </div>
      </div>


    </div>
  );
};

export default AdBanners;