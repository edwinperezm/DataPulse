import { Activity } from "@shared/schema";
import { formatActivityDate, getIconBackground, getIconColor, getActivityIcon } from "@/lib/status-utils";
import { cn } from "@/lib/utils";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  BarChart2, 
  User, 
  Loader
} from "lucide-react";

interface ActivityTimelineProps {
  activities: Activity[];
  isLoading?: boolean;
}

export function ActivityTimeline({ activities, isLoading = false }: ActivityTimelineProps) {
  // Function to get the appropriate icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'check':
        return <CheckCircle />;
      case 'exclamation-triangle':
        return <AlertTriangle />;
      case 'poll':
        return <BarChart2 />;
      case 'user-circle':
      default:
        return <User />;
    }
  };

  if (isLoading) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Activity</h3>
        <div className="flow-root">
          <div className="flex justify-center items-center py-10">
            <Loader className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Activity</h3>
        <div className="flow-root rounded-lg border border-gray-200 p-6">
          <p className="text-center text-gray-500">No activity recorded yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Activity</h3>
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, index) => {
            // Skip activities with invalid data
            if (!activity || !activity.id || !activity.icon || !activity.iconBackground || !activity.createdAt) {
              return null;
            }
            
            return (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index < activities.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center",
                          getIconBackground(activity.iconBackground),
                          getIconColor(activity.iconBackground)
                        )}
                      >
                        {getIconComponent(activity.icon)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-800">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={typeof activity.createdAt === 'string' ? activity.createdAt : activity.createdAt.toString()}>
                          {formatActivityDate(new Date(activity.createdAt))}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
