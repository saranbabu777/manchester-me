import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from '@firebase/firestore';
import { db } from '../firebase.config';

const usersCollectionRef = collection(db, "users");
const paymentCollectionRef = collection(db, "payment");
const attendanceCollectionRef = collection(db, "attendance");

/*Attendance Collection*/
export const createAttendance = async (email, date, status) => {
    const attendance = { email, date, status };
    await addDoc(attendanceCollectionRef, attendance)
}

export const filterAttendance = async (email, startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    // end.setDate(end.getDate() + 1);
    // console.log('att of ', email, start, end)
    const q = query(attendanceCollectionRef, where("email", "==", email), where("date", ">=", start), where("date", "<", end))
    const data = await getDocs(q);
    const parsedAttendance = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).map((doc) => ({ ...doc, date: doc.date.toDate() }));
    return parsedAttendance;
}

/*Payment Collection*/
export const createPayment = async (email, date, type, sum, mode, forMonth, forYear) => {
    const payment = { email, date, type, sum, mode, forMonth, forYear }
    await addDoc(paymentCollectionRef, payment)
}

export const filterPayment = async (email, month, year) => {
    const q = query(paymentCollectionRef, where("email", "==", email), where("forMonth", "==", month), where("forYear", "==", year))
    const data = await getDocs(q);
    const parsedPayment = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).map((doc) => ({ ...doc, date: doc.date.toDate() }));
    return parsedPayment;
}

/*Users Collection*/
export const createUser = async (name, email) => {
    await addDoc(usersCollectionRef, { name, email })
}

export const updateUser = async (id, name) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { name: name })
}

export const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
}

export const searchUsers = async (name) => {
    const q = query(usersCollectionRef, where("name", "==", name))
    const data = await getDocs(q);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}