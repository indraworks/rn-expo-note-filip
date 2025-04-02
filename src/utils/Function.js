import React from "react";
import { useEffect, useRef } from "react";

export const usePrevious = (value) => {
  const ref = useRef(0);

  useEffect(() => {
    //state dimasukan ref.current
    ref.current = value;
    //state ini yg active berubah saat ini
  }, [value]);
  //ref current atau state dibalikan
  return ref.current;
};
