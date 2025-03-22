import React from "react";
import { useCreateClient } from "@/hooks/use-clients";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertClientSchema } from "@shared/schema";

// Extend the insert schema with validation rules
const formSchema = insertClientSchema.extend({
  name: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewClient() {
  const [_, navigate] = useLocation();
  const createClient = useCreateClient();
  const { toast } = useToast();
  
  // Create form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      initials: "",
      status: "healthy",
      healthScore: 75,
      trend: "stable",
      trendValue: 0,
      clientSince: new Date(),
      usageStats: {}
    },
  });
  
  // Watch the name field to auto-generate initials
  const name = form.watch("name");
  
  // Generate initials whenever the name changes
  React.useEffect(() => {
    if (name) {
      const words = name.trim().split(/\s+/);
      const initials = words
        .slice(0, 2)
        .map(word => word[0]?.toUpperCase() || "")
        .join("");
      form.setValue("initials", initials);
    }
  }, [name, form]);
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      await createClient.mutateAsync(data);
      toast({
        title: "Client created",
        description: `${data.name} has been added successfully.`,
      });
      navigate("/clients");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create client. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
      {/* Page header */}
      <div className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Client</h1>
          <Button variant="outline" onClick={() => navigate("/clients")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients
          </Button>
        </div>
      </div>
      
      {/* Form content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>
              Enter the details of your new client. Required fields are marked with an asterisk (*).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The official name of the client.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="initials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initials</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Initials" 
                          maxLength={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Automatically generated from name, but can be customized.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select client status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="healthy">Healthy</SelectItem>
                              <SelectItem value="needs-attention">Needs Attention</SelectItem>
                              <SelectItem value="at-risk">At Risk</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Current relationship status with the client.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="healthScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Health Score (1-100)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1} 
                            max={100} 
                            placeholder="75"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Overall client health from 1 (poor) to 100 (excellent).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="trend"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trend</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select trend" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="improving">Improving</SelectItem>
                              <SelectItem value="stable">Stable</SelectItem>
                              <SelectItem value="declining">Declining</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Recent trend in client health.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="trendValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trend Value (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Percentage change in health score.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <CardFooter className="flex justify-between pt-6 px-0">
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => navigate("/clients")}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={createClient.isPending || !form.formState.isValid}
                  >
                    {createClient.isPending ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Client'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}