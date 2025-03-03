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
  const [cardStates, setCardStates] = useState<AnimationState[]>(['grid', 'grid', 'grid']);
  
  // Sample card data
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
    }
  ];
  
  // Handle view mode toggle with synchronized animation
  const toggleViewMode = () => {
    if (animationPhase !== 'none') return; // Prevent toggle during animation
    
    if (!isListView) {
      // Grid to List: first all cards shrink, then all expand
      setAnimationPhase('shrinking');
      setCardStates(['shrinking', 'shrinking', 'shrinking']);
    } else {
      // List to Grid: animate all at once
      setCardStates(['grid', 'grid', 'grid']);
      setIsListView(false);
    }
  };
  
  // Effect to handle synchronized animation phases
  useEffect(() => {
    if (animationPhase === 'none') return;
    
    if (animationPhase === 'shrinking') {
      // After all cards have shrunk, move to expanding phase
      const timeout = setTimeout(() => {
        setAnimationPhase('expanding');
        setCardStates(['expanding', 'expanding', 'expanding']);
      }, 500); // Duration of shrinking animation
      
      return () => clearTimeout(timeout);
    }
    
    if (animationPhase === 'expanding') {
      // After all cards have expanded, complete the animation
      const timeout = setTimeout(() => {
        setAnimationPhase('none');
        setCardStates(['list', 'list', 'list']);
        setIsListView(true);
      }, 500); // Duration of expanding animation
      
      return () => clearTimeout(timeout);
    }
  }, [animationPhase]);
  
  // Get styles for a card based on its current animation state
  const getCardStyles = (index: number) => {
    const state = cardStates[index];
    
    // Grid view (initial state) - with proper spacing
    if (state === 'grid') {
      return {
        width: '28%',
        height: '80%',
        top: '10%',
        left: `${5 + index * 33}%`, // Evenly spaced with gaps
        transform: 'translateX(0)',
        zIndex: 1
      };
    }
    
    // Shrinking phase (vertical shrink to target height)
    if (state === 'shrinking') {
      return {
        width: '28%',
        height: '28%',
        top: `${index * 33.33}%`,
        left: `${5 + index * 33}%`, // Maintain horizontal position
        transform: 'translateX(0)',
        zIndex: 10
      };
    }
    
    // Expanding phase (horizontal expand to full width)
    if (state === 'expanding') {
      return {
        width: '94%',
        height: '28%',
        top: `${index * 33.33}%`,
        left: '3%',
        transform: 'translateX(0)',
        zIndex: 10
      };
    }
    
    // List view (final state)
    return {
      width: '94%',
      height: '28%',
      top: `${index * 33.33}%`,
      left: '3%',
      transform: 'translateX(0)',
      zIndex: 3 - index
    };
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white min-h-screen flex flex-col">
      {/* Header with toggle button */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Cascading Transition</h2>
        
        <button 
          onClick={toggleViewMode}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          disabled={animationPhase !== 'none'}
        >
          {isListView ? 'Switch to Grid' : 'Switch to List'}
        </button>
      </div>
      
      {/* Cards container */}
      <div className="relative w-full h-[600px] bg-gray-50 rounded-lg overflow-hidden">
        {cards.map((card, index) => {
          const styles = getCardStyles(index);
          
          return (
            <div 
              key={card.id}
              className={`absolute rounded-lg shadow-lg overflow-hidden ${card.color} text-white
                transition-all duration-500 ease-in-out`}
              style={styles}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{card.title}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-white bg-opacity-20 rounded-full">
                      Document
                    </span>
                  </div>
                  
                  <p className="text-sm text-white text-opacity-90">
                    {card.details}
                  </p>
                </div>
                
                <div className="flex justify-between items-center text-xs text-white text-opacity-80 mt-4">
                  <span>{card.date}</span>
                  <span>{card.stats}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Animation state indicator (for debugging) */}
      <div className="mt-8 text-sm text-gray-500">
        <p>Animation Phase: {animationPhase}</p>
        <p>Card States: {cardStates.join(' | ')}</p>
      </div>
    </div>
  );
};

export default CascadingGridListTransition; 