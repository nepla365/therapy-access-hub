import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import therapalLogo from '@/assets/therapal-logo.jpeg';

interface NavigationProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export const Navigation = ({ onLoginClick, onSignupClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={therapalLogo} 
              alt="Therapal Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-semibold text-primary">Therapal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#doctors" className="text-foreground hover:text-primary transition-colors">
              Doctors
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onLoginClick}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Login
            </Button>
            <Button 
              onClick={onSignupClick}
              className="bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#services" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#doctors" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Doctors
              </a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={onLoginClick}
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Login
                </Button>
                <Button 
                  onClick={onSignupClick}
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};