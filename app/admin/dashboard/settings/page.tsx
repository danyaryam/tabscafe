"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Settings</h2>
        <p className="text-neutral-400 mt-1">Manage your store settings and preferences</p>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Store Information</CardTitle>
          <CardDescription className="text-neutral-400">Update your store details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name" className="text-white">
              Store Name
            </Label>
            <Input id="store-name" defaultValue="Cafe Tabs" className="bg-neutral-950 border-neutral-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-email" className="text-white">
              Email
            </Label>
            <Input
              id="store-email"
              type="email"
              defaultValue="contact@cafetabs.com"
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-phone" className="text-white">
              Phone
            </Label>
            <Input
              id="store-phone"
              defaultValue="+1 234 567 8900"
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Security</CardTitle>
          <CardDescription className="text-neutral-400">Update your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-white">
              Current Password
            </Label>
            <Input id="current-password" type="password" className="bg-neutral-950 border-neutral-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-white">
              New Password
            </Label>
            <Input id="new-password" type="password" className="bg-neutral-950 border-neutral-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-white">
              Confirm Password
            </Label>
            <Input id="confirm-password" type="password" className="bg-neutral-950 border-neutral-800 text-white" />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  )
}
