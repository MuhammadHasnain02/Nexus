// import React, { useEffect, useRef, useState } from 'react';
// import { VideoControls } from './VideoControls';
// import { useParams } from 'react-router-dom';
// import { useMeetings } from '../../context/MeetingContext';
// import { useWebRTC } from '../../hooks/useWebRTC';
// import { AlertCircle } from 'lucide-react';

// export const VideoCallContainer: React.FC = () => {
//   const { meetingId } = useParams();
//   const { meetings } = useMeetings();

//   const { localVideoRef, stream, error } = useWebRTC();
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);

//   // Is meeting ki details nikaalte hain
//   const currentMeeting = meetings.find(m => m.id === meetingId);

//   useEffect(() => {
//     async function enableStream() {
//       try {
//         const mediaStream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         setStream(mediaStream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = mediaStream;
//         }
//       } catch (err) {
//         console.error("Camera access denied:", err);
//         alert("Please enable camera and microphone access to join the call.");
//       }
//     }
//     enableStream();

//     // Cleanup function: Jab user page se jaye to camera off ho jaye
//     return () => {
//       stream?.getTracks().forEach(track => track.stop());
//     };
//   }, []);

//     if (error) {
//         return (
//         <div className="flex items-center justify-center h-full bg-slate-900 text-white p-6">
//             <div className="text-center">
//                 <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
//                 <p className="text-lg font-semibold">{error}</p>
//                 <button 
//                     onClick={() => window.location.reload()} 
//                     className="mt-4 px-4 py-2 bg-blue-600 rounded-lg"
//                 >
//                     Retry
//                 </button>
//             </div>
//         </div>
//         );
//     }

//   return (
//     <div className="flex flex-col h-full bg-slate-950">
//       {/* Participant Grid */}
//       <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:p-6">
        
//         {/* Remote Participant View */}
//         <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
//           <div className="absolute top-4 left-4 z-10 bg-black/50 px-3 py-1 rounded text-white text-xs">
//             {/* ✅ Yahan dynamic naam dikhayenge */}
//             {currentMeeting ? currentMeeting.entrepreneurName : "Participant"} (Remote)
//           </div>
          
//           <div className="text-center">
//             <p className="text-slate-600 animate-pulse font-medium">
//               Waiting for {currentMeeting ? currentMeeting.entrepreneurName : "other participant"}...
//             </p>
//             {/* Milestone 3 ka message/response placeholder */}
//             <p className="text-slate-500 text-sm mt-2 italic">
//               "Connecting via WebRTC..."
//             </p>
//           </div>
//         </div>

//         {/* Local Person (Real Camera) */}
//         <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
//           <div className="absolute top-4 left-4 z-10 bg-black/50 px-3 py-1 rounded text-white text-xs">
//             You (Local)
//           </div>
//           <video
//             ref={localVideoRef}
//             autoPlay
//             playsInline
//             muted
//             className="w-full h-full object-cover scale-x-[-1]" // mirror effect
//           />
//         </div>
//       </div>

//       {/* Floating Controls */}
//       <div className="p-6 flex justify-center bg-gradient-to-t from-black/50 to-transparent">
//         <VideoControls stream={stream} />
//       </div>
//     </div>
//   );
// };

// ==================================

import React from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import { VideoControls } from './VideoControls';
import { AlertCircle } from 'lucide-react';

export const VideoCallContainer: React.FC = () => {
  const { localVideoRef, stream, error } = useWebRTC();

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-900 text-white p-6">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <p className="text-lg font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        
        {/* Remote View (Waiting State) */}
        <div className="relative bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center">
          <p className="text-slate-600 animate-pulse">Waiting for participant...</p>
        </div>

        {/* Local View (Your Camera) */}
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100" // Mirror effect
          />
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-white text-xs">
            You (Live)
          </div>
        </div>
      </div>

      <div className="p-6 flex justify-center">
        <VideoControls stream={stream} />
      </div>
    </div>
  );
};