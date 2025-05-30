"use client";
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 animated-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-xl text-white/80">
              We'd love to hear from you. Send us a message!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-effect p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 gradient-text"
                >
                  Send Message
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="glass-effect p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Quick Support</h3>
                <p className="text-muted-foreground">
                  For immediate assistance with TallyFlow, check out our FAQ section or 
                  try refreshing the app. Most issues are resolved by clearing your browser cache.
                </p>
              </Card>

              <Card className="glass-effect p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Feature Requests</h3>
                <p className="text-muted-foreground">
                  Have an idea for a new feature? We love hearing from our users! 
                  Send us your suggestions and we'll consider them for future updates.
                </p>
              </Card>

              <Card className="glass-effect p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Bug Reports</h3>
                <p className="text-muted-foreground">
                  Found a bug? Please include details about your browser, device, 
                  and steps to reproduce the issue. Screenshots are always helpful!
                </p>
              </Card>

              <Card className="glass-effect p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Business Inquiries</h3>
                <p className="text-muted-foreground">
                  Interested in partnering with TallyFlow or need a custom solution? 
                  We're open to discussing business opportunities and enterprise features.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
