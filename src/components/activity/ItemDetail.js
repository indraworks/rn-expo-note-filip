import React from "react";
import { FlowModal, FlowText } from "../overrides";
import { useState } from "react";

const ItemDetail = () => {
  const { showModal, setShowModal } = useState(true);
  return (
    <FlowModal fullScreen visible={showModal} animationType={"fade"}>
      <FlowText>Hello There</FlowText>
    </FlowModal>
  );
};

export default ItemDetail;

/*
ingat sifat modal di react native adalah nutup layer z+1 
jadi diatas nutup smua  utk content itu di atas modelnya ,jad
modal dimisalkan screen content adalah misal form dan input2nya besarany 
kita atur dgn style 


*/
