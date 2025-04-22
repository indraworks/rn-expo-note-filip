import React, { useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import {
  FlowButton,
  FlowHighLightView,
  FlowModal,
  FlowText,
} from "../overrides";
import { useState } from "react";
import { COLORS } from "../../variables/styles";
import { formatTime } from "../../utils/Function";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ConfirmationModal } from "../common/ConfirmationModal";

const ItemDetail = ({
  visible,
  focusedItem,
  onCloseDetail,
  time,
  onItemEdit,
  onItemDelete,
}) => {
  //props focusedItem dari Home bawa item yg ter-select / {...item} --sudah tidak ada digati sgn isItemVisible di parent(home)
  //const { showModal, setShowModal } = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  //sifocusedItem masuk kita tahu darimana ktika dia masuk dan ada isi?
  //dgn useEffect yaitu carikapan dia berubah nilainya! (sbgai variable pnannda pearubahab)
  useEffect(() => {
    if (focusedItem) {
      //isi title render dan decs render dari item/focusedItem
      setTitle(focusedItem.title || "");
      setDescription(focusedItem.description || "");
      setIsEditing(false);
    }
  }, [focusedItem]);

  const confirm = () => {
    //kita invoke itemEdit funct
    setIsEditing(true);
    onItemEdit({ ...focusedItem, title, description });
    setIsEditing(false);
  };
  const onConfirmFunc = () => {
    setShowPrompt(false);
    onItemDelete({ ...focusedItem });
  };

  return (
    <FlowModal
      fullScreen
      visible={visible}
      bgColor={COLORS.black}
      animationType={"fade"}
    >
      {/* disini pada FLowButton om filip buat style langsung jadi props 
            style={{}}
            aslinya bisa di itemDetaol kita buat macam styles = StyleSheet,create tapi om pilif tidak mau 
        */}
      <FlowButton
        //tombolback buat modal jadi invisble/hide
        // onPressIn={() => setShowModal(false)} <--ini sblumnya bermasalah diganti  state dari parent
        onPressIn={onCloseDetail} // optional chaining safety
        //invoke onCloseDetail jika props onCLoseDetail masuk
        style={styles.backButton}
        ghost
        type={"primary"}
        content={"Back"}
      />
      <FlowHighLightView>
        <View>
          <FlowText style={styles.timer}>
            {focusedItem?.isActive
              ? formatTime(time)
              : formatTime(focusedItem?.time)}
          </FlowText>
        </View>
        <View>
          {isEditing ? (
            <TextInput
              style={{ ...styles.title, ...styles.input }}
              value={title}
              onChangeText={setTitle}
              placeholder="Activity name.."
              placeholderTextColor={COLORS.semiDarkGray}
            />
          ) : (
            <FlowText style={styles.title}> {title}</FlowText>
          )}
        </View>
        <View>
          {isEditing ? (
            <TextInput
              style={{ ...styles.title, ...styles.multilineInput }}
              value={description}
              onChangeText={setDescription}
              placeholder="Info About Activity"
              placeholderTextColor={COLORS.semiDarkGray}
              //input dgn multiline ,propertynya sbb:
              multiline
              numberOfLines={4}
            />
          ) : (
            <FlowText>{description}</FlowText>
          )}
        </View>
        <View style={{ marginBottom: 20 }}></View>
        <View>
          {isEditing ? (
            <FlowButton
              onPressIn={confirm}
              ghost
              type={"primary"}
              content={"Confirm"}
            />
          ) : (
            <FlowButton
              onPressIn={() => setIsEditing(true)}
              ghost
              type={"primary"}
              content={"Edit"}
            />
          )}
        </View>
      </FlowHighLightView>
      {/* kita taru disini utk compinent dan masih false default showProm */}
      <ConfirmationModal
        visible={showPrompt}
        message={"Are you sure you want to delete this item? "}
        onConfirm={onConfirmFunc}
        onCancel={() => setShowPrompt(false)}
        //nginvoke function delete di home,js
      />

      <FlowButton
        //triger showPrompt = true shingga COnfirmationModal visible
        onPressIn={() => setShowPrompt(true)}
        type={"danger"}
        content={(props) => (
          //cara memasukan vector icon pada content pakai props
          <FontAwesome name="trash" color="black" {...props} />
        )}
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
    display: "flex",
    alignItems: "center",
  },
  timer: {
    color: COLORS.brightGreen,
    marginBottom: 10,
  },
  title: { fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: COLORS.semiDarkGray,
    borderRadius: 5,
    padding: 10,
    fontWeight: "500",
    color: COLORS.white,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
    color: COLORS.white,
  },
});

/*
utk itemDetail kita kerjakan yg sekaRANG adlah edit 
nah kita harus buat tambahaan  state utk apakah kondisi lagi diedit atau tidak 
statenya yaitu : isEditing,setIsEditing 

*/

/*
ada error setShowModal utk itu kita refactoring karena gagal 
jadi state ShowModal kita taruh di home (parent) 


*/
/*
ingat sifat modal di react native adalah nutup layer z+1 
jadi diatas nutup smua  utk content itu di atas modelnya ,jad
modal dimisalkan screen content adalah misal form dan input2nya besarany 
kita atur dgn style 

*/
