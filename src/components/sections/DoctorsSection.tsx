import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Award, 
  Languages, 
  Clock,
  MapPin,
  Heart,
  User
} from 'lucide-react';

export const DoctorsSection = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Aline Uwimana",
      title: "Clinical Psychologist",
      specialization: "Anxiety & Depression Specialist",
      experience: "8 years",
      languages: ["English", "Kinyarwanda", "French"],
      rating: 4.9,
      reviews: 127,
      availability: "Available Today",
      location: "Kigali, Rwanda",
      bio: "Dr. Uwimana specializes in cognitive behavioral therapy and has extensive experience working with young adults facing anxiety and depression.",
      image: "/api/placeholder/150/150"
    },
    {
      id: 2,
      name: "Dr. Jean Baptiste Nkurunziza",
      title: "Psychiatrist",
      specialization: "Youth Mental Health",
      experience: "12 years",
      languages: ["English", "Kinyarwanda"],
      rating: 4.8,
      reviews: 89,
      availability: "Available Tomorrow",
      location: "Kigali, Rwanda",
      bio: "Dr. Nkurunziza focuses on adolescent psychiatry and has pioneered several youth mental health programs in Rwanda.",
      image: "/api/placeholder/150/150"
    },
    {
      id: 3,
      name: "Dr. Marie Claire Mukamana",
      title: "Licensed Therapist",
      specialization: "Trauma & PTSD",
      experience: "6 years",
      languages: ["French", "Kinyarwanda", "English"],
      rating: 4.9,
      reviews: 156,
      availability: "Available Today",
      location: "Kigali, Rwanda",
      bio: "Dr. Mukamana specializes in trauma-informed care and has worked extensively with survivors of various traumatic experiences.",
      image: "/api/placeholder/150/150"
    }
  ];

  return (
    <section id="doctors" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <User className="w-4 h-4 mr-2" />
            Our Therapists
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Meet Our Licensed Professionals
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our team of experienced, licensed mental health professionals is dedicated to providing 
            you with the highest quality care in a safe and supportive environment.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="border-0 shadow-soft hover:shadow-healthcare transition-shadow duration-300 bg-card overflow-hidden">
              
              {/* Doctor Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    {doctor.availability}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-card-foreground mb-1">
                      {doctor.name}
                    </CardTitle>
                    <p className="text-primary font-medium text-sm">
                      {doctor.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {doctor.specialization}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {doctor.bio}
                </p>

                {/* Doctor Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {doctor.experience} experience
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {doctor.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Languages className="w-4 h-4 text-primary" />
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((lang, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button 
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                  >
                    Book Session
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-accent/30 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Can't find the right therapist?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our team will help match you with the perfect mental health professional for your specific needs.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-healthcare"
          >
            Get Personalized Matching
          </Button>
        </div>
      </div>
    </section>
  );
};