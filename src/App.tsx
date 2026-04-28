/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Basics from './pages/Basics';
import Methods from './pages/Methods';
import Questions from './pages/Questions';
import Inference from './pages/Inference';
import Formulas from './pages/Formulas';
import Quiz from './pages/Quiz';

export default function App() {
  const [currentView, setCurrentView] = useState('basics');

  const renderView = () => {
    switch (currentView) {
      case 'basics': return <Basics />;
      case 'methods': return <Methods />;
      case 'questions': return <Questions />;
      case 'inference': return <Inference />;
      case 'formulas': return <Formulas />;
      case 'quiz': return <Quiz />;
      default: return <Basics />;
    }
  };

  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 h-screen overflow-y-auto px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto h-full w-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
