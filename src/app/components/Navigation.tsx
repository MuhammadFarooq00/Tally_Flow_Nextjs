"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Home, Plus, Settings, File } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About' },
    { id: 'howToUse', label: 'How to Use' },
    { id: 'faq', label: 'FAQ' },
    // { id: 'contact', label: 'Contact' },
    { id: 'terms', label: 'Terms', onClick: () => setIsTermsOpen(true) },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 dark:text-white right-0 z-50 glass-effect bg-black/10 dark:border-b  border-b-[8px] border-black/30 dark:border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('home')}
              className="flex cursor-pointer items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
                TallyFlow
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.onClick || (() => scrollToSection(item.id))}
                  className="text-sm cursor-pointer font-medium font-display transition-colors hover:text-emerald-400 text-white/80"
                >
                  {item.label}
                </button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white/80"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.onClick || (() => scrollToSection(item.id))}
                    className="block w-full text-left px-3 py-2 text-base font-medium font-display transition-colors hover:text-emerald-400 text-white/80"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Terms Modal */}
      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh]  overflow-y-auto bg-white/95 dark:bg-gradient-to-br dark:from-gray-900/90 dark:to-black/90 backdrop-blur-md border border-gray-200 dark:border-white/10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-display bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">Terms & Privacy Policy</DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-white/70">
              Last updated: May 23, 2025
            </DialogDescription>
          </DialogHeader>

          <div  className="space-y-8 py-4">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-display text-gray-900 dark:text-white">Terms of Use</h3>
              <p className="text-blue-100 dark:text-white/80 leading-relaxed">
                Welcome to TallyFlow, a beautiful way to keep track of anything that matters. By using our service, you agree to be bound by these Terms of Use. Please read them carefully.
              </p>
              <div className="space-y-2  pl-4">
                <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                  • TallyFlow is provided "as is" without warranty of any kind, express or implied.
                </p>
                <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                  • We reserve the right to modify, suspend, or discontinue the service at any time without notice.
                </p>
                <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                  • You are responsible for safeguarding your data by taking appropriate measures (e.g., screenshots, backups).
                </p>
                <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                  • You agree not to misuse our services or help anyone else do so.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-display text-gray-900 dark:text-white">Privacy Policy</h3>
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                Your privacy is important to us. TallyFlow respects your privacy regarding any information we may collect while operating our service.
              </p>
              <div className="space-y-2 pl-4">
                <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                  • <span className="font-semibold text-emerald-500">Local Storage:</span> All your counter data is stored locally on your device using browser localStorage. We do not transmit or store your counter data on our servers.
                </p>
                <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                  • <span className="font-semibold text-emerald-500">Analytics:</span> We may collect anonymous usage statistics to improve our service.
                </p>
                <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                  • <span className="font-semibold text-emerald-500">Cookies:</span> We use cookies to remember your preferences, such as theme choice.
                </p>
                <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                  • <span className="font-semibold text-emerald-500">Third Parties:</span> We do not sell, trade, or otherwise transfer your information to third parties.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-display text-gray-900 dark:text-white">Copyright Notice</h3>
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                TallyFlow and all its original content, features, and functionality are owned by TallyFlow and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-display text-gray-900 dark:text-white">Contact Us</h3>
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                If you have any questions about these Terms or Privacy Policy, please contact us at support@tallyflow.app
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
