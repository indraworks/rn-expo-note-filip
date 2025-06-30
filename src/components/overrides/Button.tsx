import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { COLORS, SIZES } from "../../variables/styles";

//kita buat colir utk type yg akan masuk sbgai warna2
//"primary" = biru
//"danger" =  merah
//"warning"= orange
//utk masukan ...rest itu sisanya yg lain,
// atau mewakili kalaj ada fucntion atau param /variable yg masuk!

export const FlowButton = ({
  content: Content,
  text,
  ghost,
  disabled,
  type,
  style,
  size,
  ...rest
}) => {
  const webOnly = Platform.OS === "web" ? { userSelect: "none" } : {};
  const color =
    type === "primary"
      ? COLORS.normalGreen
      : type === "danger"
      ? COLORS.brightRed
      : type === "warning"
      ? COLORS.brightYellow
      : COLORS.brightBlue;

  const isGhost = ghost ?? false;
  const isDisabled = disabled ?? false;
  const _size = size ?? SIZES.fontSmall;

  //tanda ?? ini adalah utk check null dan undefined maka dia false!

  const buttonBg = isDisabled ? COLORS.semiDarkGray : color;
  const textColor = isGhost
    ? isDisabled
      ? COLORS.semiDarkGray
      : color
    : isDisabled
    ? COLORS.darkGray
    : COLORS.white;

  return (
    <ButtonContainer
      disabled={isDisabled}
      {...rest}
      style={{ ...style, ...webOnly }}
      isGhost={isGhost}
      backgroundColor={buttonBg}
    >
      {/* yg tadi text={} di itemCreate  kita ganti dgn content
        tinggal cek yg masuk apa jika type text dia masuk tulisan
        maka
        kmudian kita baut jsx disini utk check yg masuk adalah text atauy
        bukan sbnanryan kuta mengarahkan agar dia tetap jadi content sbb:
      */}
      {typeof Content === "string" ? (
        <ButtonText color={textColor} fontSize={_size}>
          {Content}
        </ButtonText>
      ) : (
        <Content size={_size} color={textColor} />
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.Pressable<{
  isGhost: boolean;
  backgroundColor: string;
}>`
  background-color: ${(p) => (p.isGhost ? "transparent" : p.backgroundColor)};
  padding: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text<{ color: string; fontSize: number }>`
  color: ${(p) => p.color};
  font-size: ${(p) => p.fontSize}px;
`;

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
