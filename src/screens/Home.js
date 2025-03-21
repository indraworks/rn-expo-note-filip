import { FlatList, StyleSheet, View, Text } from "react-native";
import { ActivityTimer } from "../components/activity/Timer";
import { ActivityItem } from "../components/activity/Item";
import defaultItems from "../data/activities.json";

import { FlowRow, FlowText } from "../components/overrides";
import { useEffect, useState } from "react";
import { loadDayFlowItems, storeDayFlowItems } from "../storage ";

export const ActivityHomeScreen = ({ isStorageEnabled }) => {
  //kita buat statenya  dan nnti state (dalam data yaitu isActivate) ini akan kita simpan
  //  di storage check dulu
  //kondisi state ada apa tidak
  const [activities, setActivities] = useState([]);
  //useEffect adalah func utk kita pakai render jika layar diperbarui
  //ini param isStrorageEnable hanya utk liatkan di log saja ASyncStorage kita sudah jalan
  //console.log(isStorageEnabled);
  useEffect(() => {
    //check load  function utk tahu apa ada activities sblumya
    const load = async () => {
      const items = await loadDayFlowItems();
      //jika items kosing/data null maka kita isi dgn default items
      items ? setActivities(items) : setActivities(defaultItems);
    };

    //invoke function load tiap kali browser refresh
    load();
  }, []);

  //stlah  biasa buat beda item kita store ke async storage
  const saveToStorage = (data) => {
    //jika enableStoragenya save data
    if (isStorageEnabled) {
      storeDayFlowItems(data);
    }
  };

  //buat function checkActivity
  //ingat kalau di js kita gak perlu buat interface
  //kita tambakan props isActive  agar nnti background item berubah jika geser kanan jadi patokan utk perubahanya
  const checkActivity = ({ id, state }) => {
    //nah utk activities kita harus cari idnya yg sama dgn param props yg masuk di param diatas

    //console.log(`changing ${id} to active state : ${state}`);
    setActivities((activities) => {
      const candidateIdx = activities.findIndex((a) => a.id === id);

      //jika item digeser kekanan
      if (candidateIdx > -1 && activities[candidateIdx].isActive != state) {
        //jika item id yg active sama dgn param id yg msauk maka kita update
        //state item tsb isActivenya,dan yg lainya kita kasih false jika tidak sama dgn item id-nya yg masuk
        const newActivities = activities.map((a) =>
          a.id === id ? { ...a, isActive: state } : { ...a, isActive: false }
        );
        //tampilkan di log item y active /isACtive=true
        // console.log(
        //   "state items saat ini=",
        //   JSON.stringify(newActivities.map((a) => a.isActive))
        // );

        //saveTOStorage :
        saveToStorage(newActivities);
        return newActivities;
      }
      return activities;
    });
  };

  return (
    <View style={styles.screenContainer}>
      <ActivityTimer></ActivityTimer>
      <FlowRow style={styles.listHeading}>
        <FlowText style={styles.text}>Activities</FlowText>
        <FlowText style={styles.text}>Add</FlowText>
      </FlowRow>
      <FlatList
        data={activities}
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
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
