import React from 'react';
import {Text, View} from 'react-native';

import RedDog from '../assets/images/RedDog2.svg';
import {Button} from 'react-native-paper';

export default function HomeScreen() {
  const onPress = () => console.log('Heynow');

  return (
    <View>
      <Text>An SVG image:</Text>
      <RedDog width={120} height={120} />
      <Text>A react-native-paper button:</Text>
      <Button onPress={onPress}>Press me</Button>
    </View>
  );
}
