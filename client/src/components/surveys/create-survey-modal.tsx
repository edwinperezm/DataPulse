import { useState, useEffect } from "react";
import { Client, Survey } from "@shared/schema";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateSurvey, useUpdateSurvey, surveyTemplates, useAddSurveyRecipient } from "@/hooks/use-surveys";
import { Loader, BarChart2, Plus, Trash2, Edit2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CreateSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClient?: Client;
  surveyToEdit?: any; // Using 'any' for now since we don't have the type easily accessible
}

interface SurveyQuestion {
  id: number;
  text: string;
  type: string;
  options?: {
    min?: number;
    max?: number;
    choices?: string[];
  };
}

export function CreateSurveyModal({ isOpen, onClose, selectedClient, surveyToEdit }: CreateSurveyModalProps) {
  const [surveyType, setSurveyType] = useState(surveyToEdit?.type || "wtp");
  const [deadline, setDeadline] = useState(surveyToEdit?.deadline ? new Date(surveyToEdit.deadline).toISOString().split('T')[0] : "");
  const [isEditingQuestions, setIsEditingQuestions] = useState(surveyToEdit ? true : false);
  const [customQuestions, setCustomQuestions] = useState<SurveyQuestion[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<SurveyQuestion | null>(null);
  const [activeTab, setActiveTab] = useState<string>(surveyToEdit?.type === "custom" ? "custom" : "template");
  const [surveyId, setSurveyId] = useState<number | undefined>(surveyToEdit?.id);
  
  const createSurvey = useCreateSurvey();
  const updateSurvey = useUpdateSurvey();
  const addRecipient = useAddSurveyRecipient();
  const { toast } = useToast();
  
  // Initialize questions from survey if editing
  useEffect(() => {
    if (surveyToEdit) {
      if (surveyToEdit.questions && Array.isArray(surveyToEdit.questions)) {
        setCustomQuestions(surveyToEdit.questions as SurveyQuestion[]);
        setIsEditingQuestions(true);
      } else if (surveyToEdit.type !== "custom") {
        // If no questions but we have a type, load from template
        const templateQuestions = surveyTemplates[surveyToEdit.type as keyof typeof surveyTemplates]?.questions || [];
        setCustomQuestions([...templateQuestions]);
      }
      setSurveyId(surveyToEdit.id);
    }
  }, [surveyToEdit]);
  
  // When the survey type changes, reset custom questions
  const handleSurveyTypeChange = (value: string) => {
    setSurveyType(value);
    if (value === "custom") {
      setActiveTab("custom");
      if (customQuestions.length === 0) {
        // Initialize with one empty question
        setCustomQuestions([
          { id: 1, text: "", type: "text" }
        ]);
      }
    } else {
      setActiveTab("template");
      // Load questions from template
      const templateQuestions = surveyTemplates[value as keyof typeof surveyTemplates]?.questions || [];
      setCustomQuestions([...templateQuestions]);
    }
    setIsEditingQuestions(false);
  };
  // Add a new question to the list
  const handleAddQuestion = () => {
    // Find the highest id number
    const highestId = customQuestions.reduce((max, q) => Math.max(max, q.id), 0);
    const newQuestion: SurveyQuestion = {
      id: highestId + 1,
      text: "",
      type: "text"
    };
    setCustomQuestions([...customQuestions, newQuestion]);
  };
  
  // Handle updating a question
  const handleQuestionChange = (id: number, field: keyof SurveyQuestion, value: any) => {
    setCustomQuestions(questions => 
      questions.map(q => q.id === id ? { ...q, [field]: value } : q)
    );
  };
  
  // Handle removing a question
  const handleRemoveQuestion = (id: number) => {
    setCustomQuestions(questions => questions.filter(q => q.id !== id));
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // When editing we don't need a selected client
    if (!surveyToEdit && !selectedClient) {
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
    
    // Validate custom questions if using custom survey
    if (surveyType === "custom" || isEditingQuestions) {
      if (customQuestions.length === 0) {
        toast({
          title: "Error",
          description: "Please add at least one question to your survey.",
          variant: "destructive",
        });
        return;
      }
      
      const emptyQuestions = customQuestions.filter(q => !q.text.trim());
      if (emptyQuestions.length > 0) {
        toast({
          title: "Error",
          description: "Please fill in all question text fields.",
          variant: "destructive",
        });
        return;
      }
    }
    
    try {
      let surveyTitle = "";
      let questions = [];
      
      if (surveyType === "custom") {
        surveyTitle = "Custom Survey";
        questions = customQuestions;
      } else if (isEditingQuestions) {
        // Using a template but with custom edits
        const template = surveyTemplates[surveyType as keyof typeof surveyTemplates];
        surveyTitle = template.title;
        questions = customQuestions;
      } else {
        // Using a template as is
        const template = surveyTemplates[surveyType as keyof typeof surveyTemplates];
        surveyTitle = template.title;
        questions = template.questions;
      }
      
      // Create or Update the survey
      if (surveyToEdit && surveyId) {
        // Update existing survey
        await updateSurvey.mutateAsync({
          id: surveyId,
          data: {
            type: surveyType,
            title: surveyTitle,
            deadline: new Date(deadline),
            status: surveyToEdit.status,
            questions: questions
          }
        });
        
        toast({
          title: "Survey Updated",
          description: "Your survey has been updated successfully.",
        });
      } else {
        // Create new survey
        const survey = await createSurvey.mutateAsync({
          type: surveyType,
          title: surveyTitle,
          deadline: new Date(deadline),
          status: "active",
          questions: questions
        });
        
        // Add recipient for new survey
        if (selectedClient) {
          await addRecipient.mutateAsync({
            surveyId: survey.id,
            clientId: selectedClient.id,
            status: "pending"
          });
        }
        
        toast({
          title: "Survey Created",
          description: selectedClient 
            ? `Survey has been sent to ${selectedClient.name}.`
            : "Survey has been created successfully.",
        });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: surveyToEdit ? "Failed to update survey" : "Failed to create survey",
        description: "There was an error. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[calc(100vh-200px)] overflow-y-auto my-auto">
        <DialogHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
            <BarChart2 className="h-6 w-6 text-primary-600" />
          </div>
          <DialogTitle className="text-center">
            {surveyToEdit ? "Edit Survey" : "Create New Survey"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {surveyToEdit 
              ? "Edit your survey questions and settings."
              : "Send a quick survey to gather feedback from your clients. Choose a template or create a custom survey."
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Survey Type */}
            <div className="space-y-2">
              <Label htmlFor="survey-type">Survey Type</Label>
              <Select
                value={surveyType}
                onValueChange={handleSurveyTypeChange}
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
            
            {/* Recipients and Deadline in a grid */}
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            
            {/* Questions Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Survey Questions</Label>
                {!isEditingQuestions && surveyType !== 'custom' && (
                  <button 
                    type="button" 
                    className="text-primary-600 hover:text-primary-900 text-xs font-medium"
                    onClick={() => {
                      // Load template questions into custom questions
                      const templateQuestions = surveyTemplates[surveyType as keyof typeof surveyTemplates]?.questions || [];
                      setCustomQuestions([...templateQuestions]);
                      setIsEditingQuestions(true);
                    }}
                  >
                    <Edit2 className="h-3 w-3 inline mr-1" />
                    Edit Questions
                  </button>
                )}
              </div>
              
              {/* Questions view/edit mode */}
              {(isEditingQuestions || surveyType === 'custom') ? (
                <div className="bg-gray-50 p-4 rounded-md space-y-4 max-h-[280px] overflow-y-auto">
                  {/* Question List */}
                  {customQuestions.map((question, index) => (
                    <div key={question.id} className="bg-white p-3 rounded-md border space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Question {index + 1}</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveQuestion(question.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove question"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`question-${question.id}`} className="text-xs">Question Text</Label>
                        <Textarea
                          id={`question-${question.id}`}
                          value={question.text}
                          onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                          placeholder="Enter your question here..."
                          className="min-h-[60px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`question-type-${question.id}`} className="text-xs">Question Type</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value) => handleQuestionChange(question.id, 'type', value)}
                        >
                          <SelectTrigger id={`question-type-${question.id}`}>
                            <SelectValue placeholder="Select question type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Response</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="select">Multiple Choice</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Show additional fields based on question type */}
                      {question.type === 'rating' && (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor={`min-${question.id}`} className="text-xs">Min Value</Label>
                            <Input
                              id={`min-${question.id}`}
                              type="number"
                              value={question.options?.min || 1}
                              onChange={(e) => handleQuestionChange(
                                question.id, 
                                'options', 
                                { ...question.options, min: Number(e.target.value) }
                              )}
                              min={0}
                              max={10}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor={`max-${question.id}`} className="text-xs">Max Value</Label>
                            <Input
                              id={`max-${question.id}`}
                              type="number"
                              value={question.options?.max || 5}
                              onChange={(e) => handleQuestionChange(
                                question.id, 
                                'options', 
                                { ...question.options, max: Number(e.target.value) }
                              )}
                              min={1}
                              max={10}
                            />
                          </div>
                        </div>
                      )}
                      
                      {question.type === 'select' && (
                        <div className="space-y-2">
                          <Label className="text-xs">Options (comma separated)</Label>
                          <Input
                            type="text"
                            value={(question.options?.choices || []).join(', ')}
                            onChange={(e) => {
                              const choices = e.target.value.split(',').map(c => c.trim()).filter(Boolean);
                              handleQuestionChange(
                                question.id, 
                                'options', 
                                { ...question.options, choices }
                              );
                            }}
                            placeholder="Option 1, Option 2, Option 3"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Add Question Button */}
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="w-full py-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-600"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Question
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 p-3 rounded-md">
                  <ul className="space-y-2 text-sm">
                    {surveyTemplates[surveyType as keyof typeof surveyTemplates]?.questions.map((q) => (
                      <li key={q.id} className="flex items-center">
                        <span className="text-primary-500 mr-2">●</span>
                        <span>{q.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createSurvey.isPending || updateSurvey.isPending || addRecipient.isPending}
            >
              {(createSurvey.isPending || updateSurvey.isPending || addRecipient.isPending) ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : surveyToEdit ? (
                'Update Survey'
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
