import { useState } from "react";
import { Client } from "@shared/schema";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateSurvey, surveyTemplates, useAddSurveyRecipient } from "@/hooks/use-surveys";
import { Loader, BarChart2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClient?: Client;
}

export function CreateSurveyModal({ isOpen, onClose, selectedClient }: CreateSurveyModalProps) {
  const [surveyType, setSurveyType] = useState("wtp");
  const [deadline, setDeadline] = useState("");
  
  const createSurvey = useCreateSurvey();
  const addRecipient = useAddSurveyRecipient();
  const { toast } = useToast();
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedClient) {
      toast({
        title: "Error",
        description: "Please select a client for this survey.",
        variant: "destructive",
      });
      return;
    }
    
    if (!deadline) {
      toast({
        title: "Error",
        description: "Please set a response deadline.",
        variant: "destructive", 
      });
      return;
    }
    
    try {
      // Get template based on selected type
      const template = surveyTemplates[surveyType as keyof typeof surveyTemplates];
      
      // Create the survey
      const survey = await createSurvey.mutateAsync({
        type: surveyType,
        title: template.title,
        deadline: new Date(deadline),
        status: "active",
        questions: template.questions
      });
      
      // Add recipient
      await addRecipient.mutateAsync({
        surveyId: survey.id,
        clientId: selectedClient.id,
        status: "pending"
      });
      
      toast({
        title: "Survey Created",
        description: `Survey has been sent to ${selectedClient.name}.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Failed to create survey",
        description: "There was an error creating the survey. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
            <BarChart2 className="h-6 w-6 text-primary-600" />
          </div>
          <DialogTitle className="text-center">Create New Survey</DialogTitle>
          <DialogDescription className="text-center">
            Send a quick survey to gather feedback from your clients. Choose a template or create a custom survey.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Survey Type */}
            <div className="space-y-2">
              <Label htmlFor="survey-type">Survey Type</Label>
              <Select
                value={surveyType}
                onValueChange={setSurveyType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select survey type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="wtp">Willingness To Pay (WTP)</SelectItem>
                    <SelectItem value="csat">Customer Satisfaction (CSAT)</SelectItem>
                    <SelectItem value="nps">Net Promoter Score (NPS)</SelectItem>
                    <SelectItem value="custom">Custom Survey</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Recipients */}
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <div className="flex rounded-md shadow-sm">
                <Input
                  type="text"
                  id="recipients"
                  value={selectedClient?.name || ""}
                  placeholder="Select clients or groups"
                  disabled
                />
              </div>
            </div>
            
            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline">Response Deadline</Label>
              <Input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            {/* Questions Preview */}
            <div className="space-y-2">
              <Label>Questions Preview</Label>
              <div className="bg-gray-50 p-3 rounded-md">
                <ul className="space-y-2 text-sm">
                  {surveyTemplates[surveyType as keyof typeof surveyTemplates]?.questions.map((q) => (
                    <li key={q.id} className="flex items-center">
                      <span className="text-primary-500 mr-2">●</span>
                      <span>{q.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 text-right">
                  <button type="button" className="text-primary-600 hover:text-primary-900 text-xs font-medium">
                    Edit Questions
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createSurvey.isPending || addRecipient.isPending}
            >
              {(createSurvey.isPending || addRecipient.isPending) ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Send Survey'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
