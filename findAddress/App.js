import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Button, ActivityIndicator, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCoordinates = () => {
    setLoading(true);
    fetch(`https://geocode.maps.co/search?q=${address}&api_key=67ba1d6661896786227804qxy58c269`)
    .then(response => {
      if(!response.ok)
        throw new Error("Error in fetch: " + response.statusText);

      return response.json();
    })
    .then(data => {
      console.log("API Response:", data);
      if (data.length > 0) {
        const firstResult = data[0];  
        setCoordinates({
          latitude: parseFloat(firstResult.lat), 
          longitude: parseFloat(firstResult.lon),
        });
      } else {
        alert("No results found. Try another address.");
      }
      setAddress('');
      setLoading(false)
    })
    .catch(err => console.error(err))
  }

  if (loading) {
    return(
      <View style = {styles.container}>
        <ActivityIndicator size = "large" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <View style = {{flex: 1, marginTop: 50}}>
          <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }} 
            placeholder = "Type Address"
            value = {address}
            onChangeText =  {text => setAddress(text)}
          />
          <Button title = "Show" onPress = {getCoordinates} />
        </View>
        
        {coordinates && (
          <View style={{ flex: 6, width: '100%', height: 400 }}>
            <MapView
              style={styles.mapStyle}
              region={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              title = {address}
            >
              <Marker coordinate={coordinates} />
            </MapView>
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width : '100%',
    height: '100%'
  }
});
