import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {height} from '../../utils/constants';
import CustomInput from '../ui/customInput';
import { SearchNormal } from 'iconsax-react-native';

const Header = () => {

  return (
    <View style={styles.container}>
      <View style={{marginTop: height*0.05}}>
        <CustomInput icon={<SearchNormal color="#b2b2b2" size={22} />} placeholder="Search" />
      </View>

      <Text style={{fontSize: 32, fontWeight: "700", paddingLeft: 3}}>Notes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.2,
    justifyContent: 'space-between',
    marginBottom: 20
  },
});

export default Header;
