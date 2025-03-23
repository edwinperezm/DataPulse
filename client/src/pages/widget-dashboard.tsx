import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrandedSpinner, BrandedSpinnerPro } from '@/components/ui/branded-spinner';
import { BarChart2, Users, Clipboard, Activity, Maximize2, Minimize2 } from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Define widget component props
interface WidgetProps {
  title: string;
  description?: string;
  expanded: boolean;
  onToggleExpand: () => void;
  className?: string;
  children: React.ReactNode;
}

// Widget component that can be expanded/collapsed with Apple-style design
const Widget = ({
  title,
  description,
  expanded,
  onToggleExpand,
  className,
  children
}: WidgetProps) => {
  return (
    <Card className={`w-full h-full overflow-hidden flex flex-col bg-white/80 backdrop-blur-md rounded-3xl shadow-apple-sm border-0 hover:shadow-apple-md transition-all duration-300 ${className}`}>
      <CardHeader className="py-3 px-5 flex flex-row items-center justify-between bg-transparent">
        <div>
          <CardTitle className="text-md font-bold-onse-bold text-apple-black">{title}</CardTitle>
          {description && (
            <CardDescription className="text-xs text-apple-darkgray mt-0.5 font-boldonse">
              {description}
            </CardDescription>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-apple-darkgray hover:text-apple-black hover:bg-white/40 rounded-full transition-colors"
          onClick={onToggleExpand}
          title={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-5 bg-transparent">
        {children}
      </CardContent>
    </Card>
  );
};

// Mock data for client status
const clientStatusData = [
  { name: 'Acme Corp', status: 'healthy', revenue: '$45,000' },
  { name: 'Globex', status: 'needs-attention', revenue: '$32,000' },
  { name: 'Initech', status: 'at-risk', revenue: '$18,500' },
  { name: 'Umbrella', status: 'healthy', revenue: '$56,200' },
];

// Mock data for recent activities
const recentActivities = [
  { client: 'Acme Corp', type: 'meeting', date: 'Today', description: 'Weekly check-in call' },
  { client: 'Globex', type: 'survey', date: 'Yesterday', description: 'Customer satisfaction survey sent' },
  { client: 'Initech', type: 'support', date: '2 days ago', description: 'Technical support ticket resolved' },
];

export default function WidgetDashboard() {
  // Define the initial layout for the grid
  const [layout, setLayout] = useState([
    { i: 'clients', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'activity', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'surveys', x: 0, y: 2, w: 4, h: 3, minW: 3, minH: 2 },
    { i: 'metrics', x: 4, y: 2, w: 8, h: 3, minW: 4, minH: 2 },
  ]);

  // Track which widgets are expanded
  const [expandedWidgets, setExpandedWidgets] = useState<Record<string, boolean>>({
    clients: false,
    activity: false,
    surveys: false,
    metrics: false,
  });

  // Use useState for responsive width calculation
  const [width, setWidth] = useState(1200);

  // Toggle widget expansion
  const toggleWidgetExpansion = (widgetId: string) => {
    setExpandedWidgets(prev => ({
      ...prev,
      [widgetId]: !prev[widgetId]
    }));
  };

  // Handle layout changes
  const handleLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };
  
  // Update width on window resize
  useEffect(() => {
    const updateWidth = () => {
      // Get the container width with padding adjustments
      const containerElem = document.querySelector('.grid-container');
      if (containerElem) {
        const containerWidth = containerElem.clientWidth;
        // Adjust width based on container size, accounting for padding
        // The value 64 comes from: containerPadding (16*2) + margin (16*2)
        setWidth(Math.max(containerWidth - 64, 320)); 
      } else {
        // Fallback if container not found yet
        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        // More conservative width calculation for better fit
        const calculatedWidth = viewportWidth < 768 
          ? viewportWidth - 48 // Mobile: narrower
          : viewportWidth < 1024
            ? viewportWidth - 64 // Tablet
            : viewportWidth - 96; // Desktop

        setWidth(Math.max(calculatedWidth, 320));
      }
    };
    
    // Set initial width after a short delay to ensure container is rendered
    setTimeout(updateWidth, 100);
    
    // Add event listener for resize
    window.addEventListener('resize', updateWidth);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Handle layout change with size adjustments for better responsiveness
  useEffect(() => {
    // Function to handle screen size changes
    const handleScreenSizeChange = () => {
      const viewportWidth = window.innerWidth;
      
      // Adjust layout based on screen size
      if (viewportWidth < 640) {
        // Mobile layout: stack widgets vertically, full width
        setLayout([
          { i: 'clients', x: 0, y: 0, w: 12, h: 2, minW: 3, minH: 2 },
          { i: 'activity', x: 0, y: 2, w: 12, h: 2, minW: 3, minH: 2 },
          { i: 'surveys', x: 0, y: 4, w: 12, h: 3, minW: 3, minH: 2 },
          { i: 'metrics', x: 0, y: 7, w: 12, h: 3, minW: 4, minH: 2 },
        ]);
      } else if (viewportWidth < 1024) {
        // Tablet layout: 2-column layout
        setLayout([
          { i: 'clients', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'activity', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'surveys', x: 0, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
          { i: 'metrics', x: 6, y: 2, w: 6, h: 3, minW: 4, minH: 2 },
        ]);
      } else {
        // Desktop layout: maintain original
        setLayout([
          { i: 'clients', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'activity', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'surveys', x: 0, y: 2, w: 4, h: 3, minW: 3, minH: 2 },
          { i: 'metrics', x: 4, y: 2, w: 8, h: 3, minW: 4, minH: 2 },
        ]);
      }
    };
    
    // Call once on component mount
    handleScreenSizeChange();
    
    // Add resize listener to update layout on window resize
    window.addEventListener('resize', handleScreenSizeChange);
    
    // Clean up
    return () => window.removeEventListener('resize', handleScreenSizeChange);
  }, []);

  // Sample content for widgets with Apple-style design
  const clientListContent = (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl bg-white/60 backdrop-blur-sm">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-apple-gray/30">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-boldonse text-apple-darkgray uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-boldonse text-apple-darkgray uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-boldonse text-apple-darkgray uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-gray-100">
            {clientStatusData.map((client, index) => (
              <tr key={index} className="hover:bg-white/40 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-boldonse font-medium text-apple-black">{client.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-boldonse
                    ${client.status === 'healthy' ? 'bg-green-100/70 text-green-700' : 
                      client.status === 'needs-attention' ? 'bg-yellow-100/70 text-yellow-700' :
                      'bg-red-100/70 text-red-700'}`}>
                    {client.status === 'healthy' ? 'Healthy' : 
                     client.status === 'needs-attention' ? 'Needs Attention' : 'At Risk'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-boldonse text-apple-darkgray">{client.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const activityContent = (
    <div className="space-y-3">
      {recentActivities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-4 py-3 px-2 border-b border-gray-100 last:border-0 hover:bg-white/40 rounded-xl transition-colors">
          <div className="bg-apple-blue/10 p-2.5 rounded-full">
            <Activity className="h-5 w-5 text-apple-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-boldonse font-medium text-apple-black truncate">{activity.client}</p>
            <p className="text-sm font-boldonse text-apple-darkgray">{activity.description}</p>
          </div>
          <div className="text-xs font-boldonse text-apple-darkgray">{activity.date}</div>
        </div>
      ))}
    </div>
  );

  const surveyContent = (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center space-y-4">
        <BrandedSpinner />
        <div className="text-apple-darkgray text-sm font-boldonse">Loading survey data...</div>
      </div>
    </div>
  );

  const metricsContent = (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <BrandedSpinnerPro size="large" text="Generating metrics report..." />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-6 px-4 bg-apple-lightgray min-h-screen animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold-onse-bold text-apple-black tracking-tight">Customizable Dashboard</h1>
        <p className="text-apple-darkgray mt-2 font-boldonse">
          Drag and resize widgets to customize your dashboard layout
        </p>
      </div>

      <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-apple-sm mb-8 border border-white/20">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <svg className="h-5 w-5 text-apple-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium font-boldonse text-apple-black mb-2">Instructions:</p>
            <ul className="list-disc pl-5 text-xs font-boldonse text-apple-darkgray space-y-1.5">
              <li>Drag widgets by their header to reposition</li>
              <li>Resize widgets by dragging the bottom-right corner</li>
              <li>Click the expand/collapse button to toggle widget size</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid-container p-0 animate-slide-up">
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={width}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".react-draggable-handle"
          compactType="vertical"
          margin={[16, 16]}
          containerPadding={[16, 16]}
          resizeHandles={['se']}
          isBounded={true}
        >
          <div key="clients">
            <Widget
              title="Client Status"
              description="Overview of all client accounts"
              expanded={expandedWidgets.clients}
              onToggleExpand={() => toggleWidgetExpansion('clients')}
              className="react-draggable-handle"
            >
              {clientListContent}
            </Widget>
          </div>
          
          <div key="activity">
            <Widget
              title="Recent Activity"
              expanded={expandedWidgets.activity}
              onToggleExpand={() => toggleWidgetExpansion('activity')}
              className="react-draggable-handle"
            >
              {activityContent}
            </Widget>
          </div>
          
          <div key="surveys">
            <Widget
              title="Survey Responses"
              expanded={expandedWidgets.surveys}
              onToggleExpand={() => toggleWidgetExpansion('surveys')}
              className="react-draggable-handle"
            >
              {surveyContent}
            </Widget>
          </div>
          
          <div key="metrics">
            <Widget
              title="Performance Metrics"
              expanded={expandedWidgets.metrics}
              onToggleExpand={() => toggleWidgetExpansion('metrics')}
              className="react-draggable-handle"
            >
              {metricsContent}
            </Widget>
          </div>
        </GridLayout>
      </div>
    </div>
  );
}