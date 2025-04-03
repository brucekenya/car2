
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { useVehicle } from '@/contexts/VehicleContext';
import { AlertTriangle, Navigation as NavigationIcon } from 'lucide-react';

const UK_CENTER = { lat: 54.00366, lng: -2.547855 };

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { 
    currentPosition, 
    origin, 
    destination, 
    waypoints,
    upcomingHazards,
    isNavigating
  } = useNavigation();
  const { currentVehicle } = useVehicle();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // In a real implementation, this would load and initialize a MapBox map
    // For the MVP prototype, we'll use a mock map UI
    if (mapRef.current) {
      setTimeout(() => setMapLoaded(true), 1000);
    }
  }, []);

  // Mock function to generate a "map" from London to Manchester
  const renderMockMap = () => {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        {/* Mock map background */}
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" 
          style={{ backgroundImage: 'url(https://i.imgur.com/JxM9guK.jpg)' }}>
        </div>
        
        {/* Mock route */}
        {origin && destination && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[70%] h-[2px] bg-nav-blue transform rotate-12 relative">
              <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
              <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-md"></div>
              
              {/* Mock waypoints */}
              {waypoints.map((_, idx) => (
                <div 
                  key={idx} 
                  className="absolute -top-2 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md"
                  style={{ left: `${30 + idx * 20}%` }}
                ></div>
              ))}
            </div>
          </div>
        )}
        
        {/* Mock current position */}
        {currentPosition && (
          <div className="absolute" style={{ top: '48%', left: '45%' }}>
            <div className="relative">
              <div className="animate-ping absolute h-6 w-6 rounded-full bg-nav-blue opacity-75"></div>
              <div className="relative rounded-full h-4 w-4 bg-nav-blue border-2 border-white shadow-md"></div>
            </div>
          </div>
        )}
        
        {/* Mock hazards */}
        {upcomingHazards.map((hazard, idx) => (
          <div 
            key={hazard.id}
            className="absolute" 
            style={{ 
              top: `${35 + idx * 15}%`, 
              left: `${55 + (idx % 2 * 15)}%` 
            }}
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white animate-pulse-alert shadow-lg">
              <AlertTriangle size={16} />
            </div>
          </div>
        ))}
        
        {/* Map loading overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="flex flex-col items-center">
              <NavigationIcon className="h-12 w-12 text-nav-blue animate-pulse" />
              <p className="mt-4 text-nav-blue font-semibold">Loading map...</p>
            </div>
          </div>
        )}
        
        {/* Vehicle info */}
        {currentVehicle && (
          <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-md shadow-md text-xs">
            <p className="font-semibold">{currentVehicle.name}</p>
            <p>H: {currentVehicle.height}m • W: {currentVehicle.width}m</p>
            <p>Weight: {currentVehicle.weight}t</p>
          </div>
        )}
        
        {/* Navigation mode indicator */}
        {isNavigating && (
          <div className="absolute top-4 right-4 bg-nav-green text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            Active Navigation
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden shadow-md">
      {renderMockMap()}
    </div>
  );
};

export default Map;
