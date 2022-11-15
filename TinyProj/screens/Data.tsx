import { useState } from "react";
import { Text, View } from "react-native"

type Props = {
    route: any;
    navigation: any; 
}; 

type Inter = {
    name: string;
    age: number; 
}

export const DataCenter = ({route , navigation}: Props) => {

    const { id , items } = route.params; 

    return (
        <View>
            <Text> Data center here! </Text>
            <Text> ID: {id} , Items: {items.map((x: Inter , i: number) => {
                return <Text key={i}> Name: {x.name} , Age: {x.age} </Text>
            })}</Text>
        </View>
    )
}; 

export default DataCenter;