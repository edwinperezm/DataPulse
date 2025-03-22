import { useState, useEffect } from "react";
import { Client, Activity, AiSuggestion } from "@shared/schema";
import { getStatusColor, getTrendIcon } from "@/lib/status-utils";
import { ActivityTimeline } from "./activity-timeline";
import { AiCoach } from "./ai-coach";
import { X, Check, MessageSquare, BarChart3, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClientActivities, useClientSuggestions, useUpdateSuggestion } from "@/hooks/use-clients";
import { useCreateSurvey } from "@/hooks/use-surveys";
import { CreateSurveyModal } from "../surveys/create-survey-modal";

interface ClientDetailProps {
  client: Client;
  onClose: () => void;
}

export function ClientDetail({ client, onClose }: ClientDetailProps) {
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  
  const { data: activities = [], isLoading: isLoadingActivities } = useClientActivities(client.id);
  const { data: suggestions = [], isLoading: isLoadingSuggestions } = useClientSuggestions(client.id);
  const updateSuggestion = useUpdateSuggestion();
  
  const statusColors = getStatusColor(client.status as any);
  const trendIcon = getTrendIcon(client.trend as any);
  
  const handleMarkSuggestionComplete = (suggestionId: number) => {
    updateSuggestion.mutate({
      id: suggestionId,
      status: 'completed'
    });
  };
  
  return (
    <div className="fixed inset-0 overflow-hidden z-10 bg-gray-500 bg-opacity-75 flex">
      <div className="absolute inset-y-0 right-0 max-w-2xl w-full flex">
        <div className="relative w-full">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            {/* Header */}
            <div className="px-4 py-6 bg-primary-700 sm:px-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-primary-700 font-medium text-lg">
                    {client.initials}
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-medium text-white">{client.name}</h2>
                    <p className="text-sm text-primary-200">
                      Client since: {new Date(client.clientSince).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    className="bg-primary-700 rounded-md text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 px-4 py-6 sm:px-6">
              {/* Client score */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Health Score</h3>
                <div className="flex items-center">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl",
                    statusColors.accentBg,
                    statusColors.text
                  )}>
                    {client.healthScore}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-500">Status</div>
                    <div className="flex items-center">
                      <div className={cn("h-2.5 w-2.5 rounded-full mr-2", statusColors.dot)}></div>
                      <p className="text-sm font-medium text-gray-900">
                        {client.status === 'healthy' ? 'Healthy' : 
                         client.status === 'needs-attention' ? 'Needs Attention' : 'At Risk'}
                      </p>
                    </div>
                  </div>
                  <div className="ml-8">
                    <div className="text-sm font-medium text-gray-500">Trend</div>
                    <div className={cn("flex items-center", trendIcon.color)}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d={
                            trendIcon.icon === 'arrow-up' 
                              ? "M5 10l7-7m0 0l7 7m-7-7v18" 
                              : trendIcon.icon === 'arrow-down' 
                                ? "M19 14l-7 7m0 0l-7-7m7 7V3" 
                                : "M5 12h14"
                          } 
                        />
                      </svg>
                      <p className="text-sm font-medium">{Math.abs(client.trendValue)}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity metrics */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Metrics</h3>
                <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="px-4 py-3 bg-gray-50 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-gray-500 truncate">Login Frequency</dt>
                    <dd className="mt-1 text-xl font-semibold text-gray-900">
                      {client.usageStats.loginFrequency || 'N/A'}
                    </dd>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-gray-500 truncate">Usage Time</dt>
                    <dd className="mt-1 text-xl font-semibold text-gray-900">
                      {client.usageStats.usageTime || 'N/A'}
                    </dd>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-gray-500 truncate">Feature Usage</dt>
                    <dd className="mt-1 text-xl font-semibold text-gray-900">
                      {client.usageStats.featureUsage || 'N/A'}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* AI Coach */}
              <AiCoach 
                suggestions={suggestions} 
                onCompleteSuggestion={handleMarkSuggestionComplete}
                isLoading={isLoadingSuggestions}
              />

              {/* Recent Activity */}
              <ActivityTimeline 
                activities={activities} 
                isLoading={isLoadingActivities}
              />

              {/* Quick Actions */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    className="inline-flex flex-col items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <MessageSquare className="h-5 w-5 mb-1" />
                    Message
                  </button>
                  <button
                    type="button"
                    className="inline-flex flex-col items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    onClick={() => setShowSurveyModal(true)}
                  >
                    <BarChart3 className="h-5 w-5 mb-1" />
                    Send Survey
                  </button>
                  <button
                    type="button"
                    className="inline-flex flex-col items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <Flag className="h-5 w-5 mb-1" />
                    Flag Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Survey Modal */}
      <CreateSurveyModal 
        isOpen={showSurveyModal}
        onClose={() => setShowSurveyModal(false)}
        selectedClient={client}
      />
    </div>
  );
}
