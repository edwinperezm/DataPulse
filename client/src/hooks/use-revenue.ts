import { useQuery } from "@tanstack/react-query";

interface RevenueData {
  amount: number;
  currency: string;
  period: string;
  trend: number;
}

export function useTodayRevenue() {
  return useQuery<RevenueData>({
    queryKey: ['/api/revenue/today'],
  });
}

export function useRevenueHistory(period: 'week' | 'month' = 'week') {
  return useQuery<RevenueData[]>({
    queryKey: ['/api/revenue/history', period],
  });
} 