import React, { useRef } from "react";
import { Animated, PanResponder, Platform, StyleSheet } from "react-native";
import { COLORS } from "../../variables/styles";
import { FlowText, FlowHighLightView, FlowRow } from "../overrides";
import LoadingDots from "../common/LoadingDots";
import { formatTime } from "../../utils/Function";

const TRESHOLD = 60;
const TAP_DELAY = 350;

//activityItem adalah item pada home pada list
export const ActivityItem = ({
  title,
  onActivityChange,
  id,
  isActive,
  time,
  onSwipeStart,
  onSwipeEnd,
  onDoubleClick,
  controls, //kita defaultnya adalah false
}) => {
  const pan = useRef(new Animated.ValueXY()).current; //menetapkan ref animasi daam variable pan
  //dimana utk tentukan arah x ,arah y waktu move!

  //isSwiping diatruh di ref useRef biar gak re-render
  const isSwipping = useRef(false);
  const lastPressTimeRef = useRef(0);
  const canControl = controls ?? true;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, //create triger function respon start
      // ini func utk start jika ada element di klik etc
      //dibagian move fucnt kita masukan arg event,gesture
      //utk param event dan gesture ,gesture ini meraba kedudukan2 movement
      //spanjang x atau y dgn variable dx atau dy
      //sedangkan utk evernt dia meraba apa yg jadikan suatu action agar pindah
      onPanResponderMove: (event, gestureState) => {
        //kita bisa gunakan console.log utk check pada saat di move kekanan kekiri nilai2 dx!
        //jadi kita diatas buat const tresheold  const TRESHOLD =60 kira2 saja
        //console.log(gestureState.dx); //ini kita comment saja
        //nah kita buat if utk jka  dx > trheshold yaitu geset kanan maka timer akan active
        //jika digeset kekiiri maka timer akan berhenti
        const currentX = gestureState.dx;
        if (currentX > TRESHOLD) {
          //console.log("ACTIVATE TIMER"); kita ganti dgn props
          onActivityChange({ id, state: true }); //kita pakai props kita panggil function checkActivity
        }

        //pake Math.abs ini ktika geser kekanan,mentok! matikan scrollnya !
        //dan ktika pan-nya direalse abru scroll di hifupkan!
        //treshold > 90 dan !isSwipping = true
        //kmudia is isSwiping.curent  jadi true
        //dan onSwipStart

        if (currentX < -TRESHOLD) {
          //console.log("DE-ACTIVATE TIMER");
          onActivityChange({ id, state: false }); //kita pakai props kita panggil function checkActivity
        }

        if (Math.abs(currentX) > TRESHOLD && !isSwipping.current) {
          isSwipping.current = true;
          onSwipeStart();
        }

        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(event, gestureState);
      },
      onPanResponderTerminationRequest: () => false,

      //ini func utk waktu releasse stalh drag drop
      onPanResponderRelease: () => {
        //ktika kita keswipe ke kiri maka kita release
        //nah isSwipingEnd func kita invoke dan scrolled enabdle kembali
        isSwipping.current = false;
        onSwipeEnd();

        //pan.extractOffset;
        //utk relesae ke posisi reset maka dibutuhkan animated.spring func
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  //kita buat disini utk background dimana akan brubah jika isACtive true !
  const itemBackground = isActive
    ? { backgroundColor: COLORS.semiDarkGray }
    : { backgroundColor: COLORS.darkGray };

  //buat function hadnlePress yang ada  dalam Animated.View
  ////kita buat habdlePress ukt handle doubleCLick timer digunakan utk deteksi jarak
  //press  1 dan press-ke-2

  const handlePress = () => {
    const currentTime = new Date().getTime();
    const isDoubleClick = currentTime - lastPressTimeRef.current <= TAP_DELAY;
    //jika <= 350ms
    if (isDoubleClick) {
      //invoke functuon di parent/home yg isinya setFocusedItem({...item})
      console.log("DOUBLE");
      onDoubleClick();
    } else {
      //update waktu lastPrefTIme dgn currentTIme saat ini
      //agar nnti waktu berjalam ini yg jadi patokan pengurang!
      lastPressTimeRef.current = currentTime;
    }
  };
  //update panRespinder.panHandlers  lewat props canControl
  //jika control bernilai false maka panResponder.panHandlers active
  const handlers = canControl ? panResponder.panHandlers : null;

  return (
    //wajib bungkus dngn animated view
    //kita masukan variable /propsnya panResponderke Animated.View compoenent>
    <Animated.View
      onPointerDown={handlePress}
      onTouchStart={() => {
        if (Platform.OS !== "web") handlePress();
      }}
      //nah geser2 dari Active iten ini ditentukan oleh function panResponde.panHandler
      //jadi diatas panResponder dicreate object berisi nilai
      //dan method panHandlers lah yg buat dia megarahkan ke titk2 mana digeser memalui embed style ={{}}
      //{...panResponder.panHandlers} diganti dgn handlers utk simulasi guide user
      {...handlers}
      style={{
        //ktika dklik gak boleh ada action
        touchAction: "none",
        //ktika ada dibagian text,di ignore textnya jadi bisa move
        useSelect: "none",
        transform: [{ translateX: pan.x }],
      }}
    >
      <FlowHighLightView
        //ini tambahan ...itemBackgroundActive akan ubah warna container jika dia bergerak kekakanan warna jadi abu muda!
        style={{ ...StyleSheet.itemContainer, ...itemBackground }}
      >
        <FlowRow style={styles.row}>
          <FlowText>{title}</FlowText>
          <FlowText style={styles.time}>
            {isActive ? (
              <LoadingDots color={"blue"} />
            ) : (
              <FlowText>{formatTime(time)}</FlowText>
            )}
          </FlowText>
        </FlowRow>
      </FlowHighLightView>
    </Animated.View>
  );
};

/*
yg item sekarang kita ganti ada props masuk 
karena kita akan gunakan sebagi re-use component pada screen 

//nah geser2 dari Active iten ini ditentukan oleh function panResponde.panHandler 
      //jadi diatas panResponder dicreate object berisi nilai 
      //dan method panHandlers lah yg buat dia megarahkan ke titk2 mana digeser memalui embed style ={{}}
      {...panResponder.panHandlers}
      nah jadi ini kita ubah dgn buat tadi control  nah KITA TUJUAN MAU DISABLE KAN utk tujuan pada step 3 
      maka const handlers = canControl ? panResponder.panHandlers:null 
      nah nnti itu  {...panResponder.panHandlers} kita ganti sinya jadi {...}
*/

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 6,
    paddingVertical: 19,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  time: {
    color: COLORS.brightGreen,
  },
});

/*
ingat itenrary ?? 
mis const a = value_a?? true 
maka jika value_a bernilai "null" atau undefined maka otomotis
 hasil adalah true ,dan akan disimpan di variable a 
 tapi jika  value_a bernilai sebarang number atau false maka 
 a akan bernilai sesuai dgn  apa yg ada di  value_a 


*/

/*PanResponder :ini adalah aninamated utk drag dan drop dari core react-native
kalau kita pake panGestureHandler ini lebih modern utk yabg ini kita pake yg panResponder!

utk bagian move panResponder sbb:
onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
 nah diatas kita mau masukan 
 utk param event dan gesture ,gesture ini meraba kedudukan2 movement 
 sedangkan utk evernt dia meraba apa yg jadikan suatu action agar pindah 

*/
