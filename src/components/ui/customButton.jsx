import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {height} from '../../utils/constants';
import {Colors} from '../../theme/colors';

const CustomButton = props => {
  const {loading, title, style} = props;

  return (
    <TouchableOpacity
      // disabled, butonun basılabilirliğini kontrol ediyoruz. loading halindeyken basılamasın !
      disabled={loading}
      {...props}
      style={[styles.container, loading ? styles.disableButton : styles.activeButton, style]}>
      {/* loading true iken loader çıksın */}
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.WHITE} />
      ) : (
        <Text
          style={{
            fontWeight: 'bold',
            color: Colors.WHITE,
            fontSize: 16,
          }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.06,
    borderRadius: 100,
    marginVertical: 5,
  },
  disableButton: {
    backgroundColor: Colors.GRAY,
  },
  activeButton: {
    backgroundColor: Colors.BLACK,
  },
});

export default CustomButton;
