import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import GridLayout from 'react-grid-layout';
import { useLayoutEffect } from '@/hooks/use-layout-effect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/card';
import { Input } from '@/components/common/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/common/button';
import { BrandedSpinner, BrandedSpinnerPro } from '@/components/common/branded-spinner';
import { BarChart2, Users, Clipboard, Activity, Maximize2, Minimize2 } from 'lucide-react';
import { SectionTitle } from '@/components/common/section-title';
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
    <Card className={`w-full h-full overflow-hidden flex flex-col bg-[#0E1A1D] backdrop-blur-md rounded-3xl border border-[#243531] shadow-sm transition-all duration-300 ${className}`}>
      <CardHeader className="py-3 px-5 flex flex-row items-center justify-between bg-transparent">
        <div>
          <CardTitle className="text-md font-bold text-[#98B0AF]">{title}</CardTitle>
          {description && (
            <CardDescription className="text-xs text-[#98B0AF] mt-0.5 font-boldonse">
              {description}
            </CardDescription>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#98B0AF] hover:text-white hover:bg-[#132622] rounded-full transition-colors"
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
  // Define the initial layout for the grid with more flexible constraints
  const [layout, setLayout] = useState([
    { i: 'clients', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'activity', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'surveys', x: 0, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
    { i: 'metrics', x: 6, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
  ]);

  // Track which widgets are expanded
  const [expandedWidgets, setExpandedWidgets] = useState<Record<string, boolean>>({
    clients: false,
    activity: false,
    surveys: false,
    metrics: false,
  });

  // Use layout effect to handle resize events
  useLayoutEffect();

  // Get current location to detect route changes
  const [location] = useLocation();

  // Handle initial layout and route changes
  useEffect(() => {
    // Function to handle screen size changes
    const handleScreenSizeChange = () => {
      const viewportWidth = window.innerWidth;
      setWidth(viewportWidth);
      
      // Adjust layout based on screen size
      if (viewportWidth < 640) {
        // Mobile layout
        setLayout([
          { i: 'clients', x: 0, y: 0, w: 12, h: 2, minW: 3, minH: 2 },
          { i: 'activity', x: 0, y: 2, w: 12, h: 2, minW: 3, minH: 2 },
          { i: 'surveys', x: 0, y: 4, w: 12, h: 3, minW: 3, minH: 2 },
          { i: 'metrics', x: 0, y: 7, w: 12, h: 3, minW: 3, minH: 2 },
        ]);
      } else if (viewportWidth < 1024) {
        // Tablet layout
        setLayout([
          { i: 'clients', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'activity', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'surveys', x: 0, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
          { i: 'metrics', x: 6, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
        ]);
      } else {
        // Desktop layout
        setLayout([
          { i: 'clients', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'activity', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'surveys', x: 0, y: 2, w: 4, h: 3, minW: 3, minH: 2 },
          { i: 'metrics', x: 4, y: 2, w: 8, h: 3, minW: 3, minH: 2 },
        ]);
      }
    };

    // Initial layout adjustment
    handleScreenSizeChange();

    // Add resize listener
    window.addEventListener('resize', handleScreenSizeChange);

    // Force immediate resize when component mounts or route changes
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);

    // Trigger resize after a short delay to ensure proper rendering
    const timeoutId = setTimeout(() => {
      handleScreenSizeChange();
    }, 100);

    return () => {
      window.removeEventListener('resize', handleScreenSizeChange);
      clearTimeout(timeoutId);
    };
  }, [location]); // Re-run when route changes

  // Use useState for responsive width calculation
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => {
      const gridParent = document.querySelector('.layout')?.parentElement;
      if (gridParent) {
        setWidth(gridParent.clientWidth);
      }
    };

    // Create a ResizeObserver to watch the parent container
    const resizeObserver = new ResizeObserver(handleResize);
    const gridParent = document.querySelector('.layout')?.parentElement;
    if (gridParent) {
      resizeObserver.observe(gridParent);
    }

    // Also listen for window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle widget expansion
  const toggleWidgetExpansion = (widgetId: string) => {
    setExpandedWidgets(prev => ({
      ...prev,
      [widgetId]: !prev[widgetId]
    }));
  };

  // Handle layout changes
  const handleLayoutChange = (newLayout: any) => {
    // Only update layout if it's a valid change (not overlapping)
    const hasOverlap = newLayout.some((item: any) => {
      return newLayout.some((other: any) => {
        if (item.i === other.i) return false;
        return !(item.x + item.w <= other.x || other.x + other.w <= item.x ||
                item.y + item.h <= other.y || other.y + other.h <= item.y);
      });
    });

    if (!hasOverlap) {
      setLayout(newLayout);
    }
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
          { i: 'metrics', x: 0, y: 7, w: 12, h: 3, minW: 3, minH: 2 },
        ]);
      } else if (viewportWidth < 1024) {
        // Tablet layout: 2-column layout
        setLayout([
          { i: 'clients', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'activity', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'surveys', x: 0, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
          { i: 'metrics', x: 6, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
        ]);
      } else {
        // Desktop layout: maintain original
        setLayout([
          { i: 'clients', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'activity', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
          { i: 'surveys', x: 0, y: 2, w: 4, h: 3, minW: 3, minH: 2 },
          { i: 'metrics', x: 4, y: 2, w: 8, h: 3, minW: 3, minH: 2 },
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
      <div className="overflow-hidden rounded-xl bg-[#020e13] backdrop-blur-sm">
        <table className="min-w-full divide-y divide-[#243531]">
          <thead className="bg-[#0E1A1D]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-boldonse text-[#98B0AF] uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-boldonse text-[#98B0AF] uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-boldonse text-[#98B0AF] uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-[#243531]">
            {clientStatusData.map((client, index) => (
              <tr key={index} className="hover:bg-[#132622] transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-boldonse font-medium text-[#98B0AF]">{client.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-boldonse
                    bg-[#020e13] text-[#98B0AF]`}>
                    {client.status === 'healthy' ? 'Healthy' : 
                     client.status === 'needs-attention' ? 'Needs Attention' : 'At Risk'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-boldonse text-[#98B0AF]">{client.revenue}</td>
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
        <div key={index} className="flex items-start space-x-4 py-3 px-2 border-b border-[#243531] last:border-0 hover:bg-[#132622] rounded-xl transition-colors">
          <div className="bg-[#020e13] p-2.5 rounded-full">
            <Activity className="h-5 w-5 text-[#98B0AF]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-boldonse font-medium text-[#98B0AF] truncate">{activity.client}</p>
            <p className="text-sm font-boldonse text-[#98B0AF]">{activity.description}</p>
          </div>
          <div className="text-xs font-boldonse text-[#98B0AF]">{activity.date}</div>
        </div>
      ))}
    </div>
  );

  const surveyContent = (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center space-y-4">
        <BrandedSpinner />
        <div className="text-[#98B0AF] text-sm font-boldonse">Loading survey data...</div>
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
    <div className="flex-1 overflow-x-hidden space-y-5">
      <div className="rounded-lg transition-all duration-200 flex flex-col md:flex-row justify-between md:justify-between p-6 bg-[#0E1A1D]">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-semibold text-[#98B0AF]">Widget Dashboard</h1>
        </div>
      </div>

      <div>
        <div className="rounded-lg duration-200 mb-5 p-5 flex items-center justify-between bg-[#0E1A1D] border-none transition-colors">
          <div className="relative flex-grow max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#98B0AF]" />
            </div>
            <Input
              type="text"
              className="pl-10 bg-[#020e13] text-[#98B0AF] placeholder:text-[#98B0AF] border-none"
            />
          </div>
        </div>

        <div className="w-full px-0">
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={100}
            width={width}
            onLayoutChange={handleLayoutChange}
            isDraggable={true}
            isResizable={true}
            compactType={null}
            useCSSTransforms={true}
            preventCollision={true}
            allowOverlap={true}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            resizeHandles={['se', 'e', 's']}
            draggableHandle=".react-draggable-handle"
            transformScale={1}
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
    </div>
  );
}