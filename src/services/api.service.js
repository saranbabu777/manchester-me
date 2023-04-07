import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where, orderBy, limit, Timestamp } from '@firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from "@firebase/auth";
import { db, auth } from '../firebase.config';

const usersCollectionRef = collection(db, "users");
const paymentCollectionRef = collection(db, "payment");
const attendanceCollectionRef = collection(db, "attendance");
const studentsCollectionRef = collection(db, "students");
const feesCollectionRef = collection(db, "fees");
const transactionCollectionRef = collection(db, "transaction");
const auditCollectionRef = collection(db, "audit");

/*Attendance Collection*/
export const createAttendance = async (attendance) => {
    const currentUserObject = localStorage.getItem('man-client-user-inf');
    const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
    const lastUpdatedBy = email || '';
    const lastUpdatedOn = new Date();
    await addDoc(attendanceCollectionRef, { ...attendance, lastUpdatedBy, lastUpdatedOn })
}

export const filterAttendance = async (email, start, end) => {
    const q = query(attendanceCollectionRef, where("email", "==", email), where("date", ">=", start), where("date", "<", end))
    const data = await getDocs(q);
    const parsedAttendance = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).map((doc) => ({ ...doc, date: doc.date.toDate() }));
    return parsedAttendance;
}

/*Payment Collection*/
export const createPayment = async (payment) => {
    const currentUserObject = localStorage.getItem('man-client-user-inf');
    const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
    const lastUpdatedBy = email || '';
    const lastUpdatedOn = new Date();
    await addDoc(paymentCollectionRef, { ...payment, lastUpdatedBy, lastUpdatedOn })
}

export const filterPayment = async (email, month, year) => {
    const q = query(paymentCollectionRef, where("email", "==", email), where("forMonth", "==", month), where("forYear", "==", year))
    const data = await getDocs(q);
    const parsedPayment = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return parsedPayment;
}

export const updatePayment = async (id, payment) => {
    const paymentDoc = doc(db, "payment", id);
    await updateDoc(paymentDoc, { ...payment })
}

export const deletePayment = async (id) => {
    const paymentDoc = doc(db, "payment", id);
    await deleteDoc(paymentDoc)
}

