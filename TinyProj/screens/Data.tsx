import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Image, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';

type Props = {
    route: any;
    navigation: any; 
};

type Users = {
    id: any;
    avatar: any; 
    email: string; 
    first_name: string; 
    last_name: string; 
}; 

export const DataCenter = ({route , navigation}: Props) => {

    const [users , setUsers] = useState<Users[]>(); 

    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=1').then((res) => {
            setUsers(res.data.data); 
        })
    }, [users]); 


    return (
        <SafeAreaView> 
        <ScrollView> 
        <View style={{flex: 1 , flexDirection: "column" ,justifyContent: "center" , alignItems: "center"}}>
            <Text> Data center here! </Text>
            <View style={tw`flex flex-col justify-center items-center`}>
                 <View style={tw`bg-green-500`}> 
                     {users?.map((x): any => {
                         return ( 
                        <View key={x.id} style={tw`flex flex-col justify-center items-center`}>
                            <Text> First Name: {x.first_name} </Text>
                            <Text> Last Name: {x.last_name} </Text>
                            <Text> Email: {x.email} </Text>
                            <Image source={{uri: x.avatar}} style={{width: 50 , height: 50}}/>
                            <Button title="Go to profile" onPress={() => navigation.navigate("Detail" , {
                                id: x.id
                            })}/>
                        </View>
                        )
                     })}
                 </View>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}; 

export default DataCenter;