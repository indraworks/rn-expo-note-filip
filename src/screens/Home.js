import { FlatList, StyleSheet, View, Text } from "react-native";
import { ActivityTimer } from "../components/activity/Timer";
import { ActivityItem } from "../components/activity/Item";
import data from "../data/activities.json";
import { COLORS } from "../variables/styles";
import { FlowText } from "../components/overrides";
import { useState } from "react";

export const ActivityHomeScreen = () => {
  const [values, setValues] = useState("");
  return (
    <View style={styles.screenContainer}>
      <ActivityTimer></ActivityTimer>

      <View style={styles.listHeading}>
        <FlowText style={styles.text}>Activities</FlowText>
        <FlowText style={styles.text}>Add</FlowText>
      </View>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ActivityItem title={item.title} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: "100%",
  },
  listHeading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.white,
    paddingHorizontal: 15,
  },
});

/*
kita akan buat list heding dgn flex jadi dibaawah timer ada 
2 button nntinya kiri kanan 
kit aberi nama utk wrap style listHeading


*/
