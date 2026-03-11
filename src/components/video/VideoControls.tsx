import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props { stream: MediaStream | null; }

export const VideoControls: React.FC<Props> = ({ stream }) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const navigate = useNavigate();

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => track.enabled = !isMicOn);
      setIsMicOn(!isMicOn);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => track.enabled = !isVideoOn);
      setIsVideoOn(!isVideoOn);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-slate-900/90 border border-white/10 p-3 rounded-2xl shadow-2xl backdrop-blur-md">
      <button onClick={toggleMic} className={`p-4 rounded-xl ${isMicOn ? 'bg-slate-800 text-white' : 'bg-red-500 text-white'}`}>
        {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
      </button>
      
      <button onClick={toggleVideo} className={`p-4 rounded-xl ${isVideoOn ? 'bg-slate-800 text-white' : 'bg-red-500 text-white'}`}>
        {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
      </button>

      <button 
        onClick={() => {
          stream?.getTracks().forEach(t => t.stop());
          navigate(-1); // Back to dashboard
        }} 
        className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-transform hover:scale-105"
      >
        <PhoneOff size={20} />
      </button>
    </div>
  );
};