import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {screenStyle} from '../../styles/screenStyle';
import {Colors} from '../../theme/colors';
import { height, width } from '../../utils/constants';
import CustomButton from '../../components/ui/customButton';
import CustomInput from '../../components/ui/customInput';
import { Bag2, Key, Sms, User } from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [job, setJob] = useState("")
  const [loading, setLoading] = useState(false)

  // kaydolan kullanıcının id'sini storage'de tut
  const setUserUid = async (id) => {
    try {
      await AsyncStorage.setItem('uid', id);
    } catch (e) {
      console.log("hata", e);
    }
  };

  // oluşturulan kullanıcıyı firebase'e ekle
  const saveUser = (userId) => {
    const form = {
      userId: userId,
      name: name,
      surname: surname,
      job: job,
      email: email,
    }
    firestore()
      .collection('Users')
      .doc(userId) // kullanıcının id'siyle document'in id'sini aynı yapmak istedik
      .set(form)   // bunun için de burada set etmemiz gerekiyor o yüzden .set
      .then(() => {
          console.log("User added successfully")
      }).catch((err)=> {
          console.log(err);
      })
}

  const handleSignUp = () => {
    setLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        saveUser(res.user.uid)
        setUserUid(res.user.uid)
        console.log('User account created & signed in!');
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex:3, justifyContent: "center", alignItems: "center"}}>
              <Image source={require("../../assets/login.jpg")} style={{width: width-30, height: height*0.34, resizeMode: "center"}}/>
          </View>
          <View style={{flex:2, justifyContent: "center", gap: 10, paddingHorizontal: 10}}>
              <Text style={{fontSize: 35, fontWeight: "bold", textAlign: "center"}}>Sign Up</Text>
              <CustomInput 
                icon={<Sms color={Colors.BLACK} variant='Bold' />}
                value={email} 
                onChangeText={(value)=> setEmail(value)} 
                inputTitle="Email" placeholder="Email" />
              <CustomInput 
                secureTextEntry 
                icon={<Key color={Colors.BLACK} variant='Bold' />}
                value={password} 
                onChangeText={(value)=> setPassword(value)} 
                inputTitle="Password" placeholder="Password" />
              {/* secureTextEntry -> bu prop textInput'a yazdığım şifrelerin görünmemesini sağlıyor */}
              <CustomInput 
                icon={<User color={Colors.BLACK} variant='Bold' />}
                value={name} 
                onChangeText={(value)=> setName(value)} 
                inputTitle="Name" placeholder="Name" />
                <CustomInput 
                icon={<User color={Colors.BLACK} variant='Bold' />}
                value={surname} 
                onChangeText={(value)=> setSurname(value)} 
                inputTitle="Surname" placeholder="Surname" />
                <CustomInput 
                icon={<Bag2 color={Colors.BLACK} variant='Bold' />}
                value={job} 
                onChangeText={(value)=> setJob(value)} 
                inputTitle="Job" placeholder="Job" />
          </View>
          <View style={{flex:1, marginHorizontal: 10, marginVertical: 30}}>
              <CustomButton loading={loading} onPress={()=> handleSignUp()} title="Sign Up" style={{backgroundColor: Colors.BLACK, marginBottom: 10}} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