/*Users Collection*/
export const createUser = async (user) => {
    const currentUserObject = localStorage.getItem('man-client-user-inf');
    const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
    const lastUpdatedBy = email || '';
    const lastUpdatedOn = new Date();
    await addDoc(usersCollectionRef, { ...user, lastUpdatedBy, lastUpdatedOn })
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

export const getUserByEmail = async (email) => {
    const q = query(usersCollectionRef, where("email", "==", email))
    const data = await getDocs(q);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

/*Students Collection*/
export const createStudent = async (student) => {
    const currentUserObject = localStorage.getItem('man-client-user-inf');
    const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
    const lastUpdatedBy = email || '';
    const lastUpdatedOn = new Date();
    await addDoc(studentsCollectionRef, { ...student, lastUpdatedBy, lastUpdatedOn })
}

export const updateStudent = async (id, student) => {
    const currentUserObject = localStorage.getItem('man-client-user-inf');
    const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
    const lastUpdatedBy = email || '';
    const lastUpdatedOn = new Date();
    const studentDoc = doc(db, "students", id);
    await updateDoc(studentDoc, { ...student, lastUpdatedBy, lastUpdatedOn })
}

export const getStudents = async () => {
    const q = query(studentsCollectionRef, orderBy("studentId"))
    const data = await getDocs(q);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getStudentByStudentId = async (studentId) => {
    const q = query(studentsCollectionRef, where("studentId", "==", studentId))
    const data = await getDocs(q);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getLastStudentRecord = async () => {
    const q = query(studentsCollectionRef, orderBy("studentId", "desc"), limit(1))
    const data = await getDocs(q);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const deleteStudent = async (id) => {
    const studentDoc = doc(db, "students", id);
    await deleteDoc(studentDoc)
}

/*Fees Collection*/
export const createFees = async (fees) => {
    const currentUserObject = localStorage.getItem('man-client-user-inf');
    const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
    const lastUpdatedBy = email || '';
    const lastUpdatedOn = new Date();
    await addDoc(feesCollectionRef, { ...fees, lastUpdatedBy, lastUpdatedOn })
}

export const getFeesByStudentId = async (studentId) => {
    const q = query(feesCollectionRef, where("studentId", "==", studentId), orderBy("year"))
    const data = await getDocs(q);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const deleteFees = async (id) => {
    const feesDoc = doc(db, "fees", id);
    await deleteDoc(feesDoc)
}

/*Transaction Collection*/
export const createTransaction = async (transaction) => {
    const currentUserObject = localStorage.getItem('man-client-user-inf');
    const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
    const lastUpdatedBy = email || '';
    const lastUpdatedOn = new Date();
    const docRef = await addDoc(transactionCollectionRef, { ...transaction, lastUpdatedBy, lastUpdatedOn })
    return {
        ...transaction,
        lastUpdatedBy,
        lastUpdatedOn,
        id: docRef.id,
        date: Timestamp.fromDate(transaction.date),
        startTime: Timestamp.fromDate(transaction.startTime),
        endTime: Timestamp.fromDate(transaction.endTime)
    };
}

export const updateTransaction = async (id, transaction) => {
    const currentUserObject = localStorage.getItem('man-client-user-inf');
    const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
    const lastUpdatedBy = email || '';
    const lastUpdatedOn = new Date();
    const transactionDoc = doc(db, "transaction", id);
    await updateDoc(transactionDoc, { ...transaction, lastUpdatedBy, lastUpdatedOn })
}

export const getTransactions = async (start, end) => {
    const q = query(transactionCollectionRef, where("date", ">=", start), where("date", "<", end), orderBy("date"))
    const data = await getDocs(q);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const deleteTransaction = async (id) => {
    const transactionDoc = doc(db, "transaction", id);
    await deleteDoc(transactionDoc)
}

/*Audit Collection*/
export const createAudit = async (audit) => {
    const currentUserObject = localStorage.getItem('man-client-user-inf');
    const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
    const lastUpdatedBy = email || '';
    const lastUpdatedOn = new Date();
    await addDoc(auditCollectionRef, { ...audit, lastUpdatedBy, lastUpdatedOn })
}

export const getLatestAuditDetails = async () => {
    const q = query(auditCollectionRef, orderBy("transactionEndDate", "desc"), limit(1))
    const data = await getDocs(q);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        return await signInWithPopup(auth, provider);
    } catch (error) {
        console.log(error);
    }
};

export const logOut = async () => {
    await signOut(auth)
}

/*Method to cleanup firestore collection*/
export const clearCollection = async () => {
    //Uncomment whenever data cleanup required
    // const collectionRef = attendanceCollectionRef;
    // const collectionName = "attendance";
    // const data = await getDocs(collectionRef);
    // data.forEach(async (item) => {
    //     const document = doc(db, collectionName, item.id);
    //     await deleteDoc(document)
    // });
}

/*Method to migrate data from mongo db to firestore*/
export const dataMigration = async () => {
    // const students = await fetch('http://localhost:5000/student').then(response => response.json());
    // console.log(students)
    // students.forEach(async (element, index) => {
    //     if (element.fees && element.fees.length) {
    //         element.fees.forEach(async (fees, j) => {
    //             await createFees({
    //                 studentId: (101 + index),
    //                 amount: fees.amount || "",
    //                 for: fees.for || "",
    //                 month: fees.month || "",
    //                 year: fees.year || ""
    //             })
    //         })
    //     }

    // await createStudent({
    //     active: element.active || false,
    //     dob: element.dob ? new Date(element.dob) : "",
    //     doj: element.doj ? new Date(element.doj) : "",
    //     name: element.name || "",
    //     phone: element.phone || "",
    //     studentId: (101 + index),
    // })
    // });
}