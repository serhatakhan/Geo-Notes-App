import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { screenStyle } from '../../styles/screenStyle';
import CustomInput from '../../components/ui/customInput';
import { Calendar1, NoteAdd, NoteText, Star1 } from 'iconsax-react-native';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';

const AddLocation = ({route}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [point, setPoint] = useState("");
    const [loading, setLoading] = useState(false);
    const {coordinate} = route?.params

    const saveNote = () => {
        setLoading(true)
        // form isimli oluşturduğumuz nesneyi kaydedeceğiz firebase'e.
        const form = {
            title: title,
            description: description,
            date: date,
            point: point,
            coordinate: coordinate
        }
        firestore()
            .collection('Locations')
            .add(form)
            .then(() => {
                Alert.alert("Location added successfully")
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
            <CustomInput value={point} onChangeText={(value)=> setPoint(value)} inputTitle="Rate" icon={<Star1 color={Colors.GRAY} />} placeholder="Point" />
            <View style={{flex:1, justifyContent: "center"}}>
                <CustomButton onPress={()=> saveNote()} title="Add Location" loading={loading} />
            </View>
        </View>
    );
};

export default AddLocation;
