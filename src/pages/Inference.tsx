import ChapterLayout from '../components/ChapterLayout';
import { Lightbulb, RotateCcw } from 'lucide-react';

export default function Inference() {
  return (
    <ChapterLayout 
      title="4. Making Inferences" 
      subtitle="Jumping from the small sample to the big picture."
    >
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-10 text-center">
        <Lightbulb className="mx-auto text-blue-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-blue-900 mb-4">What is an Inference?</h2>
        <p className="text-blue-800 text-lg max-w-2xl mx-auto">
          An inference is a conclusion you make based on evidence and reasoning. 
          In statistics, it means using sample data to make predictions about a larger population.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Why Data Results Vary</h3>
          <p className="text-slate-600">
            If you take different random samples from the same population, you will get slightly different results. 
            <strong>This is normal!</strong> It is called <em>variation</em>.
          </p>
          <div className="bg-slate-100 rounded-lg p-5 border border-slate-200">
            <p className="text-sm font-medium text-slate-700">
              Rule of Thumb: The bigger your sample size, the closer your results will get to the true population realities.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Multiple Samples</h3>
          <p className="text-slate-600">
            Taking several random samples from the same population helps you compare results limits errors.
          </p>
           <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-100 flex items-start gap-4">
            <RotateCcw className="text-emerald-500 flex-shrink-0 mt-1" />
            <p className="text-emerald-900 font-medium">
               More Samples = More Reliable Predictions about the whole group!
            </p>
          </div>
        </div>
      </div>

      <section className="bg-slate-900 text-white rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">Simulated Samples</h3>
        <p className="text-slate-300">
          In the modern world, statisticians use computers to create virtual samples quickly. 
          By running thousands of simulations, computers can compare multiple scenarios to see patterns 
          that humans wouldn't be able to calculate by hand, leading to highly confident inferences.
        </p>
      </section>

    </ChapterLayout>
  );
}
