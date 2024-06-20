import {StyleSheet} from 'react-native';
import {Colors} from '../theme/colors';

const screenStyle = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10
  },
});

export {screenStyle}