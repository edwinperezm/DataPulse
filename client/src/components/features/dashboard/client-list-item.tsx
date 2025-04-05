import { Link } from "wouter";
import { Client } from "@shared/schema";
import { formatActivityDate, getStatusColor, getStatusLabel } from "@/utils/status-utils";
import { cn } from "@/utils/utils";

interface ClientListItemProps {
  client: Client;
  onClick?: () => void;
}

export function ClientListItem({ client, onClick }: ClientListItemProps) {
  const statusColors = getStatusColor(client.status as any);
  
  return (
    <li>
      <div className="block hover:bg-gray-50 cursor-pointer" onClick={onClick}>
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium text-lg">
                {client.initials}
              </div>
            </div>
            <div className="min-w-0 flex-1 px-4">
              <div>
                <div className="flex items-center">
                  <p className="text-sm font-medium text-primary-600 truncate">
                    {client.name}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      statusColors.badge
                    )}>
                      {getStatusLabel(client.status as any)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <p className="truncate">
                    Last activity: {formatActivityDate(new Date(client.lastActivityAt))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              {/* Simple activity visualization */}
              {[9, 6, 7, 5, 9].map((height, i) => (
                <div 
                  key={i}
                  className={cn(
                    "w-2 rounded",
                    statusColors.dot,
                    `h-${height}`
                  )}
                ></div>
              ))}
            </div>
            <button
              type="button"
              className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
