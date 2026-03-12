// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { User, Mail, Lock, CircleDollarSign, Building2, AlertCircle } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth.ts';
// import { Button } from '../../components/ui/Button';
// import { Input } from '../../components/ui/Input';
// import { UserRole } from '../../types';

// export const RegisterPage: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState<UserRole>('entrepreneur');
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { register } = useAuth();
//   const navigate = useNavigate();
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
    
//     // Validate passwords match
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       await register(name, email, password, role);
//       // Redirect based on user role
//       navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
//     } catch (err) {
//       setError((err as Error).message);
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="w-12 h-12 bg-primary-600 rounded-md flex items-center justify-center">
//             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
//               <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Join Business Nexus to connect with partners
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-4 bg-error-50 border border-error-500 text-error-700 px-4 py-3 rounded-md flex items-start">
//               <AlertCircle size={18} className="mr-2 mt-0.5" />
//               <span>{error}</span>
//             </div>
//           )}
          
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 I am registering as a
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   className={`py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
//                     role === 'entrepreneur'
//                       ? 'border-primary-500 bg-primary-50 text-primary-700'
//                       : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}
//                   onClick={() => setRole('entrepreneur')}
//                 >
//                   <Building2 size={18} className="mr-2" />
//                   Entrepreneur
//                 </button>
                
//                 <button
//                   type="button"
//                   className={`py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
//                     role === 'investor'
//                       ? 'border-primary-500 bg-primary-50 text-primary-700'
//                       : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}
//                   onClick={() => setRole('investor')}
//                 >
//                   <CircleDollarSign size={18} className="mr-2" />
//                   Investor
//                 </button>
//               </div>
//             </div>
            
//             <Input
//               label="Full name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               fullWidth
//               startAdornment={<User size={18} />}
//             />
            
//             <Input
//               label="Email address"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               fullWidth
//               startAdornment={<Mail size={18} />}
//             />
            
//             <Input
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               fullWidth
//               startAdornment={<Lock size={18} />}
//             />
            
//             <Input
//               label="Confirm password"
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               fullWidth
//               startAdornment={<Lock size={18} />}
//             />
            
//             <div className="flex items-center">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 required
//                 className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//               />
//               <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
//                 I agree to the{' '}
//                 <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
//                   Terms of Service
//                 </a>{' '}
//                 and{' '}
//                 <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
//                   Privacy Policy
//                 </a>
//               </label>
//             </div>
            
//             <Button
//               type="submit"
//               fullWidth
//               isLoading={isLoading}
//             >
//               Create account
//             </Button>
//           </form>
          
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Or</span>
//               </div>
//             </div>
            
//             <div className="mt-2 text-center">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CircleDollarSign, Building2, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.ts';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // 2FA states
  const [step, setStep] = useState<1 | 2>(1); // 1: Info, 2: OTP Verification
  const [otp, setOtp] = useState('');
  
  const { register, verify2FA } = useAuth();
  const navigate = useNavigate();

  // --- Password Strength Logic ---
  const [strength, setStrength] = useState({ score: 0, label: '', color: 'bg-gray-200' });

  useEffect(() => {
    let score = 0;
    if (password.length > 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-gray-200', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500'];
    
    setStrength({ score, label: labels[score], color: colors[score] });
  }, [password]);

  // --- Handlers ---
  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    // Note: Is step par hum backend/mock ko info bhejte hain aur wo OTP generate karta hai
    // Humne AuthContext mein register ko update kiya hai ke wo user ko 'pending' state mein le jaye
    try {
      await register(name, email, password, role);
      setStep(2); // Aglay step (OTP) par move karein
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await verify2FA(otp.trim());
      // Success! Redirect based on role
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch (err) {
      setError("Invalid OTP. Please try 123456");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
             <ShieldCheck className="text-white" size={28} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-slate-900 tracking-tight">
          {step === 1 ? 'Create account' : 'Security Verification'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          {step === 1 ? 'Join Business Nexus to connect with partners' : `We've sent a code to ${email}`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-10 px-8 shadow-xl shadow-slate-200/60 rounded-[2rem] border border-slate-100">
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-start animate-shake">
              <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {step === 1 ? (
            /* STEP 1: Registration Form */
            <form className="space-y-5" onSubmit={handleInfoSubmit}>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  I am registering as a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-xl border-2 flex items-center justify-center transition-all font-bold text-sm ${
                      role === 'entrepreneur'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                    }`}
                    onClick={() => setRole('entrepreneur')}
                  >
                    <Building2 size={18} className="mr-2" /> Entrepreneur
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-xl border-2 flex items-center justify-center transition-all font-bold text-sm ${
                      role === 'investor'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                    }`}
                    onClick={() => setRole('investor')}
                  >
                    <CircleDollarSign size={18} className="mr-2" /> Investor
                  </button>
                </div>
              </div>
              
              <Input
                label="Full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                className="rounded-xl border-slate-200"
                startAdornment={<User size={18} className="text-slate-400" />}
              />
              
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                className="rounded-xl border-slate-200"
                startAdornment={<Mail size={18} className="text-slate-400" />}
              />
              
              <div className="space-y-2">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  className="rounded-xl border-slate-200"
                  startAdornment={<Lock size={18} className="text-slate-400" />}
                />
                {/* PASSWORD STRENGTH METER */}
                <div className="flex gap-1 mt-2">
                   {[1, 2, 3, 4].map((i) => (
                     <div 
                      key={i} 
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= strength.score ? strength.color : 'bg-slate-100'}`} 
                     />
                   ))}
                </div>
                {password && (
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                    Strength: <span className="text-slate-600">{strength.label}</span>
                  </p>
                )}
              </div>
              
              <Input
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                className="rounded-xl border-slate-200"
                startAdornment={<Lock size={18} className="text-slate-400" />}
              />
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className="py-6 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-100 font-bold"
              >
                Create Account
              </Button>
            </form>
          ) : (
            /* STEP 2: 2FA Verification Form */
            <form className="space-y-6 animate-in zoom-in-95 duration-300" onSubmit={handleOtpVerify}>
               <div className="text-center">
                 <div className="inline-flex p-4 bg-emerald-50 rounded-full mb-4">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                 </div>
                 <p className="text-slate-600 text-sm leading-relaxed">
                   To keep your account secure, please enter the 6-digit code we sent.
                 </p>
               </div>

               <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase text-center tracking-widest">Verification Code</label>
                  <input 
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="0 0 0 0 0 0"
                    className="w-full text-center text-3xl font-black tracking-[1rem] py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:ring-0 outline-none transition-all"
                    required
                  />
                  <p className="text-center text-[10px] text-slate-400 italic mt-2">Hint: Use 123456 to verify</p>
               </div>

               <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className="py-6 bg-slate-900 hover:bg-black rounded-xl font-bold"
              >
                Verify & Finish
              </Button>

              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="w-full text-center text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors"
              >
                Go back to details
              </button>
            </form>
          )}
          
          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};