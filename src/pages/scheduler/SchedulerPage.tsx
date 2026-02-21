import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const SchedulerPage = () => {
  const [userRole, setUserRole] = useState('Investor'); // Filhal manual set karein check karne ke liye

  const handleSlotSelect = (info: any) => {
    if (userRole === 'Investor') {
      // Logic to add availability
      console.log("Setting availability for: ", info.startStr);
    } else {
      // Logic to request meeting
      console.log("Requesting meeting at: ", info.startStr);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meeting Scheduler</h1>
        {userRole === 'Investor' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Set Bulk Availability
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          selectable={true}
          select={handleSlotSelect}
          slotMinTime="09:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          height="auto"
        />
      </div>
    </div>
  );
};
