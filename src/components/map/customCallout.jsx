import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../theme/colors';
import {ArrowCircleRight2, Star} from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';

const CustomCallout = ({title, description, point}) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Star size={18} color={Colors.ORANGE} variant="Bold" />
          <Text style={{fontWeight: '700', fontSize: 13, marginLeft: 5}}>
            {point}
          </Text>
        </View>
      </View>

      <Text style={{fontSize: 14, fontWeight: '500', color: Colors.GRAY}}>
        {description}
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        <TouchableOpacity>
          <ArrowCircleRight2 size="32" color={Colors.GREEN} variant="Bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    height: 100,
    backgroundColor: Colors.WHITE,
    padding: 5,
  },
});

export default CustomCallout;
