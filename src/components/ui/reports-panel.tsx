import React from 'react'
import { FileText, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const reports = [
  { id: 1, name: 'Monthly Energy Consumption Report', date: '2023-05-01' },
  { id: 2, name: 'Quarterly Maintenance Summary', date: '2023-04-01' },
  { id: 3, name: 'Annual Performance Analysis', date: '2023-01-01' },
]

export default function ReportsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Reports</h2>
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" />
              {report.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Generated on: {report.date}</p>
            <div className="mt-4">
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}