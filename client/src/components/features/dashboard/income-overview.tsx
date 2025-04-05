import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card";
import { Button } from "@/components/common/button";
import { useRevenueHistory } from "@/hooks/use-revenue";
import { Skeleton } from "@/components/common/skeleton";

type ViewType = 'weekdays' | 'month';

export function IncomeOverview() {
  const [viewType, setViewType] = useState<ViewType>('weekdays');
  const { data: revenueData = [], isLoading } = useRevenueHistory(viewType === 'month' ? 'month' : 'week');

  // Find the maximum amount for scaling
  const maxAmount = Math.max(...revenueData.map(d => d.amount));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Income Overview</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={viewType === 'weekdays' ? 'default' : 'outline'}
            onClick={() => setViewType('weekdays')}
            size="sm"
          >
            Weekdays
          </Button>
          <Button
            variant={viewType === 'month' ? 'default' : 'outline'}
            onClick={() => setViewType('month')}
            size="sm"
          >
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : revenueData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No revenue data available
          </div>
        ) : (
          <div className="mt-3">
            <div className="flex items-end gap-4 h-[200px]">
              {revenueData.map((data, index) => {
                const height = (data.amount / maxAmount) * 100;
                return (
                  <div
                    key={data.period}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="w-full flex flex-col items-center">
                      <div className="text-sm font-medium text-gray-600">
                        ${data.amount.toLocaleString()}
                      </div>
                      <div
                        className={`w-full rounded-t-lg ${
                          height === 100 ? 'bg-blue-500' : 'bg-blue-200'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600">{data.period}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 