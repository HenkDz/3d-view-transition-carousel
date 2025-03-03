import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  title: string;
  details: string;
  date: string;
  stats: string;
  color: string;
}

// Animation states for each card
type AnimationState = 'grid' | 'shrinking' | 'expanding' | 'list';

const CascadingGridListTransition: React.FC = () => {
  const [isListView, setIsListView] = useState<boolean>(false);
  const [animationPhase, setAnimationPhase] = useState<'none' | 'shrinking' | 'expanding'>('none');
  const [cardStates, setCardStates] = useState<AnimationState[]>(Array(9).fill('grid'));
  
  // Sample card data - expanded to 9 items
  const cards: Card[] = [
    {
      id: 1,
      title: "Product Analytics",
      details: "User behavior insights and conversion metrics for Q1 2024",
      date: "Updated: Feb 12, 2024",
      stats: "32 pages • 2.8MB",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Design System",
      details: "Component library and design tokens documentation",
      date: "Updated: Mar 05, 2024",
      stats: "48 pages • 5.2MB",
      color: "bg-gradient-to-r from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      title: "Marketing Campaign",
      details: "Q2 campaign strategy and performance targets",
      date: "Updated: Mar 18, 2024",
      stats: "24 pages • 3.1MB",
      color: "bg-gradient-to-r from-amber-500 to-orange-600"
    },
    {
      id: 4,
      title: "User Research",
      details: "Qualitative interviews and usability testing results",
      date: "Updated: Jan 28, 2024",
      stats: "36 pages • 4.2MB",
      color: "bg-gradient-to-r from-pink-500 to-rose-600"
    },
    {
      id: 5,
      title: "Financial Report",
      details: "Quarterly financial performance and projections",
      date: "Updated: Mar 01, 2024",
      stats: "42 pages • 3.7MB",
      color: "bg-gradient-to-r from-purple-500 to-violet-600"
    },
    {
      id: 6,
      title: "Competitor Analysis",
      details: "Market positioning and competitive landscape",
      date: "Updated: Feb 15, 2024",
      stats: "29 pages • 3.3MB",
      color: "bg-gradient-to-r from-cyan-500 to-blue-600"
    },
    {
      id: 7,
      title: "Product Roadmap",
      details: "Feature development timeline and milestones",
      date: "Updated: Mar 10, 2024",
      stats: "18 pages • 2.4MB",
      color: "bg-gradient-to-r from-red-500 to-orange-600"
    },
    {
      id: 8,
      title: "Brand Guidelines",
      details: "Visual identity standards and usage examples",
      date: "Updated: Jan 20, 2024",
      stats: "52 pages • 6.8MB",
      color: "bg-gradient-to-r from-green-500 to-emerald-600"
    },
    {
      id: 9,
      title: "Content Strategy",
      details: "Editorial calendar and content distribution plan",
      date: "Updated: Feb 28, 2024",
      stats: "26 pages • 2.9MB",
      color: "bg-gradient-to-r from-indigo-500 to-purple-600"
    }
  ];
  
  // Handle view mode toggle with synchronized animation
  const toggleViewMode = (toListView: boolean) => {
    if (animationPhase !== 'none') return; // Prevent toggle during animation
    
    if (toListView && !isListView) {
      // Grid to List: first all cards shrink, then all expand
      setAnimationPhase('shrinking');
      setCardStates(Array(9).fill('shrinking'));
    } else if (!toListView && isListView) {
      // List to Grid: first all cards shrink horizontally, then expand to grid
      setAnimationPhase('expanding');
      setCardStates(Array(9).fill('expanding'));
    }
  };
  
  // Effect to handle synchronized animation phases
  useEffect(() => {
    if (animationPhase === 'none') return;
    
    if (animationPhase === 'shrinking' && !isListView) {
      // Grid to List - Phase 1: After all cards have shrunk vertically
      const timeout = setTimeout(() => {
        setAnimationPhase('expanding');
        setCardStates(Array(9).fill('expanding'));
      }, 500); // Duration of shrinking animation
      
      return () => clearTimeout(timeout);
    }
    
    if (animationPhase === 'expanding' && !isListView) {
      // Grid to List - Phase 2: After all cards have expanded horizontally
      const timeout = setTimeout(() => {
        setAnimationPhase('none');
        setCardStates(Array(9).fill('list'));
        setIsListView(true);
      }, 500); // Duration of expanding animation
      
      return () => clearTimeout(timeout);
    }
    
    if (animationPhase === 'expanding' && isListView) {
      // List to Grid - Phase 1: After all cards have shrunk horizontally
      const timeout = setTimeout(() => {
        setAnimationPhase('shrinking');
        setCardStates(Array(9).fill('shrinking'));
      }, 500); // Duration of shrinking animation
      
      return () => clearTimeout(timeout);
    }
    
    if (animationPhase === 'shrinking' && isListView) {
      // List to Grid - Phase 2: After all cards have expanded to grid positions
      const timeout = setTimeout(() => {
        setAnimationPhase('none');
        setCardStates(Array(9).fill('grid'));
        setIsListView(false);
      }, 500); // Duration of expanding animation
      
      return () => clearTimeout(timeout);
    }
  }, [animationPhase, isListView]);
  
  // Calculate grid position based on index (3x3 grid)
  const getGridPosition = (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    
    // Use fixed pixel values instead of percentages
    return {
      top: `${80 + row * 240}px`, // Fixed pixel values for consistent sizing
      left: `${3 + col * 32}%` // Keep percentage for horizontal positioning
    };
  };
  
  // Get styles for a card based on its current animation state and the direction of animation
  const getCardStyles = (index: number) => {
    const state = cardStates[index];
    const gridPos = getGridPosition(index);
    
    // Calculate fixed positions based on container height
    const gridHeight = 224; // 28% of 800px
    const listHeight = 70; // Adjusted height for list view
    const listTopPosition = 64 + index * 78; // Adjusted top position for list view
    
    // Grid view (final state when going to grid, initial state when going to list)
    if (state === 'grid') {
      return {
        width: '30%',
        height: `${gridHeight}px`,
        top: gridPos.top,
        left: gridPos.left,
        transform: 'translateX(0)',
        zIndex: 1
      };
    }
    
    // List view (final state when going to list, initial state when going to grid)
    if (state === 'list') {
      return {
        width: '94%',
        height: `${listHeight}px`,
        top: `${listTopPosition}px`,
        left: '3%',
        transform: 'translateX(0)',
        zIndex: 9 - index
      };
    }
    
    // Transitioning from grid to list
    if (!isListView) {
      // Shrinking phase (vertical shrink to target height)
      if (state === 'shrinking') {
        return {
          width: '30%',
          height: `${listHeight}px`,
          top: `${listTopPosition}px`,
          left: gridPos.left,
          transform: 'translateX(0)',
          zIndex: 10
        };
      }
      
      // Expanding phase (horizontal expand to full width)
      if (state === 'expanding') {
        return {
          width: '94%',
          height: `${listHeight}px`,
          top: `${listTopPosition}px`,
          left: '3%',
          transform: 'translateX(0)',
          zIndex: 10
        };
      }
    } 
    // Transitioning from list to grid
    else {
      // Expanding phase (horizontal shrink from full width)
      if (state === 'expanding') {
        return {
          width: '30%',
          height: `${listHeight}px`,
          top: `${listTopPosition}px`,
          left: gridPos.left,
          transform: 'translateX(0)',
          zIndex: 10
        };
      }
      
      // Shrinking phase (vertical expand to grid height)
      if (state === 'shrinking') {
        return {
          width: '30%',
          height: `${gridHeight}px`,
          top: gridPos.top,
          left: gridPos.left,
          transform: 'translateX(0)',
          zIndex: 10
        };
      }
    }
    
    // Default fallback
    return {
      width: '30%',
      height: `${gridHeight}px`,
      top: gridPos.top,
      left: gridPos.left,
      transform: 'translateX(0)',
      zIndex: 1
    };
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white min-h-screen flex flex-col">
      {/* Header with toggle buttons */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Cascading Transition</h2>
        
        <div className="flex space-x-3">
          {/* Social media icons (decorative) */}
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
          <div className="mx-2 h-12 flex items-center">|</div>
          
          {/* View toggle icons */}
          <button 
            onClick={() => toggleViewMode(false)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 ${!isListView ? 'bg-gray-200 border-gray-300' : 'bg-gray-100 border-gray-200'}`}
            disabled={animationPhase !== 'none'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button 
            onClick={() => toggleViewMode(true)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 ${isListView ? 'bg-gray-200 border-gray-300' : 'bg-gray-100 border-gray-200'}`}
            disabled={animationPhase !== 'none'}
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
      
      {/* Cards container */}
      <div className="relative w-full h-[800px] bg-gray-50 rounded-lg overflow-hidden">
        {cards.map((card, index) => {
          const styles = getCardStyles(index);
          const isInListMode = isListView || cardStates[index] === 'list' || 
                              (animationPhase === 'expanding' && !isListView) ||
                              (animationPhase === 'expanding' && isListView);
          
          return (
            <div 
              key={card.id}
              className={`absolute rounded-lg shadow-lg overflow-hidden ${card.color} text-white
                transition-all duration-500 ease-in-out`}
              style={styles}
            >
              <div className={`h-full flex flex-col justify-between ${isInListMode ? 'px-6 py-3' : 'p-4'}`}>
                <div>
                  <div className={`flex justify-between items-center ${isInListMode ? 'mb-0' : 'mb-2'}`}>
                    <h3 className={`font-bold ${isInListMode ? 'text-base' : 'text-lg'}`}>{card.title}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-white bg-opacity-20 rounded-full">
                      Document
                    </span>
                  </div>
                  
                  <p className={`text-sm text-white text-opacity-90 ${isInListMode ? 'hidden' : 'block'}`}>
                    {card.details}
                  </p>
                </div>
                
                <div className="flex justify-between items-center text-xs text-white text-opacity-80">
                  <span>{card.date}</span>
                  <span className={isInListMode ? 'hidden' : 'block'}>{card.stats}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CascadingGridListTransition;