import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase.config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from '@firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState([]);
  const [newEmail, setNewEmail] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const handleSave = async () => {
    await addDoc(usersCollectionRef, { name: newName, email: newEmail })
  }

  const handleEdit = async (id) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { name: newName })
  }

  const handleDelete = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
  }

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();

  }, [])

  return (
    <div className="App">
      <input type='text' placeholder='Name' onChange={(e) => { setNewName(e.target.value); }} />
      <input type='text' placeholder='Email' onChange={(e) => { setNewEmail(e.target.value); }} />
      <button onClick={handleSave}>save</button>
      {
        users.map((user, key) => {
          return <div key={"user" + key}>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <button onClick={() => { handleEdit(user.id); }}>Edit Name</button>
            <button onClick={() => { handleDelete(user.id); }}>Delete</button>
          </div>
        })
      }
    </div>
  );
}

export default App;
