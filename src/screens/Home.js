import { FlatList, StyleSheet, View, Text } from "react-native";
import { ActivityTimer } from "../components/activity/Timer";
import { ActivityItem } from "../components/activity/Item";
//kita kasih alias defaulItems adalah data awal dari json kita !
import defaultItems from "../data/activities.json";

import { FlowRow, FlowText } from "../components/overrides";
import { useEffect, useRef, useState, useMemo } from "react";
import { loadDayFlowItems, storeDayFlowItems } from "../storage ";
import { usePrevious } from "../utils/Function";

export const ActivityHomeScreen = ({ isStorageEnabled }) => {
  const [activities, setActivities] = useState([]);

  //kita menset utk nilai detiki /tik dgn useRef
  const startTimeRef = useRef(0);

  //utk elapse timenya per 100ms
  const timeRef = useRef(0);
  //Ref utk timer berhenti
  const timeRequestRef = useRef(-1);

  //mmbuat funct activeitem  dgn useMEmo dimana prikasa state Activities berubah
  const activeItem = useMemo(() => {
    //cari yg lagi active statenya
    return activities?.find((a) => a.isActive);
  }, [activities]);

  //mendeclare prevous state ,activeItem dimasukan ke previous
  //jika nnti ada activeItem yg lain yg masuk kesini sbgai state yg mula2
  const preActiveItem = usePrevious(activeItem);

  useEffect(() => {
    //check load  function utk tahu apa ada activities sblumya
    const load = async () => {
      const items = await loadDayFlowItems();
      //jika items kosing/data null maka kita isi dgn default items ( data dari json kita)
      items ? setActivities(items) : setActivities(defaultItems);
    };

    //invoke function load tiap kali browser refresh
    load();
  }, []);

  useEffect(() => {
    //check apakah activeItem yg sekarang ini sama dgn yg sblumnya?
    //kita check dari id
    const isSameItem = activeItem && activeItem?.id === preActiveItem?.id;

    //check activeItem atau state activities berubah
    if (activeItem) {
      //jika activeItem != previousItem sblumya
      if (!isSameItem) {
        //startTimeRef.current = 0; aslinya startime dibuat zero
        //tapi pada timer di UI ini harus ada refernce yg sudah ada timernya!
        //jadi tiap2 item2 yg lain di ui digeserkanan maka dia akan ambil waktu yg udah
        //ada di storage di tambahkan !
        timeRef.current = activeItem.time;
        startTimeRef.current = new Date();
      }

      tick();
    } else {
      //timeRef di reset
      //jika sama!
      startTimeRef.current = 0;
      cancelAnimationFrame(timeRequestRef.current);
    }
    return () => {
      cancelAnimationFrame(timeRequestRef.current);
    };

    //perubahan useState ini dari activeItem y ebrubah
  }, [activeItem]);

  const tick = () => {
    //curentTIme yg sekarang
    const currentTime = Date.now();
    //ada waktu yg sekarang beda saat dgn yg awal saaat loaded component
    const timeDelta = currentTime - startTimeRef.current;
    //jika sudah 100ms maka kita ambil
    //time elapsetimenya
    if (timeDelta >= 100) {
      timeRef.current += timeDelta;
      console.log(timeRef.current);
      //kita reset acuan awaltimemnya
      startTimeRef.current = Date.now();
    }

    timeRequestRef.current = requestAnimationFrame(tick);
  };

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

/*
improve :
utk menghentikannya kita ahrus tahu previous state ,nah previouse State ini kan ada dimana ?
yg kita masukan di previous State adalah activeItem dimana dia jadi yg terdahulu 
nah nnti ktika kita mengaktifkan activestate yg baru nah ini check activieItem tsb Id nya sama apa gak?
dgn yg sekarang.
nah jika tidak sama maka  bla bla  jika sama maka bla bla sprti itu gambarannya ! 
kita buat di utils/function utk buat functon PreviousState !

*/

/*
KITA AKAN GUNAKAN useMemoize ketika diaman sbuah state itu berubah baru hook ini akan bekerja
sehingga gak kerender 2x ,ini supaya mengoptimasi kerja react dan ini juga butuh memori 
nah tujuannya adalah agar timer tsb akan hanya berkerja jika state activities berubah mis kita geser kanan 
( active) atau geser kiri (timer stop) 
 utk yg ini jika kita gerak ke kakan 1 item  maka activities kita check sttenya dan berubah maka timer jalan 
 dan jik digerakan keikiri yg barus saja item yg kita gerakan kekanan ,maka timer berhenti
 TETAPI jika suat item digerakan kekakanan dan item lain diatas atau dibawahnya girakan kekanan i
 timer yg sblumnya dari item lain tidak berHENTI nah masih ada masalah ini yg kita MESTI IMVPrOVE 


*/

/*
kita kaan bermain timer maka di home ini kita bikin tick function yaitu 
utk ambil detik dan ini 60 ketukan nah 
jadi untuk timer itu diambil tiap2 100ms nah nilai timer tsb adalah 
perbedaan selisih saat currentTIme  yang sekarang  yg dijalankan di Funct Tick 
dengan startTImeRef.current ( nilai awal ref sblm jalankan func tick)
timeDelta adalah selisih antara nilai awal - nilaiCurentTIme 
nah jika sudah 100ms maka startTimenya diupdate lagi 
dijelaskan oleh chat gpt utk catatan pada bab3 


*/
