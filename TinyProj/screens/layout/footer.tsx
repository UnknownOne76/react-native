import { Text, View } from "react-native"
import tw from 'twrnc'; 

export const Footer = () => { 

    return (
        <View style={tw`flex flex-col w-full p-5 bg-white`}>
            <View style={tw`flex h-0.1 bg-[#072D4B] mb-5`} />
            <View style={tw`flex flex-row`}> 
            <Text style={tw`pr-4`}> © Aster News, 2022 </Text>
            <Text> Privacy Policy </Text>
            <Text> Terms of Service </Text>
            </View>
        </View>
    )
}; 

export default Footer;