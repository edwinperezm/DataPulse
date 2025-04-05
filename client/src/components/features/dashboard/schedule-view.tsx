import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card";
import { Button } from "@/components/common/button";
import { Badge } from "@/components/common/badge";
import { ChevronRight } from "lucide-react";
import { useAppointments, Appointment } from "@/hooks/use-appointments";
import { Skeleton } from "@/components/common/skeleton";

type ViewType = 'weekdays' | 'week' | 'month';

export function ScheduleView() {
  const [viewType, setViewType] = useState<ViewType>('weekdays');
  const { data: appointments = [], isLoading } = useAppointments(viewType === 'month' ? 'month' : 'week');

  // Group appointments by day
  const appointmentsByDay = appointments.reduce((acc, appointment) => {
    const day = new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long' });
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(appointment);
    return acc;
  }, {} as Record<string, Appointment[]>);

  const getAppointmentTypeStyle = (type: Appointment['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'call':
        return 'bg-green-100 text-green-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Schedule</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={viewType === 'weekdays' ? 'default' : 'outline'}
            onClick={() => setViewType('weekdays')}
            size="sm"
          >
            Weekdays
          </Button>
          <Button
            variant={viewType === 'week' ? 'default' : 'outline'}
            onClick={() => setViewType('week')}
            size="sm"
          >
            Week
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
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : Object.entries(appointmentsByDay).length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No appointments scheduled
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(appointmentsByDay).map(([day, dayAppointments]) => (
              <div key={day}>
                <h3 className="font-medium text-gray-900 mb-2">{day}</h3>
                <div className="space-y-2">
                  {dayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                          {new Date(appointment.startTime).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </div>
                        <Badge className={getAppointmentTypeStyle(appointment.type)}>
                          {appointment.type}
                        </Badge>
                        {appointment.clientName && (
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm">
                              {appointment.clientInitials}
                            </div>
                            <span className="text-sm font-medium">
                              {appointment.clientName}
                            </span>
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 