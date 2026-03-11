import { useMeetings } from '../../context/MeetingContext';

export const InvestorMeetings = () => {
  const { meetings, updateMeetingStatus } = useMeetings();

  // Filter meetings specifically for the logged-in Investor (e.g., Michael)
  const pendingRequests = meetings.filter(m => m.status === 'pending');
  const acceptedMeetings = meetings.filter(m => m.status === 'accepted');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Meeting Management</h1>

      {/* 1. Pending Requests Section */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          Pending Requests 
          <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
            {pendingRequests.length}
          </span>
        </h2>
        
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500 italic">No new requests at the moment.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingRequests.map((meeting) => (
              <div key={meeting.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900">{meeting.title}</h3>
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">Pending</span>
                </div>
                <p className="text-sm text-gray-600 mb-1 font-medium">From: {meeting.entrepreneurName}</p>
                <p className="text-xs text-gray-500 mb-4">
                  {new Date(meeting.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateMeetingStatus(meeting.id, 'accepted')}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => updateMeetingStatus(meeting.id, 'declined')}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Confirmed Meetings Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Confirmed Schedule</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Entrepreneur</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Topic</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Time</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {acceptedMeetings.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-800 font-medium">{m.entrepreneurName}</td>
                  <td className="p-4 text-sm text-gray-600">{m.title}</td>
                  <td className="p-4 text-sm text-gray-600">{new Date(m.startTime).toLocaleString()}</td>
                  <td className="p-4">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Confirmed</span>
                  </td>
                </tr>
              ))}
              {acceptedMeetings.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 text-sm">No confirmed meetings yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};