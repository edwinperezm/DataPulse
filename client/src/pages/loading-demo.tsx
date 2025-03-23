import React, { useState } from 'react';
import { BrandedSpinner, BrandedSpinnerPro } from '@/components/ui/branded-spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function LoadingDemo() {
  // State for spinner configuration
  const [spinnerType, setSpinnerType] = useState<'default' | 'primary' | 'secondary' | 'tertiary'>('default');
  const [hideIcon, setHideIcon] = useState(false);
  const [customText, setCustomText] = useState("Loading...");
  
  return (
    <div className="container mx-auto py-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Loading Spinners</h1>
        <p className="text-gray-500 mt-1">Customizable loading indicators for the application</p>
      </div>
      
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Spinner Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="spinner-type" className="mb-2 block">Color Variant</Label>
            <Select value={spinnerType} onValueChange={(val: any) => setSpinnerType(val)}>
              <SelectTrigger id="spinner-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default (Brand)</SelectItem>
                <SelectItem value="primary">Primary (Blue)</SelectItem>
                <SelectItem value="secondary">Secondary (Indigo)</SelectItem>
                <SelectItem value="tertiary">Tertiary (Purple)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-4 pt-7">
            <Switch id="hide-icon" checked={hideIcon} onCheckedChange={setHideIcon} />
            <Label htmlFor="hide-icon">Hide center icon</Label>
          </div>
          
          <div className="flex items-center space-x-4 pt-7">
            <Button variant="outline" size="sm" onClick={() => setCustomText("Processing...")}>
              Processing...
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCustomText("Please wait...")}>
              Please wait...
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCustomText("Loading...")}>
              Reset
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="standard" className="w-full mb-10">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="standard">Standard Spinner</TabsTrigger>
          <TabsTrigger value="premium">Premium Spinner</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard">
          <Card>
            <CardHeader>
              <CardTitle>Standard Branded Spinner</CardTitle>
              <CardDescription>
                Simple branded loading spinner with configurable sizes and colors
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium mb-4">Small</p>
                  <BrandedSpinner 
                    size="small" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium mb-4">Medium</p>
                  <BrandedSpinner 
                    size="medium" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium mb-4">Large</p>
                  <BrandedSpinner 
                    size="large" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <Card className="p-6 flex flex-col items-center justify-center h-[200px] border border-gray-200 bg-gray-50">
                  <BrandedSpinner 
                    size="small" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text="Loading chart data..." 
                  />
                </Card>
                
                <Card className="p-6 space-y-4 border border-gray-200 bg-gray-50">
                  <h3 className="font-medium">Loading Button Example</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="relative" disabled>
                      <BrandedSpinner
                        size="small"
                        showText={false}
                        type={spinnerType}
                        hideIcon={hideIcon}
                        className="absolute left-2"
                      />
                      <span className="ml-8">Loading...</span>
                    </Button>
                    
                    <Button variant="outline" className="relative" disabled>
                      <BrandedSpinner
                        size="small"
                        showText={false}
                        type={spinnerType}
                        hideIcon={hideIcon}
                        className="absolute left-2"
                      />
                      <span className="ml-8">Processing</span>
                    </Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="premium">
          <Card>
            <CardHeader>
              <CardTitle>Premium Branded Spinner</CardTitle>
              <CardDescription>
                Advanced animation with multiple layers, glow effects and customization options
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium mb-4">Small</p>
                  <BrandedSpinnerPro 
                    size="small" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium mb-4">Medium</p>
                  <BrandedSpinnerPro 
                    size="medium" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium mb-4">Large</p>
                  <BrandedSpinnerPro 
                    size="large" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <Card className="p-6 flex flex-col items-center justify-center min-h-[200px] border border-gray-200 bg-gray-50">
                  <BrandedSpinnerPro 
                    size="small" 
                    type={spinnerType} 
                    hideIcon={hideIcon}
                    text="Processing data..." 
                  />
                </Card>
                
                <Card className="p-6 flex items-center justify-center min-h-[200px] border border-gray-200 bg-gray-50">
                  <div className="text-center">
                    <BrandedSpinnerPro 
                      size="medium" 
                      type={spinnerType}
                      hideIcon={hideIcon}
                      text="Generating report..."
                    />
                    <p className="text-xs text-gray-500 mt-4">
                      This may take a few moments
                    </p>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="border border-gray-200 shadow-sm mb-6">
        <CardHeader>
          <CardTitle>Integration Examples</CardTitle>
          <CardDescription>
            How to use the spinners in different UI contexts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col border border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Dashboard Widget</h3>
                <div className="text-gray-400 text-xs">Updating...</div>
              </div>
              <div className="flex-1 flex items-center justify-center py-8">
                <BrandedSpinner 
                  size="small"
                  type={spinnerType}
                  hideIcon={hideIcon}
                  showText={false}
                />
              </div>
            </Card>
            
            <Card className="p-6 border border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Page Transition</h3>
              </div>
              <div className="flex items-center justify-center h-[120px]">
                <div className="text-center">
                  <BrandedSpinnerPro 
                    size="small"
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text="Loading page..."
                  />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Form Submission</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="flex justify-end">
                <Button disabled className="relative">
                  <BrandedSpinner
                    size="small"
                    showText={false}
                    type={spinnerType}
                    hideIcon={hideIcon}
                    className="absolute left-2"
                  />
                  <span className="ml-8">Saving...</span>
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-gray-500 text-sm">
        Use <code className="bg-gray-100 px-1 py-0.5 rounded">BrandedSpinner</code> or <code className="bg-gray-100 px-1 py-0.5 rounded">BrandedSpinnerPro</code> components for consistent loading indicators throughout the application.
      </div>
    </div>
  );
}