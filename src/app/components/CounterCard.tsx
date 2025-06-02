"use client";
import { useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Counter } from '../types/counter';
import { useSettings } from '../hooks/useSettings';
import { 
  Plus, Minus, RotateCcw, Settings, 
  Volume2, VolumeX 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';

interface CounterCardProps {
  counter: Counter;
  onUpdate: (id: string, updates: Partial<Counter>) => void;
  onDelete: (id: string) => void;
  onIncrement: (id: string, value?: number) => void;
  onDecrement: (id: string, value?: number) => void;
  onReset: (id: string) => void;
  isFullScreen?: boolean;
  viewMode?: 'grid' | 'list';
  isActiveFullScreen?: boolean; // NEW: only true for the visible card in full screen
}

export function CounterCard({
  counter,
  onUpdate,
  onDelete,
  onIncrement,
  onDecrement,
  onReset,
  isFullScreen = false,
  viewMode = 'grid',
  isActiveFullScreen = false // NEW
}: CounterCardProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editName, setEditName] = useState(counter.name);
  const [manualValue, setManualValue] = useState(counter.count.toString());
  const [customIncrement, setCustomIncrement] = useState('1');
  const [customDecrement, setCustomDecrement] = useState('1');
  const [incrementKey, setIncrementKey] = useState('');
  const [decrementKey, setDecrementKey] = useState('');
  const [selectedIncrementKey, setSelectedIncrementKey] = useState('ArrowUp');
  const [selectedDecrementKey, setSelectedDecrementKey] = useState('ArrowDown');
  const { settings, updateSettings, playIncrementSound, playDecrementSound, vibrate } = useSettings();

  const keyOptions = [
    { label: 'Arrow Up', value: 'ArrowUp' },
    { label: 'Arrow Down', value: 'ArrowDown' },
    // { label: 'Arrow Left', value: 'ArrowLeft' },
    // { label: 'Arrow Right', value: 'ArrowRight' },
    { label: 'A', value: 'a' },
    { label: 'S', value: 's' },
    { label: 'D', value: 'd' },
    { label: 'W', value: 'w' },
  ];

  // Update: Use custom increment/decrement values directly with onIncrement/onDecrement
  const handleIncrement = useCallback(() => {
    const incrementValue = parseInt(customIncrement) || 1;
    onIncrement(counter.id, incrementValue);
    playIncrementSound();
    vibrate();
  }, [customIncrement, onIncrement, counter.id, playIncrementSound, vibrate]);

  const handleDecrement = useCallback(() => {
    const decrementValue = parseInt(customDecrement) || 1;
    onDecrement(counter.id, decrementValue);
    playDecrementSound();
    vibrate();
  }, [customDecrement, onDecrement, counter.id, playDecrementSound, vibrate]);

  const handleReset = () => {
    onReset(counter.id);
    playDecrementSound();
    vibrate();
  };

  const handleSaveName = () => {
    onUpdate(counter.id, { name: editName.trim() || 'Untitled Counter' });
  };

  const handleSetManualValue = () => {
    const newValue = parseInt(manualValue);
    if (!isNaN(newValue) && newValue >= 0) {
      onUpdate(counter.id, { count: newValue });
    }
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  // Handle keyboard shortcuts
  const handleKeyPress = (e: KeyboardEvent) => {
    if (incrementKey && e.key.toLowerCase() === incrementKey.toLowerCase()) {
      handleIncrement();
    }
    if (decrementKey && e.key.toLowerCase() === decrementKey.toLowerCase()) {
      handleDecrement();
    }
  };

  // Set up keyboard listeners
  useState(() => {
    if (incrementKey || decrementKey) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  });

  // Keyboard shortcut handler for full screen
  useEffect(() => {
    if (!isFullScreen || !isActiveFullScreen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === selectedIncrementKey) {
        e.preventDefault();
        e.stopPropagation(); // Prevent conflicts with other components
        handleIncrement();
      } else if (e.key === selectedDecrementKey) {
        e.preventDefault();
        e.stopPropagation(); // Prevent conflicts with other components
        handleDecrement();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullScreen, isActiveFullScreen, selectedIncrementKey, selectedDecrementKey, handleIncrement, handleDecrement]);

  // Fix: Only render formatted date on client to avoid hydration mismatch
  const [createdAtString, setCreatedAtString] = useState<string>("");
 useEffect(() => {
  setCreatedAtString(new Date(counter.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }));
}, [counter.createdAt]);

  // Determine layout classes based on view mode
  const cardClassName = isFullScreen 
    ? "w-full h-screen flex flex-col justify-center items-center p-8 rounded-none"
    : viewMode === 'list'
      ? "w-full"
      : "w-full max-w-md mx-auto";

  // List view layout
  if (viewMode === 'list' && !isFullScreen) {
    return (
      <Card className="glass-effect dark:text-white counter-shadow animate-fade-in relative overflow-hidden group border border-white/20 dark:border-white/20 light:border-gray-300/30">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 p-4 flex items-center justify-between">
          {/* Name & Counter Value Display */}
          <div className="flex items-center flex-1">
            <h3 className="font-semibold text-lg text-foreground truncate font-display">
              {counter.name}
            </h3>
          </div>

          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent px-4 font-display">
            {counter.count.toLocaleString()}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecrement}
              disabled={counter.count === 0}
              className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
            >
              <Minus className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              onClick={handleIncrement}
              className="bg-gradient-to-r from-emerald-400 to-purple-500 hover:from-emerald-500 hover:to-purple-600 text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>

            {/* Settings and Sound Icons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSound}
              className="opacity-60 hover:opacity-100 text-foreground/70 hover:text-foreground"
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </Button>

            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSettingsOpen(true)}
                className="ml-1 opacity-60 hover:opacity-100"
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              <DialogContent className="sm:max-w-md dark:text-white h-[80vh] overflow-y-auto custom-scrollbar bg-white  dark:bg-black/80 border-white/10 backdrop-blur-lg">
                <DialogHeader>
                <DialogTitle 
  className="font-display text-xl"
  style={{
    background: 'linear-gradient(to right, #34d399, #a855f7)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }}
>
  Counter Settings
</DialogTitle>
                    </DialogHeader>
                <div className="space-y-6 dark:text-white py-4">
                  {/* Counter Name */}
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/70">Counter Name</label>
                    <div className="flex space-x-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 bg-white/10 dark:bg-white/10 border-white/20"
                      />
                      <Button
                        onClick={handleSaveName}
                        className="bg-gradient-to-r from-emerald-400 to-purple-500"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  {/* Counter Value */}
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/70">Counter Value</label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        min="0"
                        value={manualValue}
                        onChange={(e) => setManualValue(e.target.value)}
                        className="flex-1 bg-white/10 dark:bg-white/10 border-white/20"
                      />
                      <Button
                        onClick={handleSetManualValue}
                        className="bg-gradient-to-r from-emerald-400 to-purple-500"
                      >
                        Set
                      </Button>
                    </div>
                  </div>
                  {/* Custom Increment Value */}
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/70">Custom Increment Value</label>
                    <Input
                      type="number"
                      min="1"
                      value={customIncrement}
                      onChange={(e) => setCustomIncrement(e.target.value)}
                      className="bg-white/10 dark:bg-white/10 border-white/20"
                    />
                  </div>
                  {/* Custom Decrement Value */}
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/70">Custom Decrement Value</label>
                    <Input
                      type="number"
                      min="1"
                      value={customDecrement}
                      onChange={(e) => setCustomDecrement(e.target.value)}
                      className="bg-white/10 dark:bg-white/10 border-white/20"
                    />
                  </div>
                  {/* Increment Key */}

                  <div className="space-y-2">
                    <label className="text-sm text-white/70">Increment Key</label>
                    <Select value={selectedIncrementKey} onValueChange={setSelectedIncrementKey}>
                      {/* Applied styling classes */}
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white select-dropdown-fix">
                        <SelectValue />
                      </SelectTrigger>
                      {/* Applied styling classes */}
                      <SelectContent className="bg-[#23272f] select-dropdown-fix border border-white/20 text-white z-[9999]">
                        {keyOptions.map(opt => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            className="text-white hover:bg-white/20 focus:bg-white/20"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Decrement Key */}
                  <div className="space-y-2"> {/* Removed dark:text-white from parent div */}
                    <label className="text-sm text-white/70">Decrement Key</label> {/* Changed text color */}
                    <Select value={selectedDecrementKey} onValueChange={setSelectedDecrementKey}>
                      {/* Applied the same styling classes */}
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white select-dropdown-fix">
                        <SelectValue />
                      </SelectTrigger>
                      {/* Applied the same styling classes */}
                      <SelectContent className="bg-[#23272f] select-dropdown-fix border border-white/20 text-white z-[9999]">
                        {keyOptions.map(opt => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            className="text-white hover:bg-white/20 focus:bg-white/20"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reset Button */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="w-full -mb-5 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Counter
                    </Button>
                  </div>
                  {/* Save Changes Button */}
                  <div className="">
                    <Button className="w-full bg-gradient-to-r from-emerald-400 to-purple-500" onClick={() => setSettingsOpen(false)}>
                      Save Changes
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      onDelete(counter.id);
                      setSettingsOpen(false);
                    }}
                    className="w-full -mt-4 bg-red-500"
                  >
                    Delete Counter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
    );
  }

  // Default (grid) or fullscreen view with redesigned buttons
  if (isFullScreen) {
    return (
      <Card className={`${cardClassName} dark:text-white text-black glass-effect counter-shadow animate-fade-in relative overflow-hidden group border border-white/20 dark:border-white/20 light:border-gray-300/30`}> 
        <div className="flex flex-col items-center mb-8 justify-center h-full w-full px-2 sm:px-0">
          {/* Top bar: creation date, volume, settings */}
          
        
           <div className="flex w-full justify-center flex-wrap gap-4 mt-6 mb-8 max-w-2xl mx-auto">
             <div className="h-10 px-4 w-auto  font-bold capitalize text-gray-500 text-center rounded-full bg-black/10 dark:bg-muted/40 flex  items-center justify-center">
             Counter Name: {counter.name}
            </div>
            <div className=" h-10 px-4 rounded-full bg-black/10 dark:bg-muted/40 flex text-black dark:text-gray-500 items-center justify-center" >  Created: {createdAtString || "-"}</div>
            <div onClick={toggleSound} className="w-20 h-10 cursor-pointer rounded-full bg-black/10 dark:bg-muted/40 flex items-center justify-center" > 
             <Button
                variant="ghost"
                size="icon"
                
                className="opacity-80 text-foreground/70  hover:opacity-100 w-full hover:text-foreground rounded-full"
                aria-label="Toggle sound"
              >
                {settings.soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </Button></div>
            <div className="w-20 h-10 rounded-full bg-black/10 dark:bg-muted/40 flex items-center justify-center" > 
               <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSettingsOpen(true)}
                  className="opacity-80 w-full hover:opacity-100 text-foreground/70 hover:text-foreground rounded-full"
                  aria-label="Counter settings"
                >
                  <Settings className="w-5 h-5" />
                </Button>
                <DialogContent className="sm:max-w-lg text-white dark:text-white h-[80vh] overflow-y-auto custom-scrollbar   dark:bg-black/80 border-white/10 backdrop-blur-lg">
                  <DialogHeader>
                  
                  <DialogTitle 
  className="font-display text-xl"
  style={{
    background: 'linear-gradient(to right, #34d399, #a855f7)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent'
  }}
>
  Counter Settings
</DialogTitle>
                  
                  </DialogHeader>
                  <div className="space-y-6 dark:text-white py-4">
                    {/* Counter Name */}
                    <div className="space-y-2">
                      <label className="text-sm text-foreground/70">Counter Name</label>
                      <div className="flex space-x-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1 bg-white/10 dark:bg-white/10 border-white/20"
                        />
                        <Button
                          onClick={handleSaveName}
                          className="bg-gradient-to-r from-emerald-400 to-purple-500"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                    {/* Counter Value */}
                    <div className="space-y-2">
                      <label className="text-sm text-foreground/70">Counter Value</label>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          min="0"
                          value={manualValue}
                          onChange={(e) => setManualValue(e.target.value)}
                          className="flex-1 bg-white/10 dark:bg-white/10 border-white/20"
                        />
                        <Button
                          onClick={handleSetManualValue}
                          className="bg-gradient-to-r from-emerald-400 to-purple-500"
                        >
                          Set
                        </Button>
                      </div>
                    </div>
                    {/* Custom Increment Value */}
                    <div className="space-y-2">
                      <label className="text-sm text-foreground/70">Custom Increment Value</label>
                      <Input
                        type="number"
                        min="1"
                        value={customIncrement}
                        onChange={(e) => setCustomIncrement(e.target.value)}
                        className="bg-white/10 dark:bg-white/10 border-white/20"
                      />
                    </div>
                    {/* Custom Decrement Value */}
                    <div className="space-y-2">
                      <label className="text-sm text-foreground/70">Custom Decrement Value</label>
                      <Input
                        type="number"
                        min="1"
                        value={customDecrement}
                        onChange={(e) => setCustomDecrement(e.target.value)}
                        className="bg-white/10 dark:bg-white/10 border-white/20"
                      />
                    </div>

<div className="space-y-2">
  <label className="text-sm text-white/70">Increment Key</label> {/* Applied styling */}
  <Select value={selectedIncrementKey} onValueChange={setSelectedIncrementKey}>
    {/* Applied styling classes */}
    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white select-dropdown-fix">
      <SelectValue />
    </SelectTrigger>
    {/* Applied styling classes */}
    <SelectContent className="bg-[#23272f] select-dropdown-fix border border-white/20 text-white z-[9999]">
      {keyOptions.map(opt => (
        <SelectItem
          key={opt.value}
          value={opt.value}
          className="text-white hover:bg-white/20 focus:bg-white/20" 
        >
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
{/* Decrement Key */}
<div className="space-y-2">
  <label className="text-sm text-white/70">Decrement Key</label> {/* Applied styling */}
  <Select value={selectedDecrementKey} onValueChange={setSelectedDecrementKey}>
    {/* Applied styling classes */}
    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white select-dropdown-fix">
      <SelectValue />
    </SelectTrigger>
    {/* Applied styling classes */}
    <SelectContent className="bg-[#23272f] select-dropdown-fix border border-white/20 text-white z-[9999]">
      {keyOptions.map(opt => (
        <SelectItem
          key={opt.value}
          value={opt.value}
          className="text-white hover:bg-white/20 focus:bg-white/20" 
        >
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

                    {/* Reset Button */}
                    <div className="space-y-2">
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="w-full bg-gradient-to-r -mb-4 from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset Counter
                      </Button>
                    </div>
                    {/* Save Changes Button */}
                    <div className="pt-0">
                      <Button className="w-full bg-gradient-to-r from-emerald-400 to-purple-500" onClick={() => setSettingsOpen(false)}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        onDelete(counter.id);
                        setSettingsOpen(false);
                      }}
                      className="w-full -mt-4 bg-red-500"
                    >
                      Delete Counter
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog></div>
          </div>
         
          {/* Counter value */}
          <div className="text-[10vw] sm:text-7xl font-bold dark:text-white text-white text-center select-none mb-8" style={{lineHeight:1}}>
            {counter.count.toLocaleString()}
          </div>
          {/* Increment/Decrement buttons, vertical stack, centered */}
          <div className="flex flex-col items-center gap-0 mt-2">
            {/* Large increment button */}
            <button
              onClick={handleIncrement}
              aria-label="Increment"
              className="flex items-center justify-center rounded-full shadow-lg transition-all duration-200 focus:outline-none "
              style={{
                width: 'min(50vw, 220px)',
                height: 'min(50vw, 220px)',
                minWidth: 120,
                minHeight: 120,
                background: 'var(--tw-prose-bg, hsl(var(--background)))',
                boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
                border: '4px solid hsl(var(--border))'
              }}
            >
              <svg width="60%" height="60%" viewBox="0 0 160 160" fill="none">
                <polyline points="40,100 80,60 120,100" stroke="#39ffb0" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
            {/* Small decrement button, overlapping bottom of increment button */}
            <button
              onClick={handleDecrement}
              disabled={counter.count === 0}
              aria-label="Decrement"
              className="flex items-center justify-center rounded-full shadow-md transition-all duration-200 focus:outline-none  disabled:opacity-40 -z-0 -mt-16 sm:-mt-16"
              style={{
                 width: 'min(50vw, 200px)',
                height: 'min(50vw, 200px)',
                minWidth: 100,
                minHeight: 100,
                background: 'var(--tw-prose-bg, hsl(var(--background)))',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.12)',
                border: '3px solid hsl(var(--border))'
              }}
            >
              <svg width="60%" height="60%" viewBox="0 0 48 48" fill="none">
                <polyline points="16,20 24,28 32,20" stroke="#39ffb0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      </Card>
    );
  }

  // Default grid layout
  return (
    <Card className={`${cardClassName} dark:text-white glass-effect  counter-shadow animate-fade-in relative overflow-hidden group border border-white/20 dark:border-white/20 light:border-gray-300/30`}>
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 pt-6 min-h-[340px] flex flex-col justify-between  text-center space-y-0">
        {/* Header with Sound Toggle and Settings */}
        <div className="flex justify-between  w-full items-center absolute top-4 right-4">
          
          {/* Only render createdAtString on client to avoid hydration mismatch */}
          {!isFullScreen && (
            <>{ <div className="text-xs ps-6 me-auto text-white dark:text-muted-foreground ">Created: {createdAtString || "-"}</div>}</>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            className="opacity-60 hover:opacity-100 text-foreground/70 hover:text-foreground"
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>
          
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen} >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettingsOpen(true)}
              className="ml-2 opacity-60 hover:opacity-100 text-foreground/70 hover:text-foreground"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <DialogContent className="sm:max-w-lg text-white h-[80vh] overflow-y-auto custom-scrollbar   dark:bg-black/80 border-white/10 backdrop-blur-lg">
              <DialogHeader>
               
              <DialogTitle 
  className="font-display text-xl"
  style={{
    background: 'linear-gradient(to right, #34d399, #a855f7)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }}
>
  Counter Settings
</DialogTitle>
                </DialogHeader>
              <div className="space-y-6 dark:text-white py-4">
                {/* Counter Name */}
                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Counter Name</label>
                  <div className="flex space-x-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 bg-white/10 dark:bg-white/10"
                    />
                    <Button
                      onClick={handleSaveName}
                      className="bg-gradient-to-r from-emerald-400 to-purple-500"
                    >
                      Save
                    </Button>
                  </div>
                </div>
                {/* Counter Value */}
                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Counter Value</label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      min="0"
                      value={manualValue}
                      onChange={(e) => setManualValue(e.target.value)}
                      className="flex-1 bg-white/10 dark:bg-white/10 border-white/20"
                    />
                    <Button
                      onClick={handleSetManualValue}
                      className="bg-gradient-to-r from-emerald-400 to-purple-500"
                    >
                      Set
                    </Button>
                  </div>
                </div>
                {/* Custom Increment Value */}
                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Custom Increment Value</label>
                  <Input
                    type="number"
                    min="1"
                    value={customIncrement}
                    onChange={(e) => setCustomIncrement(e.target.value)}
                    className="bg-white/10 dark:bg-white/10 border-white/20"
                  />
                </div>
                {/* Custom Decrement Value */}
                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Custom Decrement Value</label>
                  <Input
                    type="number"
                    min="1"
                    value={customDecrement}
                    onChange={(e) => setCustomDecrement(e.target.value)}
                    className="bg-white/10 dark:bg-white/10 border-white/20"
                  />
                </div>
                {/* Increment Key */}
                <div className="space-y-2">
  <label className="text-sm text-white/70">Increment Key</label>
  <Select value={selectedIncrementKey} onValueChange={setSelectedIncrementKey}>
    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white select-dropdown-fix">
      <SelectValue />
    </SelectTrigger>
    <SelectContent className="bg-[#23272f] select-dropdown-fix border border-white/20 text-white z-[9999]">
  {keyOptions.map(opt => (
    <SelectItem 
      key={opt.value} 
      value={opt.value}
      className="text-white hover:bg-white/20 focus:bg-white/20"
    >
      {opt.label}
    </SelectItem>
  ))}
</SelectContent>
  </Select>
</div>
                {/* Decrement Key */}
             

<div className="space-y-2"> {/* Removed dark:text-white here as text color is handled by select styles */}
  <label className="text-sm text-white/70">Decrement Key</label> {/* Use white/70 for label */}
  <Select value={selectedDecrementKey} onValueChange={setSelectedDecrementKey}>
    {/* Apply the same classes to the SelectTrigger */}
    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white select-dropdown-fix">
      <SelectValue />
    </SelectTrigger>
    {/* Apply the same classes to the SelectContent */}
    <SelectContent className="bg-[#23272f] select-dropdown-fix border border-white/20 text-white z-[9999]">
      {keyOptions.map(opt => (
        <SelectItem 
          key={opt.value} 
          value={opt.value}
          // Apply the same classes to SelectItem
          className="text-white hover:bg-white/20 focus:bg-white/20"
        >
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

                {/* Reset Button */}
                <div className="space-y-2">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full bg-gradient-to-r -mb-4 from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Counter
                  </Button>
                </div>
                {/* Save Changes Button */}
                <div className="pt-0">
                  <Button className="w-full bg-gradient-to-r from-emerald-400 to-purple-500" onClick={() => setSettingsOpen(false)}>
                    Save Changes
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onDelete(counter.id);
                    setSettingsOpen(false);
                  }}
                  className="w-full -mt-4 bg-red-500"
                >
                  Delete Counter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Counter Name - centered */}
        <div className="pt-10">
          <h3 className={`font-display ${isFullScreen ? 'text-2xl' : 'text-lg'} font-semibold text-foreground text-center`}>
            {counter.name}
          </h3>
        </div>

        {/* Counter Display */}
        <div className={`${isFullScreen ? 'text-8xl' : 'text-6xl'} font-bold pb-10 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent animate-bounce-in font-display`}>
          {counter.count.toLocaleString()}
        </div>

        {/* Redesigned Action Buttons - Two big buttons taking half width each */}
       <div className=' flex'>
       <Button
          size={isFullScreen ? "lg" : "default"}
          onClick={handleDecrement}
          disabled={counter.count === 0}
          className="flex-1 h-20 w-1/2 bg-white/80 dark:bg-white/10 border border-red-200 dark:border-red-400/30 text-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 shadow-sm hover:shadow-md text-xl rounded-none"
        >
          <Minus className={isFullScreen ? "w-7 h-7" : "w-5 h-5"} />
        </Button>

        <Button
          size={isFullScreen ? "lg" : "default"}
          onClick={handleIncrement}
          className="flex-1 h-20 w-1/2 bg-white/80 dark:bg-white/10 border border-emerald-200 dark:border-emerald-400/30 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-200 shadow-sm hover:shadow-md text-xl rounded-none"
        >
          <Plus className={isFullScreen ? "w-7 h-7" : "w-5 h-5"} />
        </Button>
       </div>
        </div>

        {/* Counter Info */}
        
     
    </Card>
  );
}
