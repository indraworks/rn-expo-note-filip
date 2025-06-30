import { Modal, Platform, View } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "../../variables/styles";
import Constants from "expo-constants"; //ut tahu status aplikasi saat ini app platofro,devie,verion ,manifest data.Environtment
//variable  biasanya sdah default bersama expo

export const FlowModal = ({
  children,
  animationType,
  visible,
  bgColor,
  fullScreen,
}) => {
  const defaultBgColor = bgColor ?? COLORS.darkGray; //jika undefined atau null maka darGray
  const isFullScreen = fullScreen ?? false; //jika undefined atau null otomatis dia false
  //kita buat containerStyles utk supaya ada pilihan apakah fullscreen atau default(baisa ) utk modalnya
  const containerStyles = isFullScreen
    ? {
        backgroundColor: defaultBgColor,
        paddingTop: Constants.statusBarHeight + 30,
      }
    : {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      };

  //platform web atau tidak
  const webStyles =
    Platform.OS === "web"
      ? {
          //utk web kit apakai width:100%
          //maxWidth:500

          width: "100%",
          maxWidth: 500,
          margin: "auto",
        }
      : {};
  //webstyles,containerStyles jadi pros tambahan pada style modal

  return (
    <Modal animationType={animationType} transparent={true} visible={visible}>
      <ModalContainer style={{ ...containerStyles, ...webStyles }}>
        {/* utk background contentnya bisa kita tambahkan dari luar/props */}
        <ModalContent style={{ backgroundColor: defaultBgColor }}>
          {children}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.View`
  flex: 1;
`;

const ModalContent = styled.View`
  min-width: 350px;
  padding: 20px;
  border-radius: 10px;
`;

/*
ingat Modal bawaan component dalam React 
nah yg ada propertynya default utk atur adalah 
- onSHow,Visible,onRequestClose,transparent 
simodal punya layer transparent cover (z+1) layer dibawahnya (z) /layar utama sblumnya !
etc 
//2 kit akan bua tmodal fullScreen jadi nnt ada props masuk sini utk fullScreen 
tambahkan platform  utk besaran 500 krii kanan 

*/
