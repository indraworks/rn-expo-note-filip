import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { ActivityHomeScreen } from "./src/screens/Home";
import { COLORS } from "./src/variables/styles";
import { useEffect, useState } from "react";
import { isAsyncStorageEnabled } from "./src/storage ";
import { TutorialScreen } from "./src/screens/Tutorial";

export default function App() {
  const [isStorageEnabled, setIsStorageEnable] = useState<boolean | null>(null);
  //awal mula check di async sudah enable atau blum dgn buat setItem dan getItem test
  useEffect(() => {
    const checkStorage = async () => {
      //jika isEnabledTrue maka  setisStorageEnable state diatas jadi true
      //dan masukan nnti sbgai param   di component <ActivityHomeScreen!
      const isEnabled = await isAsyncStorageEnabled();
      console.log("isEnabled =", isEnabled);
      setIsStorageEnable(isEnabled);
    };
    checkStorage();
  }, []);

  const containerStyle =
    Platform.OS === "web"
      ? {
          maxWidth: 500, //dibatasi sampa 500 sisi kanan-kiri utk web platform!
          margin: "auto",
        }
      : {};

  return (
    <SafeContainer>
      <Container style={containerStyle}>
        {isStorageEnabled == null ? (
          <></>
        ) : (
          <>
            <TutorialScreen visible={true} />
            <ActivityHomeScreen isStorageEnabled={isStorageEnabled} />
          </>
        )}

        <StatusBar style="light" />
      </Container>
    </SafeContainer>
  );
}

const SafeContainer = styled.SafeAreaView`
  width: 100%;
  flex: 1;
  background-color: ${COLORS.black};
`;

const Container = styled.View`
  width: 100%;
  flex: 1;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

/*
di app js kit amasuka tutorial screen dimana  kita kasuh tahu pemakai 
nah ditutorialscreen kita buat sbb:
utk urutan 1 adalah step1  activkan item 
                    setep2 deactive item 
                    seteo3 kita menuju ke itemDetail
nah step2 in kita masukan dalam state 

*/

/*
pada app.js view kita hilangkan ganti 
denfan SafeAreaView mewakili batas2 nah saveAreaView tidak boleh berisi container
dia hanya ut batas safe paling luar saja kita beri flex:1 
dimana wraping component smua/view dibawahnya tumbuh sama2 besar! 
nah utk dibawah safeView kita buat View dimana kita akan buat 
COLOR yg mana sifatnya adalah global nah variable color ini dipakai utk smua 
unit di view dan compojent( global)

*/
