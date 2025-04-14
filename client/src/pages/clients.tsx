import { useState } from "react";
import { useLayoutEffect } from '@/hooks/use-layout-effect';
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
interface Client {
  id: number;
  name: string;
  email: string;
  initials: string;
  status: string;
  lastActivityAt: Date;
  clientSince: Date;
  healthScore: number;
  trend: string;
  trendValue: number;
  usageStats: unknown;
}
import { formatActivityDate, getStatusColor, getStatusLabel } from "@/utils/status-utils";
import { cn } from "@/utils/utils";

export default function Clients() {
  const { data: clients = [], isLoading, mutate } = useClients();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleDeleteClient = async (id: number) => {
    try {
      await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      mutate();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  // Use layout effect to handle resize events
  useLayoutEffect();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex-1 overflow-x-hidden space-y-8">
      {/* Page header with call to action */}
      <div className="rounded-lg transition-all duration-200 flex flex-col md:flex-row justify-between md:justify-between p-6 bg-[#0E1A1D]">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-semibold text-white">Clients</h1>
          <div className="flex space-x-3">
            <Link href="/clients/new">
              <Button 
                variant="default" 
                className="bg-[#020e13] hover:bg-[#132622] text-white hover:text-white border-none"
              >
                <PlusCircle className="w-4 h-4 mr-2 text-[#98B0AF]" />
                Add Client
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Clients content */}
      <div className="mx-auto py-0 px-0 ml-0 mr-0">
        {/* Search and filters */}
        <div className="rounded-lg duration-200 mb-6 p-4 flex items-center justify-between bg-[#0E1A1D] border-none transition-colors" style={{ borderStyle: 'none' }}>
          <div className="relative flex-grow max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white" />
            </div>
            <Input
              type="text"
              className="pl-10 bg-[#020e13] text-white placeholder:text-white border-none"
              style={{ borderStyle: 'none' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="bg-[#020e13] hover:bg-[#132622] text-white hover:text-white border-none"
            style={{ borderStyle: 'none' }}
          >
            <Filter className="w-4 h-4 mr-2 text-white" />
            Filters
          </Button>
        </div>

        {/* Status summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#0E1A1D] border-none" style={{ border: 'none' }}>
            <CardContent className="p-4 flex items-center border-none" style={{ border: 'none', borderStyle: 'none' }}>
              <div className="rounded-full bg-[#020e13] p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white text-sm">Healthy</p>
                <p className="text-2xl font-semibold text-white">
                  {clients.filter(c => c.status === 'healthy').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#0E1A1D] border-none" style={{ border: 'none' }}>
            <CardContent className="p-4 flex items-center border-none" style={{ border: 'none', borderStyle: 'none' }}>
              <div className="rounded-full bg-[#020e13] p-3 mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white text-sm">Needs Attention</p>
                <p className="text-2xl font-semibold text-white">
                  {clients.filter(c => c.status === 'needs-attention').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#0E1A1D] border-none" style={{ border: 'none' }}>
            <CardContent className="p-4 flex items-center border-none" style={{ border: 'none', borderStyle: 'none' }}>
              <div className="rounded-full bg-[#020e13] p-3 mr-4">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white text-sm">At Risk</p>
                <p className="text-2xl font-semibold text-white">
                  {clients.filter(c => c.status === 'at-risk').length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client list */}
        <Card className="bg-[#0E1A1D] border-none" style={{ border: 'none' }}>
          <CardContent className="p-0 border-none" style={{ border: 'none', borderStyle: 'none' }}>
            {isLoading ? (
              <div className="p-6 space-y-6">
                <Skeleton className="h-16 w-full bg-[#132622]" />
                <Skeleton className="h-16 w-full bg-[#132622]" />
                <Skeleton className="h-16 w-full bg-[#132622]" />
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="p-8 text-center">
                {searchQuery ? (
                  <p className="text-white mb-4">No clients found matching "{searchQuery}"</p>
                ) : (
                  <>
                    <p className="text-white mb-4">No clients found</p>
                    <Link href="/clients/new">
                      <Button 
                        variant="default" 
                        className="bg-[#020e13] hover:bg-[#132622] text-white hover:text-white border-none"
                      >
                        <PlusCircle className="w-4 h-4 mr-2 text-white" />
                        Add Your First Client
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col p-0">
                <div className="rounded-md border border-[#243531] overflow-hidden w-full">
                  <table className="min-w-full divide-y divide-[#243531]">
                    <thead className="bg-[#020E13]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Health Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Last Activity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#243531]">
                      {filteredClients.map((client) => {
                        const statusColors = getStatusColor(client.status as any);
                        return (
                          <tr key={client.id} className="hover:bg-[#020E13] transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#020E13] flex items-center justify-center text-white font-medium mr-4">
                                  {client.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white">{client.name}</div>
                                  <div className="text-sm text-white/60">{client.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={cn(
                                  "text-xs font-medium bg-[#020E13]",
                                  statusColors.badge
                                )}
                              >
                                {getStatusLabel(client.status as any)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="mr-2 text-white">{client.healthScore}%</span>
                                <div className="w-24 bg-[#020E13] rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      client.healthScore > 70 ? 'bg-[#98B0AF]' :
                                      client.healthScore > 50 ? 'bg-[#607877]' :
                                      'bg-[#3D4F4D]'
                                    }`}
                                    style={{ width: `${client.healthScore}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">{formatActivityDate(new Date(client.lastActivityAt))}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <Link href={`/clients/${client.id}/edit`}>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="hover:bg-[#020E13] text-white/60 hover:text-white transition-colors"
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="hover:bg-[#020E13] text-white/60 hover:text-white transition-colors"
                                  onClick={() => handleDeleteClient(client.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
    </div>
  );
}
