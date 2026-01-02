"use client";

import { useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { InboundCallForm } from "./inbound-call-form";
import { OutboundCallForm } from "./outbound-call-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type CallType = "inbound" | "outbound";

export function CallFlowCatalyst() {
  const [callType, setCallType] = useState<CallType>("outbound");

  return (
    <Card className="w-full max-w-2xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl tracking-tight">CallFlow Catalyst</CardTitle>
        <CardDescription>
          Select a call type and fill in the details to initiate a call flow.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <RadioGroup
          defaultValue="outbound"
          onValueChange={(value: CallType) => setCallType(value)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
            <Label htmlFor="outbound" className="[&:has([data-state=checked])]:border-primary rounded-lg border-2 border-muted bg-transparent hover:border-primary/80 p-4 transition-all cursor-pointer flex flex-col items-center justify-center text-center">
              <RadioGroupItem value="outbound" id="outbound" className="sr-only" />
                <LogOut className="h-8 w-8 mb-2 text-primary" />
                <p className="font-semibold">Outbound Call</p>
                <p className="text-sm text-muted-foreground">Initiate automated calls.</p>
            </Label>
          
            <Label htmlFor="inbound" className="[&:has([data-state=checked])]:border-primary rounded-lg border-2 border-muted bg-transparent hover:border-primary/80 p-4 transition-all cursor-pointer flex flex-col items-center justify-center text-center">
              <RadioGroupItem value="inbound" id="inbound" className="sr-only" />
                <LogIn className="h-8 w-8 mb-2 text-primary" />
                <p className="font-semibold">Inbound Call</p>
                <p className="text-sm text-muted-foreground">Receive automated calls.</p>
            </Label>
          
            
        </RadioGroup>
        
        <div className="transition-all duration-300">
           {callType === 'outbound' && <OutboundCallForm key="outbound" />}
           {callType === 'inbound' && <InboundCallForm key="inbound" />}
        </div>
      </CardContent>
    </Card>
  );
}
