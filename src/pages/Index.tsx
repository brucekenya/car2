
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, MapPin, AlertTriangle, Map as MapIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  // If user is not logged in, show auth forms
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-nav-blue-dark to-nav-blue flex flex-col justify-center items-center p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">RoadWise Navigator UK</h1>
          <p className="text-lg text-white/80">Safe navigation for HGV and PSV drivers</p>
        </div>
        
        {showLogin ? (
          <LoginForm onToggleForm={() => setShowLogin(false)} />
        ) : (
          <SignupForm onToggleForm={() => setShowLogin(true)} />
        )}
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <Truck className="h-10 w-10 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">HGV & PSV Focused</h3>
            <p className="text-white/80">Specialized navigation for large vehicles with customizable profiles for your fleet.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <AlertTriangle className="h-10 w-10 text-nav-alert-warning mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Hazard Alerts</h3>
            <p className="text-white/80">Real-time warnings for low bridges, narrow roads, and weight restrictions across the UK.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <MapPin className="h-10 w-10 text-nav-alert-light mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Optimized Routes</h3>
            <p className="text-white/80">Smart routing that considers your vehicle dimensions and road restrictions.</p>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in, show dashboard
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-nav-blue to-nav-blue-dark text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Start Navigating</h2>
            <p className="mb-6">Plan your route with RoadWise Navigator to avoid low bridges, narrow roads, and weight restrictions.</p>
            <Link to="/navigation">
              <Button className="bg-white text-nav-blue hover:bg-gray-100">
                Open Navigation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Manage Vehicles</h2>
            <p className="mb-6">Set up your vehicle profiles with dimensions and weight for optimized routing.</p>
            <Link to="/vehicles">
              <Button variant="outline">
                Vehicle Profiles
                <Truck className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">UK Hazard Map</h2>
            <p className="mb-4">View a map of all known hazards for heavy vehicles across the United Kingdom.</p>
            <Link to="/hazards">
              <Button variant="outline">
                Open Hazard Map
                <MapIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="h-[200px] bg-gray-100 relative">
            <div className="absolute inset-0 opacity-40 bg-cover bg-center" 
              style={{ backgroundImage: 'url(https://i.imgur.com/JxM9guK.jpg)' }}>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <Button variant="default">
                View Full Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
