import { FlatList, StyleSheet, View, Text } from "react-native";
import { ActivityTimer } from "../components/activity/Timer";
import { ActivityItem } from "../components/activity/Item";
import data from "../data/activities.json";
import { COLORS } from "../variables/styles";
import { FlowText } from "../components/overrides";
import { useState } from "react";

export const ActivityHomeScreen = () => {
  //buat function checkActivity
  //ingat kalau di js kita gak perlu buat interface
  const checkActivity = ({ id, state }) => {
    console.log(`changing ${id} to active state : ${state}`);
  };

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
        renderItem={({ item }) => (
          <ActivityItem {...item} onActivityChange={checkActivity} />
        )}
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
catatan :utk data parameter kita masukan ke component <activittItem  /> dalam hal ini adalah item 
yg mewakili represntasi data tsb shingga nnti bisa jadi item.id item.name dll pada saat berada
di anak component! 
<ActivityItem title={item.title} />}
kita ganti menjadi <ActivitiItem {...item} />

nah pada activity item.ts 
yaitu functuon paramnya disini langsung kita pecah /destryct ...utem param dari Home.js tsb 
yaitu :
const ActivityItem =({title,id,isActivity,time,onActivityChange }) 
sprti kita tahu kalau geser kanan maka nnti kita activkan state /isActivite adalah true 
yg geser kiri kita adikan state = false 
sbb: 
 if (currentX > TRESHOLD) {
          onActivityChange(state:true)
        }

        if (currentX < TRESHOLD) {
          onActivityChange(state:false)
        }


*/

/*
kita akan buat list heding dgn flex jadi dibaawah timer ada 
2 button nntinya kiri kanan 
kit aberi nama utk wrap style listHeading


*/
