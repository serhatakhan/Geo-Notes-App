import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {screenStyle} from '../../styles/screenStyle';
import {Colors} from '../../theme/colors';
import { height, width } from '../../utils/constants';
import CustomButton from '../../components/ui/customButton';
import CustomInput from '../../components/ui/customInput';
import { SecuritySafe, User } from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // giriş yapan kullanıcının id'sini storage'de tut
  const setUserUid = async (id) => {
    try {
      await AsyncStorage.setItem('uid', id);
    } catch (e) {
      console.log("hata", e);
    }
  };

  const handleSignIn = () => {
    setLoading(true)
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log("giriş başarılı");
        setUserUid(data.user.uid)
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(()=> setLoading(false))
  }

  return (
    <SafeAreaView
      style={[screenStyle.safeAreaView, {backgroundColor: Colors.WHITE}]}>
      <View style={screenStyle.container}>
        <View style={{flex:3, justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/login.jpg")} style={{width: width-30, height: height*0.34, resizeMode: "center"}}/>
        </View>
        <View style={{flex:2, justifyContent: "center", gap: 10, paddingHorizontal: 10}}>
            <Text style={{fontSize: 35, fontWeight: "bold", textAlign: "center"}}>Login</Text>
            <CustomInput 
              icon={<User color={Colors.BLACK} variant='Bold' />}
              value={email} 
              onChangeText={(value)=> setEmail(value)}  
              inputTitle="Email" placeholder="Email" />
            <CustomInput      
              secureTextEntry 
              icon={<SecuritySafe color={Colors.BLACK} variant='Bold' />}
              value={password} 
              onChangeText={(value)=> setPassword(value)}  
              inputTitle="Password" placeholder="Password" />
        </View>
        <View style={{flex:1, marginHorizontal: 10, marginVertical: 30}}>
            <CustomButton loading={loading} onPress={()=> handleSignIn()} title="Sign In" style={{backgroundColor: Colors.BLUE2, marginBottom: 10}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
