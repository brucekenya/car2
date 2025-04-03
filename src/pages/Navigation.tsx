
import React from 'react';
import Layout from '@/components/Layout';
import Map from '@/components/navigation/Map';
import NavigationControls from '@/components/navigation/NavigationControls';
import NavigationInstructions from '@/components/navigation/NavigationInstructions';
import VehicleSelector from '@/components/vehicles/VehicleSelector';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useNavigation } from '@/contexts/NavigationContext';

const Navigation = () => {
  const { user } = useAuth();
  const { isNavigating } = useNavigation();
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Navigation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <NavigationControls />
            <VehicleSelector />
          </div>
          
          {/* Main map area */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <div className="h-[60vh] rounded-lg overflow-hidden shadow-md">
              <Map />
            </div>
            
            {/* Navigation instructions */}
            {isNavigating && (
              <NavigationInstructions />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Navigation;
