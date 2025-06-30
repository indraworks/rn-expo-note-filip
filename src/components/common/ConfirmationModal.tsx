import { View, Text } from "react-native";
import React from "react";
import { FlowButton, FlowModal, FlowRow, FlowText } from "../overrides";

export const ConfirmationModal = ({
  visible,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <FlowModal visible={visible} animationType={"fade"}>
      <FlowText style={{ marginBottom: 10 }}>{message}</FlowText>
      <FlowRow style={{ justifyContent: "space-around" }}>
        {/* button utk cinfime = yes */}
        <FlowButton
          ghost
          type={"danger"}
          content={"Confirm"}
          onPressIn={onConfirm}
        />
        {/* button utk cancel = yes */}
        <FlowButton
          ghost
          type={"primary"}
          content={"Cancel"}
          onPressIn={onCancel}
        />
      </FlowRow>
    </FlowModal>
  );
};
