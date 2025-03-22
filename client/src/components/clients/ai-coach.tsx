import { cn } from "@/lib/utils";
import { AiSuggestion } from "@shared/schema";
import { Bot, CheckCircle, Loader } from "lucide-react";

interface AiCoachProps {
  suggestions: AiSuggestion[];
  onCompleteSuggestion: (id: number) => void;
  isLoading?: boolean;
}

export function AiCoach({ suggestions, onCompleteSuggestion, isLoading = false }: AiCoachProps) {
  // Filter for pending suggestions
  const pendingSuggestions = suggestions.filter(s => s.status === 'pending');

  if (isLoading) {
    return (
      <div className="mb-6 bg-primary-50 p-4 rounded-lg border border-primary-100">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Bot className="text-primary-600 h-6 w-6" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-lg font-medium text-gray-900">AI Coach Suggestions</h3>
            <div className="flex justify-center items-center py-6">
              <Loader className="h-8 w-8 text-primary-400 animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pendingSuggestions.length) {
    return (
      <div className="mb-6 bg-primary-50 p-4 rounded-lg border border-primary-100">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Bot className="text-primary-600 h-6 w-6" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">AI Coach Suggestions</h3>
            <p className="mt-2 text-sm text-gray-700">
              No pending suggestions. Check back later for AI-generated action items.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-primary-50 p-4 rounded-lg border border-primary-100">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Bot className="text-primary-600 h-6 w-6" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-gray-900">AI Coach Suggestions</h3>
          <ul className="mt-2 pl-5 list-disc space-y-2 text-sm text-gray-700">
            {pendingSuggestions.map((suggestion) => (
              <li key={suggestion.id}>{suggestion.suggestion}</li>
            ))}
          </ul>
          <div className="mt-4">
            {pendingSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-primary-300 shadow-sm text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-2 mb-2"
                onClick={() => onCompleteSuggestion(suggestion.id)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Complete
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
