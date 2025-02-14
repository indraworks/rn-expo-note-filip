import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { ActivityHomeScreen } from "./src/screens/Home";
import { COLORS } from "./src/variables/styles";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ActivityHomeScreen />
        <StatusBar style="auto" />
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
