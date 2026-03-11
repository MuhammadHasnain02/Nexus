// import { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';

// export const SchedulerPage = () => {
//   const [userRole, setUserRole] = useState('Investor'); // Filhal manual set karein check karne ke liye

//   const handleSlotSelect = (info: any) => {
//     if (userRole === 'Investor') {
//       // Logic to add availability
//       console.log("Setting availability for: ", info.startStr);
//     } else {
//       // Logic to request meeting
//       console.log("Requesting meeting at: ", info.startStr);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Meeting Scheduler</h1>
//         {userRole === 'Investor' && (
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//             Set Bulk Availability
//           </button>
//         )}
//       </div>

//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//         <FullCalendar
//           plugins={[timeGridPlugin, interactionPlugin]}
//           initialView="timeGridWeek"
//           selectable={true}
//           select={handleSlotSelect}
//           slotMinTime="09:00:00"
//           slotMaxTime="20:00:00"
//           allDaySlot={false}
//           height="auto"
//         />
//       </div>
//     </div>
//   );
// };


// ============================================================


import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useMeetings } from '../../../context/MeetingContext';

// Mock list of investors
const investorsList = [
  { id: 'i1', name: 'Michael Rodriguez' },
  { id: 'i2', name: 'Jennifer Lee' },
  { id: 'i3', name: 'David Chen' },
  { id: 'i4', name: 'Rodriguez Jennifer' },
  { id: 'i5', name: 'Lee David' },
];

export const SchedulerPage = () => {
  const { meetings, bookMeeting } = useMeetings();
  const [userRole] = useState('Entrepreneur');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedInvestor, setSelectedInvestor] = useState(investorsList[0].name);

  const handleSlotSelect = (info: any) => {
    if (userRole === 'Entrepreneur') {
      setSelectedSlot(info);
      setIsModalOpen(true);
    }
  };

  const handleConfirmBooking = () => {

    if (meetingTitle.trim() && selectedSlot) {
      bookMeeting({
        title: meetingTitle,
        entrepreneurName: "Sarah Johnson", 
        investorName: selectedInvestor, 
        startTime: selectedSlot.startStr,
        endTime: selectedSlot.endStr,
      });
      
      // Cleanup
      setIsModalOpen(false);
      setMeetingTitle('');
      alert(`Request sent to ${selectedInvestor}!`);
    }

  };

  const calendarEvents = meetings.map(m => ({
    id: m.id,
    title: `${m.title} (${m.investorName})`,
    start: m.startTime,
    end: m.endTime,
    backgroundColor: m.status === 'accepted' ? '#10b981' : m.status === 'pending' ? '#f59e0b' : '#ef4444',
    borderColor: 'transparent'
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meeting Scheduler</h1>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">

        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          selectable={userRole === 'Entrepreneur'}
          select={handleSlotSelect}
          events={calendarEvents}
          slotMinTime="09:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          height="auto"
        />

      </div>

      {/* Booking Modal with Dropdown */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Book Meeting Slot</h2>
            
            <div className="space-y-4">
              {/* Investor Selection Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Investor</label>
                <select 
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={selectedInvestor}
                  onChange={(e) => setSelectedInvestor(e.target.value)}
                >
                  {investorsList.map(investor => (
                    <option key={investor.id} value={investor.name}>
                      {investor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Display */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="font-semibold text-sm text-blue-900 whitespace-nowrap">Selected:</span>
                  
                  <div className="overflow-x-auto scrollbar-hide whitespace-nowrap text-sm text-blue-800 cursor-grab active:cursor-grabbing">
                    {new Date(selectedSlot?.start).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })} 
                    <span className="mx-1 font-bold">→</span> 
                    {new Date(selectedSlot?.end).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
              </div>

              {/* Meeting Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Purpose</label>
                <input 
                  type="text" 
                  placeholder="What is this meeting about?"
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-400 placeholder:text-[15px]"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmBooking} 
                disabled={!meetingTitle}
                className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${
                  meetingTitle ? 'bg-blue-600 hover:bg-blue-700 shadow-md' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};