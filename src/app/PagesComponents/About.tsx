import { Card } from '../components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen pt-20 pb-8 px-4 animated-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              About TallyFlow
            </h1>
            <p className="text-xl text-white/80">
              The most beautiful and intuitive tally counter app
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-effect p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                TallyFlow is designed to provide the most elegant and efficient counting experience. 
                Whether you're tracking daily habits, counting inventory, or managing events, 
                our app combines beautiful design with powerful functionality.
              </p>
            </Card>

            <Card className="glass-effect p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Key Features</h2>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                  <span>Unlimited counters with custom names</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Beautiful animations and smooth transitions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Full-screen immersive counting experience</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Automatic data persistence</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Dark and light theme support</span>
                </li>
              </ul>
            </Card>

            <Card className="glass-effect p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Technology</h2>
              <p className="text-muted-foreground leading-relaxed">
                Built with modern web technologies including React, TypeScript, and Tailwind CSS. 
                TallyFlow leverages browser storage for offline functionality and provides a 
                progressive web app experience that works seamlessly across all devices.
              </p>
            </Card>

            <Card className="glass-effect p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Privacy First</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data stays on your device. TallyFlow doesn't collect, store, or transmit 
                any personal information. All counters and settings are stored locally in your 
                browser, ensuring complete privacy and offline functionality.
              </p>
            </Card>
          </div>

          <div className="text-center pt-8">
            <Card className="glass-effect p-8 space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Start Counting Today
              </h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of users who have made TallyFlow their go-to counting solution. 
                Simple, beautiful, and always free.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
