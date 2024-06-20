import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { height } from '../../utils/constants';
import { setColors } from '../../utils/functions';

const FavoriteCard = ({favorite, index}) => {

  return (
    <View
      style={{
        backgroundColor: setColors(index),
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
      }}>
      <View style={{minHeight: height*0.13}}>
        <Text style={{fontWeight: "bold", fontSize: 20}}>{favorite.title}</Text>
        <Text style={{fontSize: 18, marginTop: 8}}>{favorite.description}</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Text style={{fontSize: 16}}>{favorite.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavoriteCard;
