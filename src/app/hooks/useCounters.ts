"use client";
import { useState, useEffect } from 'react';
import { Counter } from '../types/counter';
import { useLocalStorage } from './useLocalStorage';

export function useCounters() {
  const [counters, setCounters] = useLocalStorage<Counter[]>('tally-counters', []);

  const addCounter = (name: string) => {
    const newCounter: Counter = {
      id: crypto.randomUUID(),
      name: name || `Counter ${counters.length + 1}`,
      count: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCounters(prev => [...prev, newCounter]);
    return newCounter.id;
  };

  const updateCounter = (id: string, updates: Partial<Counter>) => {
    setCounters(prev => 
      prev.map(counter => 
        counter.id === id 
          ? { ...counter, ...updates, updatedAt: new Date() }
          : counter
      )
    );
  };

  const deleteCounter = (id: string) => {
    setCounters(prev => prev.filter(counter => counter.id !== id));
  };

  const incrementCounter = (id: string, value: number = 1) => {
    const counter = counters.find(c => c.id === id);
    if (counter) {
      updateCounter(id, { count: counter.count + value });
    }
  };

  const decrementCounter = (id: string, value: number = 1) => {
    const counter = counters.find(c => c.id === id);
    if (counter && counter.count > 0) {
      const newCount = Math.max(0, counter.count - value);
      updateCounter(id, { count: newCount });
    }
  };

  const resetCounter = (id: string) => {
    updateCounter(id, { count: 0 });
  };

  return {
    counters,
    addCounter,
    updateCounter,
    deleteCounter,
    incrementCounter,
    decrementCounter,
    resetCounter,
  };
}
