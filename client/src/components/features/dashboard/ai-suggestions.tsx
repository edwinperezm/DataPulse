import { Brain, ChevronRight } from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'action' | 'insight' | 'alert';
}

export function AISuggestions() {
  // This would be replaced with real AI-generated suggestions
  const suggestions: Suggestion[] = [
    {
      id: '1',
      title: 'Schedule Follow-up',
      description: 'Client XYZ has not been contacted in 30 days',
      priority: 'high',
      type: 'action'
    },
    {
      id: '2',
      title: 'Engagement Dropping',
      description: 'Usage metrics for ABC Corp show declining trend',
      priority: 'medium',
      type: 'alert'
    },
    {
      id: '3',
      title: 'Positive Trend',
      description: 'Client satisfaction scores improved by 15%',
      priority: 'low',
      type: 'insight'
    }
  ];

  const getPriorityColor = (priority: Suggestion['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      case 'low':
        return 'text-green-500 bg-green-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">AI Suggestions</h2>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="space-y-1">
              <div className="font-medium">{suggestion.title}</div>
              <div className="text-sm text-gray-600">{suggestion.description}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(suggestion.priority)}`}>
                {suggestion.priority}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 