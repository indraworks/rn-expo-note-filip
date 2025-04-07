import React from "react";
import { Pressable, Text } from "react-native";
import { COLORS } from "../../variables/styles";

//kita buat colir utk type yg akan masuk sbgai warna2
//"primary" = biru
//"danger" =  merah
//"warning"= orange
//utk masukan ...rest itu sisanya yg lain,
// atau mewakili kalaj ada fucntion atau param /variable yg masuk!

export const FlowButton = ({ text, ghost, type, ...rest }) => {
  const color =
    type === "primary"
      ? COLORS.normalGreen
      : type === "danger"
      ? COLORS.brightRed
      : type === "warning"
      ? COLORS.brightYellow
      : COLORS.brightBlue;

  const isGhost = ghost || false;

  const buttonStyle = isGhost
    ? { backgroundColor: "transparent" }
    : {
        backgroundColor: color,
        padding: 10,
        borderRadius: 5,
      };

  const textStyle = isGhost
    ? //jamgan taruh color aja karena color adalah ibjec jadi harus {color} bukan color  aja!
      { color }
    : {
        color: COLORS.white,
      };

  return (
    <Pressable {...rest} style={{ ...buttonStyle, userSelect: "none" }}>
      <Text style={{ ...textStyle }}>{text}</Text>
    </Pressable>
  );
};
