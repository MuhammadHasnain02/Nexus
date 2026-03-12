// // import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { MeetingProvider } from './context/MeetingContext';

// // Layouts
// import { DashboardLayout } from './components/layout/DashboardLayout';

// // Auth Pages
// import { LoginPage } from './pages/auth/LoginPage';
// import { RegisterPage } from './pages/auth/RegisterPage';

// // Dashboard Pages
// import { EntrepreneurDashboard } from './pages/dashboard/EntrepreneurDashboard';
// import { InvestorDashboard } from './pages/dashboard/InvestorDashboard';

// // Profile Pages
// import { EntrepreneurProfile } from './pages/profile/EntrepreneurProfile';
// import { InvestorProfile } from './pages/profile/InvestorProfile';

// // Feature Pages
// import { InvestorsPage } from './pages/investors/InvestorsPage';
// import { EntrepreneursPage } from './pages/entrepreneurs/EntrepreneursPage';
// import { MessagesPage } from './pages/messages/MessagesPage';
// import { NotificationsPage } from './pages/notifications/NotificationsPage';
// import { DocumentsPage } from './pages/documents/DocumentsPage';
// import { SchedulerPage } from './pages/entrepreneurs/scheduler/SchedulerPage';
// import { SettingsPage } from './pages/settings/SettingsPage';
// import { HelpPage } from './pages/help/HelpPage';
// import { DealsPage } from './pages/deals/DealsPage';
// // import { VideoMeeting } from './pages/video/VideoMeetingPage';
// import { EntrepreneurMeetings } from './pages/entrepreneurs/EntrepreneurMeetings';
// import { EntrepreneurMeetingRoom } from './pages/entrepreneurs/EntrepreneurMeetingRoom';

// // Chat Pages
// import { ChatPage } from './pages/chat/ChatPage';
// import { InvestorMeetings } from './pages/investors/InvestorMeetings';
// import { InvestorMeetingRoom } from './pages/investors/InvestorMeetingRoom';
// import { MeetingHub } from './pages/investors/MeetingHub';
// import { DocumentChamber } from './pages/shared/DocumentChamber';
// import { DocumentProvider } from './context/DocumentContext';
// import { PaymentHub } from './pages/payments/PaymentHub';
// import { PaymentProvider } from './context/PaymentContext';
// import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
// import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

// function App() {
//   return (
//     <AuthProvider>
//       <MeetingProvider>
//         <DocumentProvider>
//           <PaymentProvider>

//             <Router>

//               <Routes>
//                 {/* Authentication Routes (Public Routes) */}
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/register" element={<RegisterPage />} />
//                 <Route path="/forgot_password" element={<ForgotPasswordPage />} />
//                 <Route path="/reset_password" element={<ResetPasswordPage />} />
                
//                 {/* Protected Dashboard Routes */}
//                 <Route path="/dashboard" element={<DashboardLayout />}>
//                   <Route path="entrepreneur" element={<EntrepreneurDashboard />} />
//                   <Route path="investor" element={<InvestorDashboard />} />
//                 </Route>
                
//                 {/* Profile Routes */}
//                 <Route path="/profile" element={<DashboardLayout />}>
//                   <Route path="entrepreneur/:id" element={<EntrepreneurProfile />} />
//                   <Route path="investor/:id" element={<InvestorProfile />} />
//                 </Route>
                
//                 <Route path="/investors" element={<DashboardLayout />}>
//                   <Route index element={<InvestorsPage />} />
//                 </Route>
                
//                 <Route path="/entrepreneurs" element={<DashboardLayout />}>
//                   <Route index element={<EntrepreneursPage />} />
//                 </Route>
                
//                 <Route path="/messages" element={<DashboardLayout />}>
//                   <Route index element={<MessagesPage />} />
//                 </Route>
                
//                 <Route path="/notifications" element={<DashboardLayout />}>
//                   <Route index element={<NotificationsPage />} />
//                 </Route>
                
//                 <Route path="/documents" element={<DashboardLayout />}>
//                   <Route index element={<DocumentsPage />} />
//                 </Route>

//                 <Route path="/entrepreneurs/scheduler" element={<DashboardLayout />}>
//                   <Route index element={<SchedulerPage />} />
//                 </Route>

//                 <Route path="/investors/meetings" element={<DashboardLayout />}>
//                   <Route index element={<InvestorMeetings />} />
//                 </Route>

//                 <Route path="/investors/meeting_room" element={<DashboardLayout />}>
//                   <Route index element={<MeetingHub />} /> 
//                   <Route path="meeting/:meetingId" element={<InvestorMeetingRoom />} />
//                 </Route>

