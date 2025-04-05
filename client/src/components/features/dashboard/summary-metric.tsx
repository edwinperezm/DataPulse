import React from "react";
import { cn } from "@/utils/utils";

interface SummaryMetricProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    label?: string;
    positive?: boolean;
  };
  icon: React.ReactNode;
  iconColorClass?: string;
  iconBgClass?: string;
}

export function SummaryMetric({
  title,
  value,
  trend,
  icon,
  iconColorClass = "text-primary-600",
  iconBgClass = "bg-primary-50",
}: SummaryMetricProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", iconBgClass)}>
            <div className={cn("text-xl", iconColorClass)}>{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {trend && (
                  <div
                    className={cn(
                      "ml-2 flex items-baseline text-sm font-semibold",
                      trend.positive ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {trend.positive ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                    <span className="sr-only">{trend.positive ? "Increased by" : "Decreased by"}</span>
                    {trend.value}
                    {trend.label && <span className="ml-1">{trend.label}</span>}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
