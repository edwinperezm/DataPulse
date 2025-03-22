import { useState } from "react";
import { useClients } from "@/hooks/use-clients";
import { SummaryMetric } from "@/components/dashboard/summary-metric";
import { ClientListItem } from "@/components/dashboard/client-list-item";
import { ClientDetail } from "@/components/clients/client-detail";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, AlertTriangle, SmilePlus, BarChart2, PlusCircle, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Client } from "@shared/schema";

export default function Dashboard() {
  const { data: clients = [], isLoading } = useClients();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  // Calculate summary metrics
  const totalClients = clients.length;
  const atRiskClients = clients.filter(client => client.status === 'at-risk').length;
  const avgSentiment = clients.length > 0 
    ? (clients.reduce((sum, client) => sum + client.healthScore, 0) / clients.length / 10).toFixed(1)
    : '0.0';
  const pendingSurveys = 5; // Placeholder - should be calculated from real data
  
  return (
    <>
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        {/* Dashboard header */}
        <div className="py-6 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Client Dashboard</h1>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Link href="/clients/new">
                <Button size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          {/* Summary metrics */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <SummaryMetric
              title="Total Clients"
              value={totalClients}
              trend={{ value: 3, positive: true }}
              icon={<Users />}
            />
            <SummaryMetric
              title="At Risk"
              value={atRiskClients}
              trend={{ value: 2, positive: false }}
              icon={<AlertTriangle />}
              iconColorClass="text-red-500"
              iconBgClass="bg-red-50"
            />
            <SummaryMetric
              title="Avg. Sentiment"
              value={avgSentiment}
              icon={<SmilePlus />}
              iconColorClass="text-green-500"
              iconBgClass="bg-green-50"
            />
            <SummaryMetric
              title="Pending Surveys"
              value={pendingSurveys}
              icon={<BarChart2 />}
              iconColorClass="text-yellow-500"
              iconBgClass="bg-yellow-50"
            />
          </div>

          {/* Client list */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Client Health Overview</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {isLoading ? (
                <div className="p-6 space-y-6">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : clients.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 mb-4">No clients found</p>
                  <Link href="/clients/new">
                    <Button>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Your First Client
                    </Button>
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {clients.map((client) => (
                    <ClientListItem
                      key={client.id}
                      client={client}
                      onClick={() => setSelectedClient(client)}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Client detail drawer */}
      {selectedClient && (
        <ClientDetail
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </>
  );
}
