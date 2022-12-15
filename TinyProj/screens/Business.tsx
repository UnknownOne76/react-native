import { useEffect, useRef, useState } from "react";
import { Pressable, View , Animated, SafeAreaView, StyleSheet } from "react-native"

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
    <View style={styles.cotnainer}>
      <SafeAreaView>
        <View style={styles.header}>
          <Pressable
            style={styles.chip}
            onPress={() => setDay(val => !val)}>
            <Animated.View
              style={{...styles.ball, transform: [{translateX: anim}]}}>
              <Animated.View
                style={{
                  ...styles.shadow,
                  transform: [
                    {
                      translateX: anim.interpolate({
                        inputRange: [0, 32],
                        outputRange: [0, 15],
                      }),
                    },
                    {
                      scale: anim.interpolate({
                        inputRange: [0, 32],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                }}
              />
            </Animated.View>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
    cotnainer: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
    },
    chip: {
      width: 64,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#27173A',
    },
    ball: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FFC207',
      position: 'absolute',
      top: 4,
      left: 4,
      overflow: 'hidden',
    },
    shadow: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#27173A',
      position: 'absolute',
      top: 2,
      left: -20,
    },
  });

export default Business; 