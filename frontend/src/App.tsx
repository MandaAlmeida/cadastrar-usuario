import { useEffect, useState } from "react"; // React hooks: useState e useEffect
import { ToastContainer, toast } from 'react-toastify'; // Para exibir notificações
import { Form } from "./components/Form"; // Componente de formulário
import { Grid } from "./components/Grid"; // Componente de grid para listar usuários
import { User } from "./@types/user"; // Tipagem para o usuário
import axios from "axios"; // Biblioteca para realizar requisições HTTP

export default function App() {
  // Definição do estado dos usuários e do usuário em edição
  const [users, setUsers] = useState<User[]>([]); // Estado para armazenar a lista de usuários
  const [onEdit, setOnEdit] = useState<User>({ _id: "", birth: "", email: "", name: "" }); // Estado para armazenar os dados do usuário em edição

  // Função para buscar os usuários da API
  const getUsers = async () => {
    try {
      // Realiza a requisição para a API que retorna todos os usuários
      const res = await axios.get("http://localhost:3001/");
      setUsers(res.data); // Atualiza o estado 'users' com os dados retornados
    } catch (error) {
      // Caso ocorra erro na requisição, exibe uma mensagem de erro via toast
      if (error instanceof Error) {
        toast.error(error.message); // Exibe o erro específico
      } else {
        toast.error("Ocorreu um erro inesperado."); // Exibe uma mensagem genérica em caso de erro desconhecido
      }
    }
  }

  // useEffect que chama a função getUsers sempre que o componente for renderizado
  useEffect(() => {
    getUsers(); // Chama a função para obter os usuários
  }, [setUsers]); // O hook 'useEffect' é disparado quando o estado 'setUsers' é alterado

  return (
    // Estrutura do componente principal
    <main className="w-full max-w-[900px] mt-5 flex flex-col items-center gap-2.5">
      <h2>Usuarios</h2> {/* Título da seção */}

      {/* Componente Form, passando os usuários, o usuário em edição e as funções necessárias como props */}
      <Form users={users} onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />

      {/* Componente Grid, que recebe os usuários e funções para editar e remover */}
      <Grid users={users} setOnEdit={setOnEdit} setUsers={setUsers} />

      {/* ToastContainer é o componente que renderiza as notificações */}
      <ToastContainer aria-label={""} autoClose={3000} /> {/* Notificações com fechamento automático após 3 segundos */}
    </main>
  )
}

