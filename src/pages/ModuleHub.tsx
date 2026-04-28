import ChapterLayout from '../components/ChapterLayout';
import { BookOpen, PieChart, ClipboardList, TrendingUp, Calculator, CheckCircle, ArrowRight } from 'lucide-react';

const subItems = [
  { id: 'basics', title: '1. Basics of Statistics', description: 'Populations vs. Samples and the core goals of stats.', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'methods', title: '2. Sampling Methods', description: 'Random vs. Biased selection techniques.', icon: PieChart, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: 'questions', title: '3. Survey Questions', description: 'Avoiding leading and pressuring prompts.', icon: ClipboardList, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'inference', title: '4. Making Inferences', description: 'Predicting the whole from the part.', icon: TrendingUp, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'formulas', title: '5. Inference Formula', description: 'The math behind statistical predictions.', icon: Calculator, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'quiz', title: 'Practice Quiz', description: 'Test your mastery of the module.', icon: CheckCircle, color: 'text-slate-700', bg: 'bg-slate-100' },
];

type ModuleHubProps = {
  onSelectChapter: (id: string) => void;
};

export default function ModuleHub({ onSelectChapter }: ModuleHubProps) {
  return (
    <ChapterLayout 
      title="Statistics" 
      subtitle="Module 1: Population & Sampling"
    >
      <div className="prose prose-slate max-w-none mb-10">
        <p className="text-lg text-slate-600">
          Welcome to the Statistics module. In this unit, you will learn how to design surveys, 
          select unbiased samples, and use mathematical formulas to make accurate predictions about large populations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {subItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectChapter(item.id)}
              className="group text-left bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all active:scale-[0.98]"
            >
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center text-sm font-bold text-blue-600">
                Start Learning <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </ChapterLayout>
  );
}
