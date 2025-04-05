import { useState } from "react";
import { useClients } from "@/hooks/use-clients";
import { usePendingSurveysCount } from "@/hooks/use-surveys";
import { useTodayRevenue } from "@/hooks/use-revenue";
import { ScheduleView } from "@/components/features/dashboard/schedule-view";
import { IncomeOverview } from "@/components/features/dashboard/income-overview";
import { ClientFeedback } from "@/components/features/dashboard/client-feedback";
import { VisitHistory } from "@/components/features/dashboard/visit-history";
import { AISuggestions } from "@/components/features/dashboard/ai-suggestions";
import { Client } from "@shared/schema";
import { Card, CardContent } from "@/components/common/card";
import { Skeleton } from "@/components/common/skeleton";

export default function Dashboard() {
  const { data: clients = [], isLoading: isLoadingClients } = useClients();
  const { data: pendingSurveysCount = 0, isLoading: isLoadingSurveys } = usePendingSurveysCount();
  const { data: todayRevenue, isLoading: isLoadingRevenue } = useTodayRevenue();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  // Calculate summary metrics
  const totalClients = clients.length;
  const atRiskClients = clients.filter(client => client.status === 'at-risk').length;
  const avgSentiment = clients.length > 0 
    ? (clients.reduce((sum, client) => sum + client.healthScore, 0) / clients.length / 20).toFixed(1)
    : '0.0';
  
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Schedule Section - Spans 8 columns */}
      <div className="col-span-8">
        <ScheduleView />
      </div>

      {/* Right Side Stats - Span 4 columns */}
      <div className="col-span-4 space-y-6">
        <ClientFeedback />
        {isLoadingRevenue ? (
          <Skeleton className="h-[104px] w-full" />
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-semibold">
                ${todayRevenue?.amount.toLocaleString() ?? '0'}
              </div>
              <div className="text-sm text-gray-600">Today's Revenue</div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Income Overview - Spans 8 columns */}
      <div className="col-span-8">
        <IncomeOverview />
      </div>

      {/* Client Health Overview - Spans 4 columns */}
      <div className="col-span-4 space-y-6">
        {isLoadingClients || isLoadingSurveys ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-600 mb-1">Total Clients</div>
                <div className="text-xl font-semibold">{totalClients}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-600 mb-1">At Risk</div>
                <div className="text-xl font-semibold text-red-500">{atRiskClients}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-600 mb-1">Avg. Sentiment</div>
                <div className="text-xl font-semibold text-green-500">{avgSentiment}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-600 mb-1">Pending</div>
                <div className="text-xl font-semibold text-yellow-500">{pendingSurveysCount}</div>
              </CardContent>
            </Card>
          </div>
        )}
        <AISuggestions />
      </div>

      {/* Visit History - Spans full width */}
      <div className="col-span-12">
        <VisitHistory />
      </div>
    </div>
  );
}
