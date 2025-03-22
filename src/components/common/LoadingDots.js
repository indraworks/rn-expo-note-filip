import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, Animated, View, Easing } from "react-native";
import { FlowRow } from "../overrides";
import { COLORS } from "../../variables/styles";
//kita gunaka useEref utk tampiung value dan utk maksud adalah jika ada pribahan tak perlu di re-render
//jika component gunakan useRef /jika ada perubahan nilai !
/*
cara kerjanya adalah diberi opacity 0 jadi 1 utk dot pertama ,dot ke2 juga gitu ,ketiga sama 
stlah sama2 nyala maka akan enghilang dan ulangi lagi dari yg pertama
adi sprti kedap kedip pindah dari opacity 0 ke 1 


*/

const LoadingDots = () => {
  //nilai value yg dipakai dari reference useREf adalah nilai current dari itu sellau
  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;

  //memakai useEffect otomatis animatednya ditriger dari peruabahab UI
  useEffect(() => {
    //pakai aninated timing dari opacity 0 ke 1 dilambatkan berkesan kedap-kedip
    const doShowAnimation = [
      Animated.timing(dot1Opacity, {
        toValue: 1,
        duration: 700, //1 dot time utk dari putih ke grey butuh waktu 700ms
        easing: Easing.ease,
        useNativeDriver: false, //ini mode lambat
      }),
      //2

      Animated.timing(dot2Opacity, {
        toValue: 1,
        duration: 700,
        easing: Easing.ease,
        useNativeDriver: false, //ini mode lambat
      }),

      //3
      Animated.timing(dot3Opacity, {
        toValue: 1,
        duration: 700,
        easing: Easing.ease,
        useNativeDriver: false, //ini mode lambat
      }),
    ];

    //matikan 3 3nya /hide
    const dotHideAniations = [
      Animated.timing(dot1Opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false, //ini mode lambat
      }),
      Animated.timing(dot2Opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false, //ini mode lambat
      }),
      Animated.timing(dot3Opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false, //ini mode lambat
      }),
    ];

    //sequencenya
    const sequence = Animated.sequence([
      Animated.stagger(200, doShowAnimation),
      Animated.delay(300), // ini delay 1 dot  ke dot yg lain
      Animated.parallel(dotHideAniations),
    ]);

    //loop sequencenya
    const loop = Animated.loop(sequence);
    loop.start();

    return () => {
      loop.stop();
    };
  }, []);

  //stlah 3 smua dot di hide ilang

  return (
    //
    // <FlowRow>
    //   <View style={styles.dot} />
    //   <View style={styles.dot} />
    //   <View style={styles.dot} />
    // </FlowRow>
    <FlowRow>
      <Animated.View style={{ ...styles.dot, opacity: dot1Opacity }} />
      <Animated.View style={{ ...styles.dot, opacity: dot2Opacity }} />
      <Animated.View style={{ ...styles.dot, opacity: dot3Opacity }} />
    </FlowRow>
  );
};
const styles = StyleSheet.create({
  dot: {
    backgroundColor: COLORS.white,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
export default LoadingDots;
