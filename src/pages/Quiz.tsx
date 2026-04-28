import { useState } from 'react';
import ChapterLayout from '../components/ChapterLayout';
import { CheckCircle2, XCircle, RotateCcw, ChevronLeft, BookOpen, PieChart, ClipboardList, TrendingUp, Calculator, LayoutGrid } from 'lucide-react';

const QUIZ_TOPICS = {
  basics: {
    id: 'basics',
    title: '1. Populations & Samples',
    description: 'Test your understanding of the core foundations of statistics.',
    icon: BookOpen,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100',
    questions: [
      {
        question: "What is the definition of a 'Population' in statistics?",
        options: [
          "A small group of people you ask questions to.",
          "The WHOLE group that you want to study and draw conclusions about.",
          "The total number of questions in a survey.",
          "A perfectly random group of data points."
        ],
        answer: 1,
        explanation: "The population is the entire, complete group of people, items, or events you are trying to understand."
      },
      {
        question: "What is a 'Sample'?",
        options: [
          "A smaller part of the population that is actually measured or surveyed.",
          "The final answer to a statistics problem.",
          "A group of people who volunteer for a study.",
          "Every single person in the school or city."
        ],
        answer: 0,
        explanation: "A sample is a smaller, manageable subset of the whole population."
      },
      {
        question: "Why do researchers generally take samples instead of surveying the entire population?",
        options: [
          "Because populations are usually too small to measure accurately.",
          "Because it is mathematically impossible to measure a population.",
          "Because surveying a whole population is often too expensive, time-consuming, or impossible.",
          "Because samples always give 100% accurate information without any errors."
        ],
        answer: 2,
        explanation: "We use samples because checking the whole population (like every single human in a country) is usually impossible or too costly."
      },
      {
        question: "In the 'Taste Test' analogy, if the entire pot of soup is the population, what represents an 'unbiased sample'?",
        options: [
          "Scooping just from the very top of the pot.",
          "Stirring the pot thoroughly, then taking a single spoonful.",
          "Eating the entire pot of soup.",
          "Asking someone else how the soup looks."
        ],
        answer: 1,
        explanation: "Stirring the pot thoroughly ensures all ingredients have an equal chance of being in your spoonful, making it a fair, representative sample."
      },
      {
        question: "What makes a sample 'Representative'?",
        options: [
          "It acts as a true 'mini-version' of the population.",
          "It only includes people who strongly want to participate.",
          "It guarantees that every single sub-group is perfectly 50/50.",
          "It is selected because it is the most convenient for the researcher."
        ],
        answer: 0,
        explanation: "A representative sample fairly reflects the traits of the entire population, like a true scale model."
      }
    ]
  },
  methods: {
    id: 'methods',
    title: '2. Sampling Methods',
    description: 'Can you spot the difference between fair (unbiased) and flawed (biased) sampling?',
    icon: PieChart,
    iconColor: 'text-violet-500',
    bgColor: 'bg-violet-100',
    questions: [
      {
        question: "A principal surveys the first 20 students who arrive at school at 6:30 AM to see if students want a longer lunch. What sampling method is this?",
        options: [
          "Simple Random Sampling",
          "Convenience Sampling (Biased)",
          "Stratified Sampling",
          "Systematic Sampling"
        ],
        answer: 1,
        explanation: "This is Convenience Sampling. Students arriving early might not reflect the whole student body's opinions."
      },
      {
        question: "Every student's name is placed in a hat, and 50 names are drawn blindly. What method is this?",
        options: [
          "Selection Bias",
          "Simple Random Sampling (Unbiased)",
          "Voluntary Response Sampling",
          "Convenience Sampling"
        ],
        answer: 1,
        explanation: "This is Simple Random Sampling because everyone has an exactly equal chance of being chosen."
      },
      {
        question: "A researcher wants to know the average height of 7th graders, but only measures the 7th grade basketball team. What sampling error is this?",
        options: [
          "Selection Bias (Non-Representative)",
          "Stratified Sampling",
          "Simple Random Sampling",
          "Voluntary Response"
        ],
        answer: 0,
        explanation: "Selecting a specific sub-group that shares a distinct trait (like tall basketball players) skews the data violently."
      },
      {
        question: "The school population is divided by grade level (6th, 7th, 8th). Then, 10 students are randomly picked from EACH grade. What method is this?",
        options: [
          "Systematic Sampling",
          "Stratified Sampling (Unbiased)",
          "Convenience Sampling",
          "Voluntary Response Sampling"
        ],
        answer: 1,
        explanation: "Stratified Sampling divides populations into similar non-overlapping groups, then takes a random sample from every group."
      },
      {
        question: "A radio host says 'Call in now to vote for your favorite song!' What kind of sampling is this?",
        options: [
          "Voluntary Response Sampling (Biased)",
          "Stratified Sampling",
          "Systematic Sampling",
          "Simple Random Sampling"
        ],
        answer: 0,
        explanation: "Voluntary Response is biased because only people with very strong opinions usually take the effort to participate."
      },
      {
        question: "Surveying every 10th student walking out of the cafeteria is an example of:",
        options: [
          "Voluntary Response",
          "Selection Bias",
          "Systematic Sampling (Unbiased)",
          "Stratified Sampling"
        ],
        answer: 2,
        explanation: "Systematic sampling uses a specific interval (e.g., every 10th person) to select participants fairly."
      }
    ]
  },
  questions: {
    id: 'questions',
    title: '3. Survey Questions',
    description: 'Learn to avoid leading, pressuring, or limiting questions in surveys.',
    icon: ClipboardList,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-100',
    questions: [
      {
        question: "\"Don't you agree that our school's ECA options are clearly boring?\" What type of biased question is this?",
        options: [
          "A Limited Choice Question",
          "An Unbiased Question",
          "A Leading Question",
          "A Systematic Question"
        ],
        answer: 2,
        explanation: "A Leading Question pushes the respondent toward a particular answer by stating a strong opinion within the prompt."
      },
      {
        question: "Which of the following is an example of an UNBIASED survey question?",
        options: [
          "Most students hate wearing uniforms. Do you?",
          "How would you rate your experience with the school cafeteria on a scale of 1-5?",
          "Which is your favorite color: Red or Blue? (Assuming there are other colors)",
          "Don't you think the principal is doing a great job?"
        ],
        answer: 1,
        explanation: "Option B is neutral, clear, and provides a balanced way to answer without assuming anything."
      },
      {
        question: "\"Most students want more sports. Do you want more sports?\" Why is this biased?",
        options: [
          "It's a Pressure Question. It makes the respondent feel pressured to agree with the majority.",
          "It's a Limited Choice Question. It doesn't give enough options.",
          "It's unbiased. It just states a fact.",
          "It's too long of a question to read."
        ],
        answer: 0,
        explanation: "By stating what 'most students' want, it places psychological pressure on the respondent to conform."
      },
      {
        question: "\"Which day do you prefer club meetings? A) Monday B) Wednesday\" Why is this a BAD question?",
        options: [
          "It is a leading question.",
          "It is a Limited Choice question. It leaves out people who prefer other days or don't want clubs.",
          "It pressures the student to say Wednesday.",
          "It is too complicated."
        ],
        answer: 1,
        explanation: "Surveys must offer exhaustive options, including 'None of the above' or 'Other'."
      }
    ]
  },
  inference: {
    id: 'inference',
    title: '4. Making Inferences',
    description: 'Understand variation, multiple samples, and making predictions.',
    icon: TrendingUp,
    iconColor: 'text-rose-500',
    bgColor: 'bg-rose-100',
    questions: [
      {
        question: "What is an inference in the context of statistics?",
        options: [
          "A mathematically certain fact that cannot be debated.",
          "A conclusion or prediction made about a larger population based on sample data.",
          "The process of asking bad survey questions.",
          "The difference between two population groups."
        ],
        answer: 1,
        explanation: "Inference is the leap we take from knowing something about a sample to predicting something about the whole population."
      },
      {
        question: "If two researchers take different random samples from the same school and get slightly different results, what is this called?",
        options: [
          "Variation (which is completely normal).",
          "Biased Sampling.",
          "A broken survey.",
          "Leading questions."
        ],
        answer: 0,
        explanation: "Because the samples contain different individuals, slight differences (variation) are expected and completely normal."
      },
      {
        question: "What generally happens to your inference as your sample size gets larger?",
        options: [
          "It gets more biased.",
          "It gets less reliable.",
          "It gets closer to the true population reality.",
          "It stays exactly the same no matter what."
        ],
        answer: 2,
        explanation: "The larger the sample, the less impact random outliers have, making your prediction much more accurate."
      },
      {
        question: "Why do statisticians recommend taking MULTIPLE samples from a population?",
        options: [
          "Because the math is faster.",
          "To exhaust the researchers so they take a break.",
          "Comparing multiple samples helps us spot patterns and makes predictions more reliable.",
          "To trick the respondents."
        ],
        answer: 2,
        explanation: "Taking multiple samples helps smooth out random variations and gives us a tighter, more confident estimate of the population."
      }
    ]
  },
  formulas: {
    id: 'formulas',
    title: '5. Inference Math',
    description: 'Practice calculating predictions using the core formula.',
    icon: Calculator,
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-100',
    questions: [
      {
        question: "The inference equation uses equivalent ratios. Which setup is correct?",
        options: [
          "(Sample Total / Sample Trait) = (Population Inference / Population Total)",
          "(Population Inference / Population Total) = (Sample Trait Count / Sample Total)",
          "(Population Total / Sample Total) = (Sample Trait / Inference)",
          "(Sample Trait + Sample Total) = Population Total"
        ],
        answer: 1,
        explanation: "The correct equivalent ratio compares part-to-whole for both the population and the sample: (x / Pop. Total) = (Sample part / Sample Total)."
      },
      {
        question: "Calculate the inference: In a school of 400 students, you randomly survey 50 students. 10 say their favorite color is blue. Predict how many in the whole school prefer blue.",
        options: ["100", "50", "80", "120"],
        answer: 2,
        explanation: "x / 400 = 10 / 50. Cross multiply: 50x = 4000.  4000 / 50 = 80."
      },
      {
        question: "A factory makes 5,000 batteries a day. A quality worker tests 100 batteries and finds 3 are defective. Predict the total number of defective batteries that day.",
        options: ["30", "150", "300", "500"],
        answer: 1,
        explanation: "x / 5000 = 3 / 100. Cross multiply: 100x = 15000. 15000 / 100 = 150."
      },
      {
        question: "You want to know how many people in a town of 2,000 own a bicycle. You randomly survey 40 people, and 8 own bicycles. What is your prediction for the town?",
        options: ["200", "300", "400", "800"],
        answer: 2,
        explanation: "x / 2000 = 8 / 40. Cross multiply: 40x = 16000. 16000 / 40 = 400."
      },
      {
        question: "In a giant jar of 300 jellybeans, you scoop out a sample of 20 jellybeans. 5 of them are red. How many red jellybeans are likely in the entire jar?",
        options: ["25", "60", "75", "100"],
        answer: 2,
        explanation: "x / 300 = 5 / 20. Cross multiply: 20x = 1500. 1500 / 20 = 75."
      }
    ]
  }
};

