
import React, { createContext, useState, useContext, useEffect } from 'react';

export type VehicleType = 'HGV' | 'PSV';

export interface VehicleProfile {
  id: string;
  name: string;
  type: VehicleType;
  height: number; // in meters
  width: number; // in meters
  length: number; // in meters
  weight: number; // in tons
  axles: number;
}

interface VehicleContextType {
  vehicles: VehicleProfile[];
  currentVehicle: VehicleProfile | null;
  setCurrentVehicle: (vehicle: VehicleProfile) => void;
  addVehicle: (vehicle: Omit<VehicleProfile, 'id'>) => void;
  updateVehicle: (id: string, data: Partial<VehicleProfile>) => void;
  deleteVehicle: (id: string) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

// Default vehicle profiles
const defaultVehicles: VehicleProfile[] = [
  {
    id: '1',
    name: 'Standard HGV',
    type: 'HGV',
    height: 4.2,
    width: 2.55,
    length: 12,
    weight: 32,
    axles: 3
  },
  {
    id: '2',
    name: 'Double Decker Bus',
    type: 'PSV',
    height: 4.3,
    width: 2.55,
    length: 11.5,
    weight: 18,
    axles: 2
  }
];

export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<VehicleProfile[]>(defaultVehicles);
  const [currentVehicle, setCurrentVehicle] = useState<VehicleProfile | null>(null);

  useEffect(() => {
    // Load saved vehicles from localStorage
    const savedVehicles = localStorage.getItem('vehicles');
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles));
    }
    
    // Set default current vehicle if none selected
    const savedCurrentVehicle = localStorage.getItem('currentVehicle');
    if (savedCurrentVehicle) {
      setCurrentVehicle(JSON.parse(savedCurrentVehicle));
    } else if (vehicles.length > 0) {
      setCurrentVehicle(vehicles[0]);
    }
  }, []);

  // Save vehicles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  // Save current vehicle to localStorage whenever it changes
  useEffect(() => {
    if (currentVehicle) {
      localStorage.setItem('currentVehicle', JSON.stringify(currentVehicle));
    }
  }, [currentVehicle]);

  const addVehicle = (vehicle: Omit<VehicleProfile, 'id'>) => {
    const newVehicle = {
      ...vehicle,
      id: Date.now().toString()
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const updateVehicle = (id: string, data: Partial<VehicleProfile>) => {
    const updatedVehicles = vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, ...data } : vehicle
    );
    setVehicles(updatedVehicles);
    
    // Update current vehicle if it's the one being edited
    if (currentVehicle && currentVehicle.id === id) {
      setCurrentVehicle({ ...currentVehicle, ...data });
    }
  };

  const deleteVehicle = (id: string) => {
    const filteredVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    setVehicles(filteredVehicles);
    
    // Reset current vehicle if it's the one being deleted
    if (currentVehicle && currentVehicle.id === id) {
      setCurrentVehicle(filteredVehicles.length > 0 ? filteredVehicles[0] : null);
    }
  };

  return (
    <VehicleContext.Provider 
      value={{ 
        vehicles, 
        currentVehicle, 
        setCurrentVehicle, 
        addVehicle, 
        updateVehicle, 
        deleteVehicle 
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};
