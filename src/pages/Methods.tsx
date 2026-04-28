import ChapterLayout from '../components/ChapterLayout';
import { Check, X } from 'lucide-react';

export default function Methods() {
  return (
    <ChapterLayout 
      title="2. Sampling Methods" 
      subtitle="How we choose our data determines how much we can trust our results."
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Random Sampling (Unbiased)</h2>
        <p className="text-slate-600 text-lg">
          Random sampling gives everyone an equal chance to be picked. This helps avoid bias and makes your results more trustworthy!
        </p>
        
        <div className="grid gap-4 mt-6">
          <MethodCard 
            title="Simple Random"
            definition="A sample where each item or person is as likely to be chosen as any other."
            example="Each student's name is written on paper, placed in a bowl, and drawn without looking."
            isGood={true}
          />
          <MethodCard 
            title="Stratified"
            definition="Population is divided into similar, non-overlapping groups. A random sample is then picked from each group."
            example="Students are picked at random from EACH grade level at a school."
            isGood={true}
          />
          <MethodCard 
            title="Systematic"
            definition="Items or people are selected according to a specific time or item interval."
            example="From an alphabetical list of students, choosing every 20th person."
            isGood={true}
          />
        </div>
      </section>

      <section className="space-y-6 mt-16 pt-8 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Biased Sampling (To Be Avoided)</h2>
        <p className="text-slate-600 text-lg">
          These methods often seem easier, but they create flawed data because not everyone has an equal chance of being selected.
        </p>

        <div className="grid gap-4 mt-6">
          <MethodCard 
            title="Convenience Sampling"
            definition="Includes only members of a population that are easily accessed."
            example="To represent the whole school, a principal surveys only the first 20 students who arrive at 6:30 AM."
            isGood={false}
          />
          <MethodCard 
            title="Voluntary Response"
            definition="Involves only those who actively want to participate."
            example="Announcing: 'Students who wish to express their opinion, please come to the office.'"
            isGood={false}
          />
          <MethodCard 
            title="Selection Bias (Non-Representative)"
            definition="Surveying a specific sub-group that shares a distinct trait, skewing the data."
            example="Wanting to know the average height of 7th graders, but only surveying the basketball team."
            isGood={false}
          />
        </div>
      </section>
    </ChapterLayout>
  );
}

function MethodCard({ title, definition, example, isGood }: { title: string, definition: string, example: string, isGood: boolean }) {
  return (
    <div className={`p-6 rounded-xl border-l-4 shadow-sm flex flex-col md:flex-row gap-6 bg-white
      ${isGood ? 'border-emerald-500' : 'border-rose-500'}
    `}>
      <div className="md:w-1/3 flex flex-col justify-start">
        <div className="flex items-center gap-2 mb-2">
          {isGood ? <Check className="text-emerald-500" size={20} /> : <X className="text-rose-500" size={20} />}
          <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
        </div>
      </div>
      <div className="md:w-2/3 space-y-3">
        <div>
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Definition</span>
          <p className="text-slate-700">{definition}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-1">Example</span>
          <p className="text-slate-600 text-sm italic">"{example}"</p>
        </div>
      </div>
    </div>
  )
}
