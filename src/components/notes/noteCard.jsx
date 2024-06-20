import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../theme/colors';
import { height } from '../../utils/constants';
import { Magicpen, Trash } from 'iconsax-react-native';
import { setColors } from '../../utils/functions';
import { useNavigation } from '@react-navigation/native';
import { EDITNOTE } from '../../utils/routes';

const NoteCard = ({note, index}) => {
  const navigation = useNavigation()

  const noteDelete = () => {
    firestore()
        .collection('Notes')
        // .doc(note?.id) ifadesi ile note nesnesinin id özelliği kullanılarak belirli bir dokümana erişim sağlanır. note?.id kullanımı, note nesnesi tanımlıysa id değerini alır, değilse undefined döner. Bu, olası bir tanımsız (undefined) durumu yönetmek için güvenli bir yoldur.
        .doc(note?.id)
        .delete()
        .then(() => {
            Alert.alert("Note delete successfully")
        }).catch((err)=> {
            console.log(err);
        })
}

  return (
    <View
      style={{
        backgroundColor: setColors(index),
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
      }}>
      <View style={{minHeight: height*0.13}}>
        <Text style={{fontWeight: "bold", fontSize: 20}}>{note.title}</Text>
        <Text style={{fontSize: 18, marginTop: 8}}>{note.description}</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Text style={{fontSize: 16}}>{note.date}</Text>
        <View style={{flexDirection: "row", gap: 5}}>
          <TouchableOpacity onPress={()=> navigation.navigate(EDITNOTE, {note:note})} style={{backgroundColor: Colors.BLACK, padding: 8, borderRadius: 50}}>
              <Magicpen color={Colors.WHITE} variant='Bold' size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> noteDelete()} style={{backgroundColor: Colors.BLACK, padding: 8, borderRadius: 50}}>
              <Trash color={Colors.WHITE} variant='Bold' size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NoteCard;
