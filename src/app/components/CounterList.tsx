"use client";
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CounterCard } from './CounterCard';
import { useCounters } from '../hooks/useCounters';
import { Plus, Grid, Maximize, List, Tablet, Settings, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { AnimatedMarquee } from './AnimatedMarquee';

export function CounterList() {
  const { counters, addCounter, updateCounter, deleteCounter, incrementCounter, decrementCounter, resetCounter } = useCounters();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [newCounterName, setNewCounterName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'dual' | 'grid' | 'list'>('dual');
  const [gridDisplayLimit, setGridDisplayLimit] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  const topRowItems = [
    { text: 'Count', color: '#10b981' },    // emerald-500
    { text: 'Track', color: '#8b5cf6' },    // violet-500
    { text: 'Measure', color: '#ec4899' },  // pink-500
    { text: 'Analyze', color: '#3b82f6' },  // blue-500
    { text: 'Improve', color: '#f59e0b' },  // amber-500
    { text: 'Monitor', color: '#6366f1' },  // indigo-500
  ];

  const bottomRowItems = [
    { text: 'Visualize', color: '#06b6d4' }, // cyan-500
    { text: 'Optimize', color: '#84cc16' },  // lime-500
    { text: 'Scale', color: '#ef4444' },     // red-500
    { text: 'Innovate', color: '#a855f7' },  // purple-500
    { text: 'Transform', color: '#f97316' }, // orange-500
    { text: 'Grow', color: '#22d3ee' },      // cyan-400
  ];
  
  // Using proper TypeScript typing for refs
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({
    home: null,
    about: null,
    howToUse: null,
    faq: null,
    contact: null,
    terms: null
  });

  const handleAddCounter = () => {
    if (newCounterName.trim()) {
      addCounter(newCounterName.trim());
      setNewCounterName('');
      setShowAddForm(false);
      setShowAddModal(false);
    }
  };

  const scrollToCounter = (index: number) => {
    if (containerRef.current && isFullScreen) {
      const container = containerRef.current;
      const targetScroll = index * container.offsetHeight;
      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId as keyof typeof sectionRefs.current];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const loadMoreGridItems = () => {
    setGridDisplayLimit(prev => {
      if (prev === 4) return 8;
      if (prev === 8) return 12;
      return prev;
    });
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullScreen || !counters) return; // Safeguard added
      // Navigation only
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        scrollToCounter(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < counters.length - 1) {
        scrollToCounter(currentIndex + 1);
      } else if (e.key === 'Escape') {
        setIsFullScreen(false);
      }
      // else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      //     e.preventDefault() // Prevent default behavior for ArrowUp and ArrowDown
      //     e.stopPropagation() // Stop propagation to ensure no other handlers are triggered
      //     return false // Explicitly return false to block further handling
      //   }
      // Remove w/s handling from here!
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, counters, isFullScreen, scrollToCounter]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !isFullScreen) return;
      
      const container = containerRef.current;
      const scrollPosition = container.scrollTop;
      const containerHeight = container.offsetHeight;
      const newIndex = Math.round(scrollPosition / containerHeight);
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container && isFullScreen) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex, isFullScreen]);

  // Add Counter Box Component
  const AddCounterBox = () => (
    <div 
      onClick={() => setShowAddModal(true)}
      className="w-full max-w-md mx-auto rounded-xl h-auto py-10 glass-effect counter-shadow animate-fade-in relative overflow-hidden group border border-white/20 dark:border-white/20 light:border-gray-300/30 cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 p-6 text-center space-y-6 h-64 flex flex-col justify-center items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-purple-500 flex items-center justify-center">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Add Counter</h3>
      </div>
    </div>
  );

  // give me the detailed text base design of this website ui complete i have to make the same theme for another website using copilot ..

  // if (counters.length === 0) {
  //   return (
  //     <div className="min-h-screen pt-20 pb-8 px-4">
  //       <div className="container mx-auto max-w-4xl">
  //         <div className="text-center space-y-8 animate-fade-in">
  //           <div className="space-y-4">
  //             <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-shift">
  //               Welcome to TallyFlow
  //             </h1>
  //             <p className="text-xl text-muted-foreground">
  //               Create your first counter to get started
  //             </p>
  //           </div>
            
  //           <div className="max-w-md mx-auto space-y-4">
  //             <div className="flex space-x-2">
  //               <Input
  //                 value={newCounterName}
  //                 onChange={(e) => setNewCounterName(e.target.value)}
  //                 placeholder="Enter counter name..."
  //                 onKeyDown={(e) => e.key === 'Enter' && handleAddCounter()}
  //                 className="flex-1 backdrop-blur-md bg-white/10 border-white/20 text-white placeholder:text-white/70"
  //               />
  //               <Button 
  //                 onClick={handleAddCounter}
  //                 disabled={!newCounterName.trim()}
  //                 className="bg-gradient-to-r from-emerald-400 to-purple-500 hover:from-emerald-500 hover:to-purple-600 glow-button"
  //               >
  //                 <Plus className="w-4 h-4 mr-2" />
  //                 Add Counter
  //               </Button>
  //             </div>
  //           </div>

  //           <div className="w-64 h-64 mx-auto bg-gradient-to-br from-emerald-500/20 to-purple-600/20 rounded-full flex items-center justify-center animate-float">
  //             <Plus className="w-16 h-16 text-emerald-500" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background animated-bg-dark">
        <div 
          ref={containerRef}
          className="h-full overflow-y-scroll snap-y snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>
            {`
            div::-webkit-scrollbar {
              display: none;
            }
            `}
          </style>
          
          {counters.map((counter, index) => (
            <div key={counter.id} className="h-screen snap-start">
              <CounterCard
                counter={counter}
                onUpdate={updateCounter}
                onDelete={deleteCounter}
                onIncrement={incrementCounter}
                onDecrement={decrementCounter}
                onReset={resetCounter}
                isFullScreen={true}
                isActiveFullScreen={index === currentIndex}
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {counters.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCounter(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                (index === currentIndex) 
                  ? 'bg-emerald-500 scale-125' 
                  : 'dark:bg-white/30 bg-black/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Exit Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFullScreen(false)}
          className="fixed top-4 dark:text-white right-4 bg-background/80 backdrop-blur-sm"
        >
          <Grid className="w-4 h-4 mr-2" />
          Grid View
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden -mb-10 dark:text-white relative">
      {/* Animated background */}
      <div className="animated-bg-dark absolute inset-0 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20 pb-20  px-0">
        <div className="container mx-auto ">
          {/* Counters section */}
          <section 
             ref={(el: HTMLDivElement) => { if (el && sectionRefs && sectionRefs.current) {
              sectionRefs.current.about = el;
            }}}
            id="home" 
            className="pt-16 text-center h-[90vh] rounded-2xl overflow-hidden  backdrop-blur-md shadow-lg animate-fade-in"
          >
            {/* View mode switcher with Add Counter and Full Screen */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Tabs 
                defaultValue="dual" 
                value={viewMode}
                onValueChange={(value) => setViewMode(value as 'dual' | 'grid' | 'list')}
                className="w-full max-w-md"
              >
                <TabsList className="grid grid-cols-3 min-h-[45px] pb-4  light:bg-green-600 bg-white/10 border-[2px] border-black/20  backdrop-blur-sm">
                  <TabsTrigger value="dual" className="dark:data-[state=active]:bg-white/40 data-[state=active]:bg-blue-500">
                    <Tablet className="w-4 h-4 mr-2" />
                    Dual
                  </TabsTrigger>
                  <TabsTrigger value="grid" className="dark:data-[state=active]:bg-white/20  data-[state=active]:bg-blue-500">
                    <Grid className="w-4 h-4 mr-2" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger value="list" className="data-[state=active]:bg-white/20">
                    <List className="w-4 h-4 mr-2" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex space-x-2">
               
                  <Button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-emerald-400 to-purple-500 hover:from-emerald-500 hover:to-purple-600 text-white shadow-lg hover:shadow-emerald-500/20 glow-button"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Counter
                  </Button>
           
                
                <Button
                  onClick={() => setIsFullScreen(true)}
                  variant="outline"
                  disabled={counters.length === 0}
                  className={`border border-gray-300 text-black bg-white hover:bg-white dark:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/20 backdrop-blur-sm`}
                  aria-disabled={counters.length === 0}
                >
                  <Maximize className="w-4 h-4 mr-2" />
                  Full Screen
                </Button>
              </div>
            </div>

            {/* Grid View with fixed height and scroll */}
           <div className=' h-[100%] pt-10  '>
             {viewMode === 'grid' && (
              <div className="h-full pb-20 overflow-y-auto p-2 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-full">
                  {counters.map((counter) => (
                    <div key={counter.id} className="animate-fade-in">
                      <CounterCard
                        counter={counter}
                        onUpdate={updateCounter}
                        onDelete={deleteCounter}
                        onIncrement={incrementCounter}
                        onDecrement={decrementCounter}
                        onReset={resetCounter}
                      />
                    </div>
                  ))}
                  {counters.length <= 3 && (
                    <div className="animate-fade-in">
                      <AddCounterBox />
                    </div>
                  )}
                </div>
                
                {/* {counters.length > gridDisplayLimit && (
                  <div className="flex justify-center">
                    <Button
                      onClick={loadMoreGridItems}
                      className="bg-gradient-to-r from-emerald-400 to-purple-500 hover:from-emerald-500 hover:to-purple-600 glow-button"
                    >
                      Load More
                    </Button>
                  </div>
                )} */}
              </div>
            )}
            
            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4 max-w-4xl mx-auto h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {counters.map((counter) => (
                  <div key={counter.id} className="animate-fade-in">
                    <CounterCard
                      counter={counter}
                      onUpdate={updateCounter}
                      onDelete={deleteCounter}
                      onIncrement={incrementCounter}
                      onDecrement={decrementCounter}
                      onReset={resetCounter}
                      viewMode="list"
                    />
                  </div>
                ))}
              
              </div>
            )}
            
            {/* Dual View with Carousel */}
            {viewMode === 'dual' && (
              <div className="w-full h-full pb-40 overflow-y-auto custom-scrollbar max-w-4xl mx-auto mt-0 ">
                <Carousel className="w-full">
                  <CarouselContent>
                    {Array.from({ length: Math.ceil((counters.length + (counters.length <= 3 ? 1 : 0)) / 2) }).map((_, slideIndex) => (
                      <CarouselItem key={slideIndex}>
                        <div className={`grid grid-cols-1  gap-x-8 p-1 ${counters.length < 1  ? 'flex items-center ' : 'md:grid-cols-2'}`}>
                          {counters.slice(slideIndex * 2, slideIndex * 2 + 2).map((counter) => (
                            <div key={counter.id} className="animate-fade-in">
                              <CounterCard
                                counter={counter}
                                onUpdate={updateCounter}
                                onDelete={deleteCounter}
                                onIncrement={incrementCounter}
                                onDecrement={decrementCounter}
                                onReset={resetCounter}
                              />
                            </div>
                          ))}
                          {counters.length <= 1 && (
                    <div className="animate-fade-in ">
                      <AddCounterBox />
                    </div>
                  )}
                          {/* Add Counter box only on last slide if counters <= 3 */}
                          {/* {counters.length <= 3 && slideIndex === Math.ceil(counters.length / 2) - 1 && counters.length % 2 === 1 && (
                            <div className="animate-fade-in">
                              <AddCounterBox />
                            </div>
                          )} */}
                          {/* {counters.length <= 3 && slideIndex === 0 && counters.length % 2 === 0 && (
                            <div className="animate-fade-in">
                              <AddCounterBox />
                            </div>
                          )} */}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {counters.length > 2 && (
                    <div className="flex justify-center mt-4">
                      <CarouselPrevious className="relative mr-2 translate-x-0 translate-y-0 left-0" />
                      <CarouselNext className="relative ml-2 translate-x-0 translate-y-0 right-0" />
                    </div>
                  )}
                </Carousel>
              </div>
            )}
           </div>
          </section>

          {/* Hero section moved after counters */}
          <section className="py-16 pt-[140px] text-center">
            <div className="space-y-6 animate-fade-in mb-12">
              <h1 className="text-7xl font-bold mb-4">
                <span
                  className="inline-block bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-display"
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Tally{" "}
                </span>
                <span 
                 className="inline-block ms-2 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-display"
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}>
                  Flow
                </span>
              </h1>
              <p className="text-2xl text-foreground max-w-2xl mx-auto leading-relaxed">
                A beautiful way to keep track of everything that matters to you
              </p>
            </div>
          </section>
          
          {/* Enhanced Moving text banner - Full width with fade effect */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16 my-16 overflow-hidden   shadow-lg animate-fade-in">
            {/* Fade effects on edges */}
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background via-background/80 to-transparent z-0 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background via-background/80 to-transparent z-0 pointer-events-none"></div>
            
            {/* Top row - left to right */}
             <div className="py-12">
      <AnimatedMarquee 
        items={topRowItems} 
        direction="left" 
        speed="normal"
      />
      
      <AnimatedMarquee 
        items={bottomRowItems} 
        direction="right" 
        speed="slow"
        className="mt-8"
      />
    </div>
          </div>
          
          {/* About section */}
          <section 
            ref={(el: HTMLDivElement) => { if (el && sectionRefs && sectionRefs.current) {
              sectionRefs.current.about = el;
            }}}
            id="about" 
            className="py-28 text-center"
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent font-display ">About TallyFlow</h2>
            <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
              TallyFlow is a beautiful, intuitive counter application designed to help you keep track of anything that matters. Whether you're counting habits, tracking inventory, or keeping score, TallyFlow makes it simple and elegant.
            </p>
          </section>
          
          {/* How to use section */}
          <section 
            ref={(el: HTMLDivElement) => { if (el && sectionRefs && sectionRefs.current) {
              sectionRefs.current.about = el;
            }}}
            id="howToUse" 
            className="py-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent font-display">How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 rounded-xl bg-black/10 dark:bg-white/10 backdrop-blur-md border border-white/20 text-left hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Plus className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">Create Counters</h3>
                <p className="text-foreground/70">Add as many counters as you need, and give each one a meaningful name.</p>
              </div>
              <div className="p-6 rounded-xl bg-black/10 dark:bg-white/10 backdrop-blur-md border border-white/20 text-left hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Settings className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">Customize</h3>
                <p className="text-foreground/70">Set starting values, adjust views, and personalize your counting experience.</p>
              </div>
              <div className="p-6 rounded-xl bg-black/10 dark:bg-white/10 backdrop-blur-md border border-white/20 text-left hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Maximize className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">Focus Mode</h3>
                <p className="text-foreground/70">Use full-screen mode for distraction-free counting when you need to focus.</p>
              </div>
            </div>
          </section>

          {/* Enhanced FAQ Section */}
          <section 
           ref={(el: HTMLDivElement) => { if (el && sectionRefs && sectionRefs.current) {
            sectionRefs.current.about = el;
          }}}
            id="faq" 
            className="py-16 dark:text-white "
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent text-center font-display">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-emerald-900/30 to-purple-900/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transform transition-all hover:translate-y-[-5px] hover:shadow-2xl">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer transition-colors hover:bg-white/5 font-display">
                    <h3 className="text-xl font-semibold text-foreground">How many counters can I create?</h3>
                    <span className="text-foreground/70 group-open:rotate-180 transition-transform duration-200">
                      <ChevronDown />
                    </span>
                  </summary>
                  <div className="px-6 py-4 text-foreground/70 animate-fade-in">
                    <p>You can create unlimited counters with TallyFlow. There's no restriction on the number of counters you can have active at once.</p>
                  </div>
                </details>
              </div>

              <div className="bg-gradient-to-r from-emerald-900/30 to-purple-900/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transform transition-all hover:translate-y-[-5px] hover:shadow-2xl">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer transition-colors hover:bg-white/5 font-display">
                    <h3 className="text-xl font-semibold text-foreground">Is my data stored securely?</h3>
                    <span className="text-foreground/70 group-open:rotate-180 transition-transform duration-200">
                      <ChevronDown />
                    </span>
                  </summary>
                  <div className="px-6 py-4 text-foreground/70 animate-fade-in">
                    <p>Yes! All your counter data is stored locally in your browser using localStorage. This means your data never leaves your device and is completely private.</p>
                  </div>
                </details>
              </div>

              <div className="bg-gradient-to-r from-emerald-900/30 to-purple-900/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transform transition-all hover:translate-y-[-5px] hover:shadow-2xl">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer transition-colors hover:bg-white/5 font-display">
                    <h3 className="text-xl font-semibold text-foreground">Will I lose my counters if I clear my browser data?</h3>
                    <span className="text-foreground/70 group-open:rotate-180 transition-transform duration-200">
                      <ChevronDown />
                    </span>
                  </summary>
                  <div className="px-6 py-4 text-foreground/70 animate-fade-in">
                    <p>Unfortunately, yes. Since TallyFlow stores data locally, clearing your browser data will remove your counters. We recommend taking screenshots of important counts before clearing browser data.</p>
                  </div>
                </details>
              </div>

              <div className="bg-gradient-to-r from-emerald-900/30 to-purple-900/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transform transition-all hover:translate-y-[-5px] hover:shadow-2xl">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer transition-colors hover:bg-white/5 font-display">
                    <h3 className="text-xl font-semibold text-foreground">Does TallyFlow work offline?</h3>
                    <span className="text-foreground/70 group-open:rotate-180 transition-transform duration-200">
                      <ChevronDown />
                    </span>
                  </summary>
                  <div className="px-6 py-4 text-foreground/70 animate-fade-in">
                    <p>Absolutely! TallyFlow is designed to work completely offline. Once loaded, you can use all features without an internet connection.</p>
                  </div>
                </details>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-900/30 to-purple-900/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transform transition-all hover:translate-y-[-5px] hover:shadow-2xl">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer transition-colors hover:bg-white/5 font-display">
                    <h3 className="text-xl font-semibold text-foreground">Can I export my counter data?</h3>
                    <span className="text-foreground/70 group-open:rotate-180 transition-transform duration-200">
                      <ChevronDown />
                    </span>
                  </summary>
                  <div className="px-6 py-4 text-foreground/70 animate-fade-in">
                    <p>Currently, TallyFlow doesn't have a built-in export feature. However, your data is stored in localStorage and can be accessed via browser developer tools if needed.</p>
                  </div>
                </details>
              </div>

              <div className="bg-gradient-to-r from-emerald-900/30 to-purple-900/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transform transition-all hover:translate-y-[-5px] hover:shadow-2xl">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer transition-colors hover:bg-white/5 font-display">
                    <h3 className="text-xl font-semibold text-foreground">Can I customize keyboard shortcuts?</h3>
                    <span className="text-foreground/70 group-open:rotate-180 transition-transform duration-200">
                      <ChevronDown />
                    </span>
                  </summary>
                  <div className="px-6 py-4 text-foreground/70 animate-fade-in">
                    <p>Yes! Each counter has customizable keyboard shortcuts for increment and decrement actions. You can set these in the counter settings modal.</p>
                  </div>
                </details>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md pt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-display">TallyFlow</h3>
              <p className="text-white/70">A beautiful way to keep track of everything that matters.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 font-display">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-white/70 hover:text-emerald-400 transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-white/70 hover:text-emerald-400 transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('howToUse')} className="text-white/70 hover:text-emerald-400 transition-colors">How to Use</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 font-display">Support</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('faq')} className="text-white/70 hover:text-emerald-400 transition-colors">FAQ</button></li>
                {/* <li><button onClick={() => scrollToSection('contact')} className="text-white/70 hover:text-emerald-400 transition-colors">Contact</button></li> */}
                <li><button onClick={() => scrollToSection('terms')} className="text-white/70 hover:text-emerald-400 transition-colors">Terms & Privacy</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 font-display">Connect</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/50 flex items-center justify-center transition-colors">
                  <span className="text-white">T</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/50 flex items-center justify-center transition-colors">
                  <span className="text-white">F</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/50 flex items-center justify-center transition-colors">
                  <span className="text-white">I</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 py-4 text-center">
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} TallyFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add Counter Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-md  dark:text-white text-white bg-white/10 dark:bg-black/80 border-white/10 backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">Add New Counter</DialogTitle>
          </DialogHeader>
          <div className="space-y-1 py-4 ">
            <div className="space-y-0">
              <label className="text-sm text-foreground/70 my-3">Counter Name</label>
              <Input
                value={newCounterName}
                onChange={(e) => setNewCounterName(e.target.value)}
                placeholder="Enter counter name..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCounter();
                  if (e.key === 'Escape') {
                    setShowAddModal(false);
                    setNewCounterName('');
                  }
                }}
                className="bg-white/10 dark:bg-white/10 focus:outline-none focus:border-none mt-3 border-white/20"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter className="flex flex-row space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setNewCounterName('');
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCounter}
              disabled={!newCounterName.trim()}
              className="flex-1 bg-gradient-to-r from-emerald-400 to-purple-500 hover:from-emerald-500 hover:to-purple-600"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

