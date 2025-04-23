import { Modal, Platform, StyleSheet, View } from "react-native";
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
      <View
        style={{ ...styles.modalContainer, ...containerStyles, ...webStyles }}
      >
        {/* utk background contentnya bisa kita tambahkan dari luar/props */}
        <View
          style={{
            ...styles.modalContent,
            backgroundColor: defaultBgColor,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    minWidth: 350,
    padding: 20,
    borderRadius: 10,
  },
});

/*
ingat Modal bawaan component dalam React 
nah yg ada propertynya default utk atur adalah 
- onSHow,Visible,onRequestClose,transparent 
simodal punya layer transparent cover (z+1) layer dibawahnya (z) /layar utama sblumnya !
etc 
//2 kit akan bua tmodal fullScreen jadi nnt ada props masuk sini utk fullScreen 
tambahkan platform  utk besaran 500 krii kanan 

*/
