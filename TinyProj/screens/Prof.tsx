import { Button, Text, View } from "react-native"
import { windowHeight, windowWidth } from "../utils/windowSize";
import tw from 'twrnc'; 

export const User = ({navigation}: any) => {
    return (
        <View style={tw`flex flex-col justify-center items-center w-full h-full`}>
            <Text> User Profile </Text>
            <Button title="Go back" onPress={() => navigation.goBack()}/>
        </View>
    )
}; 

export default User; 