//                 <Route path="/entrepreneurs/meetings" element={<DashboardLayout />}>
//                   <Route index element={<EntrepreneurMeetings />} />
//                   <Route path="room/:meetingId" element={<EntrepreneurMeetingRoom />} />
//                 </Route>

//                 <Route path="/documents_chamber" element={<DashboardLayout />}>
//                   <Route index element={<MeetingHub />} /> 
//                   <Route path="meeting/:meetingId" element={<InvestorMeetingRoom />} />
//                 </Route>

//                 <Route path="/investor/documents_chamber" element={<DashboardLayout />} >
//                   <Route index element={<DocumentChamber role="investor" />} />
//                 </Route>

//                 <Route path="/entrepreneur/documents_chamber" element={<DashboardLayout />} >
//                   <Route index element={<DocumentChamber role="entrepreneur" />} />
//                 </Route>

//                 <Route path="/entrepreneurs/payments" element={<DashboardLayout />}>
//                   <Route index element={<PaymentHub role='entrepreneur' />} />
//                 </Route>

//                 <Route path="/investors/payments" element={<DashboardLayout />}>
//                   <Route index element={<PaymentHub role='investor' />} />
//                 </Route>

//                 <Route path="/settings" element={<DashboardLayout />}>
//                   <Route index element={<SettingsPage />} />
//                 </Route>

//                 <Route path="/help" element={<DashboardLayout />}>
//                   <Route index element={<HelpPage />} />
//                 </Route>

//                 <Route path="/deals" element={<DashboardLayout />}>
//                   <Route index element={<DealsPage />} />
//                 </Route>

//                 <Route path="/chat" element={<DashboardLayout />}>
//                   <Route index element={<ChatPage />} />
//                   <Route path=":userId" element={<ChatPage />} />
//                 </Route>

//                 {/* Redirect root to login */}
//                 <Route path="/" element={<Navigate to="/login" replace />} />

//                 {/* Catch all other routes and redirect to login */}
//                 <Route path="*" element={<Navigate to="/login" replace />} />
//               </Routes>

//             </Router>

//           </PaymentProvider>
//         </DocumentProvider>
//       </MeetingProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// ========================================================================

// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MeetingProvider } from './context/MeetingContext';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Dashboard Pages
import { EntrepreneurDashboard } from './pages/dashboard/EntrepreneurDashboard';
import { InvestorDashboard } from './pages/dashboard/InvestorDashboard';

// Profile Pages
import { EntrepreneurProfile } from './pages/profile/EntrepreneurProfile';
import { InvestorProfile } from './pages/profile/InvestorProfile';

// Feature Pages
import { InvestorsPage } from './pages/investors/InvestorsPage';
import { EntrepreneursPage } from './pages/entrepreneurs/EntrepreneursPage';
import { MessagesPage } from './pages/messages/MessagesPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { DocumentsPage } from './pages/documents/DocumentsPage';
import { SchedulerPage } from './pages/entrepreneurs/scheduler/SchedulerPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { HelpPage } from './pages/help/HelpPage';
import { DealsPage } from './pages/deals/DealsPage';
// import { VideoMeeting } from './pages/video/VideoMeetingPage';
import { EntrepreneurMeetings } from './pages/entrepreneurs/EntrepreneurMeetings';
import { EntrepreneurMeetingRoom } from './pages/entrepreneurs/EntrepreneurMeetingRoom';

