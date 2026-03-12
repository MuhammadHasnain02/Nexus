import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Calendar, Clock, User, XCircle, Clock3 } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const EntrepreneurMeetings: React.FC = () => {
  const { meetings, joinMeeting } = useMeetings();
  const navigate = useNavigate()

  const handleReceiveCall = (id: string) => {
    joinMeeting(id);
    navigate(`/dashboard/entrepreneurs/meeting_room/meeting/${id}`);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Meeting Requests</h1>
          <p className="text-slate-500">Track and join your scheduled investor pitches.</p>
        </div>
      </div>

      <div className="space-y-4">
        {meetings.length > 0 ? (

          meetings.map((meeting) => {
            const isJoined = meeting.isInvestorJoined;

            return (

              <Card key={meeting.id} className="border-none shadow-sm bg-white overflow-hidden">
                <CardBody className="p-0">
                  <div className="flex flex-col md:flex-row items-stretch">
                    
                    {/* Status Indicator Bar */}
                    <div className={`w-2 ${
                      meeting.status === 'accepted' ? 'bg-green-500' : 
                      meeting.status === 'declined' ? 'bg-red-500' : 'bg-amber-400'
                    }`} />

                    <div className="flex-1 p-5 flex flex-col md:flex-row justify-between items-center gap-6">
                      {/* Investor Info */}
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                          <User size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{meeting.title}</h3>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            with <span className="font-medium text-slate-700">{meeting.investorName || "Potential Investor"}</span>
                          </p>
                        </div>
                      </div>

                      {/* Schedule Info */}
                      <div className="flex items-center gap-6 text-sm text-slate-600 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-slate-400" />
                          {new Date(meeting.startTime).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-slate-400" />
                          {new Date(meeting.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                        <Badge variant={
                          meeting.status === 'accepted' ? 'success' : 
                          meeting.status === 'declined' ? 'danger' : 'warning'
                        }>
                          {meeting.status.toUpperCase()}
                        </Badge>

                        {/* ✅ ENABLE BUTTON ONLY IF STATUS IS 'ACCEPTED' */}
                        {meeting.status === 'accepted' ? (
                          // <Link 
                          //   onClick={(e) => !isJoined && e.preventDefault()}
                          //   to={`/founder_meetings/room/${meeting.id}`}
                          // >
                            
                            <Button size="sm" disabled={!isJoined} onClick={() => handleReceiveCall(meeting.id)}
                              // className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
                              className={`${isJoined ? 'bg-indigo-600' : 'bg-slate-400 opacity-50 cursor-not-allowed'}`}>
                              <Video size={16} />
                                {isJoined ? "Receive Call" : "Waiting for Investor..."}
                            </Button>

                          // </Link>
                        ) : (
                          <div className="p-2 text-slate-400">
                            {meeting.status === 'pending' ? (
                              <Clock3 size={20} title="Awaiting Approval" />
                            ) : (
                              <XCircle size={20} title="Rejected" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
            )
          })

        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No meetings scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};