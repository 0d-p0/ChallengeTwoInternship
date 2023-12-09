import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BeneficiariesList from './src/Screens/BeneficiariesList';
import BeneficiaryDetail from './src/Screens/BeneficiaryDetail';
import {MyColors} from './src/res/Color';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, statusBarColor: MyColors.primary}}>
        <Stack.Screen name="BeneficiariesList" component={BeneficiariesList} />
        <Stack.Screen name="BeneficiaryDetail" component={BeneficiaryDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