// Chat Pages
import { ChatPage } from './pages/chat/ChatPage';
import { InvestorMeetings } from './pages/investors/InvestorMeetings';
import { InvestorMeetingRoom } from './pages/investors/InvestorMeetingRoom';
import { MeetingHub } from './pages/investors/MeetingHub';
import { DocumentChamber } from './pages/shared/DocumentChamber';
import { DocumentProvider } from './context/DocumentContext';
import { PaymentHub } from './pages/payments/PaymentHub';
import { PaymentProvider } from './context/PaymentContext';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <MeetingProvider>
        <DocumentProvider>
          <PaymentProvider>

            <Router>

              <Routes>
                {/* ========== Authentication Routes (Public Routes) ========== */}

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot_password" element={<ForgotPasswordPage />} />
                <Route path="/reset_password" element={<ResetPasswordPage />} />

                {/* ========== Protected Dashboard Routes ========== */}

                <Route path='/dashboard' element={<DashboardLayout />}>

                  {/* -------- 1. Entrepreneur Specific Pages -------- */}

                  <Route 
                    path="entrepreneur" 
                    element={
                      <ProtectedRoute allowedRoles={['entrepreneur']}>
                        <EntrepreneurDashboard />
                      </ProtectedRoute>
                    } 
                  />

                  <Route 
                    path="profile/entrepreneur/:id" 
                    element={
                      <ProtectedRoute allowedRoles={['entrepreneur']}>
                        <EntrepreneurProfile />
                      </ProtectedRoute>
                    } 
                  />

                  <Route 
                    path="investors" 
                    element={
                      <ProtectedRoute allowedRoles={['entrepreneur']}>
                        <InvestorsPage />
                      </ProtectedRoute>
                    } 
                  />

                  {/* -------- 2. Investor Specific Pages -------- */}

                  <Route 
                    path="investor" 
                    element={
                      <ProtectedRoute allowedRoles={['investor']}>
                        <InvestorDashboard />
                      </ProtectedRoute>
                    } 
                  />

                  <Route 
                    path="deals" 
                    element={
                      <ProtectedRoute allowedRoles={['investor']}>
                        <DealsPage />
                      </ProtectedRoute>
                    } 
                  />

                  <Route 
                    path="profile/investor/:id" 
                    element={
                      <ProtectedRoute allowedRoles={['investor']}>
                        <InvestorProfile />
                      </ProtectedRoute>
                    } 
                  />

                  <Route 
                    path="entrepreneurs" 
                    element={
                      <ProtectedRoute allowedRoles={['investor']}>
                        <EntrepreneursPage />
                      </ProtectedRoute>
                    } 
                  />

                </Route>

                <Route path="/documents" element={<DashboardLayout />}>
                  <Route index element={<DocumentsPage />} />
                </Route>

                <Route path="/entrepreneurs/scheduler" element={<DashboardLayout />}>
                  <Route index element={<SchedulerPage />} />
                </Route>

                <Route path="/investors/meetings" element={<DashboardLayout />}>
                  <Route index element={<InvestorMeetings />} />
                </Route>

                <Route path="/investors/meeting_room" element={<DashboardLayout />}>
                  <Route index element={<MeetingHub />} /> 
                  <Route path="meeting/:meetingId" element={<InvestorMeetingRoom />} />
                </Route>

                <Route path="/entrepreneurs/meetings" element={<DashboardLayout />}>
                  <Route index element={<EntrepreneurMeetings />} />
                  <Route path="room/:meetingId" element={<EntrepreneurMeetingRoom />} />
                </Route>

                <Route path="/documents_chamber" element={<DashboardLayout />}>
                  <Route index element={<MeetingHub />} /> 
                  <Route path="meeting/:meetingId" element={<InvestorMeetingRoom />} />
                </Route>

                <Route path="/investor/documents_chamber" element={<DashboardLayout />} >
                  <Route index element={<DocumentChamber role="investor" />} />
                </Route>

                <Route path="/entrepreneur/documents_chamber" element={<DashboardLayout />} >
                  <Route index element={<DocumentChamber role="entrepreneur" />} />
                </Route>

                <Route path="/entrepreneurs/payments" element={<DashboardLayout />}>
                  <Route index element={<PaymentHub role='entrepreneur' />} />
                </Route>

                <Route path="/investors/payments" element={<DashboardLayout />}>
                  <Route index element={<PaymentHub role='investor' />} />
                </Route>

                {/* ========== Common Protected Routes ========== */}

                <Route path="/messages" element={<DashboardLayout />}>
                  <Route 
                    index 
                    element={
                      <ProtectedRoute>
                        <MessagesPage />
                      </ProtectedRoute>
                    } 
                  />
                </Route>

                <Route path="/notifications" element={<DashboardLayout />}>
                  <Route 
                    index 
                    element={
                      <ProtectedRoute>
                        <NotificationsPage />
                      </ProtectedRoute>
                    } 
                  />
                </Route>

                <Route path="/chat" element={<DashboardLayout />}>
                  <Route 
                    index 
                    element={
                      <ProtectedRoute>
                        <ChatPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path=":userId" 
                    element={<ChatPage />} 
                  />
                </Route>

                <Route path="/settings" element={<DashboardLayout />}>
                  <Route 
                    index 
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    } 
                  />
                </Route>

                <Route path="/help" element={<DashboardLayout />}>
                  <Route 
                    index 
                    element={
                      <ProtectedRoute>
                        <HelpPage />
                      </ProtectedRoute>
                    } 
                  />
                </Route>

                {/* Redirect root to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Catch all other routes and redirect to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>

            </Router>

          </PaymentProvider>
        </DocumentProvider>
      </MeetingProvider>
    </AuthProvider>
  );
}

export default App;
