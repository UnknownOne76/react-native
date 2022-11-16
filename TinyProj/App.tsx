/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react'; 
import {
  Dimensions,
  View,
} from 'react-native';
import DataCenter from './screens/Data';
import { Detailed } from './screens/Detail';
import Home from './screens/Home';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {

  const Stack = createNativeStackNavigator(); 

  return (
    <View style={{width: windowWidth , height: windowHeight}}> 
      <NavigationContainer> 
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Data' component={DataCenter}/>
        <Stack.Screen name="Detail" component={Detailed} />
      </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
