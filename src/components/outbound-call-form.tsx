// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";

// const outboundSchema = z.object({
//   agentName: z.string().min(2, "Agent name must be at least 2 characters."),
//   userName: z.string().min(2, "User name must be at least 2 characters."),
//   prompt: z.string().min(10, "Prompt must be at least 10 characters."),
//   userNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
//     message: "Phone number must be in E.164 format (e.g., +12223334444).",
//   }),
// });

// export function OutboundCallForm() {
//     const { toast } = useToast();
//     const [isLoading, setIsLoading] = useState(false);
    
//     const form = useForm<z.infer<typeof outboundSchema>>({
//         resolver: zodResolver(outboundSchema),
//         defaultValues: { agentName: "", userName: "", prompt: "", userNumber: "" },
//     });

//     async function onSubmit(values: z.infer<typeof outboundSchema>) {
//         setIsLoading(true);
//         try {
//             const response = await fetch("/api/call", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ ...values, type: 'outbound', telephonyNumber: '+15551234567', telephonyProvider: 'Twilio' }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => ({ message: "An unknown error occurred." }));
//                 throw new Error(errorData.message || "Network response was not ok");
//             }
            
//             toast({
//                 title: "Call Flow Initiated",
//                 description: "The outbound call flow has been successfully started.",
//             });
//             form.reset();
//         } catch (error) {
//             toast({
//                 variant: "destructive",
//                 title: "Error",
//                 description: error instanceof Error ? error.message : "There was a problem with your request.",
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     return (
//         <div className="animate-in fade-in-0 duration-500">
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <FormField
//                             control={form.control}
//                             name="agentName"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Agent Name</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="e.g., Aana Bell" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="userName"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>User Name</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="e.g., John Smith" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     <FormField
//                         control={form.control}
//                         name="prompt"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>System Prompt</FormLabel>
//                                 <FormControl>
//                                     <Textarea placeholder="Define the agent's purpose and instructions..." className="min-h-[120px]" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="userNumber"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>User's Phone Number</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="+919999988888" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        // <FormItem>
                        //     <FormLabel>Telephony No.</FormLabel>
                        //     <FormControl>
                        //         <Input value="+15735334614" readOnly disabled />
                        //     </FormControl>
                        // </FormItem>
//                         <FormItem>
//                             <FormLabel>Telephony Provider</FormLabel>
//                             <FormControl>
//                                 <Input value="Twilio" readOnly disabled />
//                             </FormControl>
//                         </FormItem>
//                     </div>
//                      <Button type="submit" disabled={isLoading} className="w-full">
//                         {isLoading ? (
//                           <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Initiating...
//                           </>
//                         ) : (
//                           "Initiate Outbound Call"
//                         )}
//                     </Button>
//                 </form>
//             </Form>
//         </div>
//     );
// }


"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

/* -------------------- Validation Schema -------------------- */
const outboundSchema = z.object({
  agentName: z.string().min(2, "Agent name must be at least 2 characters."),
  userName: z.string().min(2, "User name must be at least 2 characters."),
  prompt: z.string().min(10, "Prompt must be at least 10 characters."),
  userNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Phone number must be in E.164 format (e.g., +919999988888).",
  }),
});

type OutboundFormValues = z.infer<typeof outboundSchema>;

/* -------------------- Component -------------------- */
export function OutboundCallForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OutboundFormValues>({
    resolver: zodResolver(outboundSchema),
    defaultValues: {
      agentName: "",
      userName: "",
      prompt: "",
      userNumber: "",
    },
  });

  /* -------------------- Submit Handler -------------------- */
  async function onSubmit(values: OutboundFormValues) {
    setIsLoading(true);

    try {
      const payload = {
        agent_name: values.agentName,
        user_name: values.userName,
        phone_number: values.userNumber,
        transfer_to: values.userNumber,
        system_prompt: values.prompt,
        telephony_provider: "twilio",
      };

      const response = await fetch(
        "https://apioutboundagent.duckdns.org/start_call",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || result.status !== 1) {
        throw new Error(
          result?.data?.error_message || result?.message || "Call failed"
        );
      }

      toast({
        title: "Outbound Call Started ✅",
        description: `Agent ${result.data.agent_name} is now active.`,
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Call Failed ❌",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="animate-in fade-in-0 duration-500">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Agent & User */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="agentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., MIA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Prompt */}
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>System Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="You are my personal assistant"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="userNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+919898989898" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Telephony Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <FormItem>
              <FormLabel>Telephony Provider</FormLabel>
              <FormControl>
                <Input value="Twilio" readOnly disabled />
              </FormControl>
            </FormItem>

           <FormItem>
                <FormLabel>Telephony No.</FormLabel>
                <FormControl>
                    <Input value="+15735334614" readOnly disabled />
                </FormControl>
            </FormItem>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initiating Call...
              </>
            ) : (
              "Initiate Outbound Call"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
