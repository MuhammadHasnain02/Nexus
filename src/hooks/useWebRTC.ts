import { useEffect, useRef, useState } from 'react';

export const useWebRTC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function startMedia() {
      try {
        // Camera aur Mic access mangna
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          // video: {
          //   width: { ideal: 1280 },
          //   height: { ideal: 720 },
          //   facingMode: "user"
          // },
          video: true,
          audio: true
        });

        setStream(mediaStream);

        // Local video element mein stream set karna
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.warn(`Mic ke sath fail hua, ab sirf video try kar rahe hain... ${err}`);

        try {
          // Retry with only video
          const videoOnlyStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
          setStream(videoOnlyStream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = videoOnlyStream;
          }
          setError(null); // Error clear kar dein kyunki video mil gayi
        } catch (videoErr) {
          setError(`Camera access nahi mil saka. Please check permissions. ${videoErr}`);
        }

        // setError("Camera ya Microphone access nahi mil saka.");
        // console.error("Error accessing media devices:", err);

      }
    }

    startMedia();

    // Cleanup: Jab component unmount ho toh camera band kar dena
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return { localVideoRef, remoteVideoRef, stream, error };
};