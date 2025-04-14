import React, { useState, useEffect } from "react";
import { useLayoutEffect } from '@/hooks/use-layout-effect';
import { useTheme } from "@/context/theme-context";
import { ThemedCard } from "@/components/common/themed-card";
import { ThemedText } from "@/components/common/themed-text";
import { ThemedBadge } from "@/components/common/themed-badge";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/tabs";
import { 
  ArrowUp, 
  ArrowDown, 
  Download, 
  Calendar, 
  Search, 
  Filter, 
  RefreshCw,
  Users,
  Building,
  Activity,
  BarChart as BarChartIcon,
  Phone,
  Mail,
  Clock
} from "lucide-react";
import { format } from "date-fns";

// Mock data for demonstration
const mockClients = [
  { id: 1, name: "Acme Corp", status: "active", healthScore: 85, lastActivity: "2025-04-01" },
  { id: 2, name: "Globex Industries", status: "at-risk", healthScore: 62, lastActivity: "2025-04-03" },
  { id: 3, name: "Initech LLC", status: "active", healthScore: 78, lastActivity: "2025-04-04" },
  { id: 4, name: "Massive Dynamic", status: "inactive", healthScore: 45, lastActivity: "2025-03-20" },
];

const mockActivities = [
  { id: 1, clientId: 1, type: "meeting", date: "2025-04-05", notes: "Quarterly review" },
  { id: 2, clientId: 2, type: "email", date: "2025-04-03", notes: "Follow-up on concerns" },
  { id: 3, clientId: 3, type: "call", date: "2025-04-04", notes: "Product demo" },
  { id: 4, clientId: 1, type: "survey", date: "2025-04-02", notes: "NPS survey completed" },
];

const mockStats = {
  totalClients: 4,
  activeClients: 2,
  atRiskClients: 1,
  inactiveClients: 1,
  averageHealthScore: 67.5,
  activitiesThisWeek: 4,
};

