import React from "react";
import { StyleSheet } from "react-native";
import { FlowHighLightView, FlowRow, FlowText } from "../overrides";
import { COLORS } from "../../variables/styles";
import { formatTime } from "../../utils/Function";

export const ActivityTimer = ({ time, title }) => {
  return (
    <FlowHighLightView style={styles.timeContainer}>
      <FlowRow style={styles.row}>
        <FlowText> {title ? title : "No Activity"}</FlowText>
      </FlowRow>
      <FlowRow style={styles.row}>
        <FlowText style={{ ...styles.time, fontVariant: ["tabular-nums"] }}>
          {formatTime(time)}
        </FlowText>
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
