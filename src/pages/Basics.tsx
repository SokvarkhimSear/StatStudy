import ChapterLayout from '../components/ChapterLayout';
import { Users, User, AlertTriangle, BookOpen } from 'lucide-react';

export default function Basics() {
  return (
    <ChapterLayout 
      title="1. The Basics of Statistics" 
      subtitle="Understanding populations, samples, and the goal of statistical study."
    >
      <section className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-slate-700">
          At its core, statistics is about understanding large groups of things (people, objects, events) 
          without having to measure every single one of them. We do this by taking smaller, manageable chunks 
          and using them to make educated guesses about the whole.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Users size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Population</h2>
          <p className="text-slate-600">The <strong>WHOLE</strong> group you want to study.</p>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-500 w-full">
            Example: All students in the school, or a giant pot of soup.
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Sample</h2>
          <p className="text-slate-600">A <strong>SMALLER part</strong> of that population group.</p>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-500 w-full">
            Example: 50 randomly selected students, or a single spoonful of soup.
          </div>
        </div>
      </div>

      <section className="bg-slate-800 text-white rounded-3xl overflow-hidden shadow-lg mt-12">
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <AlertTriangle className="text-amber-400" />
            What makes a GOOD sample?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
              <h3 className="text-xl font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                Representative (Unbiased)
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" /> Fair and equal chance for everyone.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" /> Randomly selected.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" /> Acts as a true "mini-version" of the population.</li>
              </ul>
            </div>
            
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
              <h3 className="text-xl font-semibold text-rose-400 mb-3 flex items-center gap-2">
                Biased
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" /> Unfair selection process.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" /> Based on convenience or voluntary participation.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" /> Creates flawed data that doesn't represent the whole.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 p-6 text-sm text-slate-400 flex items-start gap-4">
          <BookOpen className="text-blue-400 flex-shrink-0" size={24} />
          <p>
            <strong>The Taste Test Analogy:</strong> If you are testing a pot of soup, a good, unbiased sample requires the soup to be <em>well stirred</em> before you take a spoonful. If you just scoop from the top without stirring, you might only get broth and miss the vegetables—that's a biased sample!
          </p>
        </div>
      </section>

    </ChapterLayout>
  );
}
