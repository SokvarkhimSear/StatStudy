import { BookOpen, PieChart, ClipboardList, TrendingUp, Calculator, CheckCircle } from 'lucide-react';

type SidebarProps = {
  currentView: string;
  setCurrentView: (view: string) => void;
};

const navItems = [
  { id: 'basics', title: '1. Basics of Statistics', icon: BookOpen },
  { id: 'methods', title: '2. Sampling Methods', icon: PieChart },
  { id: 'questions', title: '3. Survey Questions', icon: ClipboardList },
  { id: 'inference', title: '4. Making Inferences', icon: TrendingUp },
  { id: 'formulas', title: '5. Inference Formula', icon: Calculator },
  { id: 'quiz', title: 'Practice Quiz', icon: CheckCircle },
];

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col items-center flex-shrink-0 relative border-r border-slate-800">
      <div className="p-6 w-full mb-4">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <PieChart className="text-blue-400" />
          StatStudy
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Interactive Textbook</p>
      </div>

      <nav className="w-full flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-blue-200' : 'text-slate-500'} />
              {item.title}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 w-full">
        <div className="bg-slate-800 rounded-lg p-4 text-xs">
          <p className="text-slate-400">Based on standard statistical inference curriculum.</p>
        </div>
      </div>
    </div>
  );
}
