import styled from "styled-components/native";
import { COLORS } from "../../variables/styles";

export const FlowText = styled.Text`
  color: ${COLORS.white};
`;
/*
maksud dibuat begini ...Style,text adalah agar  style bia di bebas di inputkan 
utk yg ..style  props dari parent
saja itu dari parent di inputkan stylenya dari parent makanya pakai ...style 
nah chidlren adalah prop utk compoennt anak! 
2 styles digabungkan dalam object sprti inipakemnya :
{...styles.text,...style}

styles.text adalah default
 utk ..style adalah props dari parent ( utk styling punya parent yg berubah)
*/
