import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useClientSearch } from '../../hooks/use-client-search';
import { useLocation } from 'wouter';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = '' }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { query, setQuery, results, isSearching } = useClientSearch();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowResults(false);
      if (isExpanded && !query) {
        setIsExpanded(false);
      }
    }
  };

  const handleClientSelect = (id: number) => {
    navigate(`/clients/${id}`);
    setQuery('');
    setShowResults(false);
    setIsExpanded(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, query]);

  useEffect(() => {
    setShowResults(isSearching);
  }, [isSearching]);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className={`flex items-center bg-gray-100 rounded-full transition-all duration-200 ${isExpanded ? 'w-64' : 'w-10'} h-10`}>
        <button 
          className="flex items-center justify-center h-10 w-10 rounded-full"
          onClick={handleToggleExpand}
          aria-label={isExpanded ? "Close search" : "Open search"}
        >
          <Search className="h-5 w-5 text-gray-500" />
        </button>
        
        {isExpanded && (
          <input
            ref={inputRef}
            type="text"
            placeholder="Search clients..."
            className="bg-transparent border-none outline-none flex-1 text-sm pr-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (isSearching) setShowResults(true);
            }}
          />
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 right-0 w-64 max-h-96 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {results.map((client) => (
              <button
                key={client.id}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                onClick={() => handleClientSelect(client.id)}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 text-xs font-semibold ${getStatusColor(client.status)}`}>
                  {client.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  <div className="text-xs text-gray-500">{getStatusLabel(client.status)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'healthy':
      return 'bg-green-100 text-green-800';
    case 'needs-attention':
      return 'bg-yellow-100 text-yellow-800';
    case 'at-risk':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'healthy':
      return 'Healthy';
    case 'needs-attention':
      return 'Needs Attention';
    case 'at-risk':
      return 'At Risk';
    default:
      return 'Unknown Status';
  }
}