// Dashboard component with enhanced functionality
function Dashboard() {
  const { colors } = useTheme();
  const [stats, setStats] = useState(mockStats);
  const [clients, setClients] = useState(mockClients);
  const [activities, setActivities] = useState(mockActivities);
  const [isLoading, setIsLoading] = useState(true);

  // Use layout effect to handle resize events
  useLayoutEffect();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const refreshData = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  };
  const [timePeriod, setTimePeriod] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      active: "bg-[#f7f7f7] text-[#222222]",
      "at-risk": "bg-[#f7f7f7] text-[#222222]",
      inactive: "bg-[#f7f7f7] text-[#222222]",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border border-black/[0.06] ${colors[status as keyof typeof colors]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0E1A1D]">
        <ThemedCard className="p-8 text-center bg-[#020E13] border border-[#243531]">
          <h2 className="text-xl font-semibold mb-4 text-white">Loading Dashboard...</h2>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-[#132622] rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-[#132622] rounded"></div>
                <div className="h-4 bg-[#132622] rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </ThemedCard>
      </div>
    );
  }

  // Define time period options
  const timePeriods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'ytd', label: 'Year to date' },
  ];

  return (
    <div className="flex-1 overflow-x-hidden space-y-5 p-5">
      {/* Header */}
      <ThemedCard className="flex flex-col md:flex-row justify-between md:justify-between">
        <div className="flex justify-between items-center w-full p-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Client Dashboard</h1>
            <p className="text-sm text-[#98B0AF] mt-2">
              Monitor client health and engagement metrics
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#020E13] rounded-full text-sm text-[#98B0AF]">
              <Clock className="h-4 w-4 text-white" />
              {currentTime}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-[#020E13] hover:bg-[#132622] border-[#243531] text-[#98B0AF] hover:text-white transition-colors"
            >
              <Download className="h-4 w-4 mr-1.5 text-white" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-[#020E13] hover:bg-[#132622] border-[#243531] text-[#98B0AF] hover:text-white transition-colors"
              onClick={refreshData}
            >
              <RefreshCw className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </ThemedCard>

      {/* Date Range Indicator */}
      <ThemedCard className="mb-6 p-4 flex items-center justify-between bg-[#0E1A1D] border border-[#243531] hover:border-[#3D4F4D] transition-colors">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-white" />
          <span className="text-sm font-medium text-white">
            {format(new Date(), 'MMM d, yyyy')}
          </span>
        </div>
        <ThemedBadge variant="outline" className="text-xs font-medium border border-[#243531] bg-[#020E13] text-white">
          {timePeriods.find(p => p.value === timePeriod)?.label}
        </ThemedBadge>
      </ThemedCard>

      {/* Filters */}
      <ThemedCard className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-[#0E1A1D] backdrop-blur-sm supports-[backdrop-filter]:bg-[#0E1A1D] border border-[#243531] hover:border-[#3D4F4D] transition-colors">
        <div className="col-span-1">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="border-[#243531] focus:ring-2 focus:ring-[#3D4F4D] focus:border-transparent bg-[#020E13] text-white">
              <Calendar className="h-4 w-4 mr-2 text-white" />
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent className="bg-[#0E1A1D] backdrop-blur-lg border border-[#243531]">
              {timePeriods.map((period) => (
                <SelectItem 
                  key={period.value} 
                  value={period.value}
                  className="text-white hover:bg-[#020E13] focus:bg-[#020E13] focus:text-white"
                >
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="pl-8 border-[#243531] focus:ring-2 focus:ring-[#3D4F4D] focus:border-transparent bg-[#020E13] text-white placeholder:text-[#98B0AF]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-1">
          <Select defaultValue="all">
            <SelectTrigger className="border-[#243531] focus:ring-2 focus:ring-[#3D4F4D] focus:border-transparent bg-[#020E13] text-white">
              <Filter className="h-4 w-4 mr-2 text-white" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-[#0E1A1D] backdrop-blur-lg border border-[#243531]">
              <SelectItem value="all" className="text-white hover:bg-[#020E13] focus:bg-[#020E13] focus:text-white">All Statuses</SelectItem>
              <SelectItem value="active" className="text-white hover:bg-[#020E13] focus:bg-[#020E13] focus:text-white">Active</SelectItem>
              <SelectItem value="at-risk" className="text-white hover:bg-[#020E13] focus:bg-[#020E13] focus:text-white">At Risk</SelectItem>
              <SelectItem value="inactive" className="text-white hover:bg-[#020E13] focus:bg-[#020E13] focus:text-white">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ThemedCard>

      {/* Stats Overview - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ThemedCard className="overflow-hidden bg-[#0E1A1D] border border-[#243531] hover:border-[#3D4F4D] transition-colors">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#98B0AF]">Total Clients</p>
                <h3 className="text-2xl font-bold mt-1 text-white">{stats.totalClients}</h3>
                <div className="flex items-center mt-2">
                  <ThemedBadge variant="outline" className="text-xs font-medium border border-[#243531] bg-[#020E13] text-white">
                    <ArrowUp className="h-3 w-3 mr-1 text-white" />
                    12%
                  </ThemedBadge>
                  <span className="text-xs text-[#98B0AF] ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-[#020E13] rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </ThemedCard>

        <ThemedCard className="overflow-hidden bg-[#0E1A1D] border border-[#243531] hover:border-[#3D4F4D] transition-colors">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#98B0AF]">Active Clients</p>
                <h3 className="text-2xl font-bold mt-1 text-white">{stats.activeClients}</h3>
                <div className="flex items-center mt-2">
                  <ThemedBadge variant="outline" className="text-xs font-medium border border-[#243531] bg-[#020E13] text-white">
                    <ArrowUp className="h-3 w-3 mr-1 text-white" />
                    8%
                  </ThemedBadge>
                  <span className="text-xs text-[#98B0AF] ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-[#020E13] rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </ThemedCard>

        <ThemedCard className="overflow-hidden bg-[#0E1A1D] border border-[#243531] hover:border-[#3D4F4D] transition-colors">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Health Score</p>
                <h3 className="text-2xl font-bold mt-1 text-white">{stats.averageHealthScore}%</h3>
                <div className="flex items-center mt-2">
                  <ThemedBadge variant="outline" className="text-xs font-medium border border-[#243531] bg-[#020E13] text-white">
                    <ArrowDown className="h-3 w-3 mr-1 text-white" />
                    3%
                  </ThemedBadge>
                  <span className="text-xs text-[#98B0AF] ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-[#020E13] rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </ThemedCard>

        <ThemedCard className="overflow-hidden bg-[#0E1A1D] border border-[#243531] hover:border-[#3D4F4D] transition-colors">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Activities</p>
                <h3 className="text-2xl font-bold mt-1 text-white">{stats.activitiesThisWeek}</h3>
                <div className="flex items-center mt-2">
                  <ThemedBadge variant="outline" className="text-xs font-medium border border-[#243531] bg-[#020E13] text-white">
                    <ArrowUp className="h-3 w-3 mr-1 text-white" />
                    15%
                  </ThemedBadge>
                  <span className="text-xs text-[#98B0AF] ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-[#020E13] rounded-full flex items-center justify-center">
                <BarChartIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </ThemedCard>
      </div>

      {/* Client Tabs - Flex Layout */}
      <div className="flex flex-col w-full my-5">
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="bg-[#0E1A1D] p-1 rounded-lg border border-[#243531]">
            <TabsTrigger 
              value="clients"
              className="text-white/80 hover:text-white data-[state=active]:bg-[#020E13] data-[state=active]:text-white transition-colors"
            >
              Clients
            </TabsTrigger>
            <TabsTrigger 
              value="activities"
              className="text-white/80 hover:text-white data-[state=active]:bg-[#020E13] data-[state=active]:text-white transition-colors"
            >
              Recent Activities
            </TabsTrigger>
            <TabsTrigger 
              value="insights"
              className="text-white/80 hover:text-white data-[state=active]:bg-[#020E13] data-[state=active]:text-white transition-colors"
            >
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <ThemedCard className="bg-[#0E1A1D] backdrop-blur-sm supports-[backdrop-filter]:bg-[#0E1A1D] border border-[#243531] hover:border-[#3D4F4D] transition-colors">
              <div className="flex flex-row items-center justify-between p-6">
                <div>
                  <ThemedText className="text-lg font-semibold text-white">Client Overview</ThemedText>
                  <ThemedText variant="muted" className="text-sm text-[#98B0AF]">Monitor client health and status</ThemedText>
                </div>
                <Button variant="outline" size="sm" className="border-[#243531] hover:border-[#3D4F4D] bg-[#020E13] text-white hover:bg-[#132622] transition-colors">
                  <Users className="h-4 w-4 mr-1 text-white" />
                  Add Client
                </Button>
              </div>
              <div className="flex flex-col p-6 pt-0">
                <div className="rounded-md border border-[#243531] overflow-hidden w-full">
                  <table className="min-w-full divide-y divide-[#243531]">
                    <thead className="bg-[#020E13]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Health Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Last Activity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#243531]">
                      {clients.map((client) => (
                        <tr key={client.id} className="hover:bg-[#020E13] transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{client.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <ThemedBadge
                              variant={client.status as "active" | "at-risk" | "inactive"}
                              className="text-xs font-medium"
                            >
                              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                            </ThemedBadge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="mr-2 text-white">{client.healthScore}%</span>
                              <div className="w-24 bg-[#020E13] rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    client.healthScore > 70 ? 'bg-[#98B0AF]' :
                                    client.healthScore > 50 ? 'bg-[#607877]' :
                                    'bg-[#3D4F4D]'
                                  }`}
                                  style={{ width: `${client.healthScore}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#98B0AF]">{client.lastActivity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#98B0AF]">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="hover:bg-[#020E13] text-[#98B0AF] hover:text-white transition-colors">
                                <Phone className="h-4 w-4 text-white" />
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:bg-[#020E13] text-[#98B0AF] hover:text-white transition-colors">
                                <Mail className="h-4 w-4 text-white" />
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:bg-[#020E13] text-[#98B0AF] hover:text-white transition-colors">
                                <BarChartIcon className="h-4 w-4 text-white" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ThemedCard>
          </TabsContent>

          <TabsContent value="activities">
            <ThemedCard className="bg-[#0E1A1D] border border-[#243531]">
              <div className="space-y-1.5 p-6">
                <ThemedText className="text-lg font-semibold text-white">Recent Activities</ThemedText>
                <ThemedText variant="muted" className="text-sm text-[#98B0AF]">Latest interactions with clients</ThemedText>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const client = clients.find(c => c.id === activity.clientId);
                    return (
                      <div key={activity.id} className="flex items-start p-3 rounded-lg border border-[#243531] hover:bg-[#020E13] transition-colors">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 bg-[#020E13]`}>
                          {activity.type === 'meeting' && <Users className="h-5 w-5 text-white" />}
                          {activity.type === 'call' && <Phone className="h-5 w-5 text-white" />}
                          {activity.type === 'email' && <Mail className="h-5 w-5 text-white" />}
                          {activity.type === 'survey' && <BarChartIcon className="h-5 w-5 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium text-white">{client?.name}</p>
                            <span className="text-sm text-[#98B0AF]">{activity.date}</span>
                          </div>
                          <p className="text-sm text-[#98B0AF]">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}: {activity.notes}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ThemedCard>
          </TabsContent>

          <TabsContent value="insights">
            <ThemedCard className="bg-[#0E1A1D] border border-[#243531]">
              <div className="space-y-1.5 p-6">
                <ThemedText className="text-lg font-semibold text-white">Client Insights</ThemedText>
                <ThemedText variant="muted" className="text-sm text-[#98B0AF]">Analytics and recommendations</ThemedText>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-6">
                  <div className="p-4 bg-[#020E13] rounded-lg border border-[#243531]">
                    <h4 className="text-sm font-medium text-white mb-2">Client Health Overview</h4>
                    <p className="text-sm text-[#98B0AF]">
                      Your client portfolio health score is {stats.averageHealthScore}%, which is 3% lower than last period.
                      We recommend scheduling check-ins with at-risk clients to address concerns.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Client Health Distribution</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-[#020E13] rounded-full h-2.5">
                        <div className="flex h-2.5 rounded-full">
                          <div className="bg-[#98B0AF] h-2.5 rounded-l-full" style={{ width: `${stats.activeClients/stats.totalClients*100}%` }}></div>
                          <div className="bg-[#607877] h-2.5" style={{ width: `${stats.atRiskClients/stats.totalClients*100}%` }}></div>
                          <div className="bg-[#3D4F4D] h-2.5 rounded-r-full" style={{ width: `${stats.inactiveClients/stats.totalClients*100}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-[#98B0AF] mt-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#98B0AF] rounded-full mr-1"></div>
                        <span>Active ({stats.activeClients})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#607877] rounded-full mr-1"></div>
                        <span>At Risk ({stats.atRiskClients})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#3D4F4D] rounded-full mr-1"></div>
                        <span>Inactive ({stats.inactiveClients})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ThemedCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
