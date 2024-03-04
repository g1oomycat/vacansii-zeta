import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
const vacanciesCollectionRef = collection(db, "vacancies");
//Запрос на изъятия данных
export const getVacanciesList = async () => {
  try {
    const dataVacancies = await getDocs(vacanciesCollectionRef);
    const filteredDataVacancies = dataVacancies.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(filteredDataVacancies);
    return filteredDataVacancies;
  } catch (error) {
    console.error(error);
  }
};
//Запрос на добавление вакансии
export const AddVacanciesList = async (data) => {
  let dataVacancies = {
    name: data.name,
    place: data.place,
    price: data.price,
    responsibilities: data.responsibilities,
    conditions: data.conditions,
  };
  try {
    const responce = await addDoc(vacanciesCollectionRef, dataVacancies);
  } catch (error) {
    console.error(error);
  }
};
//Запрос на изменении вакансии
export const SetVacanciesList = async (id, data) => {
  let dataVacancies = {
    name: data.name,
    place: data.place,
    price: data.price,
    responsibilities: data.responsibilities,
    conditions: data.conditions,
  };
  try {
    await setDoc(doc(db, "vacancies", id), dataVacancies);
  } catch (error) {
    console.error(error);
  }
};
//Запрос на удаление данных
export const DelVacanciesList = async (id) => {
  try {
    await deleteDoc(doc(db, "vacancies", id));
  } catch (error) {
    console.error(error);
  }
};
