import ChapterLayout from '../components/ChapterLayout';
import { Calculator } from 'lucide-react';

export default function Formulas() {
  return (
    <ChapterLayout 
      title="5. The Inference Equation" 
      subtitle="The mathematical backbone of making predictions from data."
    >
      <div className="prose prose-slate max-w-none mb-8">
        <p className="text-lg">
          To predict how many items in a total population have a certain trait based on your sample, 
          we use equivalent fractions (ratios). We set up an equation comparing the sample to the population.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 mb-12">
        <div className="bg-slate-900 px-8 py-6 flex items-center justify-center gap-4">
          <Calculator className="text-violet-400" size={32} />
          <h2 className="text-2xl font-bold text-white tracking-wider font-mono">The Core Equation</h2>
        </div>
        
        <div className="p-8 md:p-12 text-center overflow-x-auto">
          <div className="inline-flex items-center gap-6 font-mono text-xl md:text-3xl font-semibold text-slate-800">
            <div className="flex flex-col items-center">
              <span className="border-b-2 border-slate-800 pb-2 text-violet-600">Population Inference (x)</span>
              <span className="pt-2">Population Total</span>
            </div>
            <span>=</span>
            <div className="flex flex-col items-center">
              <span className="border-b-2 border-slate-800 pb-2 text-emerald-600">Sample Count (Trait)</span>
              <span className="pt-2">Sample Total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Walkthrough Example</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-3 text-lg">The Setup</h4>
            <p className="text-slate-600 mb-4 whitespace-pre-line">
              There are exactly <strong>100 pieces</strong> of paper inside a hat. Some have "W" written on them, most are blank.
            </p>
            <p className="text-slate-600 whitespace-pre-line">
              You draw a sample of <strong>10 pieces</strong> of paper.
              In your sample, you find <strong>2 pieces</strong> with "W" on them.
            </p>
            <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-slate-100 flex flex-col gap-2 font-mono text-sm">
              <div><span className="text-slate-400">Population Total:</span> 100</div>
              <div><span className="text-slate-400">Sample Total:</span> 10</div>
              <div><span className="text-slate-400">Sample Count (with W):</span> 2</div>
              <div><span className="text-slate-400">Population Inference:</span> x</div>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl font-mono text-lg flex flex-col justify-center shadow-lg transform hover:scale-[1.01] transition-transform">
            <h4 className="font-bold text-violet-400 mb-6 font-sans border-b border-slate-700 pb-2">Solving for x:</h4>
            
            <div className="space-y-6">
              <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                  <div className="border-b border-slate-500 w-8 mx-auto text-violet-300">x</div>
                  <div>100</div>
                </div>
                <div>=</div>
                <div className="text-center">
                  <div className="border-b border-slate-500 w-8 mx-auto text-emerald-300">2</div>
                  <div>10</div>
                </div>
              </div>

              <div className="text-center text-slate-400 text-sm">Step 1: Cross Multiply</div>

              <div className="text-center tracking-widest text-xl">
                10x = 200
              </div>

              <div className="text-center text-slate-400 text-sm">Step 2: Divide by 10</div>
              
              <div className="text-center bg-violet-900/50 p-2 rounded-lg font-bold text-2xl text-white">
                x = 20
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
          <p className="text-xl font-medium text-emerald-800">
            <strong>Prediction:</strong> There are likely 20 pieces of paper with "W" on them in the whole hat.
          </p>
        </div>
      </div>

    </ChapterLayout>
  );
}
