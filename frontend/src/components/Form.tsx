import { useEffect, useState } from "react";
import { User } from "../@types/user"; // Importa o tipo User para tipar o estado de usuários
import { formatDate } from "../utils/formatDatebyAge"; // Função utilitária para formatar a data de nascimento
import axios from "axios"; // Biblioteca para fazer requisições HTTP
import { toast } from "react-toastify"; // Biblioteca para mostrar notificações de toast

type Props = {
    users: User[], // Lista de usuários
    onEdit: User; // Usuário que está sendo editado
    getUsers: () => Promise<void>; // Função para recarregar a lista de usuários
    setOnEdit: React.Dispatch<React.SetStateAction<User>>; // Função para atualizar o estado de edição do usuário
};

export function Form({ onEdit, setOnEdit, getUsers, users }: Props) {
    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState<User>({
        name: "",
        email: "",
        birth: "",
    });

    // Data de hoje, utilizada para restringir a data de nascimento no campo 'date'
    const today = new Date().toISOString().split('T')[0];

    // Efeito que é executado quando 'onEdit' muda, para preencher o formulário com os dados do usuário a ser editado
    useEffect(() => {
        if (onEdit) {
            setFormData({
                ...onEdit,
                birth: formatDate(onEdit.birth), // Formata a data de nascimento
            });
        }
    }, [onEdit]);

    // Função para atualizar o estado do formulário quando algum campo é alterado
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; // Extrai o nome e o valor do campo
        setFormData((prevData) => ({
            ...prevData, // Mantém os dados anteriores
            [name]: value, // Atualiza o campo específico
        }));
    };

    // Função executada ao submeter o formulário
    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

        // Expressão regular para validar o formato do e-mail
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // Objeto com os dados do usuário
        const user = {
            name: formData.name,
            email: formData.email,
            birth: formData.birth,
        };

        // Verifica se todos os campos estão preenchidos
        if (!formData.name || !formData.email || !formData.birth) {
            return toast.warn("Preencha todos os campos!"); // Exibe um alerta se algum campo estiver vazio
        }

        // Verifica se o e-mail fornecido é válido
        if (!emailRegex.test(formData.email)) {
            return toast.error("Por favor, insira um e-mail válido."); // Exibe um alerta caso o e-mail seja inválido
        }

        // Caso esteja editando um usuário, faz uma requisição PUT para atualizar os dados
        if (onEdit._id) {
            try {
                const { data } = await axios.put(`http://localhost:3001/${onEdit._id}`, user);
                toast.success(data.message || "Usuário atualizado com sucesso"); // Exibe uma notificação de sucesso
            } catch (error: any) {
                // Caso ocorra um erro, exibe a mensagem de erro retornada pelo backend
                const errorMessage = error.response?.data?.error || "Erro ao atualizar usuário";
                toast.error(errorMessage); // Exibe uma notificação de erro
            }
        } else {
            // Caso seja para adicionar um novo usuário, verifica se o e-mail já está registrado
            if (users.some(existingUser => existingUser.email === formData.email)) {
                return toast.error("Este e-mail já está registrado."); // Exibe erro caso o e-mail já exista
            } else {
                try {
                    const { data } = await axios.post("http://localhost:3001", user); // Faz uma requisição POST para criar um novo usuário
                    toast.success(data.message || "Usuário criado com sucesso"); // Exibe sucesso após a criação
                } catch (error: any) {
                    // Caso ocorra um erro, exibe a mensagem de erro retornada pelo backend
                    const errorMessage = error.response?.data?.error || "Erro ao salvar usuário";
                    toast.error(errorMessage); // Exibe um erro
                }
            }
        }

        // Limpa os campos do formulário após a submissão
        formData.name = "";
        formData.email = "";
        formData.birth = "";

        // Redefine o estado de edição
        setOnEdit({ _id: "", birth: "", email: "", name: "" });

        // Recarrega a lista de usuários após a operação
        getUsers();
    };

    return (
        <form className="flex items-end gap-2.5 flex-wrap bg-white p-5 rounded-[6px] max-md:p-4 max-sm:flex-col max-sm:items-center max-md:justify-center max-md:text-[14px]" onSubmit={handleSubmit}>
            {/* Campo de nome */}
            <div className="flex flex-col">
                <label>Nome completo</label>
                <input
                    className="w-[270px] pl-2.5 rounded-[6px] border border-[#bbb] h-10 max-md:text-[14px] max-md:w-[200px]"
                    name="name"
                    type="text"
                    value={formData.name} // Exibe o nome atual no campo
                    onChange={handleChange} // Atualiza o estado quando o campo for alterado
                />
            </div>

            {/* Campo de e-mail */}
            <div className="flex flex-col">
                <label>E-mail</label>
                <input
                    className="w-[270px] pl-2.5 rounded-[6px] border border-[#bbb] h-10 max-md:text-[14px] max-md:w-[200px]"
                    name="email"
                    type="text"
                    value={formData.email} // Exibe o e-mail atual no campo
                    onChange={handleChange} // Atualiza o estado quando o campo for alterado
                />
            </div>

            {/* Campo de data de nascimento */}
            <div className="flex flex-col">
                <label>Data de Nascimento</label>
                <input
                    className="w-[170px] pl-2.5 rounded-[6px] border border-[#bbb] h-10 max-md:text-[14px] max-md:w-[140px]"
                    name="birth"
                    type="date"
                    min="1900-01-01" // Define a data mínima para o campo de data
                    max={today} // Define a data máxima como a data atual
                    value={formData.birth} // Exibe a data de nascimento atual no campo
                    onChange={handleChange} // Atualiza o estado quando o campo for alterado
                />
            </div>

            {/* Botão para submeter o formulário */}
            <button
                type="submit"
                className="p-2.5 cursor-pointer border-0 bg-amber-600 text-white h-10 rounded-[6px]"
            >
                Salvar
            </button>
        </form>
    );
}
