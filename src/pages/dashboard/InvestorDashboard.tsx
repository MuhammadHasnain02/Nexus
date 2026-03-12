import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle, Calendar, Bell, TrendingUp, Clock, CheckCircle2, ChevronRight, Video } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../hooks/useAuth.ts';
// import { Entrepreneur } from '../../types';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';
import { useMeetings } from '../../context/MeetingContext';

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const { meetings } = useMeetings();
  
  if (!user) return null;

  // Combine Pending and Accepted for the main list
  const allCollaborationRequests = meetings.filter(
    m => m.status === 'pending' || m.status === 'accepted'
  );

  // Get collaboration requests sent by this investor
  const sentRequests = getRequestsFromInvestor(user.id);
  const requestedEntrepreneurIds = sentRequests.map(req => req.entrepreneurId);

  // Filter entrepreneurs based on search and industry filters
  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Industry filter
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(entrepreneur.industry);
    
    return matchesSearch && matchesIndustry;
  });

  // Get unique industries for filter
  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));

  // Toggle industry selection
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prevSelected => 
      prevSelected.includes(industry)
        ? prevSelected.filter(i => i !== industry)
        : [...prevSelected, industry]
    );
  };

  const pendingRequests = meetings.filter(m => m.status === 'pending');
  const confirmedMeetings = meetings.filter(m => m.status === 'accepted');

  return (
    <div className="space-y-6 animate-fade-in">

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with promising entrepreneurs</p>
        </div>
        
        <Link to="/entrepreneurs">
          <Button
            leftIcon={<PlusCircle size={18} />}
          >
            View All Startups
          </Button>
        </Link>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups, industries, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            
            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <Badge
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                  className="cursor-pointer"
                  onClick={() => toggleIndustry(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Users size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Total Startups</p>
                <h3 className="text-xl font-semibold text-primary-900">{entrepreneurs.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4">
                <PieChart size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">Industries</p>
                <h3 className="text-xl font-semibold text-secondary-900">{industries.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Users size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Your Connections</p>
                <h3 className="text-xl font-semibold text-accent-900">
                  {sentRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

      </div> */}

      {/* Stats summary - 4 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* 1. New Requests (Urgent Action) */}
        <Card className="bg-orange-50 border border-orange-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full mr-4 text-orange-600">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-700">Pending Requests</p>
                <h3 className="text-xl font-semibold text-orange-900">{pendingRequests.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* 2. Confirmed Meetings (Today's Schedule) */}
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4 text-primary-700">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Upcoming Meetings</p>
                <h3 className="text-xl font-semibold text-primary-900">{confirmedMeetings.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 3. Portfolio/Total Connections (Historical Data) */}
        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4 text-secondary-700">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">Total Connections</p>
                <h3 className="text-xl font-semibold text-secondary-900">{confirmedMeetings.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* 4. Platform Discovery (General Stats) */}
        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4 text-accent-700">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Total Startups</p>
                <h3 className="text-xl font-semibold text-accent-900">{entrepreneurs?.length || 0}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Collaboration Requests List (Left) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-bold text-gray-800">Collaboration Requests</h2>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1">
              Open Calendar <ChevronRight size={16} />
            </button>
          </div>

          {allCollaborationRequests.length > 0 ? (
            <div className="space-y-4">
              {allCollaborationRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="p-4 border border-gray-100 rounded-xl bg-white flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                >

                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      request.status === 'accepted' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      <Calendar size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{request.title}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                          request.status === 'accepted' 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : 'bg-orange-100 text-orange-700 border-orange-200'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">With {request.entrepreneurName}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(request.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-blue-600 font-bold">
                      {new Date(request.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {/* ✅ Join Call Button: Only shows if status is 'accepted' */}
                  {request.status === 'accepted' && (
                    <Link to={`/meeting/${request.id}`}>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                      >
                        <Video size={16} />
                        <span className="hidden sm:inline">Join Call</span>
                      </Button>
                    </Link>
                  )}

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
              <Calendar size={40} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-gray-800 font-bold">No requests yet</h3>
              <p className="text-gray-500 text-sm">Meeting requests will appear here.</p>
            </div>
          )}
        </div>

        {/* Entrepreneurs grid */}
        <div className='lg:col-span-1 space-y-4'>
          <Card className="h-full border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Featured Startups</h2>
            </CardHeader>
            
            <CardBody className="p-4">
              {filteredEntrepreneurs.length > 0 ? (
                <div className="space-y-4">
                  {filteredEntrepreneurs.slice(0 , 3).map(entrepreneur => (
                    <EntrepreneurCard
                      key={entrepreneur.id}
                      entrepreneur={entrepreneur}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No startups match your filters</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedIndustries([]);
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

      </div>

    </div>
  );
};