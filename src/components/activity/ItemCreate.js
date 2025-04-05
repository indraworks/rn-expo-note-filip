import { TextInput, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../variables/styles";
import { FlowModal, FlowText, FlowRow } from "../overrides";

export const ItemCreate = () => {
  const cancel = () => {
    console.log("Cancel!");
  };
  const confirm = () => {
    console.log("Confirm!");
  };
  return (
    <FlowModal
      visible={true}
      animationType={"fade"}
      bgColor={COLORS.semiDarkGray}
    >
      <FlowText>Choose Name of The Activity</FlowText>
      <TextInput
        style={styles.input}
        placeholder="Learn Python"
        placeholderTextColor={COLORS.semiDarkGray}
      />
      <FlowRow style={styles.space}>
        <Pressable onPress={confirm}>
          <FlowText>Confirm</FlowText>
        </Pressable>

        <Pressable onPress={cancel} style={{ marginLeft: 15 }}>
          <FlowText>Cancel</FlowText>
        </Pressable>
      </FlowRow>
    </FlowModal>
  );
};

const styles = StyleSheet.create({
  input: {
    color: COLORS.white,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: COLORS.brightBlue,
    borderRadius: 5,
    marginVertical: 10,
  },
  space: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
/*
Pada Item Create kita buat  input dalam modal dan tombol confirm dan yes dibawahnya 
 

*/
