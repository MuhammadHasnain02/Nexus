// import React, { useState } from 'react';
// import { 
//   Mic, MicOff, Video, VideoOff, PhoneOff, 
//   Monitor, Settings, Users, MessageSquare 
// } from 'lucide-react';
// import { useWebRTC } from '../../hooks/useWebRTC'; // Jo hook humne pehle banaya tha
// import { Button } from '../../components/ui/Button';

// export const InvestorMeetingRoom: React.FC = () => {
//   const { localVideoRef, stream, error } = useWebRTC();
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isSharingScreen, setIsSharingScreen] = useState(false);

//   // Toggle Audio
//   const toggleAudio = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach(track => track.enabled = !isMicOn);
//       setIsMicOn(!isMicOn);
//     }
//   };

//   // Toggle Video
//   const toggleVideo = () => {
//     if (stream) {
//       stream.getVideoTracks().forEach(track => track.enabled = !isVideoOn);
//       setIsVideoOn(!isVideoOn);
//     }
//   };

//   // Screen Share (Frontend Mock)
//   const handleScreenShare = async () => {
//     try {
//       if (!isSharingScreen) {
//         // @ts-ignore
//         await navigator.mediaDevices.getDisplayMedia({ video: true });
//         setIsSharingScreen(true);
//       } else {
//         setIsSharingScreen(false);
//       }
//     } catch (err) {
//       console.error("Screen share error:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[calc(100vh-100px)] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      
//       {/* Top Header */}
//       <div className="bg-slate-900/50 p-4 border-b border-white/5 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
//           <h2 className="text-white font-medium text-sm">Meeting with: <span className="text-blue-400">Sarah (Entrepreneur)</span></h2>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" size="sm" className="text-xs py-1 border-white/10 text-white hover:bg-white/5">
//             <Users size={14} className="mr-2" /> 2 Participants
//           </Button>
//         </div>
//       </div>

//       {/* Main Video Grid */}
//       <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
//         {/* Remote Participant (Entrepreneur) */}
//         <div className="relative bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
//           <div className="text-center">
//             <div className="w-20 h-20 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg">S</div>
//             <p className="text-slate-500 font-medium">Waiting for Sarah to join...</p>
//           </div>
//           <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded text-white text-xs">Sarah Johnson</div>
//         </div>

//         {/* Local Participant (Investor - YOU) */}
//         <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
//           {error ? (
//             <div className="h-full flex items-center justify-center text-slate-500 text-sm p-4 text-center">
//               {error}
//             </div>
//           ) : (
//             <video
//               ref={localVideoRef}
//               autoPlay
//               playsInline
//               muted
//               className={`w-full h-full object-cover -scale-x-100 ${!isVideoOn ? 'hidden' : ''}`}
//             />
//           )}
          
//           {/* If Video is Off, show Avatar */}
//           {!isVideoOn && (
//             <div className="h-full flex items-center justify-center bg-slate-800">
//               <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center text-2xl font-bold text-slate-400">YOU</div>
//             </div>
//           )}
          
//           <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded text-white text-xs">You (Investor)</div>
//         </div>
//       </div>

//       {/* Video Call Controls */}
//       <div className="bg-slate-900/80 backdrop-blur-xl p-6 border-t border-white/5 flex justify-center items-center gap-4">
        
//         <button 
//           onClick={toggleAudio}
//           className={`p-4 rounded-2xl transition-all ${isMicOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}
//         >
//           {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
//         </button>

//         <button 
//           onClick={toggleVideo}
//           className={`p-4 rounded-2xl transition-all ${isVideoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}
//         >
//           {isVideoOn ? <Video size={22} /> : <VideoOff size={22} />}
//         </button>

//         <button 
//           onClick={handleScreenShare}
//           className={`p-4 rounded-2xl transition-all ${isSharingScreen ? 'bg-blue-500 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
//         >
//           <Monitor size={22} />
//         </button>

//         <div className="w-[1px] h-8 bg-white/10 mx-2" />

//         <button 
//           onClick={() => window.history.back()}
//           className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-900/20"
//         >
//           <PhoneOff size={22} />
//         </button>

//       </div>
//     </div>
//   );
// };

// import React, { useState } from 'react';
// import { Video, Check, X, Clock, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Button } from '../../components/ui/Button';
// import { useMeetings } from '../../context/MeetingContext';

// // Mock Data: Asal mein ye aapke context ya API se aayega
// // const initialMeetings = [
// //   { id: '1', startupName: 'TechFlow AI', status: 'pending', date: '2023-11-25', time: '10:00 AM' },
// //   { id: '2', startupName: 'GreenEnergy Solutions', status: 'approved', date: '2023-11-26', time: '02:00 PM' },
// //   { id: '3', startupName: 'HealthTrack', status: 'pending', date: '2023-11-27', time: '11:30 AM' },
// // ];

