import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityItem } from "../components/activity/Item";
import {
  FlowText,
  FlowModal,
  FlowButton,
  FlowRow,
} from "../components/overrides";
import { COLORS } from "../variables/styles";

//buat const max-step
const MAX_STEPS = 3;
//empty funct
const empty = () => {};

//PreviewItem
const PreviewItem = () => (
  //kalau component ingin dimunculkan maka harus ada return

  <ActivityItem
    title={"Preview"}
    time={0}
    onActivityChange={empty}
    onSwipeStart={empty}
    onSwipeEnd={empty}
    onDoubleClick={empty}
  />
);

export const TutorialScreen = ({ visible }) => {
  const [step, setStep] = useState(1);
  //buat const stepBACk and stepNext dimana masing2  < Nax ,> 1
  const canGoNext = step < MAX_STEPS;
  const canGoBack = step > 1;
  //buat func utk tambah state step
  const pan = useRef(new Animated.Value(0)).current;
  //directionya arah postif sebesar 150pixer ( jadi arah kanan)
  const directionRef = useRef(150);
  //utk reset animation
  const animationRef = useRef(null);

  //kmudian kita buat animatedSwipe pakai timing berapa lama duration gerak kekanan
  //ini kita pakai transform:[{translateX:pan}] // translateX adalah arah datar/horisontal
  //dimana pan = nilai ref = 0
  //pan = kooridnat awal ,tovalue = tujuan langkah 150pixel ,duration lamanya animasti gerak kekanana
  //kita buat loop  yaitu Amimated.loop
  const animatedSwipe = () => {
    //func swipping
    const swipping = Animated.timing(pan, {
      toValue: directionRef.current,
      delay: 1000,
      duration: 2000,
      useNativeDriver: false,
    });
    //syarat gerak sndiri
    //sesudah step2 kita baut defaultPos utk arah 0 supaya ada jeda bereti dulu dari kanan ->kekiri
    //const loop = (animationRef.current = Animated.loop(swipping));
    //baris atas kita ganti  dgn variable sequence dimaan pakai defaultPos
    const defaultPos = Animated.timing(pan, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    });
    const sequenceFunc = Animated.sequence([defaultPos, swipping]);
    const loop = (animationRef.current = Animated.loop(sequenceFunc));
    loop.start();
  };

  //useEffect sbbkan ini akan gerak <PreviewItem /> jika step ==1 deteksinya disini
  useEffect(() => {
    if (step === 1) {
      //kekanan
      directionRef.current = 150;
      animatedSwipe(); //invoke function
      //nah nti yg gerak PreviewItem karna dia adalah benda /object
      // //yg berada pada pan( = animated.value(0))
    }

    if (step === 2) {
      //kekanan
      directionRef.current = -150;
      animatedSwipe(); //invoke function
    }

    return () => {
      animationRef.current?.reset();
    };
  }, [step]);

  const goNext = () => {
    if (canGoNext) {
      setStep(step + 1);
    }
  };
  const goBack = () => {
    if (canGoBack) {
      setStep(step - 1);
    }
  };

  //const aninmatedStyle berisi utk tranent mama yg nnti dikenai supaay dia bergrak yaitu PreviewUtem
  //const animatensform gerak kebdang horisontal dgn translateX
  //dimana compodStyle = {
  //utk sbgai bungkus /wrapper compoent mana yg dikenai animated supaya gerak
  const animatedStyle = {
    transform: [{ translateX: pan }],
  };

  return (
    <FlowModal visible={visible} bgColor={COLORS.lightBlack}>
      <View style={{ marginBottom: 10 }}>
        {step === 1 && (
          <View>
            <View style={{ marginBottom: 20 }}>
              <FlowText>To start tracking, swipe right.</FlowText>
            </View>
            {/* wajib dibungkus ANiamted.View dan pilih stylenya !  */}
            <Animated.View style={animatedStyle}>
              <PreviewItem />
            </Animated.View>
          </View>
        )}
        {step === 2 && (
          <View>
            <View style={{ marginBottom: 20 }}>
              <FlowText>To Start tracking ,swipe left</FlowText>
            </View>
            <Animated.View style={animatedStyle}>
              <PreviewItem />
            </Animated.View>
          </View>
        )}
        {step === 3 && (
          <View>
            <FlowText>Step 3</FlowText>
          </View>
        )}
      </View>
      <View>
        <FlowRow>
          <FlowButton
            onPressIn={goBack}
            disabled={!canGoBack}
            ghost
            type={"primary"}
            content={"Back"}
            style={{ marginRight: 10 }}
          />
          <FlowButton
            onPressIn={goNext}
            disabled={!canGoNext}
            ghost
            type={"primary"}
            content={"Next"}
          />
        </FlowRow>
      </View>
    </FlowModal>
  );
};

/*Handle step 2


sama stpei diatas utk  directionref.current kita ganti  = -150 (kekiri)
 kemudian update useEffectnya sbb (tambahin step2 ):
  if (step === 2) {
      //kekanan 
      directionRef.current = 150;
      animatedSwipe(); //invoke function
      
    }

danjangan lupa kita pakai sequence dan kita mesti buat defaultPos varibale 
utk pan yg isinya tetaosama  yaitu 0
yg isinya berupa animated.timing(pan,{toValue:0,duraiton:0,useNativeDriver:false})
jadi defaultPos = animated.timing(pan,{toValue:0,duration:0,useNativeDriver:false})
nah kita pakai sequence utk hundari patah2 dari kanan ke kiri nol dulu trus kekiri 
const srquence = Animated.sequence(defaultPos,swipping)
swiping tadi function yg isinya  directioRef.current =150 ,dan directioRef.current =-150 pada step2 


*/

/*
kit audah melakukan utk sippingRight dan sudah benar hanya saja ktika dibacl dia ada 
stuck gak balik utk itu kita perlu rset nah utk rset dibaut  useRef(0) masukan divar animationRef 
stlahnya apda saat useEffect kita tambahkan return  func yg brisi animationRef tadi kita reset  
return ()=> {
    animationRef.current?.reset()
  }
    dan pada saat loop juga kita masukan animationRef.current 
    shingga ktika useEffect nnti ini jadi berpengaruh /ada kliatan resetnya!
    const loop = animationRef.current = Animated.loop(swipping)

*/

/*
buat animasi jika user enter 1  kit apakai animasi gerak kekakann berapa pixel 
kita pakai pan utk mmbuat animasi dgn memasukan ref statrnya 
jadi masukan nilai ancer2 utk nnti dianimation sblum bergerak atau berpindah  kita gunakan useREF
pan = useRef(new Animated.Value(0)).current
*/

/*
2) buat Previee Item done
stlahnya kita oerly activityItem itu kita ambil atau copy nah nnti dalanya ...Item 
kita isikan saha Ititle dan time kosongan yg lainya utk function kita buat empty functuon 
ah nnti ini tutorial steep 1 akan kita buat gerak animation geser kanan saja 


*/

/*
di app js kit amasuka tutorial screen dimana  kita kasuh tahu pemakai 
nah ditutorialscreen kita buat sbb:
utk urutan 1 adalah step1  activkan item 
                    setep2 deactive item 
                    seteo3 kita menuju ke itemDetail
nah step2 in kita masukan dalam state 
dinbawah step2 ada button yg utk munculkan step2 berikunya atau kembali kemenu berikutnya !

*/
