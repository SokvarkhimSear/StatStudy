import { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { GraduationCap, KeyRound } from 'lucide-react';

export default function AuthPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCodeAuth = async (e: any) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    const formattedCode = code.trim().toLowerCase();
    const email = `${formattedCode}@camtutor.app`;
    const password = `camtutor-${formattedCode}`;

    setLoading(true);
    setError('');

    try {
      // 1. Try signing in first (if the code was already used)
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        // 2. User not found -> check if the code is valid in the database
        try {
          const codeDoc = await getDoc(doc(db, 'classCodes', formattedCode));
          
          if (!codeDoc.exists()) {
            setError('Invalid Code. Please make sure the code was added by your teacher.');
            setLoading(false);
            return;
          }

          // 3. Code is valid -> create the user account
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          
          // 4. Create the Firestore profile
          await setDoc(doc(db, 'users', userCred.user.uid), {
            code: formattedCode,
            role: 'student', // Default role is student unless teacher changes it directly in Firebase
            displayName: formattedCode.toUpperCase(),
            createdAt: new Date().toISOString()
          });

        } catch (dbErr: any) {
          setError(`Database error: ${dbErr.message}`);
        }
      } else {
        setError(err.message);
      }
    } finally {
      if (!error && loading) { // keep loading true if successful to prevent flashes
         setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">CAMTutor</h1>
          <p className="text-slate-500 mt-2">Enter your class code to continue.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-8">
          <form onSubmit={handleCodeAuth} className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Access Code" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 ring-blue-50 focus:border-blue-300 transition-all font-mono font-bold text-lg uppercase tracking-wider"
                required
              />
            </div>

            {error && <p className="text-rose-500 text-xs font-medium bg-rose-50 p-3 rounded-lg">{error}</p>}

            <button 
              type="submit" 
              disabled={loading || !code.trim()}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Enter Course'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
