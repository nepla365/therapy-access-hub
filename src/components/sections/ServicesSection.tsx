import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageSquare, 
  Video, 
  Calendar, 
  Globe, 
  CreditCard, 
  Users,
  Heart,
  Brain
} from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      icon: MessageSquare,
      title: "Individual Therapy",
      description: "One-on-one sessions with licensed therapists specialized in anxiety, depression, and stress management.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Video,
      title: "Video Consultations",
      description: "Secure video sessions from the comfort of your home. Available in English, French, and Kinyarwanda.",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Users,
      title: "Group Therapy",
      description: "Connect with others facing similar challenges in supportive group sessions led by professionals.",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: Brain,
      title: "Crisis Support",
      description: "24/7 emergency mental health support for urgent situations and crisis intervention.",
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      icon: Calendar,
      title: "Flexible Booking",
      description: "Easy online booking system with flexible scheduling to fit your lifestyle and commitments.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Therapy services available in English, French, and Kinyarwanda to ensure comfort and understanding.",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  const features = [
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Bank cards, Mobile Money (MOMO), and flexible payment plans available.",
    },
    {
      icon: Heart,
      title: "Youth-Focused Care",
      description: "Specialized programs designed specifically for young adults and adolescents.",
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Our Services
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Comprehensive Mental Health Support
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We offer a range of professional mental health services designed to meet your unique needs. 
            Our licensed therapists are here to support your journey to better mental health.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-healthcare transition-shadow duration-300 bg-card">
              <CardHeader>
                <div className={`inline-flex p-3 rounded-xl ${service.bgColor} w-fit mb-4`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-card-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-card rounded-2xl shadow-soft border border-primary/5">
              <div className="p-3 bg-accent rounded-xl">
                <feature.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-healthcare"
          >
            Book Your First Session
          </Button>
        </div>
      </div>
    </section>
  );
};