import { NavigationContainer, StackActions } from '@react-navigation/native';
import { useEffect } from 'react';
import * as React from 'react'; 
import {View} from 'react-native';
import FsContextPrv, { FsContext } from './cont/fsCont';
import BurgerBar from './navigation/Burger';
import { Footer, Header, SignIn, SignUp } from './screens';
import { windowHeight, windowWidth } from './utils/windowSize';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User from './screens/Prof';
import Specific from './screens/Spec';
import AroundWorld from './screens/World';
import Business from './screens/Business';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';
import Health from './screens/Health';
import Followers from './comps/followers';
import Followings from './comps/followings';
import Entertainment from './screens/Enter';
import SpecUser from './screens/specUser';
import Notification from './screens/Notification';
import { Sports } from './screens/Sports';
import Discussion from './screens/Discuss';
import Setting from './screens/Setting';

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); 
  }, [StackActions])
    

  const Stack = createNativeStackNavigator<any>(); 

  const Navigator = () => {

    const fsCont = React.useContext(FsContext);
    console.log(`User: ${fsCont?.isLogged}`); 


     if (fsCont?.isLogged) {
       return (
          <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen name="HomeScreen" component={BurgerBar} options={{ header: (e: any) => <Header navigation={e.navigation} />}}/>
            <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
            <Stack.Screen name="Spec" component={Specific} options={{header: (e: any) => <Header navigation={e.navigation}/>}}/>
            <Stack.Screen name="World" component={AroundWorld}/>
            <Stack.Screen name="Business" component={Business}/>
            <Stack.Screen name="Health" component={Health}/>
            <Stack.Screen name="Entertainment" component={Entertainment}/>
            <Stack.Screen name="Sports" component={Sports}/>
            <Stack.Screen name="Notification" component={Notification}/>
            <Stack.Screen name="Followers" component={Followers}/>
            <Stack.Screen name="Followings" component={Followings}/>
            <Stack.Screen name="SpecUser" component={SpecUser}/>
            <Stack.Screen name="Discussion" component={Discussion}/>
            <Stack.Screen name="Setting" component={Setting}/>
          </Stack.Navigator>
       )
     }
     else {
       return (
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={SignIn} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={SignUp}  options={{headerShown: false}}/> 
          </Stack.Navigator>
       )
     }
  }

  return (
    <FsContextPrv>
    <SelectProvider>
    <View style={{flex: 1 , width: windowWidth , height: windowHeight}}>
      <NavigationContainer> 
      <Navigator />
      </NavigationContainer>
      <Footer />
    </View>
    </SelectProvider>
    </FsContextPrv>
  );
};

export default App;
