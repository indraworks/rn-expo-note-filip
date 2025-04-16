import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  FlowButton,
  FlowHighLightView,
  FlowModal,
  FlowText,
} from "../overrides";
import { useState } from "react";
import { COLORS } from "../../variables/styles";
import { formatTime } from "../../utils/Function";

const ItemDetail = ({ focusedItem }) => {
  //props focusedItem dari Home bawa item yg ter-select / {...item}
  const { showModal, setShowModal } = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //sifocusedItem masuk kita tahu darimana ktika dia masuk dan ada isi?
  //dgn useEffect yaitu carikapan dia berubah nilainya! (sbgai variable pnannda pearubahab)
  useEffect(() => {
    if (focusedItem) {
      //show Modal
      setShowModal(true);
      //isi title render dan decs render dari item/focusedItem
      setTitle(focusedItem.title);
      setDescription(focusedItem.description);
    }
  }, [focusedItem]);

  return (
    <FlowModal
      fullScreen
      visible={showModal}
      bgColor={COLORS.black}
      animationType={"fade"}
    >
      {/* disini pada FLowButton om filip buat style langsung jadi props 
            style={{}}
            aslinya bisa di itemDetaol kita buat macam styles = StyleSheet,create tapi om pilif tidak mau 
        */}
      <FlowButton
        //tombolback buat modal jadi invisble/hide
        onPressIn={() => setShowModal(false)}
        style={styles.backButton}
        ghost
        type={"primary"}
        content={"Back"}
      />
      <FlowHighLightView>
        <View>
          <FlowText style={styles.timer}>
            {formatTime(focusedItem?.time)}
          </FlowText>
        </View>
        <View>
          <FlowText style={styles.title}> {title}</FlowText>
        </View>
        <View>
          <FlowText>{description}</FlowText>
        </View>
        <View style={{ marginBottom: 20 }}></View>
        <View>
          <FlowButton ghost type={"primary"} content={"Edit"} />
        </View>
      </FlowHighLightView>
      <FlowButton
        type={"danger"}
        content={"Delete"}
        style={styles.deleteButton}
      />
    </FlowModal>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 20,
  },
  deleteButton: {
    marginTop: 10,
  },
  timer: {
    color: COLORS.brightGreen,
    marginBottom: 10,
  },
  title: { fontWeight: "bold" },
});

/*
ingat sifat modal di react native adalah nutup layer z+1 
jadi diatas nutup smua  utk content itu di atas modelnya ,jad
modal dimisalkan screen content adalah misal form dan input2nya besarany 
kita atur dgn style 

*/
