// import { useState, useEffect } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { ArrowLeft, Calendar, CreditCard } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';

// const BookAppointment = () => {
//   const { user } = useAuth();
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
  
//   const [formData, setFormData] = useState({
//     doctorId: '',
//     appointmentDate: '',
//     appointmentTime: '',
//     duration: '60',
//     notes: ''
//   });

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('doctors')
//         .select(`
//           *,
//           profiles!doctors_user_id_fkey(full_name, email)
//         `)
//         .eq('is_approved', true);

//       if (error) throw error;
//       setDoctors(data || []);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//       // Fallback: fetch doctors without profile join
//       try {
//         const { data: fallbackData, error: fallbackError } = await supabase
//           .from('doctors')
//           .select('*')
//           .eq('is_approved', true);
        
//         if (fallbackError) throw fallbackError;
//         setDoctors(fallbackData || []);
//       } catch (fallbackError) {
//         console.error('Fallback error:', fallbackError);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const calculateTotal = () => {
//     const selectedDoctor = doctors.find((doc: any) => doc.id === formData.doctorId);
//     if (!selectedDoctor) return '0';
    
//     const hourlyRate = parseFloat(selectedDoctor.hourly_rate) || 50;
//     const hours = parseInt(formData.duration) / 60;
//     return (hourlyRate * hours).toFixed(2);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!user || !formData.doctorId || !formData.appointmentDate || !formData.appointmentTime) {
//       toast({
//         title: "Missing information",
//         description: "Please fill in all required fields.",
//         variant: "destructive"
//       });
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`);
//       const selectedDoctor = doctors.find((doc: any) => doc.id === formData.doctorId);
      
//       // Get user profile for payment
//       const { data: userProfile } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('user_id', user.id)
//         .single();

//       if (!userProfile) {
//         throw new Error('User profile not found');
//       }

//       // Prepare appointment data for payment
//       const appointmentData = {
//         patient_id: user.id,
//         doctor_id: selectedDoctor.user_id,
//         appointment_date: appointmentDateTime.toISOString(),
//         duration_minutes: parseInt(formData.duration),
//         total_amount: parseFloat(calculateTotal()),
//         notes: formData.notes,
//       };

//       // Create payment with IremboPay
//       const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
//         body: {
//           appointmentData,
//           userProfile
//         }
//       });

//       if (paymentError) {
//         console.error('Payment creation error:', paymentError);
//         throw new Error('Failed to create payment');
//       }

//       if (!paymentData.success) {
//         console.error('Payment service error:', paymentData);
//         throw new Error(paymentData.error || 'Payment service failed');
//       }

//       // Store appointment with payment reference
//       const { error: appointmentError } = await supabase
//         .from('appointments')
//         .insert({
//           ...appointmentData,
//           status: 'pending',
//           payment_status: 'pending',
//           payment_id: paymentData.transactionId
//         });

//       if (appointmentError) {
//         console.error('Appointment creation error:', appointmentError);
//         throw appointmentError;
//       }

//       // Redirect to payment
//       window.location.href = paymentData.paymentLinkUrl;

//     } catch (error) {
//       console.error('Error booking appointment:', error);
//       toast({
//         title: "Booking failed",
//         description: error instanceof Error ? error.message : "There was an error booking your appointment. Please try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 p-4">
//       <div className="max-w-2xl mx-auto">
        
//         {/* Back Button */}
//         <div className="mb-6">
//           <Link 
//             to="/patient-dashboard" 
//             className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Dashboard
//           </Link>
//         </div>

//         {/* Booking Form */}
//         <Card className="border-0 shadow-healthcare bg-card">
//           <CardHeader className="text-center pb-6">
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
//                 <Calendar className="w-6 h-6 text-primary-foreground" />
//               </div>
//             </div>
//             <CardTitle className="text-2xl text-card-foreground">
//               Book an Appointment
//             </CardTitle>
//             <CardDescription>
//               Schedule a therapy session with one of our licensed professionals
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               {/* Doctor Selection */}
//               <div className="space-y-2">
//                 <Label htmlFor="doctor">Select Doctor *</Label>
//                 <Select value={formData.doctorId} onValueChange={(value) => handleInputChange('doctorId', value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose a therapist" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {doctors.map((doctor: any) => (
//                       <SelectItem key={doctor.id} value={doctor.id}>
//                         <div className="flex flex-col">
//                           <span className="font-medium">
//                             Dr. {doctor.profiles?.full_name || doctor.full_name || 'Unknown Doctor'}
//                           </span>
//                           <span className="text-sm text-muted-foreground">
//                             {doctor.specialization} - RWF{doctor.hourly_rate}/hour
//                           </span>
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Date and Time */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="date">Appointment Date *</Label>
//                   <Input
//                     id="date"
//                     type="date"
//                     value={formData.appointmentDate}
//                     onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
//                     min={new Date().toISOString().split('T')[0]}
//                     required
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="time">Appointment Time *</Label>
//                   <Input
//                     id="time"
//                     type="time"
//                     value={formData.appointmentTime}
//                     onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Duration */}
//               <div className="space-y-2">
//                 <Label htmlFor="duration">Session Duration</Label>
//                 <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="30">30 minutes</SelectItem>
//                     <SelectItem value="60">60 minutes</SelectItem>
//                     <SelectItem value="90">90 minutes</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Notes */}
//               <div className="space-y-2">
//                 <Label htmlFor="notes">Additional Notes (Optional)</Label>
//                 <Textarea
//                   id="notes"
//                   value={formData.notes}
//                   onChange={(e) => handleInputChange('notes', e.target.value)}
//                   placeholder="Describe your concerns or specific topics you'd like to discuss..."
//                   rows={3}
//                 />
//               </div>

//               {/* Payment Info */}
//               <div className="bg-accent/20 rounded-lg p-4">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <CreditCard className="w-5 h-5 text-primary" />
//                   <span className="font-medium">Secure Payment via IremboPay</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   You will be redirected to IremboPay to complete your payment securely. 
//                   Payment is required to confirm your appointment.
//                 </p>
//               </div>

//               {/* Total Cost */}
//               {formData.doctorId && (
//                 <div className="bg-accent/20 rounded-lg p-4">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">Total Cost:</span>
//                     <span className="text-xl font-bold text-primary">
//                       ${calculateTotal()}
//                     </span>
//                   </div>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Payment will be processed after doctor approval
//                   </p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <Button 
//                 type="submit" 
//                 className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
//                 disabled={submitting}
//               >
//                 {submitting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Booking...
//                   </>
//                 ) : (
//                   <>
//                     <CreditCard className="w-4 h-4 mr-2" />
//                     Book & Pay Now
//                   </>
//                 )}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default BookAppointment;

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BookAppointment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    duration: '60',
    notes: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('is_approved', true);

      if (error) throw error;

      // Assign random hourly rates between 10,000 and 15,000 RWF
      const enrichedDoctors = (data || []).map((doc) => ({
        ...doc,
        hourly_rate: Math.floor(10000 + Math.random() * 5000), // 10000 - 14999
      }));

      setDoctors(enrichedDoctors);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const selectedDoctor = doctors.find(doc => doc.id === formData.doctorId);
    if (!selectedDoctor) return 0;
    const hourlyRate = selectedDoctor.hourly_rate;
    const hours = parseInt(formData.duration) / 60;
    return Math.round(hourlyRate * hours); // no decimals for RWF
  };

  // Function to create appointment and handle payment through Supabase edge function
  const createAppointmentWithPayment = async (doctor: any, customer: any, amount: number) => {
    const appointmentData = {
      patient_id: user?.id,
      doctor_id: doctor.user_id,
      appointment_date: new Date(`${formData.appointmentDate}T${formData.appointmentTime}`).toISOString(),
      duration_minutes: parseInt(formData.duration),
      total_amount: amount,
      notes: formData.notes,
    };

    // Call Supabase edge function which handles Irembo API
    const { data, error } = await supabase.functions.invoke('create-payment', {
      body: {
        appointmentData,
        userProfile: customer
      }
    });

    if (error) {
      console.error("Payment error:", error);
      throw new Error("Failed to create payment");
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !formData.doctorId || !formData.appointmentDate || !formData.appointmentTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`);
      const selectedDoctor = doctors.find(doc => doc.id === formData.doctorId);

      // Get user profile for payment
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const totalAmount = calculateTotal();

      // 1️⃣ Create appointment with payment through Supabase edge function
      const paymentResponse = await createAppointmentWithPayment(
        selectedDoctor,
        {
          full_name: userProfile.full_name || "Patient",
          email: userProfile.email,
          phone: userProfile.phone,
        },
        totalAmount
      );

      console.log("Payment response:", paymentResponse);

      if (!paymentResponse?.paymentLinkUrl) {
        throw new Error("Failed to create payment link");
      }

      // Redirect to IremboPay
      window.open(paymentResponse.paymentLinkUrl, '_blank');

      // Show success message
      toast({
        title: "Payment Created",
        description: "Please complete your payment to confirm the appointment.",
      });

      // Reset form
      setFormData({
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '',
        duration: '60',
        notes: ''
      });

    } catch (err: any) {
      console.error('Error booking appointment:', err);
      toast({
        title: "Booking failed",
        description: err.message || "There was an error booking your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 p-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-6">
          <Link to="/patient-dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <Card className="border-0 shadow-healthcare bg-card">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl text-card-foreground">
              Book an Appointment
            </CardTitle>
            <CardDescription>
              Schedule a therapy session with one of our licensed professionals
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Doctor Selection */}
              <div className="space-y-2">
                <Label htmlFor="doctor">Select Doctor *</Label>
                <Select value={formData.doctorId} onValueChange={(value) => handleInputChange('doctorId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a therapist" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            Dr. {doctor.full_name || 'Unknown Doctor'}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {doctor.specialization} - {doctor.hourly_rate} RWF/hour
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Appointment Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Appointment Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Session Duration</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Describe your concerns..."
                  rows={3}
                />
              </div>

              {/* Payment Info */}
              <div className="bg-accent/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="font-medium">Secure Payment via IremboPay</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You will be redirected to IremboPay to complete your payment securely. 
                  Payment is required to confirm your appointment.
                </p>
              </div>

              {/* Total Cost */}
              {formData.doctorId && (
                <div className="bg-accent/20 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Cost:</span>
                    <span className="text-xl font-bold text-primary">
                      {calculateTotal()} RWF
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Payment will be processed after doctor approval
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground" disabled={submitting}>
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Booking...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Book & Pay Now
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookAppointment;
