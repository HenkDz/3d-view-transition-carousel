import React, { useState, useEffect } from 'react';

const AdvancedCardTransition = () => {
  const [viewMode, setViewMode] = useState('carousel'); // 'grid', 'list', or 'carousel'
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [previousViewMode, setPreviousViewMode] = useState('carousel');
  
  // Handle view mode changes with animation
  const changeViewMode = (newMode) => {
    setPreviousViewMode(viewMode);
    setViewMode(newMode);
  };
  
  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Neural Interface",
      category: "Research & Development",
      progress: 76,
      team: ["Alex K.", "Maria L.", "David C."],
      dueDate: "Apr 15, 2025",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Quantum Encryption",
      category: "Security",
      progress: 42,
      team: ["Sophie R.", "James T."],
      dueDate: "May 30, 2025",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      title: "Sustainable Energy",
      category: "Infrastructure",
      progress: 89,
      team: ["Michael P.", "Laura N.", "Robert A.", "Emma S."],
      dueDate: "Mar 10, 2025",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 4,
      title: "AI Assistant 2.0",
      category: "Product Development",
      progress: 63,
      team: ["Richard L.", "Diana W."],
      dueDate: "Jun 22, 2025",
      color: "from-purple-500 to-fuchsia-600"
    },
    {
      id: 5,
      title: "Urban Mobility",
      category: "Transportation",
      progress: 51,
      team: ["Chris B.", "Tanya M."],
      dueDate: "Jul 12, 2025",
      color: "from-red-500 to-pink-600"
    },
    {
      id: 6,
      title: "Climate Analytics",
      category: "Research",
      progress: 38,
      team: ["Oliver P.", "Zoe L.", "Nathan K."],
      dueDate: "Aug 05, 2025",
      color: "from-cyan-500 to-blue-600"
    }
  ];
  
  // Handle carousel rotation
  const rotateCarousel = (direction) => {
    if (viewMode !== 'carousel' || isAnimating) return;
    
    setIsAnimating(true);
    
    // Calculate new rotation degree
    const rotationChange = direction === 'next' ? -60 : 60;
    setRotationDegree(prevDegree => prevDegree + rotationChange);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1200);
  };
  
  // Get styles for grid and list views
  const getGridListStyles = (index, view) => {
    if (view === 'grid') {
      return {
        transform: 'perspective(1000px) rotateY(0deg) translateZ(0) scale(1)',
        width: '48%',
        height: '220px',
        top: `${Math.floor(index / 2) * 240}px`,
        left: `${(index % 2) * 52}%`,
        opacity: 1,
        zIndex: 5
      };
    } else { // list view
      return {
        transform: 'perspective(1000px) rotateY(0deg) translateZ(0) scale(1)',
        width: '100%',
        height: '140px', // Increased from 100px to 140px to fit all content
        top: `${index * 160}px`, // Adjusted spacing between cards
        left: '0',
        opacity: 1,
        zIndex: 5
      };
    }
  };
  
  // Calculate position for each card in the 3D carousel
  const getCarouselStyles = (index) => {
    // For 6 cards, each positioned 60 degrees apart
    const cardAngle = 60;
    const radius = 400; // Distance from center
    
    // Calculate this card's angle in the carousel (adding rotation degree)
    const angle = (index * cardAngle + rotationDegree) % 360;
    const angleRad = (angle * Math.PI) / 180;
    
    // Calculate 3D position
    const x = Math.sin(angleRad) * radius;
    const z = Math.cos(angleRad) * radius * -1; // Negative to make positive Z go away from viewer
    
    // Calculate scale and opacity based on z position
    // Cards closer to viewer (negative Z) should be larger and more opaque
    const normalizedZ = (z + radius) / (2 * radius); // 0 to 1 where 0 is closest
    const scale = 1 - (normalizedZ * 0.4); // Scale from 0.6 to 1
    const opacity = 1 - (normalizedZ * 0.6); // Opacity from 0.4 to 1
    
    // Calculate y position (small arc effect)
    const yOffset = Math.sin(angleRad * 2) * 40;
    
    // Calculate display properties
    return {
      transform: `perspective(1400px) translateX(${x}px) translateY(${yOffset}px) translateZ(${z}px) rotateY(${-angle}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.round(50 - normalizedZ * 40),
      width: '50%',
      height: '220px',
      top: '50%',
      left: '50%',
      marginLeft: '-25%',
      marginTop: '-110px'
    };
  };
  
  // Get styles for each card based on view mode
  const getCardStyles = (index) => {
    if (viewMode === 'carousel') {
      return getCarouselStyles(index);
    } else {
      return getGridListStyles(index, viewMode);
    }
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header with mode toggles */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Dashboard</h2>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => changeViewMode('grid')}
              className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Grid
            </button>
            <button
              onClick={() => changeViewMode('list')}
              className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              List
            </button>
            <button
              onClick={() => changeViewMode('carousel')}
              className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${viewMode === 'carousel' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="10" y="3" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="white"/>
                <rect x="14" y="9" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              3D View
            </button>
          </div>
          
          {viewMode === 'carousel' && (
            <div className="flex space-x-2">
              <button 
                onClick={() => rotateCarousel('prev')}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
                disabled={isAnimating}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={() => rotateCarousel('next')}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
                disabled={isAnimating}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Project cards container */}
      <div 
        className="relative w-full" 
        style={{ 
          height: viewMode === 'grid' 
            ? `${Math.ceil(projects.length / 2) * 240}px` 
            : viewMode === 'list' 
              ? `${projects.length * 160}px` // Adjusted container height for list view
              : '500px',
          perspective: '1400px',
          perspectiveOrigin: 'center',
          transformStyle: 'preserve-3d'
        }}
      >
        <div 
          className={`w-full h-full relative ${viewMode === 'carousel' ? 'pointer-events-none' : ''}`}
          style={{ 
            transformStyle: 'preserve-3d'
          }}
        >
          {projects.map((project, index) => {
            const styles = getCardStyles(index);
            
            return (
              <div
                key={project.id}
                className="absolute transition-all duration-1000 rounded-xl overflow-hidden shadow-lg"
                style={{
                  ...styles,
                  transitionProperty: 'transform, width, height, top, left, opacity, margin, z-index',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className={`h-full w-full flex flex-col bg-gradient-to-br ${project.color}`}>
                  <div className="relative flex-1 flex flex-col">
                    {/* Card header with different layouts for each view */}
                    <div className={`p-4 text-white flex-1 flex flex-col ${viewMode === 'list' ? 'pb-2' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-bold ${viewMode === 'list' ? 'text-lg' : 'text-xl'}`}>{project.title}</h3>
                        <span className="text-xs font-medium px-2 py-1 bg-white bg-opacity-20 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      
                      {/* Progress indicator - always present but positioned differently based on view */}
                      <div 
                        className={`transition-all duration-1000 absolute ${
                          viewMode === 'list' 
                            ? 'opacity-0 scale-0' 
                            : 'opacity-100 scale-100 relative mt-2'
                        }`} 
                        style={{ transformOrigin: 'bottom left' }}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">Progress</span>
                          <span className="text-xs font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                          <div 
                            className="bg-white rounded-full h-2 transition-all duration-1500" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Team members - always rendered but positioned differently */}
                      <div 
                        className={`transition-all duration-1000 absolute bottom-0 right-4 ${
                          viewMode === 'list' 
                            ? 'opacity-0 scale-0' 
                            : 'opacity-100 scale-100'
                        }`} 
                        style={{ transformOrigin: 'bottom right' }}
                      >
                        <div className="flex -space-x-2 overflow-hidden">
                          {project.team.slice(0, 3).map((member, i) => (
                            <div 
                              key={i} 
                              className="inline-block h-8 w-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-800 transition-all duration-1000"
                            >
                              {member.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {project.team.length > 3 && (
                            <div className="inline-block h-8 w-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-800 transition-all duration-1000">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card footer */}
                  <div className={`p-3 bg-black bg-opacity-10 text-white flex justify-between items-center ${viewMode === 'list' ? 'py-2' : ''}`}>
                    <span className="text-xs">Due: {project.dueDate}</span>
                    
                    {viewMode === 'list' && (
                      <div className="flex items-center space-x-4 transform transition-all duration-1000">
                        {/* Team members in list view - animate in from the card body */}
                        <div 
                          className={`flex -space-x-2 overflow-hidden transform transition-all duration-1000 ${
                            viewMode === 'list' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                          }`} 
                          style={{ transformOrigin: 'center right' }}
                        >
                          {project.team.slice(0, 2).map((member, i) => (
                            <div 
                              key={i} 
                              className="inline-block h-6 w-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-800 transition-all duration-1000"
                            >
                              {member.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {project.team.length > 2 && (
                            <div className="inline-block h-6 w-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-800 transition-all duration-1000">
                              +{project.team.length - 2}
                            </div>
                          )}
                        </div>
                        
                        {/* Progress bar in list view - animate in from the card body */}
                        <div 
                          className={`flex items-center transform transition-all duration-1000 ${
                            viewMode === 'list' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                          }`} 
                          style={{ transformOrigin: 'center left' }}
                        >
                          <div className="w-16 bg-white bg-opacity-20 rounded-full h-1.5 mr-2 transition-all duration-1000">
                            <div 
                              className="bg-white rounded-full h-1.5 transition-all duration-1000" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs transition-all duration-1000">{project.progress}%</span>
                        </div>
                      </div>
                    )}
                    
                    {viewMode !== 'list' && (
                      <button 
                        className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition-colors"
                        onClick={(e) => {
                          if (viewMode === 'carousel') {
                            e.stopPropagation();
                          }
                        }}
                      >
                        Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Carousel floor reflection (only in carousel view) */}
      {viewMode === 'carousel' && (
        <div className="w-full h-32 mt-4 bg-gradient-to-t from-gray-200 to-transparent opacity-30 rounded-lg"></div>
      )}
    </div>
  );
};

export default AdvancedCardTransition;