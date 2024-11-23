import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, CheckCircle } from "lucide-react"

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
}

export default function AlertsPanel() {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "critical",
      message: "System Error Detected",
      time: "2024-03-20 10:00"
    },
    {
      id: "2",
      type: "warning",
      message: "Low Memory Warning",
      time: "2024-03-20 09:45"
    }
  ];
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Alerts</h2>
      {alerts.map((alert) => (
        <Card key={alert.id}>
          <CardHeader>
            <CardTitle className="flex items-center">
              {alert.type === 'critical' && <AlertTriangle className="mr-2 text-red-500" />}
              {alert.type === 'warning' && <Clock className="mr-2 text-yellow-500" />}
              {alert.type === 'info' && <CheckCircle className="mr-2 text-green-500" />}
              {alert.message}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{alert.time}</p>
            <div className="mt-4">
              <Button size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}