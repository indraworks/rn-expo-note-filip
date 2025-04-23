import { View, Text } from "react-native";
import React, { useState } from "react";
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

//
const PreviewItem = () => {
  //kalau component ingin dimunculkan maka harus ada return
  return (
    <ActivityItem
      title={"Preview"}
      time={0}
      onActivityChange={empty}
      onSwipeStart={empty}
      onSwipeEnd={empty}
      onDoubleClick={empty}
    />
  );
};

export const TutorialScreen = ({ visible }) => {
  const [step, setStep] = useState(1);
  //buat const stepBACk and stepNext dimana masing2  < Nax ,> 1
  const canGoNext = step < MAX_STEPS;
  const canGoBack = step > 1;
  //buat func utk tambah state step
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

  return (
    <FlowModal visible={visible} bgColor={COLORS.lightBlack}>
      <View style={{ marginBottom: 10 }}>
        {step === 1 && (
          <View>
            <View style={{ marginBottom: 20 }}>
              <FlowText>To start tracking, swipe right.</FlowText>
            </View>
            <PreviewItem />
          </View>
        )}
        {step === 2 && (
          <View>
            <FlowText>Step 2</FlowText>
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

/*
2)
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
