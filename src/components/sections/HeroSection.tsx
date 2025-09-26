import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Shield, Clock } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-background via-accent/10 to-primary/5 py-20 sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(67,172,185,0.05)_50%,transparent_75%)] animate-pulse"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Professional Mental Health Support
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Accessible{' '}
              <span className="text-primary">Mental Health</span>{' '}
              Care for Everyone
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Connect with licensed therapists from anywhere in Rwanda. Confidential, 
              affordable, and professional mental health support when you need it most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-healthcare group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Learn More
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Patients Helped</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Licensed Therapists</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Features */}
          <div className="relative">
            <div className="grid gap-6">
              <div className="bg-card p-6 rounded-2xl shadow-soft border border-primary/10">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      Confidential & Secure
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your privacy is our priority. All sessions are encrypted and confidential.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-2xl shadow-soft border border-primary/10">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-success/10 rounded-xl">
                    <Clock className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      Flexible Scheduling
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Book sessions that fit your schedule. Available in multiple languages.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-2xl shadow-soft border border-primary/10">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-warning/10 rounded-xl">
                    <Heart className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      Professional Care
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Licensed therapists specialized in youth mental health support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};