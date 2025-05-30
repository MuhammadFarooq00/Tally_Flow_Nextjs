import { Card } from '../components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen pt-20 pb-8 px-4 animated-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Terms & Privacy Policy
            </h1>
            <p className="text-xl text-white/80">
              Simple, transparent, and user-friendly policies
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-effect p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Terms of Service</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">1. Acceptance of Terms</h3>
                  <p className="text-muted-foreground">
                    By using TallyFlow, you agree to these terms. If you don't agree, please don't use our service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">2. Service Description</h3>
                  <p className="text-muted-foreground">
                    TallyFlow is a free web-based counter application that allows users to create and manage unlimited counting tools.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">3. User Responsibilities</h3>
                  <p className="text-muted-foreground">
                    You are responsible for your use of the service and any data you input. Use TallyFlow responsibly and lawfully.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">4. Service Availability</h3>
                  <p className="text-muted-foreground">
                    We strive to keep TallyFlow available 24/7, but we don't guarantee uninterrupted service and may perform maintenance as needed.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">5. Limitation of Liability</h3>
                  <p className="text-muted-foreground">
                    TallyFlow is provided "as is" without warranties. We're not liable for any data loss or damages arising from your use of the service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">6. Changes to Terms</h3>
                  <p className="text-muted-foreground">
                    We may update these terms occasionally. Continued use of TallyFlow constitutes acceptance of any changes.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Privacy Policy</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Data Collection</h3>
                  <p className="text-muted-foreground">
                    TallyFlow doesn't collect, store, or transmit any personal information. Your privacy is our top priority.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Local Storage</h3>
                  <p className="text-muted-foreground">
                    All your counter data and settings are stored locally in your browser. This data never leaves your device.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No Tracking</h3>
                  <p className="text-muted-foreground">
                    We don't use analytics, tracking pixels, or any other tracking technologies. Your usage remains completely private.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No Accounts Required</h3>
                  <p className="text-muted-foreground">
                    TallyFlow works without registration, login, or any personal information. No email addresses or passwords needed.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Third-Party Services</h3>
                  <p className="text-muted-foreground">
                    TallyFlow doesn't integrate with any third-party services that could access your data.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Data Security</h3>
                  <p className="text-muted-foreground">
                    Since all data is stored locally, security depends on your device and browser. We recommend keeping your devices secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Contact Information</h3>
                  <p className="text-muted-foreground">
                    If you have privacy concerns or questions, please contact us through our Contact page.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="glass-effect p-8 text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Your Privacy Matters</h2>
            <p className="text-muted-foreground text-lg">
              TallyFlow is designed with privacy by default. Your data is yours alone, stored securely on your device, 
              and never shared with anyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto gradient-text">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Secure</h3>
                <p className="text-sm text-muted-foreground">Local storage only</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 16.121m6.878-6.243L18.121 3" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Private</h3>
                <p className="text-sm text-muted-foreground">No tracking</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Transparent</h3>
                <p className="text-sm text-muted-foreground">Open source</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
