import React from "react";
import { View } from "react-native";
import { ActivityItem } from "../components/Item";
import { ActivityTimer } from "../components/Timer";

const Home = () => {
  return (
    <View>
      <ActivityTimer></ActivityTimer>
      <ActivityItem></ActivityItem>
      <ActivityItem></ActivityItem>
      <ActivityItem></ActivityItem>
    </View>
  );
};

export default Home;
