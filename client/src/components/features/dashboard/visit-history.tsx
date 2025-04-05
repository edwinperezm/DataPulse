import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface VisitHistoryItem {
  client: string;
  email: string;
  service: string;
  serviceType: string;
  status: 'completed' | 'pending' | 'cancelled';
  lastVisit: string;
}

export function VisitHistory() {
  const [viewType, setViewType] = useState<'Weekdays' | 'Week' | 'Month'>('Weekdays');

  // Sample data - would be replaced with real data
  const visits: VisitHistoryItem[] = [
    {
      client: 'Acme Corp',
      email: 'contact@acme.com',
      service: 'Enterprise Plan',
      serviceType: 'Subscription',
      status: 'completed',
      lastVisit: '2024-03-15'
    },
    {
      client: 'TechStart Inc',
      email: 'info@techstart.com',
      service: 'Consulting',
      serviceType: 'Project',
      status: 'pending',
      lastVisit: '2024-03-14'
    },
    {
      client: 'Global Solutions',
      email: 'support@globalsolutions.com',
      service: 'Premium Support',
      serviceType: 'Service',
      status: 'completed',
      lastVisit: '2024-03-13'
    }
  ];

  const getStatusColor = (status: VisitHistoryItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Client Activity</h2>
        <div className="flex gap-2">
          {(['Weekdays', 'Week', 'Month'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-3 py-1 rounded-lg text-sm ${
                viewType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {visits.map((visit, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="space-y-1">
              <div className="font-medium">{visit.client}</div>
              <div className="text-sm text-gray-600">{visit.email}</div>
              <div className="text-sm text-gray-600">{visit.service} - {visit.serviceType}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">{visit.lastVisit}</div>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(visit.status)}`} />
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 