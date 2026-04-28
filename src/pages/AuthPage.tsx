import { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { GraduationCap, KeyRound, User, Mail, Lock, School } from 'lucide-react';

export default function AuthPage() {
  const [isTeacher, setIsTeacher] = useState(false);
  const [name, setName] = useState('');
  const [studentEmailValue, setStudentEmailValue] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStudentAuth = async (e: any) => {
    e.preventDefault();
    if (!code.trim() || !name.trim() || !studentEmailValue.trim()) return;
    
    const formattedCode = code.trim().toLowerCase();
    const studentEmail = studentEmailValue.trim().toLowerCase();
    const studentPassword = `camtutor-${formattedCode}`;

    setLoading(true);
    setError('');

    try {
      // 1. Try signing in first (with the new format)
      let needsCreation = false;
      try {
        await signInWithEmailAndPassword(auth, studentEmail, studentPassword);
        return; // Success
      } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          // Fallback to old format (for existing accounts like the teacher if they try student login)
          const legacyEmail = `${formattedCode}@camtutor.app`;
          const legacyPassword = `camtutor-${formattedCode}`;
          try {
            await signInWithEmailAndPassword(auth, legacyEmail, legacyPassword);
            return; // Success with legacy format
          } catch (legacyErr: any) {
            if (legacyErr.code === 'auth/user-not-found' || legacyErr.code === 'auth/invalid-credential') {
               needsCreation = true;
            } else {
               throw legacyErr;
            }
          }
        } else {
           throw err; // Re-throw if it's a different error
        }
      }

      if (needsCreation) {
        // 2. User not found -> check if the code is valid in the database
        const codeDoc = await getDoc(doc(db, 'classCodes', formattedCode));
        
        if (!codeDoc.exists()) {
          setError('Invalid Code. Please make sure the code was added by your teacher.');
          setLoading(false);
          return;
        }

        // 3. Code is valid -> create the user account
        const userCred = await createUserWithEmailAndPassword(auth, studentEmail, studentPassword);
        
        // 4. Create the Firestore profile
        await setDoc(doc(db, 'users', userCred.user.uid), {
          code: formattedCode,
          role: 'student', // Default role is student unless teacher changes it directly in Firebase
          displayName: name.trim(),
          createdAt: new Date().toISOString()
        });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      if (!error && loading) { // keep loading true if successful to prevent flashes
         setLoading(false);
      }
    }
  };

  const handleTeacherAuth = async (e: any) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      setError(err.message || 'An error occurred during teacher login.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">CAMTutor</h1>
          <p className="text-slate-500 mt-2">Sign in to continue.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => { setIsTeacher(false); setError(''); }}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${!isTeacher ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Student
            </button>
            <button
              onClick={() => { setIsTeacher(true); setError(''); }}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${isTeacher ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Teacher
            </button>
          </div>

          <div className="p-8">
            {!isTeacher ? (
              <form onSubmit={handleStudentAuth} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 ring-blue-50 focus:border-blue-300 transition-all font-medium text-lg text-slate-900"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={studentEmailValue}
                    onChange={(e) => setStudentEmailValue(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 ring-blue-50 focus:border-blue-300 transition-all font-medium text-lg text-slate-900"
                    required
                  />
                </div>
                
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
                  disabled={loading || !code.trim() || !name.trim() || !studentEmailValue.trim()}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Enter Course'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleTeacherAuth} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 ring-blue-50 focus:border-blue-300 transition-all font-medium text-lg text-slate-900"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 ring-blue-50 focus:border-blue-300 transition-all font-medium text-lg text-slate-900"
                    required
                  />
                </div>

                {error && <p className="text-rose-500 text-xs font-medium bg-rose-50 p-3 rounded-lg">{error}</p>}

                <button 
                  type="submit" 
                  disabled={loading || !email.trim() || !password.trim()}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign In as Teacher'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
