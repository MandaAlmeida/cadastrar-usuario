import { useCallback, useEffect, useState } from "react"; // React hooks: useState e useEffect
import { ToastContainer, toast } from 'react-toastify'; // Para exibir notificações
import { Form } from "./components/Form"; // Componente de formulário
import { Grid } from "./components/Grid"; // Componente de grid para listar usuários
import { User } from "./@types/user"; // Tipagem para o usuário
import axios from "axios"; // Biblioteca para realizar requisições HTTP
import { filterProps } from "./@types/filter";

export default function App() {
  // Definição do estado dos usuários e do usuário em edição
  const [users, setUsers] = useState<User[]>([]); // Estado para armazenar a lista de usuários
  const [onEdit, setOnEdit] = useState<User>({ _id: "", birth: "", email: "", name: "" }); // Estado para armazenar os dados do usuário em edição
  const [filters, setFilters] = useState<filterProps>({
    byName: false,
    byAge: false,
    search: ""
  });// Estado agrupando os filtros

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3001/users", {
        params: {
          name: filters.search || "",
          orderByName: filters.byName,
          orderByAge: filters.byAge,
        },
      });
      console.log("Filtros usados na requisição:", filters);
      setUsers(res.data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ocorreu um erro inesperado."
      );
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


  return (
    // Estrutura do componente principal
    <main className="w-full max-w-[900px] mt-5 flex flex-col items-center gap-2.5">
      <h2>Usuarios</h2> {/* Título da seção */}

      {/* Componente Form, passando os usuários, o usuário em edição e as funções necessárias como props */}
      <Form users={users} onEdit={onEdit} setOnEdit={setOnEdit} fetchUsers={fetchUsers} />

      {/* Componente Grid, que recebe os usuários e funções para editar e remover */}
      <Grid users={users} setOnEdit={setOnEdit} setUsers={setUsers} setFilters={setFilters} filters={filters} />

      {/* ToastContainer é o componente que renderiza as notificações */}
      <ToastContainer aria-label={""} autoClose={3000} /> {/* Notificações com fechamento automático após 3 segundos */}
    </main>
  )
}

