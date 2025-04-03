
import React from 'react';
import { useVehicle, VehicleProfile } from '@/contexts/VehicleContext';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Truck, Bus } from 'lucide-react';

const VehicleSelector: React.FC = () => {
  const { vehicles, currentVehicle, setCurrentVehicle } = useVehicle();

  if (vehicles.length === 0) {
    return <p>No vehicles available. Please add a vehicle profile.</p>;
  }

  const getVehicleIcon = (type: string) => {
    return type === 'HGV' ? <Truck className="h-5 w-5" /> : <Bus className="h-5 w-5" />;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-500">Select Vehicle</h3>
      <div className="grid grid-cols-1 gap-2">
        {vehicles.map((vehicle) => (
          <Card 
            key={vehicle.id}
            className={`cursor-pointer transition-colors ${
              currentVehicle?.id === vehicle.id 
                ? 'border-2 border-primary' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setCurrentVehicle(vehicle)}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  vehicle.type === 'HGV' ? 'bg-nav-blue/10' : 'bg-nav-green/10'
                }`}>
                  {getVehicleIcon(vehicle.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{vehicle.name}</h4>
                    {currentVehicle?.id === vehicle.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {vehicle.height}m × {vehicle.width}m × {vehicle.length}m • {vehicle.weight}t
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleSelector;
