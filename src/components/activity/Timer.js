import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlowHighLightView, FlowRow, FlowText } from "../overrides";
import { COLORS } from "../../variables/styles";

export const ActivityTimer = () => {
  return (
    <FlowHighLightView style={styles.timeContainer}>
      <FlowRow style={styles.row}>
        <FlowText> No Activities</FlowText>
      </FlowRow>
      <FlowRow style={styles.row}>
        <FlowText style={styles.time}>00:00:00</FlowText>
      </FlowRow>
    </FlowHighLightView>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    // height: 70,
    marginVertical: 10,
  },
  row: {
    justifyContent: "center",
  },
  time: {
    color: COLORS.brightGreen,
    marginTop: 4,
  },
});

/*flowHiglight adalah backgroudn dan besarnya greybackgroun otu 
 flow text adalah property utk styling text2/titlenya  

*/
