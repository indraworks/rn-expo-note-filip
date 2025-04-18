import AsyncStorage from "@react-native-async-storage/async-storage";

//kita baut function saveData ke storage ,getData/loadData dari storage
//nah utk function storeDayFlowItems ini melalukan param Data yg mana
//nanit dimasukan ke function saveData sbgai paramnya
//nnti dimasuka ke function loadData sbgai key jadi nama key utk ambil adalah "storeDaysFlowItem"

//  Save data to AsyncStorage
//   @param {string} key - The key under which the data is stored.
//   @param {any} value - The data to be stored.
//value disini adalah data kita

const saveData = async (key, value) => {
  try {
    //convert value to JSON string store in async-storage
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error storing data:", error);
    return false;
  }
};

// * Load data from AsyncStorage
//  * @param {string} key - The key under which the data is stored.
//  * @returns {Promise<any>} - Returns the data stored for the provided key

const loadData = async (key) => {
  try {
    //ambil item /data dgn getItem(key) jika tidak ada maka return nul jika ada diparse nilainya
    const storeValue = await AsyncStorage.getItem(key);
    return storeValue ? JSON.parse(storeValue) : null;
  } catch (error) {
    console.error("eror retrieve the data :", error);
    return null;
  }
};

const storeDayFlowItems = async (data) => {
  return saveData("storeDayFlowItems", data);
};

//get items /data dari storage dgn key "storeDayFlowItems"
const loadDayFlowItems = async () => {
  return loadData("storeDayFlowItems");
};

//Ada tambahan utk pertama kali loading di APp.js kita taruh utk chgeck apakah function AsyncStorage
//keterangna dibawah :

export const isAsyncStorageEnabled = async () => {
  try {
    await AsyncStorage.setItem("flowTestKey", "TestValue");
    await AsyncStorage.getItem("FlowTestKey");
    return true;
  } catch (error) {
    console.log("Storage is not enabled :", error);
    return false;
  }
};

export { saveData, loadData, storeDayFlowItems, loadDayFlowItems };

/*
Ada tambahan utk pertama kali loading di APp.js kita taruh utk chgeck apakah function AsyncStorage 
ini sudah bekerja atau enable sifat rerurn adalah true jadi kita tesrt dng setItem key value 
nah stlahnya kita getItem lagi sehingga nnti jika dapat maka nilai true 
nah nilai true ini akan mnjadikan Async bekerja dan kita ke Halamaan Compoennt ActivityHomeSCreen

nah jika false gak bisa maka RN blum atau hanya tampilkan screen kosong saja 
jadi awal mulua nnti




*/
