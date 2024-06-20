import {User} from 'iconsax-react-native';
import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {width} from '../../utils/constants';
import {Colors} from '../../theme/colors';

const Avatar = ({user, onChangeImage, select}) => {
  const OpenGalery = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      includeBase64: true
    }).then(image => {
      onChangeImage(image.data, image.mime) 
      // alt componentten üst componente veri taşımış olduk,
      // data ile resmi, image.mime ile de dosyanın uzantısını yolladık
    });
  };

  return (
    // selectin tersi gelirse avatara tıklanmasın dedik
    <TouchableOpacity disabled={!select} onPress={OpenGalery} style={styles.container}>
      {user?.image ? (
        <Image
          style={{width: width * 0.25, height: width * 0.25, borderRadius: 100, resizeMode: "contain"}}
          source={{
            uri: user.image,
          }}
        />
      ) : (
        <User size="36" color="#FF8A65" variant="Bold" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.25,
    height: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.SOFTGRAY,
    borderRadius: 100,
    margin: 30,
    alignSelf: 'center',
  },
});

export default Avatar;
