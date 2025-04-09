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

//function display timer from miliseconds
export const formatTime = (milliseconds) => {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  // Ensure double digits format
  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const generateRandomId = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i < length; i++) {
    //ambil randomIndex
    const randomIndex = Math.floor(Math.random() * characters.length);
    //mathFloor utk genapkan ,Math.Random()* pangkamg caractehr =10
    //nnti kluar index ini hasil ramdom trus ambil cahracter di caracters base dari idx random yg didapat!
    //trus masukan itu kerandom id  caracter tadi tiap caracted yg didapat ditambahkan ke carater yg sudah ada
    //dari rumus dinawah ini:
    randomId += characters.charAt(randomIndex);
  }
  return randomId;
};
