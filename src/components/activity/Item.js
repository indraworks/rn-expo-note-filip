import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet } from "react-native";
import { COLORS } from "../../variables/styles";
import { FlowText, FlowHighLightView, FlowRow } from "../overrides";

export const ActivityItem = ({ title }) => {
  const pan = useRef(new Animated.ValueXY()).current; //menetapkan ref animasi daam variable pan
  //dimana utk tentukan arah x ,arah y waktu move!

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, //create triger function respon start
      // ini func utk start jika ada element di klik etc
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      //ini func utk waktu releasse stalh drag drop
      onPanResponderRelease: () => {
        pan.extractOffset;
      },
    })
  ).current;

  return (
    //wajib bungkus dngn animated view
    //kita masukan variable /propsnya panResponderke Animated.View compoenent>
    <Animated.View
      {...panResponder.panHandlers}
      //transform hanya arah x saja
      style={{
        //ktika dklik gak boleh ada action
        touchAction: "none",
        //ktika ada dibagian text,di ignore textnya jadi bisa move
        useSelect: "none",
        transform: [{ translateX: pan.x }],
      }}
    >
      <FlowHighLightView style={StyleSheet.itemContainer}>
        <FlowRow style={styles.row}>
          <FlowText>{title}</FlowText>
          <FlowText style={styles.time}>00:00:00</FlowText>
        </FlowRow>
      </FlowHighLightView>
    </Animated.View>
  );
};

/*
yg item sekarang kita ganti ada props masuk 
karena kita akan gunakan sebagi re-use component pada screen 


*/

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 6,
    paddingVertical: 19,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  time: {
    color: COLORS.brightGreen,
  },
});

/*PanResponder :ini adalah aninamated utk drag dan drop dari core react-native
kalau kita pake panGestureHandler ini lebih modern utk yabg ini kita pake yg panResponder!


*/