// export const InvestorMeetingRoom: React.FC = () => {
//   const { meetings as initialMeetings, updateMeetingStatus } = useMeetings();
//   const [meetings, setMeetings] = useState(initialMeetings);

//   const handleStatusUpdate = (id: string, newStatus: 'approved' | 'declined') => {
//     setMeetings(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
//   };

//   const pendingMeetings = meetings.filter(m => m.status === 'pending');
//   const approvedMeetings = meetings.filter(m => m.status === 'approved');

//   return (
//     <div className="space-y-8 p-6">
      
//       {/* 1. Pending Requests Section */}
//       <section>
//         <div className="flex items-center gap-2 mb-4">
//           <Clock className="text-amber-500" size={20} />
//           <h3 className="text-lg font-bold text-slate-800">New Meeting Requests</h3>
//         </div>
        
//         <div className="grid gap-4">
//           {pendingMeetings.length > 0 ? pendingMeetings.map(meeting => (
//             <div key={meeting.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
//                   {meeting.startupName[0]}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-slate-900">{meeting.startupName}</h4>
//                   <p className="text-xs text-slate-500">{meeting.date} at {meeting.time}</p>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button 
//                   onClick={() => handleStatusUpdate(meeting.id, 'approved')}
//                   className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
//                 >
//                   <Check size={18} />
//                 </button>
//                 <button 
//                   onClick={() => handleStatusUpdate(meeting.id, 'declined')}
//                   className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>
//             </div>
//           )) : (
//             <p className="text-sm text-slate-400 italic">No new requests</p>
//           )}
//         </div>
//       </section>

//       {/* 2. Confirmed Meetings Section (With Join Button) */}
//       <section>
//         <div className="flex items-center gap-2 mb-4">
//           <Calendar className="text-blue-500" size={20} />
//           <h3 className="text-lg font-bold text-slate-800">Confirmed Meetings</h3>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2">
//           {approvedMeetings.length > 0 ? approvedMeetings.map(meeting => (
//             <div key={meeting.id} className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 p-5 rounded-2xl shadow-sm relative overflow-hidden">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h4 className="font-bold text-slate-900 text-lg">{meeting.startupName}</h4>
//                   <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{meeting.time}</span>
//                 </div>
//                 <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
//                   <Video size={20} />
//                 </div>
//               </div>

//               {/* ✅ Join Call Button - Only for Approved */}
//               <Link to={`/investor/meeting/${meeting.id}`}>
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-2.5">
//                   <Video size={18} />
//                   Join Call
//                 </Button>
//               </Link>
//             </div>
//           )) : (
//             <p className="text-sm text-slate-400 italic">No confirmed meetings yet</p>
//           )}
//         </div>
//       </section>

//     </div>
//   );
// };

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWebRTC } from '../../hooks/useWebRTC';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Monitor } from 'lucide-react';

export const InvestorMeetingRoom: React.FC = () => {
  // const { meetingId } = useParams();
  const navigate = useNavigate();
  const { localVideoRef, stream, error } = useWebRTC();
  const [isMicOn, setIsMicOn] = React.useState(true);
  const [isVideoOn, setIsVideoOn] = React.useState(true);

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
    <div className="h-[calc(100vh-120px)] flex flex-col bg-slate-950 rounded-3xl overflow-hidden border border-slate-800">
      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center">
           <p className="text-slate-600 animate-pulse">Waiting for entrepreneur...</p>
        </div>
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative">
          <video ref={localVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover -scale-x-100 ${!isVideoOn ? 'hidden' : ''}`} />
          {!isVideoOn && <div className="h-full flex items-center justify-center text-slate-500 font-bold text-2xl">CAMERA OFF</div>}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">You (Investor)</div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-6 bg-slate-900/50 border-t border-white/5 flex justify-center gap-4">
        <button onClick={toggleMic} className={`p-4 rounded-xl ${isMicOn ? 'bg-slate-800' : 'bg-red-500 text-white'}`}><Mic size={20}/></button>
        <button onClick={toggleVideo} className={`p-4 rounded-xl ${isVideoOn ? 'bg-slate-800' : 'bg-red-500 text-white'}`}><Video size={20}/></button>
        <button className="p-4 bg-slate-800 rounded-xl text-white"><Monitor size={20}/></button>
        <button onClick={() => navigate('/dashboard/investors/meeting_room')} className="p-4 bg-red-600 text-white rounded-xl"><PhoneOff size={20}/></button>
      </div>
    </div>
  );
};