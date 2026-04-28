/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Basics from './pages/Basics';
import Methods from './pages/Methods';
import Questions from './pages/Questions';
import Inference from './pages/Inference';
import Formulas from './pages/Formulas';
import Quiz from './pages/Quiz';
import ModuleHub from './pages/ModuleHub';
import Homework from './pages/Homework';
import AuthPage from './pages/AuthPage';
import { useAuth } from './lib/AuthContext';

export default function App() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('stats-hub');

  useEffect(() => {
    if (!user) setCurrentView('auth');
    else if (currentView === 'auth') setCurrentView('stats-hub');
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white font-mono text-xs uppercase tracking-tighter text-slate-400">
        Initializing CAMTutor...
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'stats-hub': return <ModuleHub onSelectChapter={setCurrentView} />;
      case 'basics': return <Basics />;
      case 'methods': return <Methods />;
      case 'questions': return <Questions />;
      case 'inference': return <Inference />;
      case 'formulas': return <Formulas />;
      case 'quiz': return <Quiz />;
      case 'homework': return <Homework />;
      default: return <ModuleHub onSelectChapter={setCurrentView} />;
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
