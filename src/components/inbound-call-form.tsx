"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const inboundSchema = z.object({
  agentName: z.string().min(2, "Agent name must be at least 2 characters."),
  prompt: z.string().min(10, "Prompt must be at least 10 characters."),
});

export function InboundCallForm() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof inboundSchema>>({
        resolver: zodResolver(inboundSchema),
        defaultValues: { agentName: "", prompt: "" },
    });

    async function onSubmit(values: z.infer<typeof inboundSchema>) {
        setIsLoading(true);
        try {
            const response = await fetch("/api/call", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, type: 'inbound', telephonyNumber: '+15551234567', telephonyProvider: 'Twilio' }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "An unknown error occurred." }));
                throw new Error(errorData.message || "Network response was not ok");
            }

            toast({
                title: "Call Flow Initiated",
                description: "The inbound call flow has been successfully started.",
            });
            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "There was a problem with your request.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="animate-in fade-in-0 duration-500">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="agentName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Support Bot" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>System Prompt</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Define the agent's purpose and instructions..." className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <FormItem>
                            <FormLabel>Telephony No.</FormLabel>
                            <FormControl>
                                <Input value="+15551234567" readOnly disabled />
                            </FormControl>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Telephony Provider</FormLabel>
                            <FormControl>
                                <Input value="Twilio" readOnly disabled />
                            </FormControl>
                        </FormItem>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Initiating...
                          </>
                        ) : (
                          "Initiate Inbound Call"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
