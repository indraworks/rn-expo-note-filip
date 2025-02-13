import React from "react";
import { View, Text } from "react-native";

export const ActivityItem = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

/*
yg item sekarang kita ganti ada props masuk 
karena kita akan gunakan sebagi re-use component pada screen 


*/
