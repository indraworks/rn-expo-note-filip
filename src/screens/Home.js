import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ActivityItem } from "../components/Item";
import { ActivityTimer } from "../components/Timer";
import data from "../data/activities.json";

const Home = () => {
  return (
    <View style={styles.container}>
      <ActivityTimer></ActivityTimer>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ActivityItem title={item.title} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Home;

/*
sekarang kita pakai flatlist flatlist ambil data nah data dalam 
bentuk object dan object tb trsusun dalam array2 
kita tampilkan satu persatu tetapi tuk menampilkan dalam bntuk2 
sesuai harapan kita pakai component 

kita pakai flatlist utk data = data kita ambil data tsb
key extractor maksudnya yg uniq index dari arary utk dipakai  
kita pakai id nah dgn {id} kit aconstuctor dari data.id 

renderItem adalah vraible item yg mau dirender ,iten disini ada;aj 
argument sebarang nama yg mewakili data ,
nah ini kita pasing ke component Activity item supaya tampil ,
jadi title =  ,ini dalah props pada component /functional activityItem atau arugmentnya 
yg masuk dan ditampilkjan sesuai property yg diset pada component/function dari activityItem
<activityItem title= {item.ttile} 
jad maksudnya kita hanya tampilkan field title saja 
sbb data json:
[{
      "id": "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      "title": "First Item",
      "description": "This is a short description of the task",
      "isActive": false,
      "time": 0
    },
  ....
]
*/
