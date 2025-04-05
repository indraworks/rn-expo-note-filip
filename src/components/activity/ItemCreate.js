import { COLORS } from "../../variables/styles";
import { FlowModal, FlowText } from "../overrides";

export const ItemCreate = () => {
  return (
    <FlowModal
      visible={true}
      animationType={"fade"}
      bgColor={COLORS.semiDarkGray}
    >
      <FlowText>Hi There,!</FlowText>
    </FlowModal>
  );
};
