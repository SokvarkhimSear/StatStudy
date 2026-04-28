import ChapterLayout from '../components/ChapterLayout';
import { AlertCircle, ThumbsUp } from 'lucide-react';

export default function Questions() {
  return (
    <ChapterLayout 
      title="3. Survey Questions" 
      subtitle="How you ask a question can change the answer you get."
    >
      <div className="prose prose-slate max-w-none mb-8">
        <p className="text-lg">
          Even if you have the perfect unbiased sampling method, a poorly worded question will ruin your data. 
          A good survey question should be neutral, allowing the respondent to give their true opinion without 
          being pushed in a specific direction.
        </p>
      </div>

      <div className="space-y-8">
        <QuestionComparison 
          title="The Leading Question"
          bad={`"Don't you agree that our school's ECA options are boring?"`}
          badReason="It pushes the person to agree with a negative statement by assuming the answer."
          good={`"How would you rate the current ECA options on a scale of 1-5? (1=Poor, 5=Excellent)"`}
        />

        <QuestionComparison 
          title="The Pressure Question"
          bad={`"Most students want more sports. Do you want more sports?"`}
          badReason="It makes the respondent feel pressured to agree with the majority."
          good={`"Which types of ECAs would you like to see more of?"`}
        />

        <QuestionComparison 
          title="The Limited Choice Question"
          bad={`"Which day do you prefer to attend your extracurricular clubs? A) Monday B) Wednesday C) Friday"`}
          badReason="It doesn't include all valid options, completely leaving out people who prefer other days or don't participate."
          good={`"Which day do you prefer to attend your extracurricular activities? A) Mon B) Wed C) Fri D) Sat E) I do not participate"`}
        />
      </div>

    </ChapterLayout>
  );
}

function QuestionComparison({ title, bad, badReason, good }: { title: string, bad: string, badReason: string, good: string }) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      </div>
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">
        <div className="flex-1 p-6 bg-rose-50/30">
          <div className="flex items-center gap-2 mb-3 text-rose-600 font-semibold">
            <AlertCircle size={18} />
            Biased Formatting
          </div>
          <p className="text-slate-800 font-medium mb-4">{bad}</p>
          <p className="text-sm text-slate-600"><strong>Why it's bad:</strong> {badReason}</p>
        </div>
        <div className="flex-1 p-6 bg-emerald-50/30">
          <div className="flex items-center gap-2 mb-3 text-emerald-600 font-semibold">
            <ThumbsUp size={18} />
            Unbiased Formatting
          </div>
          <p className="text-slate-800 font-medium">{good}</p>
        </div>
      </div>
    </div>
  )
}
