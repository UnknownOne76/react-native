import { useEffect, useRef, useState } from "react";
import { Pressable, View , Animated, SafeAreaView} from "react-native"
import tw from 'twrnc'; 

export const Business = () => {
  const [day, setDay] = useState<boolean>(true);

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: day ? 0 : 32,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [day, anim]);

  return (
    <View style={tw`flex`}>
    <SafeAreaView>
      <View style={tw`flex flex-row justify-end p-5`}>
        <Pressable
          style={tw`flex w-16 h-8 rounded-full bg-[#27173A]`}
          onPress={() => setDay(val => !val)}>
          <Animated.View
            style={[tw`absolute top-1 left-1 w-6 h-6 rounded-full bg-[#FFC207] overflow-hidden` ,{transform: [{translateX: anim}]}]}>
            <Animated.View
              style={[tw`absolute top-1 left-[-5] w-5 h-4 rounded-full bg-[#27173A]` ,{transform: [{translateX: anim.interpolate({inputRange: [0 , 32],outputRange: [0 , 15]})},{scale: anim.interpolate({inputRange: [0, 32],outputRange: [0, 1]})}]}]}
            />
          </Animated.View>
        </Pressable>
      </View>
    </SafeAreaView>
  </View>
  );
};

export default Business; 