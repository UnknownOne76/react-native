import { useContext, useEffect, useRef } from "react";
import { Alert, Text, View , Animated, Button } from "react-native"
import { Gesture, GestureDetector, TapGestureHandler } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import tw from 'twrnc'; 
import SwipeGesture from "./swp";
import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics';

export const Health = () => {
    const double = useRef();  

    const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
        if (success) {
           runOnJS(Alert.alert)(`Long pressed for ${(e.duration/1000)%60} seconds!`); 
        }
      });

      useEffect(() => {
         crashlytics().crash(); 
      }, [crashlytics]); 
      
    return (
        <View style={tw`flex flex-col w-full h-full justify-center items-center`}>
            {/* <Text>Progress-1</Text>
            <GestureDetector gesture={longPressGesture}> 
            <TapGestureHandler onActivated={() => Alert.alert('Single Tap!')} waitFor={double}>
                <TapGestureHandler ref={double} numberOfTaps={2} onActivated={() => Alert.alert('Doube Tap!')}> 
               <Text> Tap me </Text>
               </TapGestureHandler>
            </TapGestureHandler>
            </GestureDetector>
            <SwipeGesture /> */}
            <View>
        <Button title="Press me" onPress={async () =>
          await analytics().logSelectContent({
            content_type: 'clothing',
            item_id: 'abcd',
          })
        }
      />
    </View>
    </View>
    )
}; 

export default Health;