
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigation } from '@/contexts/NavigationContext';
import { ArrowUpRight, CornerDownRight, CornerUpRight, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const NavigationInstructions: React.FC = () => {
  const { 
    isNavigating, 
    currentInstruction, 
    upcomingHazards,
    routeDistance,
    routeDuration,
    simulateMovement
  } = useNavigation();

  // For demo purposes - simulate movement every few seconds
  useEffect(() => {
    if (isNavigating) {
      const interval = setInterval(() => {
        simulateMovement();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isNavigating, simulateMovement]);

  if (!isNavigating || !currentInstruction) {
    return null;
  }

  // Get the appropriate icon based on the maneuver type
  const getManeuverIcon = (maneuver: string) => {
    switch (maneuver) {
      case 'turn-right':
        return <CornerUpRight className="h-6 w-6" />;
      case 'turn-left':
        return <CornerDownRight className="h-6 w-6 transform -scale-x-100" />;
      case 'roundabout':
        return <div className="relative h-6 w-6 flex items-center justify-center border-2 border-current rounded-full">
          <div className="absolute w-1 h-1 rounded-full bg-current"></div>
          <CornerUpRight className="absolute h-3 w-3 -right-1 -top-1 transform rotate-45" />
        </div>;
      case 'depart':
        return <ArrowUpRight className="h-6 w-6" />;
      default:
        return <ArrowUpRight className="h-6 w-6" />;
    }
  };

  // Format distance for display
  const formatDistance = (meters: number) => {
    return meters >= 1000 
      ? `${(meters/1000).toFixed(1)} km` 
      : `${meters} m`;
  };

  // Calculate remaining distance percentage
  const getProgressPercentage = () => {
    if (!routeDistance) return 0;
    const remaining = routeDistance - currentInstruction.distance;
    return Math.min(100, Math.max(0, (remaining / routeDistance) * 100));
  };

  return (
    <div className="space-y-4">
      {/* Hazard alerts */}
      {upcomingHazards.length > 0 && (
        <div className="space-y-2">
          {upcomingHazards.map((hazard) => (
            <Card key={hazard.id} className="bg-destructive/10 border-destructive/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-destructive rounded-full p-1.5 text-white">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-destructive">
                    {hazard.type === 'LOW_BRIDGE' && 'Low Bridge Ahead'}
                    {hazard.type === 'NARROW_ROAD' && 'Narrow Road Ahead'}
                    {hazard.type === 'WEIGHT_RESTRICTION' && 'Weight Restriction Ahead'}
                  </h4>
                  <p className="text-sm">{hazard.description} • Limit: {hazard.limit}
                    {hazard.type === 'LOW_BRIDGE' && 'm height'}
                    {hazard.type === 'NARROW_ROAD' && 'm width'}
                    {hazard.type === 'WEIGHT_RESTRICTION' && 't'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Current instruction */}
      <Card className="border-2 border-nav-blue">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="bg-nav-blue text-white p-2 rounded-full">
              {getManeuverIcon(currentInstruction.maneuver)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{currentInstruction.text}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-500">
                  In {formatDistance(currentInstruction.distance)}
                </span>
                <span className="text-sm font-medium">
                  {Math.ceil(currentInstruction.duration / 60)} min
                </span>
              </div>
            </div>
          </div>
          
          {routeDistance && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Trip Progress</span>
                <span>{Math.round(getProgressPercentage())}%</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationInstructions;
