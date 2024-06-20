import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Favorites from '../screens/favorites';
import Notes from '../screens/notes';
import Profile from '../screens/profile';
import {FAVORITES, MAP, NOTES, PROFILE} from '../utils/routes';
import {Colors} from '../theme/colors';
import TabIcon from '../components/router/tabIcon';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => (
          <TabIcon
            focused={focused}
            color={color}
            size={size}
            name={route?.name}
            route={route}
          />
        ),
        tabBarActiveTintColor: Colors.BLACK,
        tabBarInactiveTintColor: Colors.GRAY,
      })}>
      <Tab.Screen name={MAP} component={Home} options={{headerShown: false}} />
      <Tab.Screen name={FAVORITES} component={Favorites} options={{headerShown: false}} />
      <Tab.Screen name={NOTES} component={Notes} options={{headerShown: false}} />
      <Tab.Screen name={PROFILE} component={Profile} options={{headerShadowVisible: false}} />
    </Tab.Navigator>
  );
}
