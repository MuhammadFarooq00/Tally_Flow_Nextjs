import { Card } from '../components/ui/card';
import { Plus, Minus, RotateCcw, Edit2, Maximize, Grid } from 'lucide-react';

const HowToUse = () => {
  const steps = [
    {
      icon: Plus,
      title: "Create Your First Counter",
      description: "Click the 'Add Counter' button and give your counter a meaningful name. You can create unlimited counters for different purposes."
    },
    {
      icon: Plus,
      title: "Increment & Decrement",
      description: "Use the + button to increase your count and the - button to decrease it. Each action provides satisfying visual and audio feedback."
    },
    {
      icon: RotateCcw,
      title: "Reset When Needed",
      description: "Click the reset button to set your counter back to zero. Perfect for starting fresh or clearing completed counts."
    },
    {
      icon: Edit2,
      title: "Customize Your Counters",
      description: "Hover over any counter and click the edit icon to rename it. Keep your counters organized with descriptive names."
    },
    {
      icon: Maximize,
      title: "Full-Screen Experience",
      description: "Switch to full-screen mode for an immersive counting experience. Scroll or use arrow keys to navigate between counters."
    },
    {
      icon: Grid,
      title: "Grid View",
      description: "Return to grid view to see all your counters at once. Perfect for managing multiple counts simultaneously."
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 animated-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              How to Use TallyFlow
            </h1>
            <p className="text-xl text-white/80">
              Master the art of counting with our intuitive interface
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="glass-effect card-gradient p-6 space-y-4 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-13">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>

          <Card className="glass-effect p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-center text-foreground">Pro Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Keyboard Shortcuts</h3>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Arrow Up/Down: Navigate between counters in full-screen</li>
                  <li>• Escape: Exit full-screen mode</li>
                  <li>• Enter: Save counter name when editing</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Touch Gestures</h3>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Swipe up/down: Navigate between counters</li>
                  <li>• Tap and hold: Quick edit counter name</li>
                  <li>• Double tap: Quick reset counter</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="glass-effect p-8 text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Ready to Start Counting?</h2>
            <p className="text-muted-foreground">
              Your data is automatically saved and will be available whenever you return to TallyFlow.
            </p>
            <div className="pt-4">
              <a 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
              >
                Start Counting Now
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
