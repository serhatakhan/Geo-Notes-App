import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../theme/colors';

const FloatActionButton = (props) => {
  const {icon, customStyle} = props
  return (
    // {...props} -> bileşeni çağırdığımız yerde onPress gibi özellikleri yazabilelim diye yaptık
    <TouchableOpacity style={[styles.container, customStyle]} {...props} >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    zIndex: 99,
    bottom: 30,
    width: 70,
    height: 70,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

export default FloatActionButton;
