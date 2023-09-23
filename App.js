import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PhotoGallery from './src/components/PhotoGallery';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Photo Gallery" component={PhotoGallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
