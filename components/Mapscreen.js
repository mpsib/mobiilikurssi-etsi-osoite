import { useState } from 'react';
import { render } from 'react-dom'
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps'

export default function Mapscreen({}) {

  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({
    latitude: 60.201373,
    longitude: 24.934041,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });
  const [name, setName] = useState('Haaga-Helia');

  let mapQuestAPI = 'http://www.mapquestapi.com/geocoding/v1/address';
  let key = 'ZHEatNDAJvTe8PlYhSwPlc1O2uKkAblT'; 
  // olisi kiva jos luennoilla käytäisiin muistutus miten avain piilotetaan

  
  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };

  const showAddressOnMap = () => {
    fetchAddressData();
  };

  const fetchAddressData = () => {
    fetch(`${mapQuestAPI}?key=${key}&location=${address}`)
      .then( req => req.json() )
      .then( data => {
        setLocation(
          {
            ...location,
            latitude: data.results[0].locations[0].latLng.lat,
            longitude: data.results[0].locations[0].latLng.lng
          }
        );
        setName(data.results[0].locations[0].street + ' '+ data.results[0].locations[0].adminArea5)
      })
      .catch( e => Alert.alert(e) )
  }

  return(
    <View style={styles.stretch}>
      <MapView
        style={{ flex:1 }}
        region={location}
      >
        <Marker
          coordinate={location}
          title={name}
        />
      </MapView>

      <View style={styles.bottom} >
        <TextInput 
          style={styles.input} 
          placeholder='  Input an Address'
          value={address}
          onChangeText={ text => setAddress(text) }
        />
        <View style={styles.button} >
          <Button
            title='Show'
            onPress={showAddressOnMap}
            />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stretch: {
    flex:1,
    width: '100%'
  },
  input: {
    fontSize: 18,
    height: 55,
    width: '90%'
  },
  bottom: {
    alignItems: 'center'
  },
  button:{
    height: 45,
    width: '90%'
  }
});