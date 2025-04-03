import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, ArrowBigDown, Scale, MoveHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Hazards = () => {
  const { user } = useAuth();
  const [showLowBridges, setShowLowBridges] = useState(true);
  const [showNarrowRoads, setShowNarrowRoads] = useState(true);
  const [showWeightRestrictions, setShowWeightRestrictions] = useState(true);
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" />;
  }
  
  // Mock hazard data
  const mockHazards = [
    {
      id: '1',
      type: 'LOW_BRIDGE',
      name: 'Railway Bridge - A41',
      location: 'London, Westminster',
      height: 4.0,
      coordinates: { lat: 51.5079, lng: -0.0877 }
    },
    {
      id: '2',
      type: 'WEIGHT_RESTRICTION',
      name: 'Thames Bridge - Weak Structure',
      location: 'London, Southwark',
      weight: 7.5,
      coordinates: { lat: 51.5081, lng: -0.0899 }
    },
    {
      id: '3',
      type: 'NARROW_ROAD',
      name: 'Historic Town Center',
      location: 'York, North Yorkshire',
      width: 2.3,
      coordinates: { lat: 53.9599, lng: -1.0873 }
    },
    {
      id: '4',
      type: 'LOW_BRIDGE',
      name: 'Canal Bridge - B4449',
      location: 'Oxford, Oxfordshire',
      height: 3.8,
      coordinates: { lat: 51.7520, lng: -1.2577 }
    },
    {
      id: '5',
      type: 'WEIGHT_RESTRICTION',
      name: 'Old Stone Bridge',
      location: 'Bath, Somerset',
      weight: 5.0,
      coordinates: { lat: 51.3810, lng: -2.3590 }
    },
    {
      id: '6',
      type: 'NARROW_ROAD',
      name: 'Coastal Route B3306',
      location: 'St Ives, Cornwall',
      width: 2.5,
      coordinates: { lat: 50.2084, lng: -5.4818 }
    }
  ];
  
  const filteredHazards = mockHazards.filter(hazard => {
    if (hazard.type === 'LOW_BRIDGE' && !showLowBridges) return false;
    if (hazard.type === 'NARROW_ROAD' && !showNarrowRoads) return false;
    if (hazard.type === 'WEIGHT_RESTRICTION' && !showWeightRestrictions) return false;
    return true;
  });
  
  const getHazardIcon = (type: string) => {
    switch (type) {
      case 'LOW_BRIDGE':
        return <ArrowBigDown className="h-5 w-5" />;
      case 'NARROW_ROAD':
        return <MoveHorizontal className="h-5 w-5 transform rotate-45" />;
      case 'WEIGHT_RESTRICTION':
        return <Scale className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  const getHazardBadgeColor = (type: string) => {
    switch (type) {
      case 'LOW_BRIDGE':
        return 'bg-red-500';
      case 'NARROW_ROAD':
        return 'bg-amber-500';
      case 'WEIGHT_RESTRICTION':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">UK Hazard Map</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Filter Hazards</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-red-100 text-red-600">
                        <ArrowBigDown className="h-4 w-4" />
                      </div>
                      <Label htmlFor="low-bridges">Low Bridges</Label>
                    </div>
                    <Switch 
                      id="low-bridges" 
                      checked={showLowBridges} 
                      onCheckedChange={setShowLowBridges} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-amber-100 text-amber-600">
                        <MoveHorizontal className="h-4 w-4 transform rotate-45" />
                      </div>
                      <Label htmlFor="narrow-roads">Narrow Roads</Label>
                    </div>
                    <Switch 
                      id="narrow-roads" 
                      checked={showNarrowRoads} 
                      onCheckedChange={setShowNarrowRoads} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-blue-100 text-blue-600">
                        <Scale className="h-4 w-4" />
                      </div>
                      <Label htmlFor="weight-restrictions">Weight Restrictions</Label>
                    </div>
                    <Switch 
                      id="weight-restrictions" 
                      checked={showWeightRestrictions} 
                      onCheckedChange={setShowWeightRestrictions} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Hazard Statistics</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Low Bridges:</span>
                    <span className="font-medium">
                      {mockHazards.filter(h => h.type === 'LOW_BRIDGE').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Narrow Roads:</span>
                    <span className="font-medium">
                      {mockHazards.filter(h => h.type === 'NARROW_ROAD').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Weight Restrictions:</span>
                    <span className="font-medium">
                      {mockHazards.filter(h => h.type === 'WEIGHT_RESTRICTION').length}
                    </span>
                  </div>
                  <div className="pt-2 mt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Hazards:</span>
                      <span className="font-medium">
                        {mockHazards.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Map and list view */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="map">
              <TabsList className="mb-4">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="map">
                <Card>
                  <CardContent className="p-0">
                    <div className="h-[70vh] relative bg-gray-100 rounded-lg overflow-hidden">
                      {/* Mock map background */}
                      <div className="absolute inset-0 opacity-30 bg-cover bg-center" 
                        style={{ backgroundImage: 'url(https://i.imgur.com/JxM9guK.jpg)' }}>
                      </div>
                      
                      {/* Mock hazard points */}
                      {filteredHazards.map((hazard, idx) => (
                        <div 
                          key={hazard.id}
                          className="absolute" 
                          style={{ 
                            top: `${25 + (idx % 3) * 20}%`, 
                            left: `${20 + (idx * 15) % 65}%` 
                          }}
                        >
                          <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${getHazardBadgeColor(hazard.type)} text-white shadow-lg`}>
                            {getHazardIcon(hazard.type)}
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 bg-white p-1 rounded shadow-md text-xs text-center">
                              <p className="font-semibold truncate">{hazard.name}</p>
                              <p className="text-gray-500 truncate">{hazard.location}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Map legend */}
                      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded shadow-md">
                        <p className="text-xs font-bold mb-2">Legend</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span>Low Bridge</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span>Narrow Road</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span>Weight Restriction</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="list">
                {filteredHazards.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <AlertTriangle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium">No hazards to display</h3>
                      <p className="text-gray-500">Adjust your filters to see hazards</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredHazards.map((hazard) => (
                      <Card key={hazard.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <div className={`p-2.5 rounded-full ${
                              hazard.type === 'LOW_BRIDGE' ? 'bg-red-100 text-red-600' :
                              hazard.type === 'NARROW_ROAD' ? 'bg-amber-100 text-amber-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {getHazardIcon(hazard.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium">{hazard.name}</h3>
                                  <p className="text-sm text-gray-500">{hazard.location}</p>
                                </div>
                                <Badge className={`${
                                  hazard.type === 'LOW_BRIDGE' ? 'bg-red-500 hover:bg-red-600' :
                                  hazard.type === 'NARROW_ROAD' ? 'bg-amber-500 hover:bg-amber-600' :
                                  'bg-blue-500 hover:bg-blue-600'
                                }`}>
                                  {hazard.type === 'LOW_BRIDGE' && 'Low Bridge'}
                                  {hazard.type === 'NARROW_ROAD' && 'Narrow Road'}
                                  {hazard.type === 'WEIGHT_RESTRICTION' && 'Weight Limit'}
                                </Badge>
                              </div>
                              <div className="mt-2">
                                {hazard.type === 'LOW_BRIDGE' && (
                                  <p className="text-sm">Maximum height: <span className="font-semibold">{hazard.height}m</span></p>
                                )}
                                {hazard.type === 'NARROW_ROAD' && (
                                  <p className="text-sm">Maximum width: <span className="font-semibold">{hazard.width}m</span></p>
                                )}
                                {hazard.type === 'WEIGHT_RESTRICTION' && (
                                  <p className="text-sm">Maximum weight: <span className="font-semibold">{hazard.weight}t</span></p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hazards;
