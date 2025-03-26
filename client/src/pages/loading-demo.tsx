import React, { useState } from 'react';
import { BrandedSpinner, BrandedSpinnerPro } from '@/components/ui/branded-spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SectionTitle } from '@/components/ui/section-title';

export default function LoadingDemo() {
  // State for spinner configuration
  const [spinnerType, setSpinnerType] = useState<'default' | 'primary' | 'secondary' | 'tertiary'>('default');
  const [hideIcon, setHideIcon] = useState(false);
  const [customText, setCustomText] = useState("Loading...");

  return (
    <div className="l-layout-container animate-fade-in">
      <SectionTitle
        title="Loading Spinners"
        subtitle="Customizable loading indicators for the application"
        actions={
          <>
            <button 
              className="apple-button secondary"
              onClick={() => setCustomText("Processing...")}
            >
              Processing...
            </button>
            <button 
              className="apple-button secondary"
              onClick={() => setCustomText("Please wait...")}
            >
              Please wait...
            </button>
            <button 
              className="apple-button"
              onClick={() => setCustomText("Loading...")}
            >
              Reset
            </button>
          </>
        }
      />

      <div className="bg-white/80 backdrop-blur-md p-7 rounded-3xl shadow-apple-sm mb-8 border border-white/20 animate-slide-up">
        <h2 className="text-xl font-bold-onse-bold text-apple-black tracking-tight mb-5">Spinner Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="spinner-type" className="mb-2 block font-boldonse text-apple-darkgray">Color Variant</Label>
            <Select value={spinnerType} onValueChange={(val: any) => setSpinnerType(val)}>
              <SelectTrigger id="spinner-type" className="rounded-xl border-gray-200 focus:ring-apple-blue">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-200">
                <SelectItem value="default">Default (Brand)</SelectItem>
                <SelectItem value="primary">Primary (Blue)</SelectItem>
                <SelectItem value="secondary">Secondary (Indigo)</SelectItem>
                <SelectItem value="tertiary">Tertiary (Purple)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <Switch id="hide-icon" checked={hideIcon} onCheckedChange={setHideIcon} />
            <Label htmlFor="hide-icon" className="font-boldonse text-apple-black">Hide center icon</Label>
          </div>
        </div>
      </div>

      <Tabs defaultValue="standard" className="w-full mb-10">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-white/60 backdrop-blur-sm rounded-2xl p-1">
          <TabsTrigger value="standard" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-apple-black data-[state=active]:shadow-apple-sm font-boldonse">Standard Spinner</TabsTrigger>
          <TabsTrigger value="premium" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-apple-black data-[state=active]:shadow-apple-sm font-boldonse">Premium Spinner</TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="animate-scale-in">
          <Card className="border-0 shadow-apple-sm rounded-3xl bg-white/80 backdrop-blur-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-apple-black font-bold-onse-bold tracking-tight">Standard Branded Spinner</CardTitle>
              <CardDescription className="text-apple-darkgray font-boldonse">
                Simple branded loading spinner with configurable sizes and colors
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                <div className="flex flex-col items-center bg-white/60 p-6 border border-white/20 rounded-2xl h-[180px] justify-center shadow-apple-sm hover:shadow-apple-md transition-shadow">
                  <p className="text-sm font-boldonse font-medium text-apple-black mb-4">Small</p>
                  <BrandedSpinner 
                    size="small" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
                <div className="flex flex-col items-center bg-white/60 p-6 border border-white/20 rounded-2xl h-[180px] justify-center shadow-apple-sm hover:shadow-apple-md transition-shadow">
                  <p className="text-sm font-boldonse font-medium text-apple-black mb-4">Medium</p>
                  <BrandedSpinner 
                    size="medium" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
                <div className="flex flex-col items-center bg-white/60 p-6 border border-white/20 rounded-2xl h-[180px] justify-center shadow-apple-sm hover:shadow-apple-md transition-shadow">
                  <p className="text-sm font-boldonse font-medium text-apple-black mb-4">Large</p>
                  <BrandedSpinner 
                    size="large" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <Card className="p-6 flex flex-col items-center justify-center h-[160px] border-0 bg-white/60 backdrop-blur-sm rounded-2xl shadow-apple-sm">
                  <BrandedSpinner 
                    size="small" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text="Loading chart data..." 
                  />
                </Card>

                <Card className="p-6 flex flex-col space-y-4 border-0 bg-white/60 backdrop-blur-sm h-[160px] justify-center rounded-2xl shadow-apple-sm">
                  <h3 className="font-boldonse font-medium text-apple-black">Loading Button Example</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="relative rounded-xl font-boldonse shadow-apple-sm" disabled>
                      <BrandedSpinner
                        size="small"
                        showText={false}
                        type={spinnerType}
                        hideIcon={hideIcon}
                        className="absolute left-2"
                      />
                      <span className="ml-8">Loading...</span>
                    </Button>

                    <Button variant="outline" className="relative rounded-xl font-boldonse border-gray-200" disabled>
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

        <TabsContent value="premium" className="animate-scale-in">
          <Card className="border-0 shadow-apple-sm rounded-3xl bg-white/80 backdrop-blur-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-apple-black font-bold-onse-bold tracking-tight">Premium Branded Spinner</CardTitle>
              <CardDescription className="text-apple-darkgray font-boldonse">
                Advanced animation with multiple layers, glow effects and customization options
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                <div className="flex flex-col items-center bg-white/60 p-6 border border-white/20 rounded-2xl h-[220px] justify-center shadow-apple-sm hover:shadow-apple-md transition-shadow">
                  <p className="text-sm font-boldonse font-medium text-apple-black mb-4">Small</p>
                  <BrandedSpinnerPro 
                    size="small" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
                <div className="flex flex-col items-center bg-white/60 p-6 border border-white/20 rounded-2xl h-[220px] justify-center shadow-apple-sm hover:shadow-apple-md transition-shadow">
                  <p className="text-sm font-boldonse font-medium text-apple-black mb-4">Medium</p>
                  <BrandedSpinnerPro 
                    size="medium" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
                <div className="flex flex-col items-center bg-white/60 p-6 border border-white/20 rounded-2xl h-[220px] justify-center shadow-apple-sm hover:shadow-apple-md transition-shadow">
                  <p className="text-sm font-boldonse font-medium text-apple-black mb-4">Large</p>
                  <BrandedSpinnerPro 
                    size="large" 
                    type={spinnerType}
                    hideIcon={hideIcon}
                    text={customText}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <Card className="p-6 flex flex-col items-center justify-center h-[180px] border-0 bg-white/60 backdrop-blur-sm rounded-2xl shadow-apple-sm">
                  <BrandedSpinnerPro 
                    size="small" 
                    type={spinnerType} 
                    hideIcon={hideIcon}
                    text="Processing data..." 
                  />
                </Card>

                <Card className="p-8 flex items-center justify-center h-[200px] border-0 bg-white/80 backdrop-blur-md rounded-3xl shadow-apple-md">
                  <div className="text-center">
                    <BrandedSpinnerPro 
                      size="medium" 
                      type={spinnerType}
                      hideIcon={hideIcon}
                      text="Generating report..."
                    />
                    <p className="text-sm font-medium text-apple-darkgray mt-4">
                      This may take a few moments
                    </p>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-0 shadow-apple-sm rounded-3xl bg-white/80 backdrop-blur-md mb-8 animate-slide-up">
        <CardHeader className="pb-3">
          <CardTitle className="text-apple-black font-bold-onse-bold tracking-tight">Integration Examples</CardTitle>
          <CardDescription className="text-apple-darkgray font-boldonse">
            How to use the spinners in different UI contexts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col border-0 bg-white/60 backdrop-blur-sm rounded-2xl shadow-apple-sm h-[180px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-boldonse font-medium text-apple-black">Dashboard Widget</h3>
                <div className="text-apple-darkgray text-xs font-boldonse">Updating...</div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <BrandedSpinner 
                  size="small"
                  type={spinnerType}
                  hideIcon={hideIcon}
                  showText={false}
                />
              </div>
            </Card>

            <Card className="p-6 flex flex-col border-0 bg-white/60 backdrop-blur-sm rounded-2xl shadow-apple-sm h-[180px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-boldonse font-medium text-apple-black">Page Transition</h3>
              </div>
              <div className="flex-1 flex items-center justify-center">
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

            <Card className="p-6 flex flex-col border-0 bg-white/60 backdrop-blur-sm rounded-2xl shadow-apple-sm h-[180px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-boldonse font-medium text-apple-black">Form Submission</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="h-2 bg-apple-gray/50 rounded-full animate-pulse"></div>
                <div className="h-2 bg-apple-gray/50 rounded-full animate-pulse"></div>
                <div className="h-2 bg-apple-gray/50 rounded-full w-3/4 animate-pulse"></div>
              </div>
              <div className="flex-1 flex items-end justify-end">
                <Button disabled className="relative rounded-xl font-boldonse shadow-apple-sm">
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

      <div className="text-center text-apple-darkgray text-sm font-boldonse pb-8">
        Use <code className="bg-white/60 px-2 py-0.5 rounded-lg shadow-apple-sm">BrandedSpinner</code> or <code className="bg-white/60 px-2 py-0.5 rounded-lg shadow-apple-sm">BrandedSpinnerPro</code> components for consistent loading indicators throughout the application.
      </div>
    </div>
  );
}