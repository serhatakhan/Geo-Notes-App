import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import FloatActionButton from '../../components/ui/floatActionButton';
import {ArrowRight} from 'iconsax-react-native';
import {Colors} from '../../theme/colors';
import {ADDLOCATION, COORDINATESELECT} from '../../utils/routes';

const CoordinateSelect = ({navigation}) => {
  // şu an ki pozisyonun state'ini tut
  const [currentPosition, setCurrentPosition] = useState(null);
  const [coordinate, setCoordinate] = useState(null);

  // kullanıcının mevcut konumunu al
  const getCurrentPosition = () => {
    // position değerlerinin altında koordinatlar(coords) geliyor. onun da içinde latitude ve longitude var
    Geolocation.getCurrentPosition(
      pos => {
        setCurrentPosition(pos.coords);
        // console.log(pos.coords);
      },
      error => Alert.alert('Current Position Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  // basılan yerin koordinatını alma fonksiyonu  
  const handleSelectCoordinate = e => {
    setCoordinate(e.nativeEvent.coordinate);
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <View style={styles.container}>
      <FloatActionButton
        disabled={coordinate ? false : true} // koordinat için haritaya basılmışsa disabled olmasın
        onPress={() => navigation.navigate(ADDLOCATION, {coordinate: coordinate})}
        icon={<ArrowRight size={30} color={Colors.WHITE} />}
        customStyle={{backgroundColor: coordinate ? Colors.ORANGE : Colors.GRAY , right: 20, bottom: 50}}
      />
      <MapView
        onPress={handleSelectCoordinate} // haritanın bir yerine basınca, basılan yerin koordinatlarını alıyor
        zoomControlEnabled
        provider={PROVIDER_GOOGLE} // kaldırırsak iphone'un haritası basılacak
        style={styles.map}
        region={{
          latitude: currentPosition?.latitude,
          longitude: currentPosition?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* <Marker
          title="Konumum"
          coordinate={{
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
        {/* koordinat varsa Marker bas */}
        {coordinate && (
          <Marker
            coordinate={{
              latitude: coordinate?.latitude,
              longitude: coordinate?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CoordinateSelect;
