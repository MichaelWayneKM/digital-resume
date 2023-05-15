// Import the functions you need from the SDKs you need
"use client";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions  = {
    apiKey: "AIzaSyDoeOlgTcZwTEXIZ1qgh0wMw1KzlK2KK8M",
    authDomain: "michael-3167a.firebaseapp.com",
    projectId: "michael-3167a",
    storageBucket: "michael-3167a.appspot.com",
    messagingSenderId: "546992885398",
    appId: "1:546992885398:web:1c94a8c5a905c23c9bbcb7",
    measurementId: "G-T0XCYVVBHN"
  };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const uploadImageToFirebase = async (imageFile: any) => {
  // Initialize Firebase Storage
  const storage = getStorage(app);

  try {
    // Create a reference to the storage location
    const storageRef = ref(storage, `images/${imageFile.name}`);

    // Upload the image file to Firebase Storage
    await uploadBytes(storageRef, imageFile);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.log("Error uploading image:", error);
    return null;
  }
};
