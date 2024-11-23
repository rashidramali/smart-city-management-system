'use client'

import React, { useState } from 'react'
import { Map, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import AlertsPanel from '@/components/ui/alerts-panel'
import ComplaintsPanel from '@/components/ui/complaints-panel'
import ReportsPanel from '@/components/ui/reports-panel'
import SettingsPanel from '@/components/ui/settings-panel'

interface Streetlight {
  id: string;
  status: 'operational' | 'faulty' | 'maintenance';
  position: { x: number; y: number };
  specs: {
    bulbType: string;
    wattage: string;
    installationDate: string;
    lastMaintenance: string;
    energyConsumption: string;
    predictiveLifespan: string;
  };
  maintenanceRecords: Array<{ date: string; description: string }>;
}

export default function Home() {
  const [selectedStreetlight, setSelectedStreetlight] = useState<Streetlight | null>(null)
  const [showWorkOrderPanel, setShowWorkOrderPanel] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const streetlights: Streetlight[] = [
    { 
      id: 'SL001', 
      status: 'operational' as const, 
      position: { x: 100, y: 100 },
      specs: {
        bulbType: 'LED',
        wattage: '100W',
        installationDate: '2022-01-15',
        lastMaintenance: '2023-03-10',
        energyConsumption: '1.2 kWh',
        predictiveLifespan: '2025-06-30'
      },
      maintenanceRecords: [
        { date: '2023-03-10', description: 'Routine check and cleaning' },
        { date: '2022-09-05', description: 'Replaced faulty sensor' }
      ]
    },
    { 
      id: 'SL002', 
      status: 'faulty' as const, 
      position: { x: 200, y: 150 },
      specs: {
        bulbType: 'LED',
        wattage: '80W',
        installationDate: '2021-11-20',
        lastMaintenance: '2023-02-15',
        energyConsumption: '0.9 kWh',
        predictiveLifespan: '2025-04-30'
      },
      maintenanceRecords: [
        { date: '2023-02-15', description: 'Replaced flickering bulb' },
        { date: '2022-08-10', description: 'Firmware update' }
      ]
    },
    { 
      id: 'SL003', 
      status: 'maintenance' as const, 
      position: { x: 150, y: 200 },
      specs: {
        bulbType: 'LED',
        wattage: '120W',
        installationDate: '2022-03-05',
        lastMaintenance: '2023-04-20',
        energyConsumption: '1.4 kWh',
        predictiveLifespan: '2025-09-15'
      },
      maintenanceRecords: [
        { date: '2023-04-20', description: 'Ongoing: Repairing damaged casing' },
        { date: '2022-10-12', description: 'Adjusted light sensor' }
      ]
    },
  ]

  const handleStreetlightHover = (streetlight: Streetlight) => {
    setSelectedStreetlight(streetlight)
  }

  const handleStreetlightLeave = () => {
    setSelectedStreetlight(null)
  }

  const handleCreateWorkOrder = () => {
    setShowWorkOrderPanel(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'alerts':
        return <AlertsPanel />
      case 'complaints':
        return <ComplaintsPanel />
      case 'reports':
        return <ReportsPanel />
      case 'settings':
        return <SettingsPanel />
      default:
        return (
          <div className="flex h-full">
            {/* Interactive Map */}
            <div className="flex-1 bg-accent rounded-lg p-4 relative">
              <h2 className="text-lg font-semibold mb-4">Geospatial Map</h2>
              {/* Placeholder for the interactive map */}
              <div className="w-full h-[calc(100%-2rem)] bg-muted rounded-lg relative">
                <TooltipProvider>
                  {streetlights.map((streetlight) => (
                    <Tooltip key={streetlight.id}>
                      <TooltipTrigger asChild>
                        <div
                          className={`absolute w-4 h-4 rounded-full cursor-pointer ${
                            streetlight.status === 'operational' ? 'bg-green-500' :
                            streetlight.status === 'faulty' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                          style={{ left: streetlight.position.x, top: streetlight.position.y }}
                          onMouseEnter={() => handleStreetlightHover(streetlight)}
                          onMouseLeave={handleStreetlightLeave}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{streetlight.id}</p>
                        <p>Status: {streetlight.status}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>

            {/* KPI Section */}
            <div className="w-64 ml-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Streetlight Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Operational:</span>
                      <span className="font-semibold">245</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Faulty:</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Under Maintenance:</span>
                      <span className="font-semibold">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Energy Consumption</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Daily:</span>
                      <span className="font-semibold">1,245 kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly:</span>
                      <span className="font-semibold">8,715 kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly:</span>
                      <span className="font-semibold">37,350 kWh</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <div className="flex items-center space-x-4">
          <Map className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Smart Streetlight Management System</h1>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-64 bg-secondary p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North</SelectItem>
                <SelectItem value="south">South</SelectItem>
                <SelectItem value="east">East</SelectItem>
                <SelectItem value="west">West</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="faulty">Faulty</SelectItem>
                <SelectItem value="maintenance">Under Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Maintenance Cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-serviced">Last Serviced</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* Map and KPI Section */}
        <main className="flex-1 p-4 overflow-hidden">
          {renderContent()}
        </main>

        {/* Streetlight Details Sidebar */}
        <aside className={`w-96 bg-secondary p-4 overflow-y-auto transition-all duration-300 ease-in-out ${selectedStreetlight ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedStreetlight && (
            <>
              <h2 className="text-lg font-semibold mb-4">Streetlight Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">ID: {selectedStreetlight.id}</h3>
                  <p>Status: {selectedStreetlight.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Specifications</h3>
                  <p>Bulb Type: {selectedStreetlight.specs.bulbType}</p>
                  <p>Wattage: {selectedStreetlight.specs.wattage}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Installation Date</h3>
                  <p>{new Date(selectedStreetlight.specs.installationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Last Maintenance</h3>
                  <p>{new Date(selectedStreetlight.specs.lastMaintenance).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Energy Consumption (Last Cycle)</h3>
                  <p>{selectedStreetlight.specs.energyConsumption}</p>
                  <p className="text-sm text-muted-foreground">Last night 7:00 PM - 7:00 AM</p>
                </div>
                <div>
                  <h3 className="font-semibold">Predictive Lifespan</h3>
                  <p>Estimated replacement: {new Date(selectedStreetlight.specs.predictiveLifespan).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Maintenance Records</h3>
                  <ul className="list-disc list-inside">
                    {selectedStreetlight.maintenanceRecords.map((record, index) => (
                      <li key={index}>
                        {new Date(record.date).toLocaleDateString()}: {record.description}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-x-2">
                  <Button onClick={handleCreateWorkOrder}>Create Work Order</Button>
                  <Button variant="outline">Update Status</Button>
                  <Button variant="outline">Toggle On/Off</Button>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Work Order Panel */}
      <div className={`fixed bottom-0 left-0 right-0 bg-background p-4 transition-all duration-300 ease-in-out ${showWorkOrderPanel ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Work Order Management</h2>
          <Button variant="ghost" onClick={() => setShowWorkOrderPanel(false)}>
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>SL002 - Open Circuit</span>
                <Button size="sm">Assign</Button>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>SL005 - Flickering</span>
                <Button size="sm">Assign</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}