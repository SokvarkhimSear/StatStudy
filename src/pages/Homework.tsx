import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, where, onSnapshot, addDoc, serverTimestamp, Timestamp, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../lib/AuthContext';
import ChapterLayout from '../components/ChapterLayout';
import { Clock, Plus, List, CheckCircle, PenTool, Eye, LayoutGrid, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { QUESTION_BANK } from '../data/questionBank';

interface Homework {
  id: string;
  title: string;
  description?: string;
  dueDate: Timestamp;
  totalPoints: number;
  isReleased: boolean;
  isPublished: boolean;
  teacherId: string;
  type: 'quiz' | 'formula';
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    points: number;
  }[];
}

interface Submission {
  homeworkId: string;
  studentId: string;
  studentName: string;
  score: number;
  status: 'submitted' | 'graded';
  submittedAt: Timestamp;
}

export default function Homework() {
  const { user, profile } = useAuth();
  const isTeacher = profile?.role === 'teacher';

  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeHomework, setActiveHomework] = useState<Homework | null>(null);
  const [submissions, setSubmissions] = useState<Record<string, Submission>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPoints, setNewPoints] = useState(100);
  const [useQuestionBank, setUseQuestionBank] = useState(true);
  const [viewingSubmissionsHw, setViewingSubmissionsHw] = useState<Homework | null>(null);

  useEffect(() => {
    if (profile === undefined) return;
    const itemsRef = collection(db, 'homeworks');
    const q = isTeacher 
      ? query(itemsRef, orderBy('dueDate', 'asc'))
      : query(itemsRef, where('isPublished', '==', true), orderBy('dueDate', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Homework));
      setHomeworks(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'homeworks');
    });
    return () => unsubscribe();
  }, [isTeacher, profile]);

  useEffect(() => {
    if (!user || (isTeacher && !isPreviewMode)) return;

    const unsubscribers: (() => void)[] = [];
    
    homeworks.forEach(hw => {
      const q = doc(db, `homeworks/${hw.id}/submissions`, user.uid);
      const unsub = onSnapshot(q, (snapshot) => {
        if (snapshot.exists()) {
          setSubmissions(prev => ({ ...prev, [hw.id]: snapshot.data() as Submission }));
        } else {
          setSubmissions(prev => {
            const next = { ...prev };
            delete next[hw.id];
            return next;
          });
        }
      });
      unsubscribers.push(unsub);
    });

    return () => unsubscribers.forEach(u => u());
  }, [user, isTeacher, isPreviewMode, homeworks.length]);

  const addHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDueDate || !user) return;

    try {
      let homeworkData: any = {
        title: newTitle,
        dueDate: Timestamp.fromDate(new Date(newDueDate)),
        totalPoints: useQuestionBank ? QUESTION_BANK.length : homeworks.length ? 0 : 0,
        teacherId: user.uid,
        isReleased: false,
        isPublished: false,
        type: 'quiz',
        questions: useQuestionBank ? QUESTION_BANK : [],
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'homeworks'), homeworkData);
      setNewTitle('');
      setNewDueDate('');
      setShowAddModal(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'homeworks');
    }
  };

  const deleteHomework = async (hwId: string) => {
    try {
      await deleteDoc(doc(db, 'homeworks', hwId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `homeworks/${hwId}`);
    }
  };

  const toggleRelease = async (hwId: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'homeworks', hwId), { isReleased: !current });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `homeworks/${hwId}`);
    }
  };

  const togglePublish = async (hwId: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'homeworks', hwId), { isPublished: !current });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `homeworks/${hwId}`);
    }
  };

  const getTimeLeft = (dueDate: Date) => {
    const now = new Date();
    const diff = dueDate.getTime() - now.getTime();
    if (diff <= 0) return 'Overdue';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h left`;
  };

  if (activeHomework) {
    return <TakeHomework homework={activeHomework} onCancel={() => setActiveHomework(null)} />;
  }

  const visibleHomeworks = (isTeacher && !isPreviewMode) 
    ? homeworks 
    : homeworks.filter(hw => hw.isPublished);

  return (
    <ChapterLayout 
      title={isTeacher ? (isPreviewMode ? "Student Preview" : "Teacher Dashboard") : "Homework & Assignments"} 
      subtitle={isTeacher ? (isPreviewMode ? "Viewing as a student." : "Manage your class assignments and student progress.") : "Stay track of your statistical studies and deadlines."}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          {isTeacher && (
            <button 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isPreviewMode ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              <Eye size={14} />
              {isPreviewMode ? 'Exit Preview' : 'Student Preview'}
            </button>
          )}
        </div>

        {isTeacher && !isPreviewMode && (
           <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            <Plus size={18} /> Make Assignment
          </button>
        )}
      </div>

      <div className="space-y-4">
        {visibleHomeworks.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <Clock className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-medium">
              {isTeacher && !isPreviewMode ? 'No assignments scheduled.' : 'No assignments published yet.'}
            </p>
          </div>
        ) : (
          visibleHomeworks.map((hw) => {
            const studentSubmission = submissions[hw.id];
            return (
              <div key={hw.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                     <h3 className="text-lg font-bold text-slate-900">{hw.title}</h3>
                     {(isTeacher && !isPreviewMode) ? (
                       <div className="flex gap-2">
                         <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded ${hw.isPublished ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                           {hw.isPublished ? 'Published' : 'Draft'}
                         </span>
                         <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded ${hw.isReleased ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                           {hw.isReleased ? 'Scores Released' : 'Scores Hidden'}
                         </span>
                       </div>
                     ) : studentSubmission && (
                       <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded ${hw.isReleased ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                         {hw.isReleased ? `Score: ${studentSubmission.score}/${hw.questions?.length || 0}` : 'Submitted'}
                       </span>
                     )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={14} /> 
                      Due: {hw.dueDate.toDate().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'Asia/Phnom_Penh' })}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">
                      {hw.dueDate.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Phnom_Penh' })} (ICT)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${
                    getTimeLeft(hw.dueDate.toDate()) === 'Overdue' 
                      ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    <Clock size={16} />
                    {getTimeLeft(hw.dueDate.toDate())}
                  </div>

                  {(isTeacher && !isPreviewMode) ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setViewingSubmissionsHw(hw)}
                        className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-400 hover:text-blue-700 transition-all font-semibold flex items-center justify-center min-w-[100px]"
                      >
                        <List size={16} className="mr-1" />
                        Scores
                      </button>
                      <button 
                        onClick={() => togglePublish(hw.id, hw.isPublished)}
                        className={`p-2 rounded-lg border transition-all ${hw.isPublished ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-200 hover:border-blue-400 hover:text-blue-600'}`}
                        title={hw.isPublished ? "Set to Draft" : "Publish Assignment"}
                      >
                        <LayoutGrid size={20} />
                      </button>
                      <button 
                        onClick={() => toggleRelease(hw.id, hw.isReleased)}
                        className={`p-2 rounded-lg border transition-all ${hw.isReleased ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-400 border-slate-200 hover:border-emerald-400 hover:text-emerald-600'}`}
                        title={hw.isReleased ? "Hide Scores" : "Release Scores"}
                      >
                        {hw.isReleased ? <CheckCircle size={20} /> : <Eye size={20} />}
                      </button>
                      <button 
                        onClick={() => deleteHomework(hw.id)}
                        className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:border-rose-400 hover:text-rose-600 transition-all bg-white"
                        title="Delete Assignment"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => !studentSubmission && setActiveHomework(hw)}
                      disabled={!!studentSubmission}
                      className={`px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all ${
                        studentSubmission 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none' 
                          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                      }`}
                    >
                      {studentSubmission ? (hw.isReleased ? 'Completed' : 'Submitted') : 'Start Task'}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

       {/* Add Modal */}
       {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <PenTool className="text-blue-600" />
              New Assignment
            </h2>
            <form onSubmit={addHomework} className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Assignment Title</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Sampling Lab Report"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 ring-blue-50 outline-none transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Due Date & Time</label>
                  <input 
                    type="datetime-local" 
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 ring-blue-50 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Max Points</label>
                  <input 
                    type="number" 
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 ring-blue-50 outline-none transition-all"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <input 
                  type="checkbox" 
                  id="useQuestionBank" 
                  checked={useQuestionBank}
                  onChange={(e) => setUseQuestionBank(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="useQuestionBank" className="text-sm font-semibold text-slate-700">
                  Populate with 20 Statistics Questions from Question Bank
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all font-mono text-xs uppercase"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

       {viewingSubmissionsHw && (
         <ViewSubmissionsModal homework={viewingSubmissionsHw} onClose={() => setViewingSubmissionsHw(null)} />
       )}
    </ChapterLayout>
  );
}

function ViewSubmissionsModal({ homework, onClose }: { homework: Homework, onClose: () => void }) {
  const [hwSubmissions, setHwSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const q = collection(db, `homeworks/${homework.id}/submissions`);
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => doc.data() as Submission);
      setHwSubmissions(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `homeworks/${homework.id}/submissions`);
    });
    return () => unsub();
  }, [homework.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <List className="text-blue-600" />
          Scores: {homework.title}
        </h2>
        <p className="text-slate-500 mb-6 text-sm">Total possible points: {homework.questions?.length || 0}</p>
        
        <div className="flex-1 overflow-y-auto space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {hwSubmissions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-400 font-medium">No submissions yet.</p>
            </div>
          ) : (
            hwSubmissions.map((sub, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-bold text-slate-800">{sub.studentName || 'Unknown Student'}</h4>
                  <p className="text-xs text-slate-500 mt-1 font-mono">{sub.submittedAt ? sub.submittedAt.toDate().toLocaleString('en-US', { timeZone: 'Asia/Phnom_Penh' }) : ''} (ICT)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-black text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                    {sub.score} / {homework.questions?.length || 0}
                  </div>
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-100">
                    {Math.round((sub.score / (homework.questions?.length || 1)) * 100)}%
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-95 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function TakeHomework({ homework, onCancel }: { homework: Homework, onCancel: () => void }) {
  const { user, profile } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    if (currentQuestion < homework.questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
    } else {
      // Final submission
      setIsSubmitting(true);
      try {
        let score = 0;
        homework.questions.forEach((q, idx) => {
          if (newAnswers[idx] === q.correctAnswer) {
            score += 1;
          }
        });

        await setDoc(doc(db, `homeworks/${homework.id}/submissions/${user?.uid}`), {
          studentId: user?.uid,
          studentName: profile?.displayName || user?.email || 'Unknown Student',
          answers: newAnswers,
          score,
          status: 'submitted',
          submittedAt: serverTimestamp()
        });
        setSubmitted(true);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `homeworks/${homework.id}/submissions`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <ChapterLayout title="Submission Received" subtitle={homework.title}>
        <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-200 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Well Done!</h2>
          <p className="text-slate-600 mb-10 max-w-sm mx-auto">
            Your homework has been submitted. Your teacher will release the scores once everyone has finished.
          </p>
          <button 
            onClick={onCancel}
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold transition-all active:scale-95"
          >
            Back to Dashboard
          </button>
        </div>
      </ChapterLayout>
    );
  }

  const q = homework.questions[currentQuestion];

  return (
    <ChapterLayout title={homework.title} subtitle={`Question ${currentQuestion + 1} of ${homework.questions.length}`}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-8">{q.question}</h2>
          <div className="space-y-3 mb-10">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-medium ${
                  selectedAnswer === idx 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button onClick={onCancel} className="text-slate-400 font-bold hover:text-slate-600 transition-colors">Quit</button>
            <button 
              onClick={handleNext}
              disabled={selectedAnswer === null || isSubmitting}
              className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : currentQuestion === homework.questions.length - 1 ? 'Finish Submission' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </ChapterLayout>
  );
}





