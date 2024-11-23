import React from 'react'
import { Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch id="notifications" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alert-threshold">Alert Threshold (kWh)</Label>
              <Input id="alert-threshold" type="number" placeholder="Enter threshold value" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-interval">Maintenance Interval (days)</Label>
              <Input id="maintenance-interval" type="number" placeholder="Enter interval in days" />
            </div>
            <Button>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}