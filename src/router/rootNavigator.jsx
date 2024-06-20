import React, { useState, useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Detail from '../screens/detail';
import AddNote from '../screens/notes/addNote';
import EditNote from '../screens/notes/editNote';
import {ADDLOCATION, ADDNOTE, COORDINATESELECT, DETAIL, EDITNOTE, EDITUSER, LAUNCH, SIGNIN, SIGNUP, TAB} from '../utils/routes';
import {Colors} from '../theme/colors';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';
import Launch from '../screens/launch';
import TabNavigator from './tabNavigator';
import CoordinateSelect from '../screens/home/coordinateSelect';
import AddLocation from '../screens/home/addLocations';
import ProfileUpdate from '../screens/profile/profileUpdate';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  // Uygulamanın başlangıçta Firebase Authentication durumunu kontrol edip etmediğini takip eder.
  const [initializing, setInitializing] = useState(true);
  // Oturum açmış kullanıcıyı tut.
  const [user, setUser] = useState();

  // Bu fonksiyon, Firebase Authentication durumu değiştiğinde çağrılır. Kullanıcı oturum açmışsa, user değişkeni güncellenir.
  function onAuthStateChanged(user) {
    // console.log(user);
    setUser(user);
    if (initializing) setInitializing(false); // İlk kontrol tamamlandığında initializing durumunu false yapar.
  }
  
  useEffect(() => {
    // auth().onAuthStateChanged(onAuthStateChanged): Firebase Authentication'da oturum durumu değişikliklerini dinler. onAuthStateChanged fonksiyonunu(yukarıda yazdığımız) parametre olarak alır.
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // Bileşen kaldırıldığında aboneliği sonlandır, bu sayede bellek sızıntılarını önler.
    return subscriber;
  }, []);

  if (initializing) return null;
  // Bu satır, initializing durumundayken (Firebase oturum durumu kontrol edilirken) bileşenin hiçbir şey render etmemesini sağlar. initializing false olduğunda, bileşen normal şekilde render edilecektir.

  
  return (
    <Stack.Navigator>
      {/* user yoksa ilk stack grubuna gir varsa ikinci stack grubuna gir */}
      {
        !user ? (
          <Stack.Group>
            <Stack.Screen name={LAUNCH} component={Launch} options={{headerShown: false}} />
            <Stack.Screen name={SIGNIN} component={SignIn} 
            options={{
                headerBackTitleVisible: false,
                headerShadowVisible: false,
                headerTintColor: Colors.BLUE,
              }} />
            <Stack.Screen name={SIGNUP} component={SignUp} 
            options={{
                headerBackTitleVisible: false,
                headerShadowVisible: false,
                headerTintColor: Colors.BLUE,
              }} />
          </Stack.Group>
        ) : (
        <Stack.Group>
          <Stack.Screen name={TAB} component={TabNavigator} options={{headerShown: false}}/>
          <Stack.Screen name={ADDNOTE} component={AddNote}
          options={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTintColor: Colors.BLUE,
            }}/>
          <Stack.Screen name={EDITNOTE} component={EditNote} 
          options={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTintColor: Colors.BLUE2,
            }} />
          <Stack.Screen name={DETAIL} component={Detail}
            options={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTintColor: Colors.ORANGE,
            }}/>
          <Stack.Screen name={COORDINATESELECT} component={CoordinateSelect} 
          options={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTintColor: Colors.ORANGE,
            }} />
          <Stack.Screen name={ADDLOCATION} component={AddLocation} 
          options={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTintColor: Colors.BLACK,
            }} />
          <Stack.Screen name={EDITUSER} component={ProfileUpdate} 
          options={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTintColor: Colors.BLUE2,
            }} />
        </Stack.Group>
        )
      }
    </Stack.Navigator>
  );
}

export default RootNavigator;
