import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StatusBar, RefreshControl} from 'react-native';
import FloatActionButton from '../../components/ui/floatActionButton';
import {Add} from 'iconsax-react-native';
import {Colors} from '../../theme/colors';
import NoteCard from '../../components/notes/noteCard';
import {screenStyle} from '../../styles/screenStyle';
import Header from '../../components/notes/header';
import {ADDNOTE} from '../../utils/routes';
import LoadingModal from '../../components/ui/loadingModal';
import firestore from '@react-native-firebase/firestore';

const Notes = ({navigation}) => {
  // notları state'e at, notları firabse'e istek atıp alacağız
  const [notes, setNotes] = useState([]);
  // yüklenme state'i tut
  const [pending, setPending] = useState(false);

  // notları firebase'den al ve state'e kaydet
  const getNotes = () => {
    // yükleniyor bas
    setPending(true);
    // Firestore'daki "Notes" koleksiyonundan tüm belgeleri (documents) getirme işlemini başlat.
    firestore()
      .collection('Notes')
      .get()
      // veri alma işlemi başarılı olduğunda, querySnapshot tüm notları içeren bir nesnedir
      .then(querySnapshot => {
        const fetchedNotes = [];
        // querySnapshot.forEach(documentSnapshot => {..}) döngüsü ile her belgeyi (notu) dön ve fetchedNotes dizisine ekle
        querySnapshot.forEach(documentSnapshot => {
          fetchedNotes.push({
            // Her not, id, title, description ve date alanlarını içerir bir nesne olsun.
            id: documentSnapshot.id,
            title: documentSnapshot.data().title,
            description: documentSnapshot.data().description,
            date: documentSnapshot.data().date,
          });
        });
        // notları state'e kaydet
        setNotes(fetchedNotes);
      })
      .catch(err => {
        console.log(err);
      })
      // yükleniyoru kapat
      .finally(() => setPending(false));
  };

  // bileşen ekrana gelince notları firebase'den al
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <View style={screenStyle.container}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      {/* veriler gelirken yükleniyorsa modalı göster geldiğinde listemizi göster */}
      {pending ? (
        <LoadingModal visible={pending} /> // visible değeri için pending state'ine bak
      ) : (
        <FlatList
          // Kullanıcı listeyi yenilediğinde getNotes fonksiyonu çalışır ve veri alındığında pending durumu güncellenir. Bu da kullanıcıya yenileme işleminin durumu hakkında görsel bir geri bildirim sağlar.
          refreshControl={<RefreshControl refreshing={pending} onRefresh={getNotes} />}
          ListHeaderComponent={<Header />}
          data={notes}
          renderItem={({item, index}) => <NoteCard note={item} index={index} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
      )}

      <FloatActionButton
        onPress={() => navigation.navigate(ADDNOTE)}
        icon={<Add size={30} color={Colors.WHITE} />}
        customStyle={{backgroundColor: Colors.BLACK, right: 20, bottom: 50}}
      />
    </View>
  );
};

export default Notes;
