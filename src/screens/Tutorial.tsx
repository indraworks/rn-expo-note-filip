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
const PreviewItem = ({ isActive }) => (
  //kalau component ingin dimunculkan maka harus ada return
  //nah activity item ini terima isActive  akan kluarkan dot2 nya
  //jika is active = true kluar kedap2 kedip dot ( pnjelasa di doc!)
  //activiyitem dtiambah property props controls utk supaya user gak bisa tarik2 /geser2 ini didisable
  <ActivityItem
    isActive={isActive}
    controls={false}
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
  //buat variable pan berisi nilai nnti yg bisa  dipakai utk dianimasi
  const pan = useRef(new Animated.Value(0)).current;
  //buat sama diatas  tapi name scale
  const scale = useRef(new Animated.Value(1)).current;
  //directionya arah postif sebesar 150pixer ( jadi arah kanan)
  const directionRef = useRef(150);
  //utk reset animation
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  //kmudian kita buat animatedSwipe pakai timing berapa lama duration gerak kekanan
  //ini kita pakai transform:[{translateX:pan}] // translateX adalah arah datar/horisontal
  //dimana pan = nilai ref = 0
  //pan = kooridnat awal ,tovalue = tujuan langkah 150pixel ,duration lamanya animasti gerak kekanana
  //kita buat loop  yaitu Amimated.loop
  const animatedSwipe = () => {
    //func swipping
    //jadi pan berisi angka tadi useRef
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

  //useEffect yg ke 2 utk buat timeout (penjelassan dibawah )
  useEffect(() => {
    if (step === 1 && isActive) {
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, 900);
    }
    if (step === 2 && !isActive) {
      timeoutRef.current = setTimeout(() => {
        setIsActive(true);
      }, 900);
    }
  }, [isActive]);

  //useEffect sbbkan ini akan gerak <PreviewItem /> jika step ==1 deteksinya disini
  useEffect(() => {
    if (step === 1) {
      setIsActive(false); //mula2 false krn step =1 ,nah pan.addlistener gerak nilainya -> sampai 150 ,
      //maka value pan = 150 stlahnya iniada dikanan dan activeItem akan blink!2
      // setActive jadi true dikanan
      //kekanan
      directionRef.current = 150;
      animatedSwipe(); //invoke function
      //nah nti yg gerak PreviewItem karna dia adalah benda /object
      // //yg berada pada pan( = animated.value(0))
    }

    if (step === 2) {
      setIsActive(true); //diatas steap2 nah activeItem masih blink2 dari  kanan gerak kekiri  atau jika ndisi diam
      //gerak kekiri masih blink2
      //
      //kekiri
      directionRef.current = -150;
      animatedSwipe(); //invoke function
    }
    if (step === 3) {
      setIsActive(false);
      animatedDoubleTap();
    }

    return () => {
      animationRef.current?.reset();
      //nah dibagian pas rset ini kita baut timeOutnya cancel disini
      //pas dimana dia mis naimateRef,curent.reset
      //disaat itu kita cleatTImeout juga tieoutRef.current braoapun nilai timeOutRef.current saat itu
      clearTimeout(timeoutRef.current);
    };
  }, [step]);

  //pan addListener adalah functuon builtin yg mana dia akan deteksi value yg masuk atau increase
  //jika nilai pan sama  dgn directionRed.current yaitu 150 maka isACtive = true ini jadikan blik2
  //nah ut kekiri memang isActive dibuat false tidak diactiveKAN!
  pan.addListener(({ value }) => {
    if (value === directionRef.current) {
      if (step === 1) {
        setIsActive(true);
      }
      if (step === 2) {
        setIsActive(false);
      }
      //utk 3 gak perlu karena setActive memang sudah false dari 2 gak perlu berubah lagi statenya !
    }
  });

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

  //funcuon doubleKcikc dgn animateDoubleTap
  const animatedDoubleTap = () => {
    const sequence = Animated.sequence([
      Animated.delay(2000),
      Animated.timing(scale, {
        toValue: 1.1, //mmbesar 1.1
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1, //mengecil
        duration: 150,
        useNativeDriver: false,
      }),
      //2X
      Animated.timing(scale, {
        toValue: 1.1, //mmbesar 1.1
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1, //kmbali kecil
        duration: 150,
        useNativeDriver: false,
      }),
    ]);
    const loop = (animationRef.current = Animated.loop(sequence));
    loop.start();
  };

  //const aninmatedStyle berisi utk tranent mama yg nnti dikenai supaay dia bergrak yaitu PreviewUtem
  //const animatensform gerak kebdang horisontal dgn translateX
  //dimana compodStyle = {
  //utk sbgai bungkus /wrapper compoent mana yg dikenai animated supaya gerak
  //AnimatedStylenya kita tambahkan utk variable scale yaitu {scale }
  const animatedStyle = {
    transform: [{ translateX: pan }, { scale }],
  };

  return (
    <FlowModal visible={visible} bgColor={COLORS.lightBlack}>
      <View style={{ marginBottom: 10 }}>
        <FlowText style={{ fontWeight: "bold" }}>
          {step} of {MAX_STEPS}
        </FlowText>
        {step === 1 && (
          <View>
            <View style={{ marginBottom: 20 }}>
              <FlowText>To start tracking, swipe right.</FlowText>
            </View>
            {/* wajib dibungkus ANiamted.View dan pilih stylenya !  */}
            <Animated.View style={animatedStyle}>
              <PreviewItem isActive={isActive} />
            </Animated.View>
          </View>
        )}
        {step === 2 && (
          <View>
            <View style={{ marginBottom: 20 }}>
              <FlowText>To Start tracking ,swipe left</FlowText>
            </View>
            <Animated.View style={animatedStyle}>
              <PreviewItem isActive={isActive} />
            </Animated.View>
          </View>
        )}
        {step === 3 && (
          <View>
            <View style={{ marginBottom: 20 }}>
              <FlowText>Double CLick to See Detail </FlowText>
            </View>

            <Animated.View style={animatedStyle}>
              <PreviewItem isActive={isActive} />
            </Animated.View>
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

/*
Disable control ,pada item masih bisa digerak2 an nah ada functuon pa




*/

/*
penambaha useEffect  yg ke-2 utk detect timeOut Reference jadi gini itu blink kalau udah di tempat netral 
ada jeda dia mati sbntar kalau dari gerak --kekanan blink muncul atau isActive = true nah pas balik di titik 0 dia harus nol 
ada jead 900ms utk nol gak ada blik  dan utk arah 0 -->kekiri juga gitu sama! 
nah utk itu kita buat timeoutRef = useRef(null) 
dan kita buat useEffect lagi 
      //jadi ktika step =1 dan isactive =true amak kita buat time outREf current = 900 nnti dia delay selama 900ms menuju null 
    if (step1 === 1 && isActive) {
       timeoutRef.current = setTimeout(() => {
         setIsActive(false);
       }, 900);
     }
 
     /jadi ktika step2 =1 dan isactive =false amak kita buat time outREf current = 900 nnti dia delay selama 900ms menuju null 
     if (step2 === 1 && !isActive) {
       timeoutRef.current = setTimeout(() => {
         setIsActive(false);
       }, 900);
 nah nnti isi timeoutRefnya ini kita msaukan ke useEffec yg pertama  dgn cara reset timeout-nya 
 dgn functuon ckearTimeout() !! utk cancel atau reset ini jadi null lagi  nilai timeoutRef.currentnya ! 


*/

/*
PreviewActive kita uga mau activekan supaya tanda active muncul utk itu kita set isActive,setIsactive 
jadi utk step1 isActive = false utk step2= isActive = true 
 jadi kita gunaka pan.addListener 
*/

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
