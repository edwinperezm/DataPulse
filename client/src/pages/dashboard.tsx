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
import { SectionTitle } from "@/components/ui/section-title";

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
    <div className="u-layout-container">
      <SectionTitle
        title="Client Dashboard"
        subtitle="Monitor client health, sentiment, and engagement"
        actions={
          <>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Link href="/clients/new">
              <Button size="sm" className="rounded-xl">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </Link>
          </>
        }
      />

      {/* Dashboard content */}
      <div className="animate-slide-up">
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
          <h2 className="text-lg font-medium text-apple-black mb-4">Client Health Overview</h2>
          <div className="bg-white/80 backdrop-blur-md shadow overflow-hidden rounded-2xl">
            {isLoading ? (
              <div className="p-6 space-y-6">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : clients.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-apple-darkgray mb-4">No clients found</p>
                <Link href="/clients/new">
                  <Button className="rounded-xl">
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

      {/* Client detail drawer */}
      {selectedClient && (
        <ClientDetail
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
}
