import React from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../../variables/styles";
import { FlowText, FlowHighLightView } from "../overrides";

export const ActivityItem = ({ title }) => {
  return (
    <FlowHighLightView style={StyleSheet.itemContainer}>
      <FlowText>{title}</FlowText>
    </FlowHighLightView>
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
});
