import { useContext, useRef } from "react";
import { Alert, Text, View , Animated } from "react-native"
import { Gesture, GestureDetector, TapGestureHandler } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import tw from 'twrnc'; 
import { FsContext } from "../cont/fsCont";
import SwipeGesture from "./swp";

export const Health = () => {
    const double = useRef();  

    const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
        if (success) {
           runOnJS(Alert.alert)(`Long pressed for ${(e.duration/1000)%60} seconds!`); 
        }
      });
      
    return (
        <View style={tw`flex flex-col w-full h-full justify-center items-center`}>
            <Text>Progress-1</Text>
            <GestureDetector gesture={longPressGesture}> 
            <TapGestureHandler onActivated={() => Alert.alert('Single Tap!')} waitFor={double}>
                <TapGestureHandler ref={double} numberOfTaps={2} onActivated={() => Alert.alert('Doube Tap!')}> 
               <Text> Tap me </Text>
               </TapGestureHandler>
            </TapGestureHandler>
            </GestureDetector>
            <SwipeGesture />
        </View>
    )
}; 

export default Health;