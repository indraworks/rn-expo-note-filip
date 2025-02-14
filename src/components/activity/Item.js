import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../../variables/styles";

export const ActivityItem = ({ title }) => {
  return (
    <View>
      <Text style={{ color: COLORS.white }}>{title}</Text>
    </View>
  );
};

/*
yg item sekarang kita ganti ada props masuk 
karena kita akan gunakan sebagi re-use component pada screen 


*/
