import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {height} from '../../utils/constants';

const CustomInput = props => {
  const {icon, inputTitle = null} = props;
  // başlangıçta inputTitle değeri null olsun

  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: "600", paddingLeft: 9, padding:3}}>{inputTitle}</Text>
      <View style={styles.container}>
        {icon}
        <TextInput
          {...props}
          style={{
            minHeight: height * 0.05,
            fontSize: 16,
            // backgroundColor: "red", -> bunu koyarak baktık ki tüm inputu kaplamıyor flex:1 verdik sonra.
            flex: 1
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderRadius: 100,
    paddingHorizontal: 10,
    gap: 8,
  },
});

export default CustomInput;
