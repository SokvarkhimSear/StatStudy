import { BookOpen, PieChart, ClipboardList, TrendingUp, Calculator, CheckCircle, LogIn, LogOut, User, LayoutGrid, ChevronDown, ChevronRight, School, GraduationCap } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { loginWithGoogle, logout } from '../lib/firebase';
import { useState } from 'react';

type SidebarProps = {
  currentView: string;
  setCurrentView: (view: string) => void;
};

const modules = [
  {
    id: 'stats-hub',
    title: 'Statistics (Population & Sampling)',
    icon: LayoutGrid,
    chapters: [
      { id: 'basics', title: '1. Basics of Statistics', icon: BookOpen },
      { id: 'methods', title: '2. Sampling Methods', icon: PieChart },
      { id: 'questions', title: '3. Survey Questions', icon: ClipboardList },
      { id: 'inference', title: '4. Making Inferences', icon: TrendingUp },
      { id: 'formulas', title: '5. Inference Formula', icon: Calculator },
      { id: 'quiz', title: 'Practice Quiz', icon: CheckCircle },
    ]
  },
  {
    id: 'homework',
    title: 'Homework & Assignments',
    icon: ClipboardList,
    chapters: []
  }
];

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const { user, profile } = useAuth();
  const [expandedModules, setExpandedModules] = useState<string[]>(['stats-hub']);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col items-center flex-shrink-0 relative border-r border-slate-800 h-screen overflow-hidden">
      <div className="p-6 w-full mb-4">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <PieChart className="text-blue-400" />
          CAMTutor
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Interactive Textbook</p>
      </div>

      <nav className="w-full flex-1 px-4 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          {modules.map((module) => {
            const isExpanded = expandedModules.includes(module.id);
            const isModuleActive = currentView === module.id || module.chapters.some(c => c.id === currentView);
            const ModuleIcon = module.icon;

            return (
              <div key={module.id} className="space-y-1">
                <button
                  onClick={() => {
                    setCurrentView(module.id);
                    if (!isExpanded) toggleModule(module.id);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    currentView === module.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : isModuleActive 
                        ? 'text-white' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <ModuleIcon size={18} className={currentView === module.id ? 'text-blue-200' : 'text-blue-400'} />
                  <span className="flex-1 text-left">{module.title}</span>
                  <div onClick={(e) => { e.stopPropagation(); toggleModule(module.id); }} className="p-1 hover:bg-white/10 rounded-md">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="ml-4 pl-4 border-l border-slate-800 space-y-1 mt-1 animate-in fade-in slide-in-from-left-2 duration-200">
                    {module.chapters.map((chapter) => {
                      const ChapterIcon = chapter.icon;
                      const isActive = currentView === chapter.id;
                      return (
                        <button
                          key={chapter.id}
                          onClick={() => setCurrentView(chapter.id)}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-slate-800 text-blue-400'
                              : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
                          }`}
                        >
                          <ChapterIcon size={14} className={isActive ? 'text-blue-400' : 'text-slate-600'} />
                          {chapter.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      
      <div className="p-4 w-full border-t border-slate-800 mt-auto">
        {user ? (
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800 p-3 rounded-xl border border-slate-700">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                  {profile?.role === 'teacher' ? <School size={16} /> : <GraduationCap size={16} />}
                </div>
                <div className="truncate flex-1">
                  <p className="font-bold text-white leading-none mb-1 truncate">{profile?.displayName || user.email}</p>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">{profile?.role || 'user'}</p>
                </div>
             </div>
             <button 
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="bg-slate-800/50 rounded-xl p-4 text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">
            CAMTutor v1.0 <br />
            Cambodia Standard Time (UTC+7)
          </div>
        )}
      </div>
    </div>
  );
}
