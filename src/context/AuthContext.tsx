// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { User, UserRole, AuthContextType } from '../types';
// import { users } from '../data/users';
// import toast from 'react-hot-toast';

// // Create Auth Context
// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Local storage keys
// const USER_STORAGE_KEY = 'business_nexus_user';
// const RESET_TOKEN_KEY = 'business_nexus_reset_token';

// // Auth Provider Component
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Check for stored user on initial load
//   useEffect(() => {
//     const storedUser = localStorage.getItem(USER_STORAGE_KEY);
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   // Mock login function - in a real app, this would make an API call
//   const login = async (email: string, password: string, role: UserRole): Promise<void> => {
//     setIsLoading(true);
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Find user with matching email and role
//       const foundUser = users.find(u => u.email === email && u.role === role);
      
//       if (foundUser) {
//         setUser(foundUser);
//         localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(foundUser));
//         toast.success('Successfully logged in!');
//       } else {
//         throw new Error('Invalid credentials or user not found');
//       }
//     } catch (error) {
//       toast.error((error as Error).message);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Mock register function - in a real app, this would make an API call
//   const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
//     setIsLoading(true);
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Check if email already exists
//       if (users.some(u => u.email === email)) {
//         throw new Error('Email already in use');
//       }
      
//       // Create new user
//       const newUser: User = {
//         id: `${role[0]}${users.length + 1}`,
//         name,
//         email,
//         role,
//         avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
//         bio: '',
//         isOnline: true,
//         createdAt: new Date().toISOString()
//       };
      
//       // Add user to mock data
//       users.push(newUser);
      
//       setUser(newUser);
//       localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
//       toast.success('Account created successfully!');
//     } catch (error) {
//       toast.error((error as Error).message);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Mock forgot password function
//   const forgotPassword = async (email: string): Promise<void> => {
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Check if user exists
//       const user = users.find(u => u.email === email);
//       if (!user) {
//         throw new Error('No account found with this email');
//       }
      
//       // Generate reset token (in a real app, this would be a secure token)
//       const resetToken = Math.random().toString(36).substring(2, 15);
//       localStorage.setItem(RESET_TOKEN_KEY, resetToken);
      
//       // In a real app, this would send an email
//       toast.success('Password reset instructions sent to your email');
//     } catch (error) {
//       toast.error((error as Error).message);
//       throw error;
//     }
//   };

//   // Mock reset password function
//   const resetPassword = async (token: string, newPassword: string): Promise<void> => {
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Verify token
//       const storedToken = localStorage.getItem(RESET_TOKEN_KEY);
//       if (token !== storedToken) {
//         throw new Error('Invalid or expired reset token');
//       }
      
//       // In a real app, this would update the user's password in the database
//       localStorage.removeItem(RESET_TOKEN_KEY);
//       toast.success('Password reset successfully');
//     } catch (error) {
//       toast.error((error as Error).message);
//       throw error;
//     }
//   };

//   // Logout function
//   const logout = (): void => {
//     setUser(null);
//     localStorage.removeItem(USER_STORAGE_KEY);
//     toast.success('Logged out successfully');
//   };

//   // Update user profile
//   const updateProfile = async (userId: string, updates: Partial<User>): Promise<void> => {
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Update user in mock data
//       const userIndex = users.findIndex(u => u.id === userId);
//       if (userIndex === -1) {
//         throw new Error('User not found');
//       }
      
//       const updatedUser = { ...users[userIndex], ...updates };
//       users[userIndex] = updatedUser;
      
//       // Update current user if it's the same user
//       if (user?.id === userId) {
//         setUser(updatedUser);
//         localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
//       }
      
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       toast.error((error as Error).message);
//       throw error;
//     }
//   };

//   const value = {
//     user,
//     login,
//     register,
//     logout,
//     forgotPassword,
//     resetPassword,
//     updateProfile,
//     isAuthenticated: !!user,
//     isLoading
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '../types';
import { users } from '../data/users';
import toast from 'react-hot-toast';

// Create Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage keys
const USER_STORAGE_KEY = 'business_nexus_user';
const RESET_TOKEN_KEY = 'business_nexus_reset_token';

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // NEW: 2FA ke liye temporary state
  const [pendingUser, setPendingUser] = useState<User | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // STEP 1: Check Credentials (Password & Email)
  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email and role
      const foundUser = users.find(u => u.email === email && u.role === role);
      
      if (foundUser) {
        // ACTUAL CHANGE: Direct login ke bajaye user ko "Pending" state mein rakhein 2FA ke liye
        setPendingUser(foundUser);
        toast.success('Credentials verified. Please enter OTP.');
      } else {
        throw new Error('Invalid credentials or user not found');
      }
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Verify 2FA (OTP)
  const verify2FA = async (otp: string): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Mock network delay
      
      // Mock OTP Validation (Hum 123456 ko valid OTP maan rahe hain)
      if (otp === '123456') {
        if (pendingUser) {
          setUser(pendingUser); // Finalize login
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(pendingUser));
          setPendingUser(null); // Clear pending state
          toast.success('Successfully logged in!');
        } else {
          throw new Error('Session expired. Please login again.');
        }
      } else {
        throw new Error('Invalid OTP code. Try 123456');
      }
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (users.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      const newUser: User = {
        id: `${role[0]}${users.length + 1}`,
        name,
        email,
        role,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        bio: '',
        isOnline: true,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      setPendingUser(newUser);
      // setUser(newUser);
      
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock forgot password function
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = users.find(u => u.email === email);
      if (!user) throw new Error('No account found with this email');
      
      const resetToken = Math.random().toString(36).substring(2, 15);
      localStorage.setItem(RESET_TOKEN_KEY, resetToken);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  // Mock reset password function
  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const storedToken = localStorage.getItem(RESET_TOKEN_KEY);
      if (token !== storedToken) throw new Error('Invalid or expired reset token');
      
      localStorage.removeItem(RESET_TOKEN_KEY);
      toast.success('Password reset successfully');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  // Logout function
  const logout = (): void => {
    setUser(null);
    setPendingUser(null); // Ensure pending is cleared on logout
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success('Logged out successfully');
  };

  // Update user profile
  const updateProfile = async (userId: string, updates: Partial<User>): Promise<void> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) throw new Error('User not found');
      
      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;
      
      if (user?.id === userId) {
        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const value = {
    user,
    pendingUser, // Nayi state
    login,
    verify2FA,   // Naya function
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value as any}>{children}</AuthContext.Provider>;
};
