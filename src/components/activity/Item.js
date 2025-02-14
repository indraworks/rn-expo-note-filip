import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../../variables/styles";
import { FlowText } from "../overrides";

export const ActivityItem = ({ title }) => {
  return (
    <View>
      <FlowText>{title}</FlowText>
    </View>
  );
};

/*
yg item sekarang kita ganti ada props masuk 
karena kita akan gunakan sebagi re-use component pada screen 


*/
