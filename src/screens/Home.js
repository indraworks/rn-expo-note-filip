import { FlatList, StyleSheet, View, Text, Platform } from "react-native";
import { ActivityTimer } from "../components/activity/Timer";
import { ActivityItem } from "../components/activity/Item";
//kita kasih alias defaulItems adalah data awal dari json kita !
import defaultItems from "../data/activities.json";

import { FlowButton, FlowRow, FlowText } from "../components/overrides";
import { useEffect, useRef, useState, useMemo } from "react";
import { loadDayFlowItems, storeDayFlowItems } from "../storage ";
import { usePrevious } from "../utils/Function";
import { ItemCreate } from "../components/activity/ItemCreate";
import { COLORS } from "../variables/styles";
import { MaterialIcons } from "@expo/vector-icons";
import ItemDetail from "../components/activity/ItemDetail";

export const ActivityHomeScreen = ({ isStorageEnabled }) => {
  const [activities, setActivities] = useState([]);
  //focusedItem state yg tampung utk trima nilai {...item_ yg diselect disalahsatu ACtivityItem}
  const [focusedItem, setFocusedItem] = useState(null);

  //ini state dibawah adalah utk show on /off visible modal
  const [showItemCreate, setShowItemCreate] = useState(false);
  //state utk scrollEnabled
  const [scrollEnabled, setScrollEnabled] = useState(true);

  //make state time !
  const [time, setTime] = useState(0);

  //kita menset utk nilai detiki /tik dgn useRef
  const startTimeRef = useRef(0);

  //utk elapse timenya per 100ms
  const timeRef = useRef(0);
  //Ref utk timer berhenti
  const timeRequestRef = useRef(null);

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
    const save = () => {
      setActivities((activities) => {
        updateTimeOnActiveItem(activities);
        saveToStorage(activities);
        return activities;
      });
    };
    if (Platform.OS === "web") {
      //jika platform web
      window.addEventListener("beforeunload", save);
      return () => {
        window.removeEventListener("beforeunload", save);
      };
    } else {
      //jika pakai mobile pakai atau ditriger dari APpstate prubahan utk mlihat
      //prubahan refresh pada layar dan kita jalankan func save nya !
      const handleAppStateChange = (appState) => {
        if (appState === "background" || appState === "inactive") {
          save();
        }
        const sub = appState.addEventListener("change", handleAppStateChange);
        return () => {
          sub.remove();
        };
      };
    }
  }, []);

  useEffect(() => {
    const isSameItem = activeItem && activeItem?.id === preActiveItem?.id;

    if (activeItem) {
      if (!isSameItem) {
        timeRef.current = activeItem.time;
        startTimeRef.current = new Date();
      }
      tick();
    } else {
      timeRef.current = 0;
      setTime(0);
      if (timeRequestRef.current != null && timeRequestRef.current !== -1) {
        cancelAnimationFrame(timeRequestRef.current);
      }
    }

    return () => {
      if (timeRequestRef.current != null && timeRequestRef.current !== -1) {
        cancelAnimationFrame(timeRequestRef.current);
      }
    };
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

  //mmbuat useEfect utk reseting web dan sblum tereset kita udah save duluan
  //jadi efect flash gak berlaku jadi tetap tampil gak o tapi angka trakhir tetap ada

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

  //kita masukan addItem function sbgai param yg masuk ke props
  //di anak compoennt itemCreate
  const addItem = (newItem) => {
    setActivities((activities) => {
      const newActivities = [...activities, newItem];
      //kita masukan variable dan kita save to storage
      //dan return  variablenya
      saveToStorage(newActivities);
      return newActivities;
    });
  };

  return (
    <View style={styles.screenContainer}>
      <ItemDetail
        focusedItem={focusedItem}
        //ini dumaksudkan waktu render ItemDetail dari Home.js isi dari focusedItem berisi null
        //jadi bukan undefined
        onCloseDetail={() => setFocusedItem(null)}
      />

      <ItemCreate
        visible={showItemCreate}
        //addItem fucnton dari parent masik ke anak ItemCreate
        //nama props yg masukan adalah onCOnfirm maka kita nnti invoke ini
        //function jadi onCOnfirm() ddalam component anak!
        onConfirm={addItem}
        onClose={() => setShowItemCreate(false)}
      />
      <ActivityTimer time={time} title={activeItem?.title} />
      <FlowRow style={styles.listHeading}>
        <FlowText style={styles.text}>Activities</FlowText>
        {/* <FlowText style={styles.text}>Add</FlowText> */}
        <FlowButton
          ghost
          type="primary"
          onPressIn={() => setShowItemCreate(true)}
          //text={"add"}  //ini kia ganti dgn content
          content={(props) => <MaterialIcons name="playlist-add" {...props} />}
        />
      </FlowRow>
      <FlatList
        //nama staenya nya sama dgn anama prperty
        scrollEnabled={scrollEnabled}
        data={activities}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          //checkActivity bersi return dari activities yg current/saat ini
          <ActivityItem
            {...item}
            onActivityChange={checkActivity}
            onSwipeStart={() => setScrollEnabled(false)}
            onSwipeEnd={() => setScrollEnabled(true)}
            //jadi kita akan masukan ini doubleClick funciton sbgai props yg mana
            //functuon in adalah mensetFocusItem berisi  {..item} atau data activyItem dari storage
            //masuk kecomponent ItemDetail.js
            /*
               <ItemDetail  focusedItem={focusedItem}  />

            */
            onDoubleClick={() => setFocusedItem({ ...item })} //ini focusedItem ada nilainy ayaitu object item yg saat ini diseelct
          />
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
setelah ini kita akah buat detail page item jadi ,ktika kita klik aatau double klik item maka aka
ada page baru nah kita juga buat modela di page baru ini 
nah modalnya kita bau fullscreen -->utk dipakai pada  page ItemDetail,js 
nah fullScreen merupakan props jika dipakai atau tidak tergantunf dari  props isFullScreen yg ada di 
flowModal atau Modal.js 


*/

/*
Cegah waktu kita geser itemActivity kekanan maka 
nah dibagian item.js kita tambahkan props ( onSwipStarr dan on SwipeENd
waktu swipeSatart maka scroll gak buleh active)

nah waktu swipeEnd maka scroll boleh activ jadi gak gnaggu kita gerak kiri dan kanan
kit amakai isSWipping default false 
nah di Home,.js kita buat state enabledSrolled,setEnableSCro;;

onSwipeStart={() => setScrollEnabled(false)}
onSwipeEnd={() => setScrollEnabled(true)}
ini funtion jadi props masuk ke item.js
NAH di FlatList ada proeprty enableScrolled nah kalau dia true maak dia scroll jalan kebawah 
tapi kalau dia false dia frezee ini yg kita mainkan di HOME.js !

nah kita tambahkan ja di  activityItem tsb  fcution masuk 
lwat props onSwipeStart yg isinya scroll Flatlis didisable 
             onSwipeEnd yg isinya scroll Flatlis denabled 
*/

/*
menggunakan expo vector icons :
@expo/vector-icons
https://icons.expo.fyi/Index

search yg mau dipakai dan dowuble klick nnti mis additem list 
nnti dia akan muncul ke halaman baru  
nnti kita import :
import AntDesign from '@expo/vector-icons/AntDesign';

2) baru pas render di jsx ( didalam kalang return)
<AntDesign name="addfile" size={24} color="black" />
pertama2 yg diflow button tadi kan ada text={"add"}
yg text ini kita ganti nama content aja props ini 
dan yg {"add"} kita ganti dgn <AntDesign name="addfile" size={24} color="black" />

*/

/*
     HUKUM REACT parent compoment -->anak compoent jika 
     yg pasing adalah function masuk ke anak com[onent pake props 
     
     septi ini utk closenya : jadi functiuon  onCLose masuk ke ItemCreate functuon 
   nah function tsn yg masuk nerisi state yg diset utk false dan state nya ada di parent!
   nah di itemCteate compoentnya ini pada fucntuon cancel tinggal invoke saja!
   onClose() ini artinya si onClose functuon dipamggil dihiudpkan ! 

    <ItemCreate
        visible={showItemCreate}
        onClose={() => setShowItemCreate(false)}
      />
   JADI HUKUM YG BERLAKU DI REACT ADALAH : jika ada state dideclare di parent component
    dan dia masuk lewat "function" ke dalam anak component
   maka di anak component masuk tadi maka INVOKENYA ada di anak component!
   nah function tadi diinvoke dgn panggil propsnya yg masuk keanak compoennt tadi 
   mis propnya adalah onClose-->maka invoke dgn cara onClose()  ====>yaitu kasih tanda kurung!
     


   */

/*
Modal,
jadi kita akan buat modal kita ketahui modal adalah 
sbuah screen yg muncul di z+1 pada layar nah jika ada modal maka
component ini akan menutp penuh layar dan ada closing  dan juga ada property 
visible = true utk event dia  muncul dan tuutp layar /.covering di z+1 
nah syiling modal kita pakai view sbgai container 
dan nnti view ke-2 sbgai content dimana nnti content ada tulisan2 pesan kita 
atau inputan pilihan dll!
jadi modal muncil nnti jika kita klick tombol add ,sehingga nnti ada pilihan 
utk input box pada content modal! 


*/

/*
pada saat reset di web dia akan sllau jadi nol 
utk versi web maka kita harus buat useEffect dan buat agar 
perhitungan masih tersimpan jika terjadi refresh


*/

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
