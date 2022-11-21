import { View , Text , Image } from "react-native"
import tw from 'twrnc'; 
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';

export const CustomDrawer = (props: any) => {
    return (
        <View style={{flex: 1}}> 
        <DrawerContentScrollView
        {...props} contentContainerStyle={{backgroundColor: "white"}}>
        <View style={tw`flex flex-row p-5 justify-start items-center`}> 
        <Image source={require('../images/aster.jpg')} style={{width: 29, height: 35}}/>
        <Text style={tw`text-[#0768B5] font-bold ml-2 text-lg`}> Aster News </Text> 
        </View>
        <View style={{flex: 1 , paddingTop: 10}}>
           <DrawerItemList {...props} /> 
        </View>
        </DrawerContentScrollView>
        </View>
    )
};

export default CustomDrawer; 