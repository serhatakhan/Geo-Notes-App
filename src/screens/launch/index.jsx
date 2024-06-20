import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {screenStyle} from '../../styles/screenStyle';
import {Colors} from '../../theme/colors';
import { height, width } from '../../utils/constants';
import CustomButton from '../../components/ui/customButton';
import { SIGNIN, SIGNUP } from '../../utils/routes';
import { Apple, Facebook, Google } from 'iconsax-react-native';

const Launch = ({navigation}) => {

  return (
    <SafeAreaView
      style={[screenStyle.safeAreaView, {backgroundColor: Colors.WHITE}]}>
      <View style={screenStyle.container}>
        <View style={{flex:3, justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/register.jpg")} style={{width: width-10, height: height*0.38, resizeMode: "cover"}}/>
        </View>
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 35, fontWeight: "bold"}}>Hello</Text>
            <Text style={{fontSize: 20, color: Colors.GRAY, textAlign: "center", paddingVertical: 10}}>Welcome to Geo Notes, where you manage you daily tasks.</Text>
        </View>
        <View style={{flex:2, marginHorizontal: 10, marginVertical: 30}}>
            <CustomButton onPress={()=> navigation.navigate(SIGNIN)} title="Sign In" style={{backgroundColor: Colors.BLUE2, marginBottom: 10}} />
            <CustomButton onPress={()=> navigation.navigate(SIGNUP)} title="Sign Up" style={{backgroundColor: Colors.BLACK, marginBottom: 10}}  />
            <View style={{justifyContent: "center", alignItems: "center", flex: 1, paddingTop: 10}}>
                <Text style={{fontSize: 15, color: Colors.GRAY, textAlign: "center"}}>Sign up using</Text>
                <View style={{flexDirection: "row", paddingVertical: 10, gap: 10}}>
                    <Facebook size="32" color={Colors.FACEBOOK} variant='Bold'/>
                    <Google size="32" color={Colors.GOOGLE} variant='Bold'/>
                    <Apple size="33" color={Colors.BLACK} variant='Bold'/>
                </View>
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Launch;
