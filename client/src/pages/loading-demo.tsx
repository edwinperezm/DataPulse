import React from 'react';
import { BrandedSpinner, BrandedSpinnerPro } from '@/components/ui/branded-spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoadingDemo() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Loading Spinners Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Standard Branded Spinner</CardTitle>
            <CardDescription>
              Simple branded loading spinner with configurable sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-8">
            <div className="grid grid-cols-3 gap-6 w-full">
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">Small</p>
                <BrandedSpinner size="small" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">Medium</p>
                <BrandedSpinner size="medium" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">Large</p>
                <BrandedSpinner size="large" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">Custom Text</p>
                <BrandedSpinner text="Processing..." />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">No Text</p>
                <BrandedSpinner showText={false} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Premium Branded Spinner</CardTitle>
            <CardDescription>
              Advanced animation with multiple layers and effects
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-8">
            <div className="grid grid-cols-3 gap-6 w-full">
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">Small</p>
                <BrandedSpinnerPro size="small" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">Medium</p>
                <BrandedSpinnerPro size="medium" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">Large</p>
                <BrandedSpinnerPro size="large" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">Custom Text</p>
                <BrandedSpinnerPro text="Analyzing data..." />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-4">No Text</p>
                <BrandedSpinnerPro showText={false} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Usage in Loading States</CardTitle>
          <CardDescription>
            Example of spinners used in loading states for components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col items-center justify-center min-h-[200px]">
              <BrandedSpinner size="small" text="Loading chart data..." />
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center min-h-[200px]">
              <BrandedSpinnerPro size="small" text="Fetching clients..." />
            </Card>
            
            <Card className="p-6 space-y-4">
              <h3 className="font-medium">Loading Button Example</h3>
              <div className="flex space-x-4">
                <Button className="relative" disabled>
                  <BrandedSpinner
                    size="small"
                    showText={false}
                    className="absolute left-2"
                  />
                  <span className="ml-8">Loading...</span>
                </Button>
                
                <Button variant="outline" className="relative" disabled>
                  <BrandedSpinner
                    size="small"
                    showText={false}
                    className="absolute left-2"
                  />
                  <span className="ml-8">Processing</span>
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}