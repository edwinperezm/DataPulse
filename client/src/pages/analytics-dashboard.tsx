import React, { useState, useEffect, useMemo } from 'react';
import { useLayoutEffect } from '@/hooks/use-layout-effect';
import { format, subDays, startOfYear, isWithinInterval, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select';
import { Input } from '@/components/common/input';
import { ThemedBadge } from '@/components/common/themed-badge';

import { 
  ArrowUp, 
  ArrowDown, 
  Download, 
  Calendar, 
  Search, 
  Filter, 
  RefreshCw,
  Users,
  DollarSign,
  Percent,
  Clock,
  Globe,
  Smartphone,
  Laptop,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react';
import { cn } from '@/utils/utils';

// Import Recharts components
import { LineChart } from 'recharts/es6/chart/LineChart';
import { Line } from 'recharts/es6/cartesian/Line';
import { BarChart } from 'recharts/es6/chart/BarChart';
import { Bar } from 'recharts/es6/cartesian/Bar';
import { PieChart } from 'recharts/es6/chart/PieChart';
import { Pie } from 'recharts/es6/polar/Pie';
import { Cell } from 'recharts/es6/component/Cell';
import { XAxis } from 'recharts/es6/cartesian/XAxis';
import { YAxis } from 'recharts/es6/cartesian/YAxis';
import { CartesianGrid } from 'recharts/es6/cartesian/CartesianGrid';
import { Tooltip } from 'recharts/es6/component/Tooltip';
import { Legend } from 'recharts/es6/component/Legend';
import { ResponsiveContainer } from 'recharts/es6/component/ResponsiveContainer';
import { AreaChart } from 'recharts/es6/chart/AreaChart';
import { Area } from 'recharts/es6/cartesian/Area';

// Import the data and helper functions
import { 
  analyticsMockData, 
  AnalyticsDataPoint, 
  getRevenueByDate, 
  getSessionsByDate, 
  groupByPlatform, 
  groupByDevice, 
  groupByCountry, // Import groupByCountry
  calculateTotalSessions, 
  calculateTotalRevenue, 
  calculateAverageBounceRate, 
  calculateAverageConversionRate 
} from '@/data/analytics-data';

// Define additional user engagement types
interface RetentionData {
  cohort: string;
  initialUsers: number;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

interface EngagementMetric {
  name: string;
  value: number;
  change: number;
  unit: string;
}

// Define time period options
const timePeriods = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'ytd', label: 'Year to date' },
  { value: 'custom', label: 'Custom range' }
];

// Helper function to get date range based on selected time period
const getDateRange = (period: string): { start: Date, end: Date } => {
  const today = new Date();
  const end = today;
  let start: Date;

  switch (period) {
    case '7d':
      start = subDays(today, 7);
      break;
    case '30d':
      start = subDays(today, 30);
      break;
    case '90d':
      start = subDays(today, 90);
      break;
    case 'ytd':
      start = startOfYear(today);
      break;
    case 'custom':
      // For demo purposes, we'll just use last 14 days for custom
      start = subDays(today, 14);
      break;
    default:
      start = subDays(today, 30); // Default to 30 days
  }

  return { start, end };
};

// Define platform options
const platforms = [
  { value: 'all', label: 'All Platforms', color: '#888888' },
  { value: 'web', label: 'Web', color: '#888888' },
  { value: 'ios', label: 'iOS', color: '#888888' },
  { value: 'android', label: 'Android', color: '#888888' }
];

// Define device options
const devices = [
  { value: 'all', label: 'All Devices' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'tablet', label: 'Tablet' }
];

// Define country options
const countries = [
  { value: 'all', label: 'All Countries' },
  { value: 'usa', label: 'USA' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'UK' },
  { value: 'australia', label: 'Australia' }
];

// KPI Card component
interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon, className }) => {
  return (
    <Card className={cn("overflow-hidden bg-[#0E1A1D] border-none", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <ThemedBadge variant="outline" className="text-xs font-medium bg-[#020e13] text-white border-none">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {Math.abs(change)}%
                </ThemedBadge>
              ) : (
                <ThemedBadge variant="outline" className="text-xs font-medium bg-[#020e13] text-white border-none">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  {Math.abs(change)}%
                </ThemedBadge>
              )}
              <span className="text-xs text-white/70 ml-2">vs previous period</span>
            </div>
          </div>
          <div className="h-12 w-12 bg-[#020e13] rounded-full flex items-center justify-center text-white">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Chart Card component
interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, description, children, className }) => {
  return (
    <Card className={cn("overflow-hidden bg-[#0E1A1D] border-none", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium text-white">{title}</CardTitle>
            {description && <CardDescription className="text-white/70">{description}</CardDescription>}
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#132622]">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

// Table component
interface TableProps {
  data: AnalyticsDataPoint[];
}

const AnalyticsTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#020e13] border-b border-[#132622]">
            <th className="px-3 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Date</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Platform</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Device</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Country</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Sessions</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Revenue</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Bounce Rate</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Conv. Rate</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Avg. Time</th>
          </tr>
        </thead>
        <tbody className="divide-y bg-[#0E1A1D] border-[#132622]">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-[#132622]">
              <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{row.date}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{row.platform}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{row.device}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{row.country}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{row.sessions.toLocaleString()}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-white">${row.revenue.toLocaleString()}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{(row.bounceRate * 100).toFixed(2)}%</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{(row.conversionRate * 100).toFixed(2)}%</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-white">{row.avgSessionTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Define colors from the deep forest theme
const COLORS = {
  primary: '#00C8AA',  // Teal
  background: {
    primary: '#0E1A1D',   // Deep forest
    secondary: '#020E13', // Darker forest
  },
  text: {
    primary: '#FFFFFF',   // White
    secondary: '#98B0AF', // Forest mist
    muted: '#607877',     // Muted forest
  },
  border: '#243531',      // Forest border
  hover: '#132622',       // Hover forest
  success: '#00C8AA',     // Success teal
  warning: '#607877',     // Warning gray
  error: '#3D4F4D',       // Error dark
};



// Revenue Chart component using Recharts
const RevenueChart: React.FC<{ data: AnalyticsDataPoint[] }> = ({ data }) => {
  // Transform data for the chart
  const revenueData = Object.entries(getRevenueByDate(data))
    .map(([date, value]) => ({
      date: date,
      revenue: value
    }));

  return (
    <div className="h-80 w-full p-5">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={revenueData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
          <XAxis dataKey="date" stroke={COLORS.text.secondary} />
          <YAxis stroke={COLORS.text.secondary} />
          <Tooltip 
            contentStyle={{
              backgroundColor: COLORS.background.secondary,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              color: COLORS.text.primary,
              boxShadow: 'none'
            }} 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} 
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke={COLORS.primary} 
            fill={COLORS.primary} 
            fillOpacity={0.1} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Sessions Chart component using Recharts
const SessionsChart: React.FC<{ data: AnalyticsDataPoint[] }> = ({ data }) => {
  // Transform data for the chart
  const sessionsData = Object.entries(getSessionsByDate(data))
    .map(([date, value]) => ({
      date: date,
      sessions: value
    }));

  return (
    <div className="h-80 w-full p-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sessionsData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
          <XAxis dataKey="date" stroke={COLORS.text.secondary} />
          <YAxis stroke={COLORS.text.secondary} />
          <Tooltip 
            contentStyle={{
              backgroundColor: COLORS.background.secondary,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              color: COLORS.text.primary,
              boxShadow: 'none'
            }} 
            formatter={(value) => [value.toLocaleString(), 'Sessions']} 
          />
          <Bar 
            dataKey="sessions" 
            fill={COLORS.primary} 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Platform Distribution Chart component using Recharts
const PlatformDistributionChart: React.FC<{ data: AnalyticsDataPoint[] }> = ({ data }) => {
  // Transform data for the chart
  const platformData = Object.entries(groupByPlatform(data))
    .map(([name, value], index) => ({
      name,
      value,
      color: COLORS.text.secondary
    }));

  return (
    <div className="h-80 w-full p-5">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={platformData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {platformData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: COLORS.background.secondary,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              color: COLORS.text.primary,
              boxShadow: 'none'
            }} 
            formatter={(value) => [value.toLocaleString(), 'Sessions']} 
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Device Distribution Chart component using Recharts
const DeviceDistributionChart: React.FC<{ data: AnalyticsDataPoint[] }> = ({ data }) => {
  // Transform data for the chart
  const deviceData = Object.entries(groupByDevice(data))
    .map(([name, value], index) => ({
      name,
      value,
      color: COLORS.text.secondary
    }));

  return (
    <div className="h-80 w-full p-5">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={deviceData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {deviceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: COLORS.background.secondary,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              color: COLORS.text.primary,
              boxShadow: 'none'
            }} 
            formatter={(value) => [value.toLocaleString(), 'Sessions']} 
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// User Retention Chart component
const RetentionChart: React.FC = () => {
  // Mock retention data - in a real app, this would come from the backend
  const retentionData: RetentionData[] = [
    { cohort: 'Aug 1-7', initialUsers: 1200, week1: 720, week2: 480, week3: 360, week4: 300 },
    { cohort: 'Aug 8-14', initialUsers: 1350, week1: 810, week2: 540, week3: 405, week4: 338 },
    { cohort: 'Aug 15-21', initialUsers: 1100, week1: 660, week2: 440, week3: 330, week4: 275 },
    { cohort: 'Aug 22-28', initialUsers: 1250, week1: 750, week2: 500, week3: 375, week4: 313 }
  ];

  // Transform data for visualization
  const data = retentionData.map(cohort => ({
    name: cohort.cohort,
    'Week 1': Math.round((cohort.week1 / cohort.initialUsers) * 100),
    'Week 2': Math.round((cohort.week2 / cohort.initialUsers) * 100),
    'Week 3': Math.round((cohort.week3 / cohort.initialUsers) * 100),
    'Week 4': Math.round((cohort.week4 / cohort.initialUsers) * 100),
  }));

  return (
    <div className="h-80 w-full p-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
          <XAxis dataKey="name" stroke={COLORS.text.secondary} />
          <YAxis label={{ value: 'Retention %', angle: -90, position: 'insideLeft', fill: COLORS.text.secondary }} stroke={COLORS.text.secondary} />
          <Tooltip 
            contentStyle={{
              backgroundColor: COLORS.background.secondary,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              color: COLORS.text.primary,
              boxShadow: 'none'
            }}
            formatter={(value) => [`${value}%`, '']}
          />
          <Legend wrapperStyle={{ color: COLORS.text.secondary }} />
          <Bar dataKey="Week 1" fill={COLORS.text.secondary} />
          <Bar dataKey="Week 2" fill={COLORS.text.muted} />
          <Bar dataKey="Week 3" fill={COLORS.primary} />
          <Bar dataKey="Week 4" fill={COLORS.success} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Session Duration Chart component
const SessionDurationChart: React.FC<{ data: AnalyticsDataPoint[] }> = ({ data }) => {
  // Group sessions by duration buckets
  const durationBuckets = [
    { name: '0-1 min', count: 0, color: COLORS.text.secondary },
    { name: '1-3 min', count: 0, color: COLORS.text.muted },
    { name: '3-5 min', count: 0, color: COLORS.primary },
    { name: '5-10 min', count: 0, color: COLORS.success },
    { name: '10+ min', count: 0, color: COLORS.warning }
  ];

  // Process data to count sessions in each duration bucket
  data.forEach(item => {
    const [minutes, seconds] = item.avgSessionTime.split(':').map(Number);
    const totalMinutes = minutes + (seconds / 60);
    
    if (totalMinutes < 1) durationBuckets[0].count += item.sessions;
    else if (totalMinutes < 3) durationBuckets[1].count += item.sessions;
    else if (totalMinutes < 5) durationBuckets[2].count += item.sessions;
    else if (totalMinutes < 10) durationBuckets[3].count += item.sessions;
    else durationBuckets[4].count += item.sessions;
  });

  return (
    <div className="h-80 w-full p-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={durationBuckets}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
          <XAxis dataKey="name" stroke={COLORS.text.secondary} />
          <YAxis stroke={COLORS.text.secondary} />
          <Tooltip 
            contentStyle={{
              backgroundColor: COLORS.background.secondary,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              color: COLORS.text.primary,
              boxShadow: 'none'
            }}
            formatter={(value) => [value.toLocaleString(), 'Sessions']}
          />
          <Bar dataKey="count">
            {durationBuckets.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Main Analytics Dashboard Component
function AnalyticsDashboard() {

  // State for filters
  const [timePeriod, setTimePeriod] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Use layout effect to handle resize events
  useLayoutEffect();

  // Memoized filtered data
  const filteredData = useMemo(() => {
    // Get date range based on selected time period
    const { start, end } = getDateRange(timePeriod);

    return analyticsMockData.filter(item => {
      const platformMatch = selectedPlatform === 'all' || item.platform.toLowerCase() === selectedPlatform.toLowerCase();
      const deviceMatch = selectedDevice === 'all' || item.device.toLowerCase() === selectedDevice.toLowerCase();
      const countryMatch = selectedCountry === 'all' || item.country.toLowerCase() === selectedCountry.toLowerCase();
      
      // Basic search implementation (searches across multiple fields)
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = searchQuery === '' ||
                          item.date.toLowerCase().includes(searchLower) ||
                          item.platform.toLowerCase().includes(searchLower) ||
                          item.device.toLowerCase().includes(searchLower) ||
                          item.country.toLowerCase().includes(searchLower) ||
                          item.city.toLowerCase().includes(searchLower);

      // Apply date filter
      const itemDate = parseISO(item.date);
      const dateMatch = isWithinInterval(itemDate, { start, end });

      return platformMatch && deviceMatch && countryMatch && searchMatch && dateMatch;
    });
  }, [selectedPlatform, selectedDevice, selectedCountry, searchQuery, timePeriod]);

  // Calculate summary metrics based on filteredData
  const totalSessions = useMemo(() => filteredData.reduce((sum, item) => sum + item.sessions, 0), [filteredData]);
  const totalRevenue = useMemo(() => filteredData.reduce((sum, item) => sum + item.revenue, 0), [filteredData]);
  const avgBounceRate = useMemo(() => filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.bounceRate, 0) / filteredData.length : 0, [filteredData]);
  const avgConversionRate = useMemo(() => filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.conversionRate, 0) / filteredData.length : 0, [filteredData]);

  // Simulate loading effect (doesn't need to fetch anymore, just show loading state)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Shorter delay as we are not fetching

    return () => clearTimeout(timer);
    // Rerun effect only if filters change to trigger loading simulation
  }, [selectedPlatform, selectedDevice, selectedCountry, searchQuery, timePeriod]);


  // Export data function (using filtered data)
  const exportData = (format: 'csv' | 'pdf') => {
    if (format === 'pdf') {
      console.log("PDF export is not implemented yet.");
      // Placeholder for future PDF export logic
      return;
    }

    if (format === 'csv') {
      if (!filteredData || filteredData.length === 0) {
        console.log("No data to export.");
        // Optionally show a user notification
        return;
      }

      // Define CSV headers based on AnalyticsDataPoint keys
      const headers = Object.keys(filteredData[0]).join(',');
      
      // Convert array of objects to CSV rows
      const csvRows = filteredData.map(row => 
        Object.values(row).map(value => {
          // Handle potential commas within values by enclosing in double quotes
          const stringValue = String(value);
          return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
        }).join(',')
      );

      // Combine headers and rows
      const csvString = `${headers}\n${csvRows.join('\n')}`;

      // Create a Blob and trigger download
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'analytics-export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`Exporting ${filteredData.length} rows in CSV format based on current filters`);
    }
  };

  return (
    <div className="flex-1 overflow-x-hidden space-y-5 p-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:justify-between p-6 rounded-lg bg-[#0E1A1D]">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-sm text-white/70 mt-1">
            Track your key metrics and performance indicators
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={() => exportData('csv')} className="text-white border-[#132622] hover:bg-[#132622]">
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportData('pdf')} className="text-white border-[#132622] hover:bg-[#132622]">
            <Download className="h-4 w-4 mr-1" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" className="text-white border-[#132622] hover:bg-[#132622]">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Date Range Indicator */}
      <div className="mb-6 p-4 rounded-lg flex items-center justify-between bg-[#0E1A1D]">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-white mr-2" />
          <span className="text-sm font-medium text-white">
            {format(getDateRange(timePeriod).start, 'MMM d, yyyy')} - {format(getDateRange(timePeriod).end, 'MMM d, yyyy')}
          </span>
        </div>
        <ThemedBadge variant="outline" className="text-xs font-medium bg-[#020e13] text-white border-none">
          {timePeriods.find(p => p.value === timePeriod)?.label}
        </ThemedBadge>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 rounded-lg bg-[#0E1A1D]">
        <div className="col-span-1">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="bg-[#020e13] border-none focus:ring-2 focus:ring-[#132622] text-white">
              <Calendar className="h-4 w-4 mr-2 text-white" />
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent className="bg-[#0E1A1D] border-none text-white">
              {timePeriods.map((period) => (
                <SelectItem key={period.value} value={period.value} className="hover:bg-[#132622]">
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="bg-[#020e13] border-none focus:ring-2 focus:ring-[#132622] text-white">
              <Globe className="h-4 w-4 mr-2 text-white" />
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent className="bg-[#0E1A1D] border-none text-white">
              {platforms.map((platform) => (
                <SelectItem key={platform.value} value={platform.value} className="hover:bg-[#132622]">
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <Select value={selectedDevice} onValueChange={setSelectedDevice}>
            <SelectTrigger className="bg-[#020e13] border-none focus:ring-2 focus:ring-[#132622] text-white">
              <Laptop className="h-4 w-4 mr-2 text-white" />
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent className="bg-[#0E1A1D] border-none text-white">
              {devices.map((device) => (
                <SelectItem key={device.value} value={device.value} className="hover:bg-[#132622]">
                  {device.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="bg-[#020e13] border-none focus:ring-2 focus:ring-[#132622] text-white">
              <Globe className="h-4 w-4 mr-2 text-white" />
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-[#0E1A1D] border-none text-white">
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value} className="hover:bg-[#132622]">
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-[#020e13] border-none text-white placeholder:text-white/50 focus:ring-2 focus:ring-[#132622]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 bg-[#0E1A1D] p-4 rounded-lg">
        {/* Date range summary */}
        <div className="lg:col-span-4 p-4 rounded-lg mb-2 bg-[#0E1A1D]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Performance Summary</h3>
            <span className="text-sm text-white/70">
              {timePeriods.find(p => p.value === timePeriod)?.label} • {filteredData.length} data points
            </span>
          </div>
        </div>
        <KPICard
          title="Total Sessions"
          value={totalSessions.toLocaleString()}
          change={5.2}
          icon={<Users className="h-6 w-6 text-white" />}
        />
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={7.8}
          icon={<DollarSign className="h-6 w-6 text-white" />}
        />
        <KPICard
          title="Bounce Rate"
          value={`${(avgBounceRate * 100).toFixed(2)}%`}
          change={-2.3}
          icon={<Percent className="h-6 w-6 text-white" />}
        />
        <KPICard
          title="Conversion Rate"
          value={`${(avgConversionRate * 100).toFixed(2)}%`}
          change={1.5}
          icon={<Percent className="h-6 w-6 text-white" />}
        />
      </div>

      {/* Tabs for different views - Flex Layout */}
      <div className="flex flex-col w-full my-5">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartCard title="Revenue Trend" description="Daily revenue for the selected period">
              <RevenueChart data={filteredData} />
            </ChartCard>
            <ChartCard title="Sessions Trend" description="Daily sessions for the selected period">
              <SessionsChart data={filteredData} />
            </ChartCard>
          </div>
          <ChartCard title="Platform Distribution" description="Sessions by platform and device">
            <PlatformDistributionChart data={filteredData} />
          </ChartCard>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <ChartCard title="Revenue Analysis" description="Detailed revenue breakdown">
              <RevenueChart data={filteredData} />
            </ChartCard>
          </div>
          
          {/* Revenue by platform breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Platform</CardTitle>
                <CardDescription>Revenue distribution across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(platforms)
                    .filter(([_, platform]) => platform.value !== 'all')
                    .map(([_, platform]) => {
                      // Calculate platform revenue
                      const platformData = filteredData.filter(item => 
                        platform.value === 'all' || item.platform.toLowerCase() === platform.value
                      );
                      const platformRevenue = platformData.reduce((sum, item) => sum + item.revenue, 0);
                      const percentage = totalRevenue > 0 ? (platformRevenue / totalRevenue) * 100 : 0;
                      
                      return (
                        <div key={platform.value} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" 
                                 style={{ backgroundColor: platform.color || COLORS.primary }} />
                            <span className="text-white">{platform.label}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-white">
                              ${platformRevenue.toLocaleString()}
                            </span>
                            <div className="w-24 bg-[#132622] rounded-full h-2">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${percentage}%`,
                                  backgroundColor: platform.color || COLORS.primary 
                                }}
                              />
                            </div>
                            <span className="text-xs text-white/70">{percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Period-over-period comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0E1A1D] p-4 rounded-lg border border-[#132622]">
                    <div className="text-sm text-white/70 mb-1">Current Period</div>
                    <div className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</div>
                    <div className="flex items-center text-sm mt-2 text-white">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>8.2% vs. last period</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#0E1A1D] p-4 rounded-lg border border-[#132622]">
                    <div className="text-sm text-white/70 mb-1">Average Order Value</div>
                    <div className="text-2xl font-bold text-white">
                      ${(totalRevenue / (totalSessions || 1)).toFixed(2)}
                    </div>
                    <div className="flex items-center text-sm mt-2 text-white">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>3.5% vs. last period</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#0E1A1D] p-4 rounded-lg border border-[#132622]">
                    <div className="text-sm text-white/70 mb-1">Conversion Value</div>
                    <div className="text-2xl font-bold text-white">
                      ${(totalRevenue * avgConversionRate).toFixed(2)}
                    </div>
                    <div className="flex items-center text-sm mt-2 text-white">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>5.7% vs. last period</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#0E1A1D] p-4 rounded-lg border border-[#132622]">
                    <div className="text-sm text-white/70 mb-1">Revenue per Session</div>
                    <div className="text-2xl font-bold text-white">
                      ${(totalRevenue / (totalSessions || 1)).toFixed(2)}
                    </div>
                    <div className="flex items-center text-sm mt-2 text-white/70">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      <span>1.2% vs. last period</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="mt-6">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <ChartCard title="Sessions Analysis" description="Detailed sessions breakdown">
              <SessionsChart data={filteredData} />
            </ChartCard>
          </div>
          
          {/* Sessions details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Sessions by Device</CardTitle>
                <CardDescription>Distribution across different devices</CardDescription>
              </CardHeader>
              <CardContent>
                <DeviceDistributionChart data={filteredData} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Session Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0E1A1D] p-4 rounded-lg border border-[#132622]">
                    <div className="text-sm text-white/70 mb-1">Total Sessions</div>
                    <div className="text-2xl font-bold text-white">{totalSessions.toLocaleString()}</div>
                    <div className="flex items-center text-sm mt-2 text-white">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>12.5% vs. last period</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#0E1A1D] p-4 rounded-lg border border-[#132622]">
                    <div className="text-sm text-white/70 mb-1">Avg. Bounce Rate</div>
                    <div className="text-2xl font-bold text-white">
                      {(avgBounceRate * 100).toFixed(2)}%
                    </div>
                    <div className="flex items-center text-sm mt-2 text-white/70">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      <span>3.4% vs. last period</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#0E1A1D] p-4 rounded-lg border border-[#132622]">
                    <div className="text-sm text-white/70 mb-1">Sessions per User</div>
                    <div className="text-2xl font-bold text-white">
                      1.8
                    </div>
                    <div className="flex items-center text-sm mt-2 text-white">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>2.1% vs. last period</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#0E1A1D] p-4 rounded-lg border border-[#132622]">
                    <div className="text-sm text-white/70 mb-1">New User Rate</div>
                    <div className="text-2xl font-bold text-white">
                      42.3%
                    </div>
                    <div className="flex items-center text-sm mt-2 text-white">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>5.8% vs. last period</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Traffic sources */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your users are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: 'Direct', sessions: Math.round(totalSessions * 0.35), color: COLORS.primary },
                  { source: 'Organic Search', sessions: Math.round(totalSessions * 0.25), color: COLORS.text.secondary },
                  { source: 'Social Media', sessions: Math.round(totalSessions * 0.20), color: COLORS.text.muted },
                  { source: 'Referral', sessions: Math.round(totalSessions * 0.15), color: COLORS.success },
                  { source: 'Email', sessions: Math.round(totalSessions * 0.05), color: COLORS.warning }
                ].map(source => {
                  const percentage = (source.sessions / totalSessions) * 100;
                  return (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="text-white">{source.source}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-white">
                          {source.sessions.toLocaleString()}
                        </span>
                        <div className="w-32 bg-[#132622] rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: source.color
                            }}
                          />
                        </div>
                        <span className="text-xs text-white/70">{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="mt-6">
          <ChartCard title="Platform Analysis" description="Detailed platform breakdown">
            <PlatformDistributionChart data={filteredData} />
          </ChartCard>
        </TabsContent>



        <TabsContent value="engagement" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartCard title="User Retention" description="Weekly cohort retention rates">
              <RetentionChart />
            </ChartCard>
            <ChartCard title="Session Duration" description="Distribution of session lengths">
              <SessionDurationChart data={filteredData} />
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { name: 'Avg. Session Duration', value: filteredData.length > 0 ? 
                  filteredData.reduce((acc, item) => {
                    const [min, sec] = item.avgSessionTime.split(':').map(Number);
                    return acc + (min * 60 + sec) * item.sessions;
                  }, 0) / totalSessions : 0, 
                change: 5.2, unit: 'seconds' },
              { name: 'Pages per Session', value: 4.2, change: 3.1, unit: 'pages' },
              { name: 'Repeat Visit Rate', value: 42, change: 7.5, unit: '%' }
            ].map((metric, index) => (
              <Card key={index} className="bg-[#0E1A1D] border-none transition-all duration-200 hover:bg-[#132622] overflow-hidden">
                <CardContent className="py-4 sm:py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{metric.name}</p>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mt-1">
                        {metric.name === 'Avg. Session Duration' ? 
                          `${Math.floor(metric.value / 60)}:${(metric.value % 60).toFixed(0).padStart(2, '0')}` : 
                          `${metric.value.toLocaleString()}${metric.unit}`}
                      </h3>
                      <div className="flex items-center mt-2">
                        {metric.change > 0 ? (
                          <ThemedBadge variant="outline" className="text-xs font-medium bg-[#020e13] text-white border-none">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            {Math.abs(metric.change)}%
                          </ThemedBadge>
                        ) : (
                          <ThemedBadge variant="outline" className="text-xs font-medium bg-[#020e13] text-white border-none">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            {Math.abs(metric.change)}%
                          </ThemedBadge>
                        )}
                        <span className="text-xs text-white/70 ml-2">vs previous period</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-6 bg-[#0E1A1D] border-none">
            <CardHeader>
              <CardTitle className="text-white">Engagement Insights</CardTitle>
              <CardDescription className="text-white/70">Key metrics and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-[#020e13] rounded-lg">
                  <h4 className="text-sm font-medium text-white">Engagement Summary</h4>
                  <p className="text-sm text-white/70 mt-1">
                    User engagement is showing positive trends with a {filteredData.length > 0 ? 
                    (filteredData.reduce((sum, item) => sum + item.conversionRate, 0) / filteredData.length * 100).toFixed(1) : 0}% conversion rate.
                    Session duration has increased by 5.2% compared to the previous period.
                  </p>
                </div>
                
                <div className="p-4 bg-[#020e13] rounded-lg">
                  <h4 className="text-sm font-medium text-white">Recommendations</h4>
                  <ul className="text-sm text-white/70 mt-1 list-disc list-inside space-y-1">
                    <li>Focus on improving mobile engagement which shows 15% lower session duration</li>
                    <li>Consider implementing push notifications for abandoned carts to improve conversion</li>
                    <li>Target users from the Aug 15-21 cohort with special offers to improve retention</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="mt-6">
          <ChartCard title="Geographic Analysis" description="Sessions by country (based on filters)">
            {/* Replace placeholder with a list/table */}
            <div className="h-auto min-h-80 p-4 space-y-4">
              {isLoading ? (
                 <div className="h-60 flex items-center justify-center">
                   <div className="text-center">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                     <p className="text-white/70">Loading geographic data...</p>
                   </div>
                 </div>
              ) : Object.keys(groupByCountry(filteredData)).length > 0 ? (
                <ul className="space-y-3">
                  {Object.entries(groupByCountry(filteredData))
                    .sort(([, a], [, b]) => b - a) // Sort by session count descending
                    .map(([country, sessions]) => (
                      <li key={country} className="flex items-center justify-between text-sm">
                        <span className="font-medium text-white">{country}</span>
                        <span className="text-white/70">{sessions.toLocaleString()} sessions</span>
                      </li>
                    ))}
                </ul>
              ) : (
                <div className="text-center text-white/70 py-10">
                  No geographic data available for the current filters.
                </div>
              )}
            </div>
          </ChartCard>
        </TabsContent>
      </Tabs>
      </div>

      {/* Data Table */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Detailed Analytics Data</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-60 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-white/70">Applying filters...</p>
              </div>
            </div>
          ) : (
            <AnalyticsTable data={filteredData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsDashboard;
