import React, { useState } from 'react';
import AdvancedCardTransition from './components/AdvancedCardTransition';
import GridListTransition from './components/GridListTransition';
import CascadingGridListTransition from './components/CascadingGridListTransition';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'3d-carousel' | 'grid-list' | 'cascading-transition'>('3d-carousel');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center">
          <div className="flex space-x-4 flex-wrap justify-center">
            <button
              onClick={() => setActiveView('3d-carousel')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeView === '3d-carousel' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              3D Carousel View
            </button>
            <button
              onClick={() => setActiveView('grid-list')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeView === 'grid-list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              Grid/List View
            </button>
            <button
              onClick={() => setActiveView('cascading-transition')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeView === 'cascading-transition' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              Cascading Transition
            </button>
          </div>
        </div>

        {activeView === '3d-carousel' && <AdvancedCardTransition />}
        {activeView === 'grid-list' && <GridListTransition />}
        {activeView === 'cascading-transition' && <CascadingGridListTransition />}
      </div>
    </div>
  );
};

export default App; 