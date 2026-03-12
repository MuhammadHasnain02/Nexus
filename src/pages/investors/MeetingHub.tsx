import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Video, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const MeetingHub: React.FC = () => {
  const { meetings , joinMeeting } = useMeetings();
  const navigate = useNavigate()

  const handleJoin = (id: string) => {
    joinMeeting(id); // Context ke zariye signal bhejein
    navigate(`/investors/meeting_room/meeting/${id}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meeting Room Hub</h1>
        <p className="text-gray-600">Manage your schedules and join active sessions.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <Card key={meeting.id} className="overflow-hidden border-l-4 shadow-sm hover:shadow-md transition-shadow" 
              style={{ borderLeftColor: meeting.status === 'accepted' ? '#10b981' : meeting.status === 'declined' ? '#ef4444' : '#f59e0b' }}>
              <CardBody className="p-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  
                  {/* Left Side: Meeting Info */}
                  <div className="flex gap-4 items-center">
                    <div className={`p-3 rounded-full ${
                      meeting.status === 'accepted' ? 'bg-green-100 text-green-600' : 
                      meeting.status === 'declined' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {meeting.status === 'accepted' ? <CheckCircle2 size={24} /> : 
                       meeting.status === 'declined' ? <XCircle size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{meeting.title}</h3>
                      <p className="text-sm text-gray-500">With {meeting.entrepreneurName}</p>
                      <div className="flex gap-3 mt-1">
                         <span className="flex items-center text-xs text-gray-400 gap-1"><Calendar size={12}/> {new Date(meeting.startTime).toLocaleDateString()}</span>
                         <span className="flex items-center text-xs text-gray-400 gap-1"><Clock size={12}/> {new Date(meeting.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Status & Action */}
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <Badge variant={meeting.status === 'accepted' ? 'success' : meeting.status === 'declined' ? 'danger' : 'warning'}>
                      {meeting.status.toUpperCase()}
                    </Badge>

                    {/* ✅ ONLY SHOW BUTTON IF ACCEPTED */}
                    {meeting.status === 'accepted' ? (
                      // <Link to={`/investors/meeting_room/meeting/${meeting.id}`}>
                        <Button variant="primary" size="sm" onClick={() => handleJoin(meeting.id)}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                          <Video size={16} />
                          Join Call
                        </Button>
                      // {/* </Link> */}
                    ) : (
                      <div className="text-xs text-gray-400 italic">
                        {meeting.status === 'pending' ? 'Waiting for approval' : 'Meeting cancelled'}
                      </div>
                    )}
                  </div>

                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No meeting requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
};