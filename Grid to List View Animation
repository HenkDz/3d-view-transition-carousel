import React, { useState } from 'react';

const GridListTransition = () => {
  const [isListView, setIsListView] = useState(false);
  
  // Sample card data with more details
  const cards = [
    {
      id: 1,
      title: "Annual Report 2023",
      details: "Financial performance and key metrics for the past fiscal year",
      date: "Last updated: Jan 15, 2024",
      stats: "42 pages • 3.2MB"
    },
    {
      id: 2,
      title: "Market Research",
      details: "Competitive analysis and customer demographics study",
      date: "Last updated: Feb 28, 2024",
      stats: "27 pages • 1.8MB"
    },
    {
      id: 3,
      title: "Strategic Plan",
      details: "Five-year growth strategy and implementation roadmap",
      date: "Last updated: Mar 10, 2024",
      stats: "35 pages • 2.5MB"
    }
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white min-h-screen flex flex-col items-center">
      {/* Top buttons - social media icons */}
      <div className="mb-8 flex justify-end w-full">
        <div className="flex space-x-3">
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </button>
          <div className="mx-2 h-12 flex items-center">|</div>
          
          {/* View toggle icons */}
          <button 
            onClick={() => setIsListView(false)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 ${!isListView ? 'bg-gray-200 border-gray-300' : 'bg-gray-100 border-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button 
            onClick={() => setIsListView(true)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 ${isListView ? 'bg-gray-200 border-gray-300' : 'bg-gray-100 border-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Card container */}
      <div className="relative w-full h-96 mt-4">
        {cards.map((card, index) => {
          // Calculate styles based on current state
          let styles = {};
          
          if (isListView) {
            // List view
            styles = {
              width: '100%',
              height: '80px',
              left: '0',
              transform: `translateY(${index * 100}px)`,
              backgroundColor: '#eef3f7',
              borderRadius: '8px'
            };
          } else {
            // Grid view
            styles = {
              width: '31%',
              height: '200px',
              left: `${index * 34}%`,
              transform: 'translateY(0)',
              backgroundColor: '#eef3f7',
              borderRadius: '8px'
            };
          }
          
          return (
            <div 
              key={card.id}
              className="absolute transition-all duration-700 ease-in-out shadow-md overflow-hidden"
              style={{
                ...styles,
                zIndex: 3 - index
              }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                  <p className={`mt-2 text-sm text-gray-600 transition-opacity duration-1000 ${isListView ? 'opacity-0 h-0' : 'opacity-100'}`}>
                    {card.details}
                  </p>
                </div>
                
                <div className={`flex justify-between items-center text-xs text-gray-500 transition-all duration-1000 ${isListView ? 'mt-1' : 'mt-4'}`}>
                  <span>{card.date}</span>
                  <span className={`transition-opacity duration-1000 ${isListView ? 'opacity-0' : 'opacity-100'}`}>
                    {card.stats}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridListTransition;
