import { View , Text , Image , Button } from 'react-native'; 
import axios from 'axios'; 
import { useEffect , useState } from 'react';
import tw from 'twrnc'; 

type Props = {
    route: any;
    navigation: any;
}

type User = {
    first_name: string;
    last_name: string;
    email: string; 
    avatar: any;
}

export const Detailed = ({route , navigation}: Props) => {

    const [user , setUser] = useState<User | null>(null); 

    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${route.params.id}`).then((res) => {
            setUser(res.data.data);  
        });
    }, [user])
    
    return (
        <View style={tw`flex flex-col justify-center items-center`}> 
            <Text> Specific User ID: {route.params.id} </Text>
            <Text style={tw`text-green-500`}> Datas: </Text>
            {user === null ? <Text> Loading. </Text> :  <View style={tw`flex justify-center items-center`}>
                <Text> First Name: {user?.first_name} </Text>
                <Text> Last Name: {user?.last_name} </Text>
                <Text> Email: {user?.email} </Text>
                <Image source={{uri: user?.avatar}} style={{width: 100 , height: 100}}/>
            </View>} 
            <Button title='Go back' onPress={() => navigation.navigate("Data")}/>
        </View>
    )
}; 

export default Detailed; 
