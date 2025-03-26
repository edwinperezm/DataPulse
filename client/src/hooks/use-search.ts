import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

interface UseSearchOptions<T> {
  items: T[];
  keys: string[];
  threshold?: number;
}

export function useSearch<T>({ items, keys, threshold = 0.4 }: UseSearchOptions<T>) {
  const [query, setQuery] = useState('');
  
  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys,
      threshold,
      ignoreLocation: true,
      shouldSort: true,
    });
  }, [items, keys, threshold]);

  const results = useMemo(() => {
    if (!query) return items;
    return fuse.search(query).map(result => result.item);
  }, [fuse, query, items]);

  return {
    query,
    setQuery,
    results,
    isSearching: !!query,
  };
}