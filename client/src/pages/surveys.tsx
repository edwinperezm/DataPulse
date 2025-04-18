import { useState } from "react";
import { useLayoutEffect } from '@/hooks/use-layout-effect';
import { useSurveys } from "@/hooks/use-surveys";
import { Survey } from "@shared/schema";
import { Button } from "@/components/common/button";
import { Card, CardContent } from "@/components/common/card";
import { Badge } from "@/components/common/badge";
import { Progress } from "@/components/common/progress";
import { CreateSurveyModal } from "@/components/features/surveys/create-survey-modal";
import { PlusCircle, BarChart2, Users, Calendar, FileText, CheckCircle, Clock, Edit } from "lucide-react";
import { Skeleton } from "@/components/common/skeleton";
import { cn } from "@/utils/utils";

export default function Surveys() {
  const { data: surveys = [], isLoading } = useSurveys() as { data: Survey[]; isLoading: boolean };
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  // Use layout effect to handle resize events
  useLayoutEffect();
  
  // Helper function to get survey status colors
  const getSurveyStatusColors = (status: string) => {
    // Using consistent gray tones for all statuses
    return 'bg-gray-100 text-gray-800';
  };
  
  // Helper function to get survey type display
  const getSurveyTypeDisplay = (type: string) => {
    switch (type) {
      case 'wtp':
        return 'Willingness To Pay';
      case 'csat':
        return 'Customer Satisfaction';
      case 'nps':
        return 'Net Promoter Score';
      case 'custom':
        return 'Custom Survey';
      default:
        return type;
    }
  };
  
  // Helper function to format date
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };


  
  return (
    <div className="flex-1 overflow-x-hidden space-y-5 p-0">
      {/* Page header with call to action */}
      <div className="rounded-lg transition-all duration-200 flex flex-col md:flex-row justify-between md:justify-between p-6 bg-[#0E1A1D] border-none">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-semibold text-white">Surveys</h1>
          <div className="flex space-x-3">
            <Button 
              variant="default" 
              className="bg-[#020e13] hover:bg-[#132622] text-white border-none"
              onClick={() => setShowCreateModal(true)}
            >
              <PlusCircle className="w-4 h-4 mr-2 text-white" />
              Create Survey
            </Button>
          </div>
        </div>
      </div>

      {/* Surveys content */}
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-none border-none transition-all duration-200 hover:bg-[#132622]">
            <CardContent className="py-4 px-4 sm:py-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-[#020e13] p-3">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Total Surveys</p>
                  <p className="text-xl sm:text-2xl font-semibold text-white">{surveys.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-none border-none transition-all duration-200 hover:bg-[#132622]">
            <CardContent className="py-4 px-4 sm:py-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-[#020e13] p-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Completed</p>
                  <p className="text-xl sm:text-2xl font-semibold text-white">
                    {surveys.filter(s => s.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#0E1A1D] border-none transition-all duration-200 hover:bg-[#132622]">
            <CardContent className="py-4 px-4 sm:py-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-[#020e13] p-3">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Active</p>
                  <p className="text-xl sm:text-2xl font-semibold text-white">
                    {surveys.filter(s => s.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Survey list */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-white">Recent Surveys</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
            </div>
          ) : surveys.length === 0 ? (
            <Card className="bg-[#0E1A1D] rounded-lg border-none">
              <CardContent className="text-white bg-[#0E1A1D] hover:bg-[#132622] transition-colors p-8 text-center rounded-lg">
                <BarChart2 className="h-12 w-12 mx-auto text-white mb-4" />
                <p className="text-white mb-4">No surveys created yet</p>
                <Button 
                  variant="default" 
                  className="bg-[#020e13] hover:bg-[#132622] text-white hover:text-white border-none"
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusCircle className="w-4 h-4 mr-2 text-white" />
                  Create Your First Survey
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {surveys.map((survey) => (
                <Card key={survey.id} className="overflow-hidden bg-[#0E1A1D] border-none">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="bg-[#020e13] rounded-full p-2 mr-3">
                            <BarChart2 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-white">
                              {survey.title}
                            </h3>
                            <p className="text-sm text-white">
                              {getSurveyTypeDisplay(survey.type)}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={cn(
                            getSurveyStatusColors(survey.status)
                          )}
                        >
                          {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Calendar className="text-white h-5 w-5 mr-2" />
                          <span className="text-sm text-white">
                            Created: {formatDate(survey.createdAt)}
                          </span>
                        </div>
                        {survey.deadline && (
                          <div className="flex items-center">
                            <Clock className="text-white h-5 w-5 mr-2" />
                            <span className="text-sm text-white">
                              Deadline: {formatDate(survey.deadline)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Users className="text-white h-5 w-5 mr-2" />
                          <span className="text-sm text-white">
                            Recipients: 1
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-white">Response rate</span>
                          <span className="text-sm font-medium text-white">0%</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {survey.questions.length > 0 && (
                          <Badge variant="outline" className="bg-[#020e13] text-white">
                            {survey.questions.length} Questions
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="px-6 py-3 flex justify-between bg-[#020e13] border-none">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-white hover:text-white hover:bg-[#132622]"
                        onClick={() => setSelectedSurvey(survey)}
                      >
                        <Edit className="h-4 w-4 mr-2 text-white" />
                        Edit
                      </Button>
                      <Button size="sm" className="text-white hover:text-white hover:bg-[#132622] border-none">
                        View Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Survey Modal */}
      <CreateSurveyModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Edit Survey Modal */}
      {selectedSurvey && (
        <CreateSurveyModal 
          isOpen={selectedSurvey !== null}
          onClose={() => setSelectedSurvey(null)}
          surveyToEdit={selectedSurvey}
        />
      )}
    </div>
  );
}
