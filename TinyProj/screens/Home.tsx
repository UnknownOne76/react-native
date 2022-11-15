import { Alert, Button, Text, View } from "react-native"

type Props = {
   navigation: any;        
}

export const Home = ({navigation}: Props) => {
    return (
    <View style={{flex: 1, alignItems: 'center' , justifyContent: 'center'}}>
      <Text style={{color: 'green'}}> HOME </Text>
      <Button title="Tap me!" onPress={(): void => navigation.navigate('Data' , {
         id: '1',
         items: [{
            "name": "John Doe",
            "age": 20
         }]
      })}/>
    </View>
    );
}; 

export default Home;