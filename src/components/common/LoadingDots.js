import React from "react";
import { Text, StyleSheet, Animated, View } from "react-native";
import { FlowRow } from "../overrides";
import { COLORS } from "../../variables/styles";

const LoadingDots = () => {
  return (
    <FlowRow>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </FlowRow>
  );
};
const styles = StyleSheet.create({
  dot: {
    backgroundColor: COLORS.darkGray,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
export default LoadingDots;
