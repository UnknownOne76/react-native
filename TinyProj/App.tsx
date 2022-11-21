import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import * as React from 'react'; 
import {View} from 'react-native';
import FsContextPrv from './cont/fsCont';
import BurgerBar from './navigation/Burger';
import { Footer } from './screens';
import { windowHeight, windowWidth } from './utils/windowSize';
import SplashScreen from 'react-native-splash-screen';


const App = () => {

  useEffect(() => {
     SplashScreen.hide(); 
  }, [])

  return (
    <FsContextPrv> 
    <View style={{flex: 1 , width: windowWidth , height: windowHeight}}>
      <NavigationContainer> 
      <BurgerBar />
      </NavigationContainer>
      <Footer />
    </View>
    </FsContextPrv>
  );
};

export default App;
