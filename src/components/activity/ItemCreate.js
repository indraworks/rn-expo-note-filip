import { TextInput, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../variables/styles";
import { FlowModal, FlowText, FlowRow, FlowButton } from "../overrides";
import { useState } from "react";
import { generateRandomId } from "../../utils/Function";

export const ItemCreate = () => {
  //buat state newItem
  const [newItem, setNewItem] = useState({
    title: "",
    id: "",
    isActivate: false,
    time: 0,
  });
  const cancel = () => {
    console.log("Cancel!");
  };
  const isError = newItem.title === String("");
  //nilai isError adalah jika ada string kosong!
  //nah jika string kosong terjadi maka disable itu btton!

  const confirm = () => {
    const _newItem = { ...newItem, id: generateRandomId() };
    console.log(_newItem);
  };
  return (
    <FlowModal
      visible={true}
      animationType={"fade"}
      bgColor={COLORS.semiDarkGray}
    >
      <FlowText>Choose Name of The Activity</FlowText>
      <TextInput
        onChangeText={(title) => setNewItem({ ...newItem, title })}
        style={styles.input}
        placeholder="Learn Python"
        placeholderTextColor={COLORS.semiDarkGray}
      />
      <FlowRow style={styles.space}>
        <FlowButton
          disabled={isError}
          ghost
          type="primary"
          text={"Confirm"}
          onPress={confirm}
        />
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
mmbuat newItem pada saat kita masukan di input nah utk itu ada functuon builtin di input 
namanya OnChangeText dimana terima ,masukan nah masukan ini di masukan ke variable state 
yaitu newItem ,jadi kita buat statenya  neItem,setNewItem = { ..bla ..bla }
nah utk id kita bisa generated functuon ID randoom 

*/

/*
Pada Item Create kita buat  input dalam modal dan tombol confirm dan yes dibawahnya 
 nah utk button kita akan buat re-usable button yg mana bisa di pakai di berbagai tempat
 compooentn2 lain yg mmbuuthkan yg diatas kita pakai presable dan presable ini 
 masuk di compoentn re-usable button  yg mana berupa functuon berupa props2 yg nnti dimasukan 
 property2 button tsb ktika dipanggil dan style sesuai kebutuhannya 

*/
