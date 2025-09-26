import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { DoctorsSection } from '@/components/sections/DoctorsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/register');
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <HeroSection onGetStarted={handleGetStarted} />
      <ServicesSection />
      <DoctorsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
