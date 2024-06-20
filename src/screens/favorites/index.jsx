import React, {useState, useEffect} from 'react';
import {FlatList, StatusBar, RefreshControl, Text} from 'react-native';
import {Colors} from '../../theme/colors';
import {screenStyle} from '../../styles/screenStyle';
import LoadingModal from '../../components/ui/loadingModal';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoriteCard from '../../components/favorites/favoriteCard';

const Favorites = ({navigation}) => {
  // favorites state'e at, notları firabse'e istek atıp alacağız
  const [favorites, setFavorites] = useState([]);
  // yüklenme state'i tut
  const [pending, setPending] = useState(false);

  // notları firebase'den al ve state'e kaydet
  const getFavorites = () => {
    // yükleniyor bas
    setPending(true);
    // Firestore'daki "Favorites" koleksiyonundan tüm belgeleri (documents) getirme işlemini başlat.
    firestore()
      .collection('Favorites')
      .get()
      // veri alma işlemi başarılı olduğunda, querySnapshot tüm notları içeren bir nesnedir
      .then(querySnapshot => {
        const fetchedNotes = [];
        // querySnapshot.forEach(documentSnapshot => {..}) döngüsü ile her belgeyi (favoriyi) dön ve fetchedNotes dizisine ekle
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
        setFavorites(fetchedNotes);
      })
      .catch(err => {
        console.log(err);
      })
      // yükleniyoru kapat
      .finally(() => setPending(false));
  };

  // bileşen ekrana gelince favorileri firebase'den alan fonku çalıştır
  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <SafeAreaView style={screenStyle.container}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      {/* veriler gelirken yükleniyorsa modalı göster geldiğinde listemizi göster */}
      {pending ? (
        <LoadingModal visible={pending} /> // visible değeri için pending state'ine bak
      ) : (
        <FlatList
          // Kullanıcı listeyi yenilediğinde getNotes fonksiyonu çalışır ve veri alındığında pending durumu güncellenir. Bu da kullanıcıya yenileme işleminin durumu hakkında görsel bir geri bildirim sağlar.
          refreshControl={<RefreshControl refreshing={pending} onRefresh={getFavorites} />}
          data={favorites}
          ListHeaderComponent={<Text style={{fontSize: 28, fontWeight: "600", marginBottom: 5}}>Favorites</Text>}
          renderItem={({item, index}) => <FavoriteCard favorite={item} index={index} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default Favorites;
