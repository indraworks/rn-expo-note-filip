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
  //make state time !
  const [time, setTime] = useState(0);

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
      //update state time base timeRef.current dan masukan nnti display
      setTime(timeRef.current);

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

  //buat updateTimeOnActiveItem(activities) utk selalu update

  const updateTimeOnActiveItem = (activities) => {
    //cari id (index) activities yg saat ini active
    const activeIdx = activities.findIndex((a) => a.isActive);
    if (activeIdx > -1) {
      //isi field waktunya dgn update current ref /waktu sekarang/trkahir
      activities[activeIdx].time = timeRef.current;
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

      //jika item digeser kekanan dan jika yg geser kekanan juga ada yg baru
      //jadi kita lagi geser kekakan sudah jalan
      //kita langsung lakukan geser kanan item lain!
      if (candidateIdx > -1 && activities[candidateIdx].isActive != state) {
        //kita update waktunya yg ada taruh di acctivities yg sblumnya yg saat ini terhenti
        updateTimeOnActiveItem(activities);
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
      <ActivityTimer time={time} />
      <FlowRow style={styles.listHeading}>
        <FlowText style={styles.text}>Activities</FlowText>
        <FlowText style={styles.text}>Add</FlowText>
      </FlowRow>
      <FlatList
        data={activities}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          //checkActivity bersi return dari activities yg current/saat ini
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
tampilan dan penambahan waktu pada tampilan 
jadi stiap waktu (timer) maka jika kita gerakan kekakann maka dia akan gerak waktu berdetak tambah 
nah ktika kita geser activity item yg lain kekakanan maka yg tertulis ada timer dari activity yg baru 
nah yg lama terakhir tadi dsimpan distorage 
nah ktika kita geser kekanan lagi item yg terdahulu maka otomatis waktu akan tambah pada dispaly 
yg tadi tersimpan ( tidak mulai dar nol lagi)
maka dari itu kita buat function : updateTimeOnActiveItem(activities)
utk masukan activitis yg lagi running  saat ini ! 

*/

/*
timer dispalya ;
dari sini kita buat function yg ubah milisecond ke format hh:mm:ss dan sudah kita buat 
nah kita akan juga buat state utk time tsb  diatas! state time tsb jadi props masuk ke <TImerActivity time={time}/>


*/

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
