import React from 'react';
import { Heart, Phone, Mail, MapPin, Globe } from 'lucide-react';
import therapalLogo from '@/assets/therapal-logo.jpeg';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={therapalLogo} 
                alt="Therapal Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-semibold">Therapal</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Bridging the gap between patients and licensed therapists to provide accessible, 
              confidential, and affordable mental health support across Rwanda.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="w-4 h-4" />
              <span>Mental Health for Everyone</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#doctors" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Our Therapists
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-foreground/80">Individual Therapy</li>
              <li className="text-primary-foreground/80">Group Sessions</li>
              <li className="text-primary-foreground/80">Crisis Support</li>
              <li className="text-primary-foreground/80">Video Consultations</li>
              <li className="text-primary-foreground/80">Emergency Hotline</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span className="text-primary-foreground/80">+250 788 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span className="text-primary-foreground/80">support@therapal.rw</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span className="text-primary-foreground/80">Kigali, Rwanda</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4" />
                <span className="text-primary-foreground/80">EN | KIN | FR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 mt-0.5 text-destructive" />
            <div>
              <h4 className="font-medium text-primary-foreground mb-1">
                Crisis Support Available 24/7
              </h4>
              <p className="text-sm text-primary-foreground/80">
                If you're experiencing a mental health emergency, please call our crisis hotline at{' '}
                <strong>+250 788 123 456</strong> or visit your nearest emergency room.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © 2024 Therapal. All rights reserved. | Building mental health awareness in Rwanda.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};