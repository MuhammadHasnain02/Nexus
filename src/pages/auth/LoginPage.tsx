// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { User, CircleDollarSign, Building2, LogIn, AlertCircle } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth.ts';
// import { Button } from '../../components/ui/Button';
// import { Input } from '../../components/ui/Input';
// import { UserRole } from '../../types';

// export const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<UserRole>('entrepreneur');
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { login } = useAuth();
//   const navigate = useNavigate();
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);
    
//     try {
//       await login(email, password, role);
//       // Redirect based on user role
//       navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
//     } catch (err) {
//       setError((err as Error).message);
//       setIsLoading(false);
//     }
//   };
  
//   // For demo purposes, pre-filled credentials
//   const fillDemoCredentials = (userRole: UserRole) => {
//     if (userRole === 'entrepreneur') {
//       setEmail('sarah@techwave.io');
//       setPassword('password123');
//     } else {
//       setEmail('michael@vcinnovate.com');
//       setPassword('password123');
//     }
//     setRole(userRole);
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
//           Sign in to Business Nexus
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Connect with investors and entrepreneurs
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
//                 I am a
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
//               label="Email address"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               fullWidth
//               startAdornment={<User size={18} />}
//             />
            
//             <Input
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               fullWidth
//             />
            
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <Link to={'/forgot_password'} className="font-medium text-primary-600 hover:text-primary-500">
//                   Forgot your password?
//                 </Link>
//               </div>
//             </div>
            
//             <Button
//               type="submit"
//               fullWidth
//               isLoading={isLoading}
//               leftIcon={<LogIn size={18} />}
//             >
//               Sign in
//             </Button>
//           </form>
          
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
//               </div>
//             </div>
            
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <Button
//                 variant="outline"
//                 onClick={() => fillDemoCredentials('entrepreneur')}
//                 leftIcon={<Building2 size={16} />}
//               >
//                 Entrepreneur Demo
//               </Button>
              
//               <Button
//                 variant="outline"
//                 onClick={() => fillDemoCredentials('investor')}
//                 leftIcon={<CircleDollarSign size={16} />}
//               >
//                 Investor Demo
//               </Button>
//             </div>
//           </div>
          
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
//                 Don't have an account?{' '}
//                 <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CircleDollarSign, Building2, LogIn, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.ts';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Nayi 2FA States
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState('');
  
  const { login, verify2FA } = useAuth();
  const navigate = useNavigate();
  
  // Step 1: Check Credentials
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await login(email, password, role);
      setStep(2); // Credentials theek hone par OTP screen dikhayein
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await verify2FA(otp.trim());
      // OTP theek hone par Dashboard par bhej dein
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch (err) {
      setError((err as Error).message || "Invalid OTP. Please try 123456");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Demo credentials
  const fillDemoCredentials = (userRole: UserRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${step === 1 ? 'bg-primary-600 shadow-primary-200' : 'bg-indigo-600 shadow-indigo-200'}`}>
            {step === 1 ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <ShieldCheck className="text-white" size={28} />
            )}
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {step === 1 ? 'Sign in to Business Nexus' : 'Two-Factor Authentication'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 1 ? 'Connect with investors and entrepreneurs' : 'Enter the security code to continue'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle size={18} className="mr-2 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          {step === 1 ? (
            /* STEP 1: Login Form */
            <>
              <form className="space-y-6" onSubmit={handleCredentialsSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    I am a
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className={`py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
                        role === 'entrepreneur'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setRole('entrepreneur')}
                    >
                      <Building2 size={18} className="mr-2" />
                      Entrepreneur
                    </button>
                    
                    <button
                      type="button"
                      className={`py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
                        role === 'investor'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setRole('investor')}
                    >
                      <CircleDollarSign size={18} className="mr-2" />
                      Investor
                    </button>
                  </div>
                </div>
                
                <Input
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  startAdornment={<User size={18} />}
                />
                
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to={'/forgot_password'} className="font-medium text-primary-600 hover:text-primary-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  leftIcon={<LogIn size={18} />}
                >
                  Sign in
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => fillDemoCredentials('entrepreneur')}
                    leftIcon={<Building2 size={16} />}
                  >
                    Entrepreneur Demo
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => fillDemoCredentials('investor')}
                    leftIcon={<CircleDollarSign size={16} />}
                  >
                    Investor Demo
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* STEP 2: 2FA OTP Form */
            <form className="space-y-6 animate-in zoom-in-95 duration-300" onSubmit={handleOtpVerify}>
               <div className="text-center">
                 <div className="inline-flex p-4 bg-emerald-50 rounded-full mb-4">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                 </div>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   We've sent a temporary login code to <strong>{email}</strong>.
                 </p>
               </div>

               <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase text-center tracking-widest">Verification Code</label>
                  <input 
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="0 0 0 0 0 0"
                    className="w-full text-center text-3xl font-black tracking-[1rem] py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-0 outline-none transition-all"
                    required
                  />
                  <p className="text-center text-[10px] text-gray-400 italic mt-2">Hint: Use 123456 to verify</p>
               </div>

               <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className="py-4 font-bold"
              >
                Verify & Login
              </Button>

              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="w-full text-center text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors"
              >
                Cancel and return to login
              </button>
            </form>
          )}
          
          {step === 1 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
