import { useState } from "react";
import { useClients } from "@/hooks/use-clients";
import { ClientDetail } from "@/components/features/clients/client-detail";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Badge } from "@/components/common/badge";
import { Card, CardContent } from "@/components/common/card";
import { Link } from "wouter";
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { Skeleton } from "@/components/common/skeleton";
import { Client } from "@shared/schema";
import { formatActivityDate, getStatusColor, getStatusLabel } from "@/utils/status-utils";
import { cn } from "@/utils/utils";

export default function Clients() {
  const { data: clients = [], isLoading } = useClients();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
      {/* Page header with call to action */}
      <div className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          <div className="flex space-x-3">
            <Link href="/clients/new">
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Clients content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {/* Search and filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-grow max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search clients..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Status summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-gray-100 p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Healthy</p>
                <p className="text-2xl font-semibold">
                  {clients.filter(c => c.status === 'healthy').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-gray-100 p-3 mr-4">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Needs Attention</p>
                <p className="text-2xl font-semibold">
                  {clients.filter(c => c.status === 'needs-attention').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-gray-100 p-3 mr-4">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">At Risk</p>
                <p className="text-2xl font-semibold">
                  {clients.filter(c => c.status === 'at-risk').length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client list */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-6">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="p-8 text-center">
                {searchQuery ? (
                  <p className="text-gray-500 mb-4">No clients found matching "{searchQuery}"</p>
                ) : (
                  <>
                    <p className="text-gray-500 mb-4">No clients found</p>
                    <Link href="/clients/new">
                      <Button>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Your First Client
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClients.map((client) => {
                      const statusColors = getStatusColor(client.status as any);
                      return (
                        <tr 
                          key={client.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedClient(client)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                                {client.initials}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                <div className="text-sm text-gray-500">
                                  Since {new Date(client.clientSince).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={cn(statusColors.badge)}>
                              {getStatusLabel(client.status as any)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{client.healthScore}</div>
                            <div className={cn("text-xs", client.trendValue > 0 ? "text-gray-600" : client.trendValue < 0 ? "text-gray-600" : "text-gray-500")}>
                              {client.trendValue > 0 ? '↑' : client.trendValue < 0 ? '↓' : '→'} {Math.abs(client.trendValue)}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatActivityDate(new Date(client.lastActivityAt))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedClient(client);
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
