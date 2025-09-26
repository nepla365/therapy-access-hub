import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCog, Calendar, Shield, LogOut, BarChart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    pendingApprovals: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch user count
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('role');
      
      if (profilesError) throw profilesError;

      // Fetch doctor count
      const { data: doctors, error: doctorsError } = await supabase
        .from('doctors')
        .select('id, is_approved');
      
      if (doctorsError) throw doctorsError;

      // Fetch appointment count
      const { data: appointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select('id');
      
      if (appointmentsError) throw appointmentsError;

      setStats({
        totalUsers: profiles?.filter(p => p.role === 'user').length || 0,
        totalDoctors: doctors?.length || 0,
        totalAppointments: appointments?.length || 0,
        pendingApprovals: doctors?.filter(d => !d.is_approved).length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-card-foreground">Admin Dashboard</h1>
            </div>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            Welcome back, Admin
          </h2>
          <p className="text-muted-foreground">
            Manage the entire Therapal platform from this dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Total Users
              </CardTitle>
              <CardDescription className="text-2xl font-bold">
                {loading ? '...' : stats.totalUsers}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <UserCog className="w-5 h-5 mr-2 text-primary" />
                Total Doctors
              </CardTitle>
              <CardDescription className="text-2xl font-bold">
                {loading ? '...' : stats.totalDoctors}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Appointments
              </CardTitle>
              <CardDescription className="text-2xl font-bold">
                {loading ? '...' : stats.totalAppointments}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <BarChart className="w-5 h-5 mr-2 text-orange-600" />
                Pending Approvals
              </CardTitle>
              <CardDescription className="text-2xl font-bold text-orange-600">
                {loading ? '...' : stats.pendingApprovals}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Manage Users
              </CardTitle>
              <CardDescription>
                View, edit, and manage all registered users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Users</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCog className="w-5 h-5 mr-2 text-primary" />
                Manage Doctors
              </CardTitle>
              <CardDescription>
                Approve, edit, and manage doctor profiles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Doctors</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                All Appointments
              </CardTitle>
              <CardDescription>
                View and manage all platform appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Appointments</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-primary" />
                Analytics
              </CardTitle>
              <CardDescription>
                View platform analytics and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Reports</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                System Settings
              </CardTitle>
              <CardDescription>
                Configure platform settings and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;