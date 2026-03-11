import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWebRTC } from '../../hooks/useWebRTC';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ShieldCheck } from 'lucide-react';

export const EntrepreneurMeetingRoom: React.FC = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { localVideoRef, stream, error } = useWebRTC();
  const [isMicOn, setIsMicOn] = React.useState(true);
  const [isVideoOn, setIsVideoOn] = React.useState(true);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col bg-slate-950 rounded-3xl overflow-hidden shadow-2xl">
      {/* Call Header */}
      <div className="p-4 bg-slate-900 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck size={18} className="text-green-500" />
          <span className="text-sm font-medium italic text-slate-400 underline">Secure Pitch Session: {meetingId}</span>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:p-6 bg-slate-950">
        {/* Remote View (Investor) */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
           <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-slate-800 rounded-full mx-auto flex items-center justify-center border border-slate-700">
                 <Video size={30} className="text-slate-600" />
              </div>
              <p className="text-slate-500 animate-pulse text-sm">Waiting for Investor to connect...</p>
           </div>
           <div className="absolute bottom-4 left-4 bg-black/40 px-3 py-1 rounded text-white text-[10px] uppercase tracking-widest font-bold">Investor</div>
        </div>

        {/* Local View (Entrepreneur) */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative shadow-2xl">
          <video ref={localVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover -scale-x-100 ${!isVideoOn ? 'hidden' : ''}`} />
          {!isVideoOn && <div className="h-full flex items-center justify-center text-slate-700 font-bold">CAMERA OFF</div>}
          <div className="absolute bottom-4 left-4 bg-indigo-600 text-white text-[10px] px-3 py-1 rounded uppercase tracking-widest font-bold">You (Founder)</div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 bg-slate-900/80 backdrop-blur-md flex justify-center gap-6">
        <button onClick={() => setIsMicOn(!isMicOn)} className={`p-5 rounded-2xl transition-all ${isMicOn ? 'bg-slate-800 text-slate-300' : 'bg-red-500 text-white'}`}>
          {isMicOn ? <Mic size={24}/> : <MicOff size={24}/>}
        </button>
        <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-5 rounded-2xl transition-all ${isVideoOn ? 'bg-slate-800 text-slate-300' : 'bg-red-500 text-white'}`}>
          {isVideoOn ? <Video size={24}/> : <VideoOff size={24}/>}
        </button>
        <button onClick={() => navigate('/meetings')} className="p-5 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
          <PhoneOff size={24}/>
        </button>
      </div>
    </div>
  );
};