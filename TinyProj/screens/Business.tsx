import { useEffect, useRef, useState } from "react";
import { Pressable, View , Animated, SafeAreaView, ImageBackground, Image, Text} from "react-native"
import tw from 'twrnc'; 

export const Business = () => {
  const [day, setDay] = useState<boolean>(true);

  const anim = useRef(new Animated.Value(0)).current;
  const sun = useRef(new Animated.Value(0)).current; 
  const clouds = useRef(new Animated.Value(0)).current;
  const backGround = useRef(new Animated.Value(0)).current; 
  const moon = useRef(new Animated.Value(0)).current; 
  const stars = useRef(new Animated.Value(0)).current; 
  const tailWind = useRef(new Animated.Value(0)).current; 
  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground); 

  useEffect(() => {
    Animated.timing(anim, {
      toValue: day ? 0 : 32,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(sun, {
       toValue: day ? 0 : -400,
       duration: 1000, 
       useNativeDriver: true
    }).start(); 

    Animated.timing(clouds , {
       toValue: day ? 0 : -400, 
       duration: 1000, 
       useNativeDriver: true
    }).start(); 

    Animated.timing(backGround , {
       toValue: day ? 1 : 0,
       duration: 1000, 
       useNativeDriver: true  
    }).start(); 

    Animated.timing(moon , {
       toValue: day ? 420 : -1, 
       duration: 1000,
       useNativeDriver: true
    }).start(); 

    Animated.timing(stars , {
        toValue: day ? 0 : 10, 
        duration: 1000, 
        useNativeDriver: true
    }).start(); 

    Animated.timing(tailWind , {
       toValue: day ? -400 : -10,
       duration: 1000,
       useNativeDriver: true
    }).start(); 
  }, [day, anim]);

  return (
    <View style={tw`flex w-full h-full`}>
    <AnimatedImage style={[tw`flex w-full h-full`]} source={day ? require('./images/bg.png') : require('./images/nightBg.png')}> 
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
      <View style={tw`flex flex-col w-full justify-center items-center`}>
      <Animated.Image source={require('./images/clouds.png')} style={[{transform: [{translateX: clouds}]} , {opacity: clouds.interpolate({inputRange: [0 , 25, 50] , outputRange: [1, 0.5, 1]})}]}/>
      <Animated.View style={[tw`flex w-24 h-24 rounded-full bg-[#FAE481] mt-20 mr-20` , {transform: [{translateY: sun} , {translateX: sun.interpolate({inputRange: [0, 800] , outputRange: [0 , -200]})}]}]}/>
      </View> 
      <Animated.Image source={require('./images/stars.png')} style={[tw`mt-[-200] ml-15` , {transform: [{translateY: stars}]} , {opacity: stars.interpolate({inputRange: [0 , 32] , outputRange: [0 , 10]})}]}/>
      <Animated.Image source={require('./images/moon.png')} style={[tw`w-14 h-14 ml-35 mt-[-75]` , {transform: [{translateY: moon} , {translateX: moon.interpolate({inputRange: [0 , 420] , outputRange: [0 , -100]})}]}]}/>
      <View style={tw`flex flex-row w-full justify-center items-center mt-[30] ml-30`}>
         <View style={tw`flex flex-col justify-center items-center`}> 
         <Image source={require('./images/home.png')} style={tw`mb-[-50]`}/>
         <Animated.View style={[tw`flex w-2.5 h-2.5 ${day ? 'bg-[#276B7E]' : 'bg-[#FBE57F]'}`]}/>
         <Image source={require('./images/cliff.png')} style={tw`ml-10`}/>
         </View>
         <Image source={require('./images/tree-cliff.png')} style={tw`mb-70 ml-[-40]`}/>
      </View>
      <Animated.Image source={require('./images/tail-wind.png')} style={[tw`mt-[-330] ml-20` , {transform: [{translateY: tailWind} , {translateX: tailWind.interpolate({inputRange: [0, 400] , outputRange:[-25 , -400]})} , {rotate: '-15deg'}]}]}/>
    </SafeAreaView>
    </AnimatedImage>
  </View>
  );
};

export default Business; 