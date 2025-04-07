import { TextInput, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../variables/styles";
import { FlowModal, FlowText, FlowRow, FlowButton } from "../overrides";

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
        <FlowButton ghost type="primary" text={"Confirm"} onPress={confirm} />
        <FlowButton ghost type="danger" text={"Cancel"} onPress={cancel} />
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
    justifyContent: "space-around",
  },
});
/*
Pada Item Create kita buat  input dalam modal dan tombol confirm dan yes dibawahnya 
 nah utk button kita akan buat re-usable button yg mana bisa di pakai di berbagai tempat
 compooentn2 lain yg mmbuuthkan yg diatas kita pakai presable dan presable ini 
 masuk di compoentn re-usable button  yg mana berupa functuon berupa props2 yg nnti dimasukan 
 property2 button tsb ktika dipanggil dan style sesuai kebutuhannya 

*/
