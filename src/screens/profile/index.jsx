import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {screenStyle} from '../../styles/screenStyle';
import CustomButton from '../../components/ui/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '../../components/ui/avatar';
import { Colors } from '../../theme/colors';
import { EDITUSER } from '../../utils/routes';

const Profile = ({navigation}) => {
  // kullanıcı verilerini tutmak için state
  const [userData, setUserData] = useState(null);

  const getUserUid = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      // uid null değilse, kullanıcının bilgilerini getiren firebase fonksiyonunu çağır
      if (uid !== null) {
        getUserInfo(uid);
      }
    } catch (e) {
      // error reading uid
    }
  };

  // çıkış yapınca storage'den uid'i sil.
  const removeUid = async () => {
    try {
      await AsyncStorage.removeItem('uid')
    } catch(e) {
      // remove error
    }
    console.log('Done.')
  }

  const getUserInfo = uid => {
    firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        setUserData(documentSnapshot.data()); // kullanıcı verilerini state'e at
      });
  };

  useEffect(() => {
    getUserUid();
  }, []);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        removeUid()
      });
  };

  return (
    <View style={screenStyle.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Avatar user={userData} />
      </View>
      <View style={{alignItems: 'center', flex: 3}}>
        {/* state, başlangıçta null olduğu için undefined dönüp hata veriyor. o yüzden ? koyduk */}
        <Text style={{fontSize: 20, fontWeight: '700'}}>
          {userData?.name + ' ' + userData?.surname}
        </Text>
        <Text style={{fontSize: 16, fontWeight: '300', marginVertical: 15}}>
          {userData?.job}
        </Text>
        <Text style={{fontSize: 16, fontWeight: '300'}}>
          {userData?.email}
        </Text>
      </View>
      <View style={{paddingVertical: 20}}>
        <CustomButton onPress={()=> navigation.navigate(EDITUSER, {userData: userData})} title="Edit User" style={{backgroundColor: Colors.BLUE}} />
        <CustomButton onPress={signOut} title="Sign Out" />
      </View>
    </View>
  );
};

export default Profile;
