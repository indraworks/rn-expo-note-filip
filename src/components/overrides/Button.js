import React from "react";
import { Pressable, Text, Platform } from "react-native";
import { COLORS } from "../../variables/styles";

//kita buat colir utk type yg akan masuk sbgai warna2
//"primary" = biru
//"danger" =  merah
//"warning"= orange
//utk masukan ...rest itu sisanya yg lain,
// atau mewakili kalaj ada fucntion atau param /variable yg masuk!

export const FlowButton = ({ text, ghost, type, ...rest }) => {
  const webOnly = Platform.OS === "web" ? { userSelect: "none" } : {};
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
    <Pressable {...rest} style={{ ...buttonStyle, ...webOnly }}>
      <Text style={{ ...textStyle }}>{text}</Text>
    </Pressable>
  );
};

/*
utk useSElect ini  props hanya supper utk web kita ubah itu code diatas utk webOnly saja!
 <Pressable {...rest} style={{ ...buttonStyle, userSelect: "none" }}>

jadi kita pakai platFOrmCheck :
import { Platform } from "react-native";

const webOnlyStyle = Platform.OS === "web" ? { userSelect: "none" } : {};

<Pressable
  {...rest}
  style={{ ...buttonStyle, ...webOnlyStyle }}


*/
