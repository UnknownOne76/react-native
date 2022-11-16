import { Button, Text, View } from "react-native"
import tw from 'twrnc';

type Props = {
   route: any;
   navigation: any;        
}

export const Home = ({navigation}: Props) => {
    return (
    <View style={{flex: 1 , justifyContent: "center" , alignItems: "center"}}>
      <Text style={tw`text-green-500 font-bold`}> HOME </Text>
      <Button title="Tap me!" onPress={(): void => navigation.navigate('Data')}/>
    </View>
    );
}; 

export default Home;