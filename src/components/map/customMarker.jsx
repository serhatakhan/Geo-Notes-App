import React, { Component } from 'react';
import { View } from 'react-native';
import { Location } from 'iconsax-react-native';
import { Colors } from '../../theme/colors';

const CustomMarker = () => {
    return (
        <View >
            <Location size="40" color={Colors.RED} variant="Bold"/>
        </View>
    );
};

export default CustomMarker;
