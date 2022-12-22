import { createDrawerNavigator } from '@react-navigation/drawer'; 
import Ionicons from 'react-native-vector-icons/Feather'; 
import CustomDrawer from '../comps/customDrawer';
import Business from '../screens/Business';
import Entertainment from '../screens/Enter';
import Health from '../screens/Health';
import Home from '../screens/Home';
import AroundWorld from '../screens/World';

export const BurgerBar = () => {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
            headerShown: false, drawerActiveBackgroundColor: "#2F9FF8",drawerActiveTintColor: "white", drawerInactiveTintColor: "black",
        }} initialRouteName="Top Stories">
        <Drawer.Screen name='Top Stories' options={{drawerIcon: ({color}) => (<Ionicons name='home' size={24} color={color}/>)}} component={Home}/>
        <Drawer.Screen name='Around The World' options={{drawerIcon: ({color}) => (<Ionicons name='globe' size={24} color={color}/>)}} component={AroundWorld}/> 
        <Drawer.Screen name='Business'  options={{drawerIcon: ({color}) => (<Ionicons name='briefcase' size={24} color={color}/>)}} component={Business}/>
        <Drawer.Screen name='Health'  options={{drawerIcon: ({color}) => (<Ionicons name='activity' size={24} color={color}/>)}} component={Health}/>
        <Drawer.Screen name='Entertainment'  options={{drawerIcon: ({color}) => (<Ionicons name='play-circle' size={24} color={color}/>)}} component={Entertainment}/>
        <Drawer.Screen name='Sports'  options={{drawerIcon: ({color}) => (<Ionicons name='award' size={24} color={color}/>)}} component={Home}/>
        <Drawer.Screen name='Discussion'  options={{drawerIcon: ({color}) => (<Ionicons name='message-circle' size={24} color={color}/>)}} component={Home}/>
        <Drawer.Screen name='Notification'  options={{drawerIcon: ({color}) => (<Ionicons name='bell' size={24} color={color}/>)}} component={Home}/>
        <Drawer.Screen name='News Feed Settings'  options={{drawerIcon: ({color}) => (<Ionicons name='settings' size={24} color={color}/>)}} component={Home}/>
        </Drawer.Navigator>
    )
}; 

export default BurgerBar; 