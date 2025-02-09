import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Form } from "./components/Form";
import { Grid } from "./components/Grid";
import { User } from "./@types/user";
import axios from "axios";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [onEdit, setOnEdit] = useState<User>({ _id: "", birth: "", email: "", name: "" });

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/");
      setUsers(res.data)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers])

  return (
    <main className="w-full max-w-[900px] mt-5 flex flex-col items-center gap-2.5">
      <h2>Usuarios</h2>
      <Form users={users} onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users={users} setOnEdit={setOnEdit} setUsers={setUsers} />
      <ToastContainer aria-label={""} autoClose={3000} />
    </main>
  )
}

export default App
