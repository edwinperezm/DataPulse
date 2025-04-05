import { useState } from "react";
import { useSurveys } from "@/hooks/use-surveys";
import { Button } from "@/components/common/button";
import { Card, CardContent } from "@/components/common/card";
import { Badge } from "@/components/common/badge";
import { Progress } from "@/components/common/progress";
import { CreateSurveyModal } from "@/components/features/surveys/create-survey-modal";
import { PlusCircle, BarChart2, Users, Calendar, FileText, CheckCircle, Clock, Edit } from "lucide-react";
import { Skeleton } from "@/components/common/skeleton";
import { Survey } from "@shared/schema";
import { cn } from "@/utils/utils";

export default function Surveys() {
  const { data: surveys = [], isLoading } = useSurveys();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  
  // Helper function to get survey status colors
  const getSurveyStatusColors = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <>
      {/* Page header with call to action */}
      <div className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Surveys</h1>
          <div className="flex space-x-3">
            <Button onClick={() => setShowCreateModal(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Survey
            </Button>
          </div>
        </div>
      </div>

      {/* Surveys content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Surveys</p>
                <p className="text-2xl font-semibold">{surveys.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-2xl font-semibold">
                  {surveys.filter(s => s.status === 'completed').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active</p>
                <p className="text-2xl font-semibold">
                  {surveys.filter(s => s.status === 'active').length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Survey list */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Surveys</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
            </div>
          ) : surveys.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No surveys created yet</p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Your First Survey
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {surveys.map((survey) => (
                <Card key={survey.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="bg-primary-100 rounded-full p-2 mr-3">
                            <BarChart2 className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {survey.title}
                            </h3>
                            <p className="text-sm text-gray-500">
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
                          <Calendar className="text-gray-400 h-5 w-5 mr-2" />
                          <span className="text-sm text-gray-600">
                            Created: {formatDate(survey.createdAt)}
                          </span>
                        </div>
                        {survey.deadline && (
                          <div className="flex items-center">
                            <Clock className="text-gray-400 h-5 w-5 mr-2" />
                            <span className="text-sm text-gray-600">
                              Deadline: {formatDate(survey.deadline)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Users className="text-gray-400 h-5 w-5 mr-2" />
                          <span className="text-sm text-gray-600">
                            Recipients: 1
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Response rate</span>
                          <span className="text-sm font-medium text-gray-900">0%</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {survey.questions.length > 0 && (
                          <Badge variant="outline" className="bg-gray-50">
                            {survey.questions.length} Questions
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedSurvey(survey)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm">
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
    </>
  );
}
