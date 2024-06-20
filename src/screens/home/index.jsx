import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import CustomMarker from '../../components/map/customMarker';
import CustomCallout from '../../components/map/customCallout';
import FloatActionButton from '../../components/ui/floatActionButton';
import {LocationAdd, Map} from 'iconsax-react-native';
import {Colors} from '../../theme/colors';
import { COORDINATESELECT, DETAIL } from '../../utils/routes';

const Home = ({navigation}) => {
  // haritanın görünümümün state'ini tut
  const [mapType, setMapType] = useState('standard');
  // şu an ki pozisyonun state'ini tut
  const [currentPosition, setCurrentPosition] = useState(null);
  // addLOcation screen'de seçilen yerlerin state'i
  const [location, setLocation] = useState([]);

  // firestore'dan, database'e kaydedilen lokasyonları al
  const getLocations = () => {
    // Firestore'daki "Locations" koleksiyonundan tüm belgeleri (documents) getirme işlemini başlat.
    firestore()
      .collection('Locations')
      .get()
      // veri alma işlemi başarılı olduğunda, querySnapshot tüm notları içeren bir nesnedir
      .then(querySnapshot => {
        const fetchedLocations = [];
        // querySnapshot.forEach(documentSnapshot => {..}) döngüsü ile her belgeyi (notu) dön ve fetchedNotes dizisine ekle
        querySnapshot.forEach(documentSnapshot => {
          fetchedLocations.push({
            // Her not, id, title, description ve date alanlarını içerir bir nesne olsun.
            id: documentSnapshot.id,
            title: documentSnapshot.data().title,
            description: documentSnapshot.data().description,
            date: documentSnapshot.data().date,
            point: documentSnapshot.data().point,
            coordinate: documentSnapshot.data().coordinate,
          });
        });
        // lokasyonları state'e kaydet
        setLocation(fetchedLocations);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const changeMapType = () => {
    if (mapType === 'standard') {
      setMapType('hybrid');
    } else {
      setMapType('standard');
    }
  };

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

  useEffect(() => {
    getCurrentPosition();
    getLocations()
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <FloatActionButton
        icon={
          <Map
            size={30}
            variant={mapType !== 'standard' ? 'Outline' : 'Bold'}
            color={mapType !== 'standard' ? Colors.BLACK : Colors.ORANGE}
          />
        }
        customStyle={{
          right: 10,
          top: 70,
        }}
        onPress={() => changeMapType()} // arrow func olarak verdik direk fonku çalıştırmasın dedi
      />
      <FloatActionButton
        onPress={() => navigation.navigate(COORDINATESELECT)}
        icon={<LocationAdd size={30} color={Colors.WHITE} />}
        customStyle={{backgroundColor: Colors.ORANGE, right: 20, bottom: 30}}
      />
      <MapView
        mapType={mapType} // haritanın görünümünü değiştir
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: currentPosition?.latitude,
          longitude: currentPosition?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {location.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}>
            <CustomMarker />

            {/* CustomCallout bileşeninin içine girip butona navigation verince olmadı. */}
            {/* Buraya gelip kapsayıcısı olan Callout bileşenine navigation verince oldu. */}
            <Callout onPress={()=> navigation.navigate(DETAIL, {item:marker})}>
              <CustomCallout
                title={marker.title}
                description={marker.description}
                point={marker.point}
              />
            </Callout>
          </Marker>
        ))}
         <Marker
            title="Konumum"
            coordinate={{
              latitude: currentPosition?.latitude,
              longitude: currentPosition?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
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

export default Home;
