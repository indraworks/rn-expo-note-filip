import React from "react";
import styled from "styled-components/native";
import { FlowHighLightView, FlowRow, FlowText } from "../overrides";
import { COLORS } from "../../variables/styles";
import { formatTime } from "../../utils/Function";

export const ActivityTimer = ({ time, title }) => {
  return (
    <StyledContainer>
      <CenteredRow>
        <FlowText> {title ? title : "No Activity"}</FlowText>
      </CenteredRow>
      <CenteredRow>
        <TimeText style={{ fontVariant: ["tabular-nums"] }}>
          {formatTime(time)}
        </TimeText>
      </CenteredRow>
    </StyledContainer>
  );
};

const StyledContainer = styled(FlowHighLightView)`
  margin-vertical: 10px;
`;

const CenteredRow = styled(FlowRow)`
  justify-content: center;
`;

const TimeText = styled(FlowText)`
  color: ${COLORS.brightGreen};
  margin-top: 4px;
`;

/*flowHiglight adalah backgroudn dan besarnya greybackgroun otu 
 flow text adalah property utk styling text2/titlenya  

*/
