"use client";
import { Card } from '../components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How many counters can I create?",
      answer: "You can create unlimited counters with TallyFlow. There's no restriction on the number of counters you can have active at once."
    },
    {
      question: "Is my data stored securely?",
      answer: "Yes! All your counter data is stored locally in your browser using localStorage. This means your data never leaves your device and is completely private."
    },
    {
      question: "Will I lose my counters if I clear my browser data?",
      answer: "Unfortunately, yes. Since TallyFlow stores data locally, clearing your browser data will remove your counters. We recommend taking screenshots of important counts before clearing browser data."
    },
    {
      question: "Does TallyFlow work offline?",
      answer: "Absolutely! TallyFlow is designed to work completely offline. Once loaded, you can use all features without an internet connection."
    },
    {
      question: "Can I use TallyFlow on mobile devices?",
      answer: "Yes! TallyFlow is fully responsive and optimized for mobile devices. It works great on smartphones and tablets with touch-friendly controls."
    },
    {
      question: "How do I switch between light and dark themes?",
      answer: "Click the theme toggle button in the top navigation bar. You can switch between light, dark, and system themes. Your preference is automatically saved."
    },
    {
      question: "What's the maximum count value?",
      answer: "TallyFlow can handle very large numbers (up to JavaScript's safe integer limit: 9,007,199,254,740,991). Perfect for any counting scenario!"
    },
    {
      question: "Can I export my counter data?",
      answer: "Currently, TallyFlow doesn't have a built-in export feature. However, your data is stored in localStorage and can be accessed via browser developer tools if needed."
    },
    {
      question: "Why use TallyFlow over other counter apps?",
      answer: "TallyFlow offers a unique combination of beautiful design, smooth animations, unlimited counters, full-screen experience, and complete privacy with local storage."
    },
    {
      question: "Is TallyFlow free to use?",
      answer: "Yes! TallyFlow is completely free to use with no ads, no subscriptions, and no hidden costs. We believe counting should be simple and accessible to everyone."
    },
    {
      question: "How do I report bugs or request features?",
      answer: "You can contact us through the Contact page. We value user feedback and regularly update TallyFlow based on user suggestions."
    },
    {
      question: "Does TallyFlow require an account or registration?",
      answer: "No! TallyFlow works immediately without any registration, login, or personal information. Just open the app and start counting."
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 animated-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80">
              Everything you need to know about TallyFlow
            </p>
          </div>

          <Card className="glass-effect p-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible
                  key={index}
                  open={openItems.includes(index)}
                  onOpenChange={() => toggleItem(index)}
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left hover:bg-accent/50 rounded-lg px-4 transition-colors">
                    <h3 className="text-lg font-medium text-foreground pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </Card>

          <Card className="glass-effect p-8 text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Still Have Questions?</h2>
            <p className="text-muted-foreground">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="pt-4">
              <a 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 gradient-text"
              >
                Contact Support
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
