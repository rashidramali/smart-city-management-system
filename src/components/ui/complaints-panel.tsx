import React from 'react'
import { MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const complaints = [
  { id: 1, message: 'Streetlight near 123 Main St is too bright', status: 'New', time: '2 hours ago' },
  { id: 2, message: 'Flickering light on Oak Avenue', status: 'In Progress', time: '1 day ago' },
  { id: 3, message: 'Dark area on Elm Street', status: 'Resolved', time: '3 days ago' },
]

export default function ComplaintsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Complaints</h2>
      {complaints.map((complaint) => (
        <Card key={complaint.id}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2" />
              Complaint #{complaint.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{complaint.message}</p>
            <p className="text-sm text-muted-foreground mt-2">Status: {complaint.status}</p>
            <p className="text-sm text-muted-foreground">Received: {complaint.time}</p>
            <div className="mt-4">
              <Button size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}