import { useQuery } from "@tanstack/react-query";

export interface Appointment {
  id: number;
  clientId: number;
  clientName: string;
  clientInitials: string;
  type: 'meeting' | 'call' | 'review';
  startTime: string;
  endTime: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export function useAppointments(period: 'week' | 'month' = 'week') {
  return useQuery<Appointment[]>({
    queryKey: ['/api/appointments', period],
  });
}

export function useClientAppointments(clientId: number) {
  return useQuery<Appointment[]>({
    queryKey: ['/api/appointments/client', clientId],
    enabled: !!clientId,
  });
} 