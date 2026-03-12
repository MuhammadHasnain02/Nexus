import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[]; // Konse roles allow hain? (e.g., ['investor'])
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const storedUser = localStorage.getItem('business_nexus_user');

  // 1. Agar abhi data load ho raha hai
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated && !storedUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Role-based Authorization check
  // Agar allowedRoles define hain aur user ki role un mein nahi hai

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // User ko unke apne sahi dashboard par redirect kar dein
    const redirectPath = user.role === 'entrepreneur' 
      ? '/dashboard/entrepreneur' 
      : '/dashboard/investor';
      
    return <Navigate to={redirectPath} replace />;
  }

  if (!user && storedUser) {
    return (
     <div className="min-h-screen flex items-center justify-center">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
     </div>
    );
  }
  // Sab theek hai? To page dikha dein
  return <>{children}</>;
};