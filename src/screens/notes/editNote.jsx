import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { screenStyle } from '../../styles/screenStyle';
import CustomInput from '../../components/ui/customInput';
import { Calendar1, NoteAdd, NoteText } from 'iconsax-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';

const EditNote = ({route}) => {
    // console.log(route.params.note);
    const {note} = route?.params

    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [date, setDate] = useState(note.date);
    const [loading, setLoading] = useState(false);

    // belirli bir notun güncelle
    const saveNote = () => {
        setLoading(true)
        // form isimli oluşturduğumuz nesneyi kaydedeceğiz firebase'e.
        const form = {
            title: title,
            description: description,
            date: date
        }
        firestore()
            .collection('Notes')
            // .doc(note?.id) ifadesi ile note nesnesinin id özelliği kullanılarak belirli bir dokümana erişim sağlanır. note?.id kullanımı, note nesnesi tanımlıysa id değerini alır, değilse undefined döner. Bu, olası bir tanımsız (undefined) durumu yönetmek için güvenli bir yoldur.
            .doc(note?.id)
            // .update(form) ifadesi, belirtilen dokümandaki verileri form değişkeninde belirtilen verilerle günceller.
            .update(form)
            .then(() => {
                Alert.alert("Note update successfully")
            }).catch((err)=> {
                console.log(err);
            }).finally(()=> {
                setLoading(false)
            })
    }

    return (
        <View style={[screenStyle.container, {gap:10}]}>
            {/* onChangeText vermeseydik sadece value verseydik inputların içini değiştiremiyorduk. onChangeText sayesinde devamına da yazabiliyoruz. */}
            <CustomInput value={title} onChangeText={(value)=> setTitle(value)} inputTitle="Title" icon={<NoteAdd color={Colors.GRAY} />} placeholder="Title" />
            <CustomInput value={description} onChangeText={(value)=> setDescription(value)} inputTitle="Description" icon={<NoteText color={Colors.GRAY} />} placeholder="Description" />
            <CustomInput value={date} onChangeText={(value)=> setDate(value)} inputTitle="Date" icon={<Calendar1 color={Colors.GRAY} />} placeholder="Date" />
            <View style={{flex:1, justifyContent: "center"}}>
                <CustomButton onPress={()=> saveNote()} title="Update Note" loading={loading} />
            </View>
        </View>
    );
};

export default EditNote;
