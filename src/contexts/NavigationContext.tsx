
import React, { createContext, useState, useContext } from 'react';
import { useVehicle } from './VehicleContext';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RoutePoint {
  coordinates: Coordinates;
  name: string;
}

export interface Hazard {
  id: string;
  type: 'LOW_BRIDGE' | 'NARROW_ROAD' | 'WEIGHT_RESTRICTION';
  description: string;
  coordinates: Coordinates;
  limit: number; // height/width/weight limit
  warningDistance: number; // in meters
}

export interface NavigationInstruction {
  text: string;
  distance: number; // in meters
  duration: number; // in seconds
  maneuver: string;
}

interface NavigationContextType {
  origin: RoutePoint | null;
  destination: RoutePoint | null;
  waypoints: RoutePoint[];
  isNavigating: boolean;
  currentPosition: Coordinates | null;
  currentInstruction: NavigationInstruction | null;
  upcomingHazards: Hazard[];
  routeDistance: number | null; // in meters
  routeDuration: number | null; // in seconds
  setOrigin: (origin: RoutePoint | null) => void;
  setDestination: (destination: RoutePoint | null) => void;
  addWaypoint: (waypoint: RoutePoint) => void;
  removeWaypoint: (index: number) => void;
  startNavigation: () => void;
  stopNavigation: () => void;
  simulateMovement: () => void; // For demo purposes
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Mock data for simulation
const mockHazards: Hazard[] = [
  {
    id: '1',
    type: 'LOW_BRIDGE',
    description: 'Railway Bridge - A41',
    coordinates: { lat: 51.5079, lng: -0.0877 },
    limit: 4.0, // 4.0m height limit
    warningDistance: 500
  },
  {
    id: '2',
    type: 'WEIGHT_RESTRICTION',
    description: 'Thames Bridge - Weak Structure',
    coordinates: { lat: 51.5081, lng: -0.0899 },
    limit: 7.5, // 7.5t weight limit
    warningDistance: 800
  },
  {
    id: '3',
    type: 'NARROW_ROAD',
    description: 'Historic Town Center',
    coordinates: { lat: 51.5074, lng: -0.0883 },
    limit: 2.3, // 2.3m width limit
    warningDistance: 300
  }
];

const mockInstructions: NavigationInstruction[] = [
  {
    text: 'Head east on Oxford Street',
    distance: 350,
    duration: 45,
    maneuver: 'depart'
  },
  {
    text: 'Turn right onto Regent Street',
    distance: 200,
    duration: 30,
    maneuver: 'turn-right'
  },
  {
    text: 'Continue onto Piccadilly',
    distance: 450,
    duration: 60,
    maneuver: 'straight'
  },
  {
    text: 'At the roundabout, take the 2nd exit onto St. James Street',
    distance: 150,
    duration: 25,
    maneuver: 'roundabout'
  }
];

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentVehicle } = useVehicle();
  const [origin, setOrigin] = useState<RoutePoint | null>(null);
  const [destination, setDestination] = useState<RoutePoint | null>(null);
  const [waypoints, setWaypoints] = useState<RoutePoint[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>({ lat: 51.5074, lng: -0.0901 }); // London default
  const [currentInstruction, setCurrentInstruction] = useState<NavigationInstruction | null>(null);
  const [upcomingHazards, setUpcomingHazards] = useState<Hazard[]>([]);
  const [routeDistance, setRouteDistance] = useState<number | null>(null);
  const [routeDuration, setRouteDuration] = useState<number | null>(null);
  const [instructionIndex, setInstructionIndex] = useState(0);

  const addWaypoint = (waypoint: RoutePoint) => {
    setWaypoints([...waypoints, waypoint]);
  };

  const removeWaypoint = (index: number) => {
    const newWaypoints = [...waypoints];
    newWaypoints.splice(index, 1);
    setWaypoints(newWaypoints);
  };

  const startNavigation = () => {
    if (!origin || !destination) {
      console.error("Cannot start navigation without origin and destination");
      return;
    }
    
    // Simulate route calculation
    setIsNavigating(true);
    setCurrentInstruction(mockInstructions[0]);
    setInstructionIndex(0);
    
    // Set mock route data
    setRouteDistance(1150); // 1.15 km
    setRouteDuration(160); // 160 seconds
    
    // Filter hazards based on vehicle profile
    if (currentVehicle) {
      const relevantHazards = mockHazards.filter(hazard => {
        if (hazard.type === 'LOW_BRIDGE' && hazard.limit <= currentVehicle.height) {
          return true;
        }
        if (hazard.type === 'NARROW_ROAD' && hazard.limit <= currentVehicle.width) {
          return true;
        }
        if (hazard.type === 'WEIGHT_RESTRICTION' && hazard.limit <= currentVehicle.weight) {
          return true;
        }
        return false;
      });
      setUpcomingHazards(relevantHazards);
    }
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setCurrentInstruction(null);
    setUpcomingHazards([]);
    setRouteDistance(null);
    setRouteDuration(null);
  };

  // For demo purposes - simulate movement along the route
  const simulateMovement = () => {
    if (!isNavigating) return;
    
    // Update instruction
    const nextIndex = (instructionIndex + 1) % mockInstructions.length;
    setCurrentInstruction(mockInstructions[nextIndex]);
    setInstructionIndex(nextIndex);
    
    // Simulate slight position change
    if (currentPosition) {
      setCurrentPosition({
        lat: currentPosition.lat + (Math.random() - 0.5) * 0.001,
        lng: currentPosition.lng + (Math.random() - 0.5) * 0.001
      });
    }
    
    // Randomly add or remove hazards for simulation
    if (Math.random() > 0.7) {
      const randomHazard = mockHazards[Math.floor(Math.random() * mockHazards.length)];
      if (!upcomingHazards.find(h => h.id === randomHazard.id)) {
        setUpcomingHazards([...upcomingHazards, randomHazard]);
      } else {
        setUpcomingHazards(upcomingHazards.filter(h => h.id !== randomHazard.id));
      }
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        origin,
        destination,
        waypoints,
        isNavigating,
        currentPosition,
        currentInstruction,
        upcomingHazards,
        routeDistance,
        routeDuration,
        setOrigin,
        setDestination,
        addWaypoint,
        removeWaypoint,
        startNavigation,
        stopNavigation,
        simulateMovement
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
