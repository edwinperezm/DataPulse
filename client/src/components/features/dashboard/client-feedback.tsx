import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card";
import { Star } from "lucide-react";
import { useClients } from "@/hooks/use-clients";
import { Skeleton } from "@/components/common/skeleton";

export function ClientFeedback() {
  const { data: clients = [], isLoading } = useClients();

  // Calculate average health score
  const avgHealthScore = clients.length > 0
    ? (clients.reduce((sum, client) => sum + client.healthScore, 0) / clients.length / 20).toFixed(1)
    : '0.0';

  // Calculate total reviews
  const totalReviews = clients.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Client Satisfaction</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <span className="text-4xl font-bold">{avgHealthScore}</span>
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
            </div>
            <p className="text-sm text-gray-500">
              Based on {totalReviews} client reviews
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 