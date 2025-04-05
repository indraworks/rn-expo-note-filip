import { Modal, StyleSheet, View } from "react-native";
import { COLORS } from "../../variables/styles";

export const FlowModal = ({ children, animationType, visible, bgColor }) => {
  const defaultBgColor = bgColor || COLORS.darkGray;
  return (
    <Modal animationType={animationType} transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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


*/
