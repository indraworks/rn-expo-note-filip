import React from "react";
import { StyleSheet, View } from "react-native";

export const FlowRow = ({ children, style }) => {
  //style prop tambahan style dari parent datang ke component ini
  //jadi ...style adalah kalau kita tambah css style dari parent component kemari/kesini
  return <View style={{ ...styles.row, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignmentItems: "center",
  },
});
