import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { Session } from "../types";
import { firebaseConfig } from "./config";

initializeApp(firebaseConfig);
const firestore = getFirestore();

export const COLLECTION = "sessions";

export const getActiveSession = async (uid: string) => {
  const activeSessionQuery = query(
    collection(firestore, "sessions"),
    where("userId", "==", uid),
    where("finished", "==", false)
  );
  const activeSessionSnapshot = await getDocs(activeSessionQuery);

  if (activeSessionSnapshot.docs.length === 1) {
    return activeSessionSnapshot.docs[0].data();
  }

  if (activeSessionSnapshot.docs.length >= 1) {
    console.error("ERROR: More than one active session registered");
  }

  return null;
};

export const getActiveSessionDocRef = async (uid: string) => {
  const activeSessionQuery = query(
    collection(firestore, COLLECTION),
    where("userId", "==", uid),
    where("finished", "==", false)
  );
  const activeSessionSnapshot = await getDocs(activeSessionQuery);

  if (activeSessionSnapshot.docs.length === 1)
    return activeSessionSnapshot.docs[0].ref;

  return null;
};

export const newSession = async (uid: string) => {
  const dateNow = new Date();
  const dateToday = `${dateNow.getDate()}.${
    dateNow.getMonth() + 1
  }.${dateNow.getFullYear()}`;

  const session: Session = {
    endTime: dateNow,
    finished: false,
    startTime: dateNow,
    uid: uid,
  };

  await setDoc(doc(firestore, COLLECTION, dateToday), session);

  return session;
};

export const updateSession = async (
  session: Session,
  uid: string,
  callback: any
) => {
  const docRef = await getActiveSessionDocRef(uid);

  if (docRef !== null) {
    try {
      await updateDoc(docRef, {
        finished: session.finished,
        endTime: session.endTime,
        startTime: session.startTime,
      });
      callback(session);
    } catch (e) {
      console.error("Error updating doc: ", e);
    }
  }
};
