import React from 'react';
import { VideoCallContainer } from '../../components/video/VideoCallContainer';

export const VideoMeeting: React.FC = () => {
  return (
    <div className="h-[calc(100vh-80px)] bg-gray-900 rounded-3xl overflow-hidden relative">
      <VideoCallContainer />
    </div>
  );
};