import React from 'react';
import {Text, View} from 'react-native';

import RedDog from '../assets/images/RedDog2.svg';

export default function HomeScreen() {
  return (
    <View>
      <Text>Hello, world.</Text>
      <RedDog width={120} height={120} />
      <Text>Goodbye, world.</Text>
    </View>
  );
}
