import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlowHighLightView } from "../overrides";
import { FlowText } from "../overrides";
export const ActivityTimer = () => {
  return (
    <FlowHighLightView style={styles.timeContainer}>
      <FlowText> Iam Activity Timer</FlowText>
    </FlowHighLightView>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    height: 70,
    marginVertical: 10,
  },
});