export default function Quiz() {
  const [selectedTopicKey, setSelectedTopicKey] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // When standard topic is not selected, show menu
  if (!selectedTopicKey) {
    return (
      <ChapterLayout 
        title="Practice Quizzes" 
        subtitle="Select a topic to test your knowledge."
      >
        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(QUIZ_TOPICS).map((topic) => {
            const Icon = topic.icon;
            return (
              <div 
                key={topic.id}
                onClick={() => {
                  setSelectedTopicKey(topic.id);
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setShowResult(false);
                  setScore(0);
                }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col items-start gap-4"
              >
                <div className={`p-4 rounded-2xl ${topic.bgColor} ${topic.iconColor} group-hover:scale-110 transition-transform`}>
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{topic.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{topic.description}</p>
                </div>
                <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                  Take Quiz <ChevronLeft className="ml-1 rotate-180" size={16} />
                </div>
              </div>
            )
          })}
        </div>
      </ChapterLayout>
    );
  }

  // A specific topic is active
  const activeTopic = QUIZ_TOPICS[selectedTopicKey as keyof typeof QUIZ_TOPICS];
  const activeQ = activeTopic.questions[currentQuestion];
  const isFinished = currentQuestion >= activeTopic.questions.length;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    if (selectedAnswer === activeQ.answer) {
      setScore(s => s + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(c => c + 1);
  };

  if (isFinished) {
    return (
      <ChapterLayout 
        title={`${activeTopic.title} - Complete`} 
        subtitle="Let's see how you did."
      >
        <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-200 text-center animate-in zoom-in-95 duration-500">
          <div className="text-[120px] leading-none font-black text-slate-900 mb-4 tracking-tighter">
            {score}<span className="text-slate-300 text-6xl">/{activeTopic.questions.length}</span>
          </div>
          <p className="text-xl text-slate-600 mb-10 font-medium">
            {score === activeTopic.questions.length ? "Perfect score! You're a master of this topic." : 
             score > activeTopic.questions.length / 2 ? "Great job! You have a solid grasp on this." : 
             "Good effort! Review the chapter and try again."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowResult(false);
                setSelectedAnswer(null);
              }}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md active:scale-95"
            >
              <RotateCcw size={20} />
              Retake Topic
            </button>
            <button 
              onClick={() => setSelectedTopicKey(null)}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-bold transition-all active:scale-95"
            >
              <LayoutGrid size={20} />
              All Topics
            </button>
          </div>
        </div>
      </ChapterLayout>
    );
  }

  return (
    <ChapterLayout 
      title={activeTopic.title} 
      subtitle={`Question ${currentQuestion + 1} of ${activeTopic.questions.length}`}
    >
      <button 
        onClick={() => setSelectedTopicKey(null)} 
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold uppercase tracking-wider text-sm"
      >
        <ChevronLeft size={18} /> Back to Quiz Topics
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 relative">
        <div className={`absolute top-0 right-0 p-4 rounded-bl-3xl rounded-tr-3xl ${activeTopic.bgColor} ${activeTopic.iconColor}`}>
          <activeTopic.icon size={24} />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-8 mt-2 leading-snug max-w-[90%]">
          {activeQ.question}
        </h3>

        <div className="space-y-4">
          {activeQ.options.map((option, index) => {
            let itemClass = "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50";
            let showIcon = null;

            if (selectedAnswer === index) {
              itemClass = "border-blue-500 bg-blue-50 shadow-sm"; 
            }

            if (showResult) {
              const isCorrectOpt = index === activeQ.answer;
              const isSelectedOpt = index === selectedAnswer;

              if (isCorrectOpt) {
                itemClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium scale-[1.01] shadow-sm";
                showIcon = <CheckCircle2 className="text-emerald-500 ml-auto flex-shrink-0" />;
              } else if (isSelectedOpt) {
                itemClass = "border-rose-500 bg-rose-50 opacity-80 text-rose-900 font-medium";
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
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between text-lg ${itemClass}`}
              >
                <span className="pr-4">{option}</span>
                {showIcon}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`mt-8 p-6 rounded-2xl border animate-in slide-in-from-top-4 ${
            selectedAnswer === activeQ.answer 
            ? 'bg-emerald-50 border-emerald-200' 
            : 'bg-rose-50 border-rose-200'
          }`}>
            <p className="font-bold mb-2 flex items-center gap-2">
              {selectedAnswer === activeQ.answer 
                ? <><CheckCircle2 size={20} className="text-emerald-600"/> Correct!</> 
                : <><XCircle size={20} className="text-rose-600"/> Incorrect.</>}
            </p>
            <p className="text-slate-700 leading-relaxed">{activeQ.explanation}</p>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          {!showResult ? (
            <button 
              onClick={handleSubmit} 
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                selectedAnswer !== null 
                  ? `bg-slate-900 text-white hover:bg-slate-800 shadow-md transform active:scale-95`
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button 
              onClick={handleNext} 
              className="px-8 py-4 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md transform active:scale-95 flex items-center gap-2 transition-all"
            >
              {currentQuestion === activeTopic.questions.length - 1 ? 'See Results' : 'Next Question'}
              {!isFinished && <ChevronLeft className="rotate-180" size={20} />}
            </button>
          )}
        </div>
      </div>
    </ChapterLayout>
  );
}
