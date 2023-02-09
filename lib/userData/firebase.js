import { db } from "../../firebaseConfig";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { storage } from "../../firebaseConfig";
import { ref, getDownloadURL, listAll, uploadBytes } from "firebase/storage";

export async function getAllUserData() {
  try {
    let dbInstance = collection(db, "userData");
    let data = [];
    let userData = await getDocs(dbInstance);

    userData.docs.map((doc) => {
      data.push({ ...doc.data() });
    });

    return data;
  } catch (error) {
    return error.message;
  }
}

export async function getAllUserId() {
  try {
    let dbInstance = collection(db, "userData");
    let data = [];
    let userData = await getDocs(dbInstance);

    userData.docs.map((doc) => {
      data.push({ id: doc.data().id });
    });
    console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function getUserData(userId) {
  try {
    let dbInstance = doc(db, `userData/${userId}`);
    let userData = getDoc(dbInstance);
    return (await userData).data();
  } catch (error) {
    return error.message;
  }
}

export async function getProfilePic(userId) {
  try {
    let storageRef = ref(storage, `/${userId}`);
    let imagesList = await listAll(storageRef);

    let url = await getDownloadURL(imagesList.items[0]);
    return url;
  } catch (error) {
    return error.message;
  }
}

export async function getProfilePicName(userId) {
  try {
    let storageRef = ref(storage, `/${userId}`);
    let imagesList = await listAll(storageRef);
    return imagesList.items[0].name;
  } catch (error) {}
}

export async function uploadProfilePic(userId, image) {
  let imageRef = ref(storage, `/${userId}/${image.name}`);

  let response = await uploadBytes(imageRef, image);
  return response;
}
