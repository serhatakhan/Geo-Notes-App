import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {screenStyle} from '../../styles/screenStyle';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';

const Detail = ({route}) => {
  const {item} = route?.params;
  // console.log(item);
  const [loading, setLoading] = useState(false);

  const addFavorite = () => {
    setLoading(true);
    firestore()
      .collection('Favorites')
      .add(item)
      .then(() => {
        Alert.alert('Location added favorites');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={screenStyle.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          borderBottomWidth: 0.3,
          borderColor: Colors.GRAY,
        }}>
        <Text style={{fontWeight: 'bold'}}>Title</Text>
        <Text>{item.title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          borderBottomWidth: 0.26,
          borderColor: Colors.GRAY,
        }}>
        <Text style={{fontWeight: 'bold'}}>Description</Text>
        <Text>{item.description}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          borderBottomWidth: 0.3,
          borderColor: Colors.GRAY,
        }}>
        <Text style={{fontWeight: 'bold'}}>Rating</Text>
        <Text>{item.point}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          borderBottomWidth: 0.3,
          borderColor: Colors.GRAY,
        }}>
        <Text style={{fontWeight: 'bold'}}>Longitude</Text>
        <Text>{item.coordinate.longitude}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
          borderBottomWidth: 0.3,
          borderColor: Colors.GRAY,
        }}>
        <Text style={{fontWeight: 'bold'}}>Latitude</Text>
        <Text>{item.coordinate.latitude}</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', marginVertical: 28}}>
        <CustomButton
          title="Add Favorite"
          style={{backgroundColor: Colors.ORANGE}}
          loading={loading}
          onPress={()=> addFavorite()}
        />
      </View>
    </View>
  );
};

export default Detail;
