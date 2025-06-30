import React, { useEffect } from "react";
import { View, TextInput } from "react-native";
import styled from "styled-components/native";
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
      <BackButton
        onPressIn={onCloseDetail}
        ghost
        type={"primary"}
        content={"Back"}
      />
      <FlowHighLightView>
        <View>
          <TimerText>
            {focusedItem?.isActive
              ? formatTime(time)
              : formatTime(focusedItem?.time)}
          </TimerText>
        </View>
        <View>
          {isEditing ? (
            <InputField
              value={title}
              onChangeText={setTitle}
              placeholder="Activity name.."
              placeholderTextColor={COLORS.semiDarkGray}
            />
          ) : (
            <TitleText> {title}</TitleText>
          )}
        </View>
        <View>
          {isEditing ? (
            <MultilineInput
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

      <DeleteButton
        onPressIn={() => setShowPrompt(true)}
        type={"danger"}
        content={(props) => (
          <FontAwesome name="trash" color="black" {...props} />
        )}
      />
    </FlowModal>
  );
};

export default ItemDetail;

const BackButton = styled(FlowButton)`
  margin-bottom: 20px;
`;

const DeleteButton = styled(FlowButton)`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const TimerText = styled(FlowText)`
  color: ${COLORS.brightGreen};
  margin-bottom: 10px;
`;

const TitleText = styled(FlowText)`
  font-weight: bold;
`;

const InputField = styled.TextInput`
  border-width: 1px;
  border-color: ${COLORS.semiDarkGray};
  border-radius: 5px;
  padding: 10px;
  font-weight: 500;
  color: ${COLORS.white};
`;

const MultilineInput = styled(InputField)`
  height: 100px;
  text-align-vertical: top;
`;

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
