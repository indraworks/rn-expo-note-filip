import React from "react";
import { View, Text, StyleSheet } from "react-native";
export const ActivityTimer = () => {
  return (
    <View style={styles.timeContainer}>
      <Text> Iam Activity Timer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    height: 70,
    marginVertical: 10,
    backgroundColor: "red",
  },
});
