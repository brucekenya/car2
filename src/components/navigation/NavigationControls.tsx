
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, MapPin, Navigation as NavigationIcon, Plus, X } from 'lucide-react';
import { useNavigation, RoutePoint } from '@/contexts/NavigationContext';
import { Separator } from '@/components/ui/separator';

const NavigationControls: React.FC = () => {
  const { 
    origin, 
    destination, 
    waypoints,
    setOrigin, 
    setDestination, 
    addWaypoint, 
    removeWaypoint,
    startNavigation,
    stopNavigation,
    isNavigating
  } = useNavigation();
  
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [waypointInput, setWaypointInput] = useState('');
  const [showRoutePanel, setShowRoutePanel] = useState(true);

  const handleSetOrigin = () => {
    if (originInput.trim()) {
      setOrigin({
        name: originInput,
        coordinates: { lat: 51.5074, lng: -0.1278 } // London coordinates for demo
      });
      setOriginInput('');
    }
  };

  const handleSetDestination = () => {
    if (destinationInput.trim()) {
      setDestination({
        name: destinationInput,
        coordinates: { lat: 53.4808, lng: -2.2426 } // Manchester coordinates for demo
      });
      setDestinationInput('');
    }
  };

  const handleAddWaypoint = () => {
    if (waypointInput.trim()) {
      addWaypoint({
        name: waypointInput,
        coordinates: { 
          lat: 52.4862 + (Math.random() - 0.5) * 0.1, 
          lng: -1.8904 + (Math.random() - 0.5) * 0.1 
        } // Birmingham area coordinates for demo with slight randomization
      });
      setWaypointInput('');
    }
  };

  const toggleNavigation = () => {
    if (isNavigating) {
      stopNavigation();
    } else {
      startNavigation();
    }
  };

  return (
    <Card className="navigation-controls shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-nav-blue">Route Planner</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowRoutePanel(!showRoutePanel)}
          >
            {showRoutePanel ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        {showRoutePanel && (
          <>
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="origin" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-green-600" />
                  Origin
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="origin"
                    placeholder="Enter starting point"
                    value={originInput}
                    onChange={(e) => setOriginInput(e.target.value)}
                  />
                  <Button size="sm" onClick={handleSetOrigin}>Set</Button>
                </div>
                {origin && (
                  <div className="flex items-center justify-between bg-green-50 p-2 rounded text-sm">
                    <span>{origin.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setOrigin(null)}
                      className="h-6 w-6 p-0"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-red-600" />
                  Destination
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="destination"
                    placeholder="Enter destination"
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                  />
                  <Button size="sm" onClick={handleSetDestination}>Set</Button>
                </div>
                {destination && (
                  <div className="flex items-center justify-between bg-red-50 p-2 rounded text-sm">
                    <span>{destination.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setDestination(null)}
                      className="h-6 w-6 p-0"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="waypoint" className="flex items-center">
                  <Plus className="h-4 w-4 mr-1 text-blue-600" />
                  Waypoints
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="waypoint"
                    placeholder="Add a stop"
                    value={waypointInput}
                    onChange={(e) => setWaypointInput(e.target.value)}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleAddWaypoint}
                    disabled={waypoints.length >= 3} // Limit to 3 waypoints for demo
                  >
                    Add
                  </Button>
                </div>
                
                {waypoints.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {waypoints.map((waypoint, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded text-sm">
                        <span>{index + 1}. {waypoint.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeWaypoint(index)}
                          className="h-6 w-6 p-0"
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              className="w-full"
              onClick={toggleNavigation}
              disabled={!origin || !destination}
              variant={isNavigating ? "destructive" : "default"}
            >
              <NavigationIcon className="h-4 w-4 mr-2" />
              {isNavigating ? "Stop Navigation" : "Start Navigation"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NavigationControls;
