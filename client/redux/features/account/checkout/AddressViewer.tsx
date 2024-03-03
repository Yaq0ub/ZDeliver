import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {maps_api_key} from '../../../../firebase/firebaseConfig'

import { customMapStyleRetro, customMapStyleNight } from '../../../../constants/customMapStyle.styles';
import Colors from '../../../../constants/Colors';
export type AddressType = {
  id: string;
  name: string;
  area: string;
  street1: string;
  street2: string;
  city: string;
  zipcode: string;
  phone: string;
};

type AddressViewerProps = {
  address: AddressType ;
};

const AddressViewer: React.FC<any> = ({ address }) => {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number; } | null>({
    latitude: 40.785091,
    longitude: -73.968285,
  });

  // const getGeocode = async () => {
  //   const addressString = `${address.street1}, ${address.street2}, ${address.city}, ${address.zipcode}`;
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${maps_api_key()}`;
    
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     if (data.results.length > 0) {
  //       const { lat, lng } = data.results[0].geometry.location;
  //       setCoords({ latitude: lat, longitude: lng });
  //     } else {
  //       console.error('Geocoding failed: No results found');
  //     }
  //   } catch (error) {
  //     console.error('Geocoding failed:', error);
  //   }
  // };

  // useEffect(() => {
  //   getGeocode();
  // }, [address]);

  if (!coords) {
  return <ActivityIndicator />;
  }

  return (
    <View style={{ height: "100%", width: '100%' }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        customMapStyle = {customMapStyleNight}
      >
        
        <Marker
          coordinate={coords}
          title={address.name}
          style={{backgroundColor:Colors.primary}}
          description={`${address.street1}, ${address.street2}, ${address.city}, ${address.zipcode}`}
        />
      </MapView>
    </View>
  );
};

export default AddressViewer;
