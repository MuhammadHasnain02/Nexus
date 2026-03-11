import React from 'react';
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

function App() {
  return (
    <AuthProvider>
      <MeetingProvider>
        <DocumentProvider>

          <Router>

            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="entrepreneur" element={<EntrepreneurDashboard />} />
                <Route path="investor" element={<InvestorDashboard />} />
              </Route>
              
              {/* Profile Routes */}
              <Route path="/profile" element={<DashboardLayout />}>
                <Route path="entrepreneur/:id" element={<EntrepreneurProfile />} />
                <Route path="investor/:id" element={<InvestorProfile />} />
              </Route>
              
              {/* Feature Routes */}
              <Route path="/investors" element={<DashboardLayout />}>
                <Route index element={<InvestorsPage />} />
              </Route>
              
              <Route path="/entrepreneurs" element={<DashboardLayout />}>
                <Route index element={<EntrepreneursPage />} />
              </Route>
              
              <Route path="/messages" element={<DashboardLayout />}>
                <Route index element={<MessagesPage />} />
              </Route>
              
              <Route path="/notifications" element={<DashboardLayout />}>
                <Route index element={<NotificationsPage />} />
              </Route>
              
              <Route path="/documents" element={<DashboardLayout />}>
                <Route index element={<DocumentsPage />} />
              </Route>

              <Route path="/scheduler" element={<DashboardLayout />}>
                <Route index element={<SchedulerPage />} />
              </Route>

              {/* <Route path="/meetings" element={<DashboardLayout />}>
                <Route index element={<InvestorMeetings />} />
              </Route> */}

              <Route path="/investors/meetings" element={<DashboardLayout />}>
                <Route index element={<InvestorMeetings />} />
              </Route>

              <Route path="/meeting_room" element={<DashboardLayout />}>
                <Route index element={<MeetingHub />} /> 
                <Route path="meeting/:meetingId" element={<InvestorMeetingRoom />} />
              </Route>

              <Route path="/founder_meetings" element={<DashboardLayout />}>
                <Route index element={<EntrepreneurMeetings />} />
                <Route path="room/:meetingId" element={<EntrepreneurMeetingRoom />} />
              </Route>

              <Route path="/documents_chamber" element={<DashboardLayout />}>
                <Route index element={<MeetingHub />} /> 
                <Route path="meeting/:meetingId" element={<InvestorMeetingRoom />} />
              </Route>

              {/* Investor Routes */}
              <Route path="/investor/documents_chamber" element={<DashboardLayout />} > {/* role="investor" */}
                <Route index element={<DocumentChamber role="investor" />} />
              </Route>

              {/* Entrepreneur Routes */}
              <Route path="/entrepreneur/documents_chamber" element={<DashboardLayout />} > {/* role="entrepreneur" */}
                <Route index element={<DocumentChamber role="entrepreneur" />} />
              </Route>

              <Route path="/settings" element={<DashboardLayout />}>
                <Route index element={<SettingsPage />} />
              </Route>
              
              <Route path="/help" element={<DashboardLayout />}>
                <Route index element={<HelpPage />} />
              </Route>
              
              <Route path="/deals" element={<DashboardLayout />}>
                <Route index element={<DealsPage />} />
              </Route>
              
              {/* Chat Routes */}
              <Route path="/chat" element={<DashboardLayout />}>
                <Route index element={<ChatPage />} />
                <Route path=":userId" element={<ChatPage />} />
              </Route>
              
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Catch all other routes and redirect to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

          </Router>

        </DocumentProvider>
      </MeetingProvider>
    </AuthProvider>
  );
}

export default App;