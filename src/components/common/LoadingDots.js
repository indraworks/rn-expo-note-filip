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
//kita masukan yg tadi opacity,toValue,duration kit abuat jadi param function
//dan yg Animated.timing kita jadikan function didalam nya !

const createTimingAnim = (opacity, toValue, duration) =>
  Animated.timing(opacity, {
    toValue,
    duration,
    easing: Easing.ease,
    useNativeDriver: false,
  });

const LoadingDots = ({ color }) => {
  const dotColor = color || COLORS.white;
  const dotOpacities = useRef(
    Array(3)
      .fill(0)
      .map((o) => new Animated.Value(o))
  ).current;

  //memakai useEffect otomatis animatednya ditriger dari peruabahab UI
  useEffect(() => {
    //pakai aninated timing dari opacity 0 ke 1 dilambatkan berkesan kedap-kedip
    //yg ini kita ringkas
    const doShowAnimations = dotOpacities.map((opacity) =>
      createTimingAnim(opacity, 1, 700)
    );

    // const doShowAnimation = [
    //   Animated.timing(dot1Opacity, {
    //     toValue: 1,
    //     duration: 700, //1 dot time utk dari putih ke grey butuh waktu 700ms
    //     easing: Easing.ease,
    //     useNativeDriver: false, //ini mode lambat
    //   }),
    //   //2

    //   Animated.timing(dot2Opacity, {
    //     toValue: 1,
    //     duration: 700,
    //     easing: Easing.ease,
    //     useNativeDriver: false, //ini mode lambat
    //   }),

    //   //3
    //   Animated.timing(dot3Opacity, {
    //     toValue: 1,
    //     duration: 700,
    //     easing: Easing.ease,
    //     useNativeDriver: false, //ini mode lambat
    //   }),
    // ];

    //matikan 3 3nya /hide
    const dotHideAnimations = dotOpacities.map((opacity) =>
      createTimingAnim(opacity, 0, 500)
    );

    // const dotHideAniations = [
    //   Animated.timing(dot1Opacity, {
    //     toValue: 0,
    //     duration: 500,
    //     easing: Easing.ease,
    //     useNativeDriver: false, //ini mode lambat
    //   }),
    //   Animated.timing(dot2Opacity, {
    //     toValue: 0,
    //     duration: 500,
    //     easing: Easing.ease,
    //     useNativeDriver: false, //ini mode lambat
    //   }),
    //   Animated.timing(dot3Opacity, {
    //     toValue: 0,
    //     duration: 500,
    //     easing: Easing.ease,
    //     useNativeDriver: false, //ini mode lambat
    //   }),
    // ];

    //sequencenya
    const sequence = Animated.sequence([
      Animated.stagger(200, doShowAnimations),
      Animated.delay(300), // ini delay 1 dot  ke dot yg lain
      Animated.parallel(dotHideAnimations),
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
    <FlowRow>
      {/* itu =>() tidak bolej kurung kurawal ,kalau kurawal harus return 
          => return {}
      */}
      {dotOpacities.map((opacity, index) => (
        <Animated.View
          key={`dot-${index}`}
          style={{ ...styles.dot, opacity, backgroundColor: dotColor }}
        />
      ))}
    </FlowRow>

    // <FlowRow>
    //   <Animated.View style={{ ...styles.dot, opacity: dot1Opacity }} />
    //   <Animated.View style={{ ...styles.dot, opacity: dot2Opacity }} />
    //   <Animated.View style={{ ...styles.dot, opacity: dot3Opacity }} />
    // </FlowRow>
  );
};
//colornya bisa berubah warna kita bisa jadikan props
//cara nambahkan style yg sudah ada dgn ada poprerty style dari luar sbb
//yaitu:style={{ ...styles.dot, opacity ,backgroundColor:dotColor}}
const styles = StyleSheet.create({
  dot: {
    //backgroundColor: COLORS.brightGreen, --ini kita ganti dgn variable dari luar
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
export default LoadingDots;
