import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {screenStyle} from '../../styles/screenStyle';
import {Colors} from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';
import CustomInput from '../../components/ui/customInput';
import {Bag2, Key, Sms, User} from 'iconsax-react-native';
import Avatar from '../../components/ui/avatar';

const ProfileUpdate = ({route}) => {
  const {userData} = route?.params;

  const [email, setEmail] = useState(userData.email);
  const [name, setName] = useState(userData.name);
  const [surname, setSurname] = useState(userData.surname);
  const [job, setJob] = useState(userData.job);
  const [loading, setLoading] = useState(false);
  // alt componentten gelen image'i state'e attık
  const [image, setImage] = useState(userData.image);

  // kullanıcıyı güncelle
  const updateUser = () => {
    setLoading(true);
    const form = {
      name: name,
      surname: surname,
      job: job,
      image: image
    };
    firestore()
      .collection('Users')
      .doc(userData.userId)
      .update(form)
      .then(() => {
        Alert.alert("User update successfully")
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView
      style={[screenStyle.safeAreaView, {backgroundColor: Colors.WHITE}]}>
      <View style={screenStyle.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Avatar
              // alt componenetten imageyi ve dosya uzantısını buraya getirdik
              onChangeImage={(image, mimeType) =>
                setImage(`data:${mimeType};base64, ${image}`)} // bu şekilde set ediyoruz. (data:image/png;base64 gibi bir şey oluyor yani)
              user={userData}
              select={true}
              // * select adında bir prop yolladık. bunu kullanarak edit butonuna
              // tıkladıktan sonra açılan ekranda resme basınca galeriye gitsin dedik. ana profil ekranında resme basınca gitmesini istemedik.
            />
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              gap: 10,
              paddingHorizontal: 10,
            }}>
            <CustomInput
              editable={false}
              icon={<Sms color={Colors.BLACK} variant="Bold" />}
              value={email}
              onChangeText={value => setEmail(value)}
              inputTitle="Email"
              placeholder="Email"
            />
            <CustomInput
              icon={<User color={Colors.BLACK} variant="Bold" />}
              value={name}
              onChangeText={value => setName(value)}
              inputTitle="Name"
              placeholder="Name"
            />
            <CustomInput
              icon={<User color={Colors.BLACK} variant="Bold" />}
              value={surname}
              onChangeText={value => setSurname(value)}
              inputTitle="Surname"
              placeholder="Surname"
            />
            <CustomInput
              icon={<Bag2 color={Colors.BLACK} variant="Bold" />}
              value={job}
              onChangeText={value => setJob(value)}
              inputTitle="Job"
              placeholder="Job"
            />
          </View>
          <View style={{flex: 1, marginHorizontal: 10, marginVertical: 30}}>
            <CustomButton
              loading={loading}
              onPress={() => updateUser()}
              title="Update"
              style={{backgroundColor: Colors.BLACK, marginBottom: 10}}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileUpdate;
