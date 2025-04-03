
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useVehicle, VehicleType } from '@/contexts/VehicleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Truck, Bus, Edit, Trash2, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Vehicles = () => {
  const { user } = useAuth();
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useVehicle();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [type, setType] = useState<VehicleType>('HGV');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState('');
  const [axles, setAxles] = useState('');
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" />;
  }
  
  const resetForm = () => {
    setName('');
    setType('HGV');
    setHeight('');
    setWidth('');
    setLength('');
    setWeight('');
    setAxles('');
  };
  
  const handleAddVehicle = () => {
    try {
      addVehicle({
        name,
        type,
        height: parseFloat(height),
        width: parseFloat(width),
        length: parseFloat(length),
        weight: parseFloat(weight),
        axles: parseInt(axles, 10)
      });
      
      toast({
        title: "Vehicle added",
        description: `${name} has been added to your vehicles`,
      });
      
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add vehicle",
        description: "Please check all fields and try again.",
      });
    }
  };
  
  const handleEditClick = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      setName(vehicle.name);
      setType(vehicle.type);
      setHeight(vehicle.height.toString());
      setWidth(vehicle.width.toString());
      setLength(vehicle.length.toString());
      setWeight(vehicle.weight.toString());
      setAxles(vehicle.axles.toString());
      setSelectedVehicle(vehicleId);
      setIsEditDialogOpen(true);
    }
  };
  
  const handleUpdateVehicle = () => {
    if (!selectedVehicle) return;
    
    try {
      updateVehicle(selectedVehicle, {
        name,
        type,
        height: parseFloat(height),
        width: parseFloat(width),
        length: parseFloat(length),
        weight: parseFloat(weight),
        axles: parseInt(axles, 10)
      });
      
      toast({
        title: "Vehicle updated",
        description: `${name} has been updated`,
      });
      
      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update vehicle",
        description: "Please check all fields and try again.",
      });
    }
  };
  
  const handleDeleteVehicle = (vehicleId: string) => {
    try {
      const vehicle = vehicles.find(v => v.id === vehicleId);
      deleteVehicle(vehicleId);
      
      toast({
        title: "Vehicle deleted",
        description: vehicle ? `${vehicle.name} has been deleted` : "Vehicle has been deleted",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete vehicle",
        description: "An error occurred while deleting the vehicle.",
      });
    }
  };
  
  const VehicleForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Vehicle Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., My HGV Truck"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Vehicle Type</Label>
        <Select value={type} onValueChange={(value: VehicleType) => setType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select vehicle type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HGV">Heavy Goods Vehicle (HGV)</SelectItem>
            <SelectItem value="PSV">Public Service Vehicle (PSV)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (m)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 4.2"
            step="0.1"
            min="0"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="width">Width (m)</Label>
          <Input
            id="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="e.g., 2.55"
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="length">Length (m)</Label>
          <Input
            id="length"
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="e.g., 12"
            step="0.1"
            min="0"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (tons)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 32"
            step="0.1"
            min="0"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="axles">Number of Axles</Label>
        <Input
          id="axles"
          type="number"
          value={axles}
          onChange={(e) => setAxles(e.target.value)}
          placeholder="e.g., 3"
          min="1"
          required
        />
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Vehicle Profiles</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>
                  Create a new vehicle profile with dimensions and weight information.
                </DialogDescription>
              </DialogHeader>
              <VehicleForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddVehicle}>Add Vehicle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {vehicles.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-60">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Truck className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Vehicles Added</h3>
              <p className="text-gray-500 mb-4">Add your first vehicle to get started with navigation</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      vehicle.type === 'HGV' ? 'bg-nav-blue/10' : 'bg-nav-green/10'
                    }`}>
                      {vehicle.type === 'HGV' ? 
                        <Truck className="h-5 w-5" /> : 
                        <Bus className="h-5 w-5" />
                      }
                    </div>
                    <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-gray-500">Height</p>
                        <p className="font-medium">{vehicle.height} m</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Width</p>
                        <p className="font-medium">{vehicle.width} m</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-gray-500">Length</p>
                        <p className="font-medium">{vehicle.length} m</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Weight</p>
                        <p className="font-medium">{vehicle.weight} t</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500">Axles</p>
                      <p className="font-medium">{vehicle.axles}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleEditClick(vehicle.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Edit Vehicle Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>
              Update this vehicle's details and dimensions.
            </DialogDescription>
          </DialogHeader>
          <VehicleForm isEdit />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateVehicle}>Update Vehicle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Vehicles;
