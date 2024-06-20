import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { screenStyle } from '../../styles/screenStyle';
import CustomInput from '../../components/ui/customInput';
import { Calendar1, NoteAdd, NoteText } from 'iconsax-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';

const AddNote = () => {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false);

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
            .add(form)
            .then(() => {
                Alert.alert("Note added successfully")
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
                <CustomButton onPress={()=> saveNote()} title="Add Note" loading={loading} />
            </View>
        </View>
    );
};

export default AddNote;
