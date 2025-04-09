import React, { useState, useEffect } from "react";
import { useLayoutEffect } from '@/hooks/use-layout-effect';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/common/card";
import { Button } from "@/components/common/button";
import { Badge } from "@/components/common/badge";
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
export default function Dashboard() {
  const [stats, setStats] = useState(mockStats);
  const [clients, setClients] = useState(mockClients);
  const [activities, setActivities] = useState(mockActivities);
  const [isLoading, setIsLoading] = useState(true);

  // Use layout effect to handle resize events
  useLayoutEffect();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
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
      active: "bg-gray-100 text-gray-800",
      "at-risk": "bg-gray-100 text-gray-800",
      inactive: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status as keyof typeof colors]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Loading Dashboard...</h2>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
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
    <div className="flex-1 overflow-x-hidden mx-auto py-6 px-6 ml-0 mr-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:justify-between mb-6 bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-bold text-[#222222]">Client Dashboard</h1>
            <p className="text-sm text-[#888888] mt-1">
              Monitor client health and engagement metrics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f7f7f7] rounded-full text-sm text-[#888888]">
              <Clock className="h-4 w-4" />
              {currentTime}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-[#f7f7f7] active:bg-[#f7f7f7] border-black/[0.06] text-[#888888] hover:text-[#222222]"
            >
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-[#f7f7f7] active:bg-[#f7f7f7] border-black/[0.06] text-[#888888] hover:text-[#222222]"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Date Range Indicator */}
      <div className="mb-6 bg-white p-4 rounded-lg border border-black/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#888888]" />
          <span className="text-sm font-medium text-[#222222]">
            {format(new Date(), 'MMM d, yyyy')}
          </span>
        </div>
        <Badge className="bg-[#f7f7f7] text-[#222222] hover:bg-[#f7f7f7] border border-black/[0.06]">
          {timePeriods.find(p => p.value === timePeriod)?.label}
        </Badge>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-lg border border-black/[0.06]">
        <div className="col-span-1">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="border-black/[0.06] focus:ring-2 focus:ring-black/[0.08] focus:border-transparent bg-[#f7f7f7] text-[#222222]">
              <Calendar className="h-4 w-4 mr-2 text-[#888888]" />
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-black/[0.06]">
              {timePeriods.map((period) => (
                <SelectItem 
                  key={period.value} 
                  value={period.value}
                  className="text-[#222222] focus:bg-[#f7f7f7] focus:text-[#222222]"
                >
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#888888]" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="pl-8 border-black/[0.06] focus:ring-2 focus:ring-black/[0.08] focus:border-transparent bg-[#f7f7f7] text-[#222222] placeholder:text-[#888888]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-1">
          <Select defaultValue="all">
            <SelectTrigger className="border-black/[0.06] focus:ring-2 focus:ring-black/[0.08] focus:border-transparent bg-[#f7f7f7] text-[#222222]">
              <Filter className="h-4 w-4 mr-2 text-[#888888]" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-black/[0.06]">
              <SelectItem value="all" className="text-[#222222] focus:bg-[#f7f7f7] focus:text-[#222222]">All Statuses</SelectItem>
              <SelectItem value="active" className="text-[#222222] focus:bg-[#f7f7f7] focus:text-[#222222]">Active</SelectItem>
              <SelectItem value="at-risk" className="text-[#222222] focus:bg-[#f7f7f7] focus:text-[#222222]">At Risk</SelectItem>
              <SelectItem value="inactive" className="text-[#222222] focus:bg-[#f7f7f7] focus:text-[#222222]">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Overview - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="overflow-hidden border border-black/[0.06] hover:border-black/[0.08] transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#888888]">Total Clients</p>
                <h3 className="text-2xl font-bold mt-1 text-[#222222]">{stats.totalClients}</h3>
                <div className="flex items-center mt-2">
                  <Badge className="bg-[#f7f7f7] text-[#222222] hover:bg-[#f7f7f7] border border-black/[0.06]">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    12%
                  </Badge>
                  <span className="text-xs text-[#888888] ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-[#888888]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-black/[0.06] hover:border-black/[0.08] transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#888888]">Active Clients</p>
                <h3 className="text-2xl font-bold mt-1 text-[#222222]">{stats.activeClients}</h3>
                <div className="flex items-center mt-2">
                  <Badge className="bg-[#f7f7f7] text-[#222222] hover:bg-[#f7f7f7] border border-black/[0.06]">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    8%
                  </Badge>
                  <span className="text-xs text-[#888888] ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-[#888888]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-black/[0.06] hover:border-black/[0.08] transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#888888]">Health Score</p>
                <h3 className="text-2xl font-bold mt-1 text-[#222222]">{stats.averageHealthScore}%</h3>
                <div className="flex items-center mt-2">
                  <Badge className="bg-[#f7f7f7] text-[#222222] hover:bg-[#f7f7f7] border border-black/[0.06]">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    3%
                  </Badge>
                  <span className="text-xs text-[#888888] ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-[#888888]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-black/[0.06] hover:border-black/[0.08] transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#888888]">Activities</p>
                <h3 className="text-2xl font-bold mt-1 text-[#222222]">{stats.activitiesThisWeek}</h3>
                <div className="flex items-center mt-2">
                  <Badge className="bg-[#f7f7f7] text-[#222222] hover:bg-[#f7f7f7] border border-black/[0.06]">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    15%
                  </Badge>
                  <span className="text-xs text-[#888888] ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-[#f7f7f7] rounded-full flex items-center justify-center">
                <BarChartIcon className="h-6 w-6 text-[#888888]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Tabs - Flex Layout */}
      <div className="flex flex-col w-full mb-6">
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="mb-4 bg-[#f7f7f7] p-1 rounded-lg border border-black/[0.06]">
            <TabsTrigger 
              value="clients"
              className="data-[state=active]:bg-white data-[state=active]:text-[#222222] text-[#888888]"
            >
              Clients
            </TabsTrigger>
            <TabsTrigger 
              value="activities"
              className="data-[state=active]:bg-white data-[state=active]:text-[#222222] text-[#888888]"
            >
              Recent Activities
            </TabsTrigger>
            <TabsTrigger 
              value="insights"
              className="data-[state=active]:bg-white data-[state=active]:text-[#222222] text-[#888888]"
            >
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Client Overview</CardTitle>
                  <CardDescription>Monitor client health and status</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-1" />
                  Add Client
                </Button>
              </CardHeader>
              <CardContent className="flex flex-col">
                <div className="rounded-md border overflow-hidden w-full">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clients.map((client) => (
                        <tr key={client.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{client.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={`${
                              client.status === 'active' ? 'bg-green-100 text-green-800' :
                              client.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="mr-2">{client.healthScore}%</span>
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    client.healthScore > 70 ? 'bg-green-500' :
                                    client.healthScore > 50 ? 'bg-yellow-500' :
                                    'bg-gray-500'
                                  }`}
                                  style={{ width: `${client.healthScore}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.lastActivity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <BarChartIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest interactions with clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const client = clients.find(c => c.id === activity.clientId);
                    return (
                      <div key={activity.id} className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                          activity.type === 'meeting' ? 'bg-gray-100' :
                          activity.type === 'call' ? 'bg-green-100' :
                          activity.type === 'email' ? 'bg-gray-100' : 'bg-gray-100'
                        }`}>
                          {activity.type === 'meeting' && <Users className="h-5 w-5 text-gray-600" />}
                          {activity.type === 'call' && <Phone className="h-5 w-5 text-green-600" />}
                          {activity.type === 'email' && <Mail className="h-5 w-5 text-gray-600" />}
                          {activity.type === 'survey' && <BarChartIcon className="h-5 w-5 text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{client?.name}</p>
                            <span className="text-sm text-gray-500">{activity.date}</span>
                          </div>
                          <p className="text-sm text-gray-600">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}: {activity.notes}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Client Insights</CardTitle>
                <CardDescription>Analytics and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Client Health Overview</h4>
                    <p className="text-sm text-gray-700">
                      Your client portfolio health score is {stats.averageHealthScore}%, which is 3% lower than last period.
                      We recommend scheduling check-ins with at-risk clients to address concerns.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Client Health Distribution</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="flex h-2.5 rounded-full">
                          <div className="bg-green-500 h-2.5 rounded-l-full" style={{ width: `${stats.activeClients/stats.totalClients*100}%` }}></div>
                          <div className="bg-yellow-500 h-2.5" style={{ width: `${stats.atRiskClients/stats.totalClients*100}%` }}></div>
                          <div className="bg-gray-500 h-2.5 rounded-r-full" style={{ width: `${stats.inactiveClients/stats.totalClients*100}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span>Active ({stats.activeClients})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                        <span>At Risk ({stats.atRiskClients})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div>
                        <span>Inactive ({stats.inactiveClients})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
