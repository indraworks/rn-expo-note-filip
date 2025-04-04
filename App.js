import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { ActivityHomeScreen } from "./src/screens/Home";
import { COLORS } from "./src/variables/styles";
import { useEffect, useState } from "react";
import { isAsyncStorageEnabled } from "./src/storage ";

export default function App() {
  const [isStorageEnabled, setIsStorageEnable] = useState(null);
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

  return (
    <SafeAreaView style={styles.saContainer}>
      <View style={styles.container}>
        {isStorageEnabled == null ? (
          <></>
        ) : (
          <ActivityHomeScreen isStorageEnabled={isStorageEnabled} />
        )}

        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  saContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
/*
pada app.js view kita hilangkan ganti 
denfan SafeAreaView mewakili batas2 nah saveAreaView tidak boleh berisi container
dia hanya ut batas safe paling luar saja kita beri flex:1 
dimana wraping component smua/view dibawahnya tumbuh sama2 besar! 
nah utk dibawah safeView kita buat View dimana kita akan buat 
COLOR yg mana sifatnya adalah global nah variable color ini dipakai utk smua 
unit di view dan compojent( global)

*/
