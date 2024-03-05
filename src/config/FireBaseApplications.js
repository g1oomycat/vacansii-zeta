import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "./firebase";
import { v4 } from "uuid";

const applicationsCollectionRef = collection(db, "applications");

//Запрос на изъятия данных
export const getApplicationsList = async () => {
  try {
    const dataVacancies = await getDocs(applicationsCollectionRef);
    const filteredDataVacancies = dataVacancies.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return filteredDataVacancies;
  } catch (error) {
    console.error(error);
  }
};
//Запрос на добавление данных
export const AddApplicationsList = async (data) => {
  try {
    await addDoc(applicationsCollectionRef, data);
  } catch (error) {
    console.error(error);
  }
};
//Запрос на удаление данных
export const DelApplicationsList = async (id) => {
  try {
    await deleteDoc(doc(db, "applications", id));
  } catch (error) {
    console.error(error);
  }
};
//Запрос на изменении СТАТУСА "просмотренно"
export const SetApplicationStatus = async (data, status) => {
  data.isOpen = status;
  try {
    await setDoc(doc(db, "applications", data.id), data);
  } catch (error) {
    console.error(error);
  }
};
//Запрос на добавление данных в хранилище
export const AddApplicationsFile = async (file) => {
  try {
    const nameFile = v4() + file.name;
    const fileRef = ref(storage, `files/${nameFile}`);
    const responseFile = await uploadBytes(fileRef, file);
    const respURL = await getDownloadURL(responseFile.ref);
    return respURL;
  } catch (error) {
    console.error(error);
  }
};
//запрос на удаление файлов в хранилище
export const DelApplicationsFile = async (url) => {
  try {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
  } catch (error) {
    console.error(error);
  }
};
