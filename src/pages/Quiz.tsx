import { useState } from 'react';
import ChapterLayout from '../components/ChapterLayout';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    question: "A principal surveys the first 20 students who arrive at school at 6:30 AM to see if students want a longer lunch. Is this sample Representative or Biased?",
    options: [
      "Representative, because 20 is a good sample size.",
      "Representative, because it surveys actual students.",
      "Biased, because early arrivers might not reflect the whole student body (Convenience Sampling).",
      "Biased, because they should have asked teachers instead."
    ],
    answer: 2,
    explanation: "This is Convenience Sampling. Students arriving at 6:30 AM might have very different schedules or opinions than the rest of the school."
  },
  {
    question: "Which of the following is an example of an unbiased (good) survey question?",
    options: [
      "Don't you agree that homework is a waste of time?",
      "Most students hate school uniforms. Do you?",
      "Which of these three colors is your favorite: Red, Blue, or Green?",
      "On a scale of 1-5, how would you rate your experience with the school cafeteria?"
    ],
    answer: 3,
    explanation: "This question doesn't pressure the user, assume a negative, or artificially limit choices (unlike option 3 which leaves out other colors)."
  },
  {
    question: "Calculate the inference: You want to know how many students in a school of 500 prefer pizza. You take a random sample of 50 students, and 20 say they prefer pizza. What is your prediction for the whole school?",
    options: ["200", "250", "100", "50"],
    answer: 0,
    explanation: "x / 500 = 20 / 50. Cross multiply: 50x = 10000. x = 200."
  },
  {
    question: "What is the main reason statisticians recommend taking MULTIPLE samples from a population?",
    options: [
      "It makes the math easier.",
      "It proves that the population is biased.",
      "Different samples give slightly varying results. Comparing them reduces error and yields more reliable predictions.",
      "It allows researchers to ask leading questions."
    ],
    answer: 2,
    explanation: "Variation happens naturally. By comparing multiple samples, we get a clearer, more consistent picture of the true population."
  },
  {
    question: "A researcher wants to know the average height of all 7th graders. They decide to use a Systematic sampling method. What would that look like?",
    options: [
      "Picking students blindly from a hat.",
      "Surveying every 10th student from an alphabetical list of all 7th graders.",
      "Measuring only the students on the basketball team.",
      "Waiting outside one classroom and measuring the first 5 students."
    ],
    answer: 1,
    explanation: "Systematic sampling selects items according to a specific interval (e.g., every 10th person)."
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (index: number) => {
    if (showResult) return; // Prevent changing answer after submission
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === QUIZ_QUESTIONS[currentQuestion].answer) {
      setScore(s => s + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(c => c + 1);
  };

  const activeQ = QUIZ_QUESTIONS[currentQuestion];
  const isFinished = currentQuestion >= QUIZ_QUESTIONS.length;

  if (isFinished) {
    return (
      <ChapterLayout title="Quiz Complete!" subtitle="Let's see how you did.">
        <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-200 text-center animate-in zoom-in-95 duration-500">
          <div className="text-[120px] leading-none font-black text-slate-900 mb-4 tracking-tighter">
            {score}<span className="text-slate-300 text-6xl">/{QUIZ_QUESTIONS.length}</span>
          </div>
          <p className="text-xl text-slate-600 mb-8 font-medium">
            {score === QUIZ_QUESTIONS.length ? "Perfect score! You're a statistics master." : 
             score > 2 ? "Great job! You have a solid grasp of statistics." : 
             "Good effort! Review the chapters and try again."}
          </p>
          <button 
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
              setSelectedAnswer(null);
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg focus:ring-4 ring-blue-200 active:scale-95"
          >
            <RotateCcw size={20} />
            Retake Quiz
          </button>
        </div>
      </ChapterLayout>
    );
  }

  return (
    <ChapterLayout 
      title="6. Knowledge Check" 
      subtitle={`Question ${currentQuestion + 1} of ${QUIZ_QUESTIONS.length}`}
    >
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">
          {activeQ.question}
        </h3>

        <div className="space-y-4">
          {activeQ.options.map((option, index) => {
            let itemClass = "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50";
            let showIcon = null;

            if (selectedAnswer === index) {
              itemClass = "border-blue-500 bg-blue-50 shadow-sm"; // Selected state before submit
            }

            if (showResult) {
              const isCorrectOpt = index === activeQ.answer;
              const isSelectedOpt = index === selectedAnswer;

              if (isCorrectOpt) {
                itemClass = "border-emerald-500 bg-emerald-50 shadow-sm text-emerald-900 font-medium";
                showIcon = <CheckCircle2 className="text-emerald-500 ml-auto flex-shrink-0" />;
              } else if (isSelectedOpt) {
                itemClass = "border-rose-500 bg-rose-50 opacity-75 text-rose-900 font-medium";
                showIcon = <XCircle className="text-rose-500 ml-auto flex-shrink-0" />;
              } else {
                itemClass = "border-slate-100 opacity-50 cursor-default bg-slate-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center justify-between text-lg ${itemClass}`}
              >
                <span>{option}</span>
                {showIcon}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`mt-8 p-6 rounded-xl border animate-in slide-in-from-top-4 ${
            selectedAnswer === activeQ.answer 
            ? 'bg-emerald-50 border-emerald-200' 
            : 'bg-rose-50 border-rose-200'
          }`}>
            <p className="font-bold mb-1">
              {selectedAnswer === activeQ.answer ? 'Correct!' : 'Incorrect.'}
            </p>
            <p className="text-slate-700">{activeQ.explanation}</p>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          {!showResult ? (
            <button 
              onClick={handleSubmit} 
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                selectedAnswer !== null 
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md transform active:scale-95' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button 
              onClick={handleNext} 
              className="px-8 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md transform active:scale-95 flex items-center gap-2 transition-all"
            >
              {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </ChapterLayout>
  );
}
