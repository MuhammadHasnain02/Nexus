import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Meeting } from '../types';

interface MeetingContextType {
  meetings: Meeting[];
  bookMeeting: (meeting: Omit<Meeting, 'id' | 'status'>) => void;
  updateMeetingStatus: (id: string, status: 'accepted' | 'declined') => void;
  joinMeeting: (id: string) => void;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider = ({ children }: { children: ReactNode }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Seed Funding Discussion',
      entrepreneurName: 'Sarah Johnson',
      investorName: 'Michael Rodriguez',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      status: 'pending',
      isInvestorJoined: false
    }
  ]);

  // Nayi meeting book karne ka function
  const bookMeeting = (newMeeting: Omit<Meeting, 'id' | 'status'>) => {
    const meetingWithId: Meeting = {
      ...newMeeting,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
    };
    setMeetings((prev) => [...prev, meetingWithId]);
  };

  // Status update karne ka function (Accept/Decline)
  const updateMeetingStatus = (id: string, status: 'accepted' | 'declined') => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  // Is function ko Context mein add karein taake hum status update kar saken
  const joinMeeting = (id: string) => {
    setMeetings(prev => prev.map(m => 
      m.id === id ? { ...m, isInvestorJoined: true } : m
    ));
  };

  return (
    <MeetingContext.Provider value={{ meetings, bookMeeting, updateMeetingStatus , joinMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
};

// Custom Hook taake use karna aasaan ho
export const useMeetings = () => {
  const context = useContext(MeetingContext);
  if (!context) throw new Error('useMeetings must be used within a MeetingProvider');
  return context;
};