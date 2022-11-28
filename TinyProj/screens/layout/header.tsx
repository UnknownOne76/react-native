import { Platform } from "react-native";
import { View , Text , Image, TouchableHighlight } from "react-native";
import { DrawerActions } from '@react-navigation/native'; 
import tw from 'twrnc';

export const Header = ({navigation}: any) => {   
    const User = () => {
        return (
          <View style={tw`flex flex-row`}> 
          <Image source={require("../../images/user.jpg")} style={{width: 18 , height: 18, marginLeft: 30}}/>
          <Text style={tw`font-bold`}> My Profile </Text>
          </View>
        )
    }; 

    return (
        <View style={Platform.OS === 'ios' ? tw`flex flex-row w-full pt-10 pl-5` : tw`flex flex-row w-full m-5`}>
           <TouchableHighlight  activeOpacity={0.6} underlayColor="#FFFFFF" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
           <Image source={require("../../images/menu.jpg")} style={{width: 24, height: 24, marginRight: 10}}/>
           </TouchableHighlight>
           <Image source={require("../../images/aster.jpg")} style={{width: 24, height: 29}}/>
           <Image source={require("../../images/search.jpg")} style={{width: 18, height: 18, marginLeft: 170}}/>
           <TouchableHighlight activeOpacity={0.6}  underlayColor="#FFFFFF" onPress={() => navigation.navigate('User')}> 
           <User />
           </TouchableHighlight>
          
        </View>
    )
};
export default Header;
