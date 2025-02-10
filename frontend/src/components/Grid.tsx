import axios from "axios"; // Importa o axios para fazer requisições HTTP
import { toast } from 'react-toastify'; // Importa o toast para exibir notificações
import { User } from "../@types/user"; // Importa o tipo User para tipar as informações dos usuários
import { calculateAge } from "../utils/years"; // Função utilitária para calcular a idade com base na data de nascimento
import { ArrowDown01, ArrowDownAZ, ChevronDown, ChevronUp, Filter, Search, SquarePen, Trash2 } from 'lucide-react'; // Importa ícones para UI
import { useEffect, useState } from "react"; // Importa hooks do React

type Props = {
    users: User[]; // Lista de usuários a ser exibida
    setUsers: React.Dispatch<React.SetStateAction<User[]>>; // Função para atualizar a lista de usuários
    setOnEdit: React.Dispatch<React.SetStateAction<User>>; // Função para definir o usuário em modo de edição
}

export function Grid({ users, setUsers, setOnEdit }: Props) {
    // Estado agrupando os filtros
    const [filters, setFilters] = useState({
        byName: false,
        byAge: false,
        search: ""
    });
    const [filter, setFilter] = useState(false);

    // Função para editar um usuário
    function handleEdit(item: User) {
        setOnEdit(item); // Atualiza o estado de edição com os dados do usuário selecionado
    }

    // Função para excluir um usuário
    async function handleDelete(id?: string, user?: string) {
        await axios
            .delete(`http://localhost:3001/${id}`)
            .then(({ data }) => {
                const confirmDelete = window.confirm(`Deseja realmente excluir o usuario ${user}?`);
                if (confirmDelete) {
                    const newArray = users.filter((user) => user._id !== id);
                    setUsers(newArray);
                    toast.success(data.message);
                }
            })
            .catch(({ data }) => toast.error(data.error));

        setOnEdit({ _id: "", birth: "", email: "", name: "" });
    }

    // Função para buscar usuários filtrados
    async function fetchFilteredUsers() {
        try {
            const res = await axios.get('http://localhost:3001/filter', {
                params: {
                    name: filters.search || "",
                    orderByName: filters.byName,
                    orderByAge: filters.byAge,
                }
            });
            setUsers(res.data);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
        }
    }

    // Efeito que é executado sempre que algum dos filtros mudar
    useEffect(() => {
        fetchFilteredUsers();
    }, [filters]); // Agora dependemos de 'filters', que é um único objeto

    return (
        <div className="w-full bg-white rounded-[6px] my-5 mx-auto p-5 max-sm:p-2">
            <section className="flex gap-5 relative">
                {/* Campo de busca */}
                <section className="flex items-center w-[270px] pl-2.5 rounded-[6px] border border-[#bbb] h-10 max-md:text-[14px] max-md:w-[200px]">
                    <Search className="w-4 h-4 max-md:w-[12px] max-md:h-[12px] text-[#bbb]" />
                    <input
                        className="w-full h-full p-2"
                        name="name"
                        type="text"
                        placeholder="Buscar usuario"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />

                </section>
                {/* Botão de filtro */}
                <section className="relative">
                    <button className="flex items-center justify-center cursor-pointer border-0 text-black h-10 w-10 rounded-[6px]" onClick={() => setFilter(!filter)}>
                        <Filter className="w-5 h-5 max-md:w-[12px] max-md:h-[12px]" />
                        {filter ? <ChevronUp className="w-3 h-3 max-md:w-[8px] max-md:h-[8px]" /> : <ChevronDown className="w-3 h-3 max-md:w-[8px] max-md:h-[8px]" />}
                    </button>
                    {filter && (
                        <ul className="flex flex-col border border-gray-300 rounded-[6px] w-[250px] absolute bg-white max-sm:right-0">
                            {/* Filtro para ordenar por idade */}
                            <li className={`${filters.byAge ? "bg-green-800 text-white" : "bg-transparent"} p-2 border-b border-b-gray-300 hover:bg-amber-600 hover:text-white rounded-t-[6px]`}>
                                <button className="flex items-center justify-between w-full text-[14px] cursor-pointer" onClick={() => { setFilters({ ...filters, byAge: !filters.byAge }); setFilter(false); }}>
                                    Ordenar por Idade <ArrowDown01 className="w-4 h-4 max-md:w-[10px] max-md:h-[10px]" />
                                </button>
                            </li>
                            {/* Filtro para ordenar alfabeticamente */}
                            <li className={`${filters.byName ? "bg-green-800 text-white" : "bg-transparent"} p-2 border-b border-b-gray-300 hover:bg-amber-600 hover:text-white`}>
                                <button className="flex items-center justify-between w-full text-[14px] cursor-pointer" onClick={() => { setFilters({ ...filters, byName: !filters.byName }); setFilter(false); }}>
                                    Ordenar por ordem alfabética <ArrowDownAZ className="w-4 h-4 max-md:w-[10px] max-md:h-[10px]" />
                                </button>
                            </li>
                            {/* Botão para limpar os filtros */}
                            <li className="p-2 hover:bg-red-700 hover:text-white rounded-b-[6px] flex justify-center">
                                <button className="text-[14px] cursor-pointer w-full" onClick={() => { setFilters({ byName: false, byAge: false, search: "" }); setFilter(false); }}>Limpar Filtros</button>
                            </li>
                        </ul>
                    )}
                </section>
            </section>

            {/* Tabela de exibição dos usuários */}
            <div className="w-full bg-white rounded-[6px] my-5 mx-auto p-5 scroll-auto">
                <table className="w-full min-w-[600px] break-all">
                    <thead>
                        <tr className="border-b border-b-gray-300 max-md:text-[12px]">
                            <th className="text-start py-4 px-5">Nome completo</th>
                            <th className="text-start py-4 px-2">E-mail</th>
                            <th className="text-start py-4 px-2">Idade</th>
                            <th className="max-md:hidden"></th>
                            <th className="max-md:hidden"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr key={item._id} className="text-center border-b border-b-gray-100 max-md:text-[12px]">
                                <td className="py-4 px-5 text-start w-[30%]">{item.name}</td>
                                <td className="py-4 px-2 text-start w-[40%]">{item.email}</td>
                                <td className="py-4 px-2 text-start w-[10%]">{calculateAge(item.birth)}</td>
                                {/* Botão de edição */}
                                <td className="py-4 px-2 max-md:hidden">
                                    <button className="cursor-pointer hover:bg-amber-600 rounded-full h-[30px] w-[30px] flex items-center justify-center hover:text-white"
                                        onClick={() => handleEdit(item)}>
                                        <SquarePen className="w-4 h-4 max-md:w-[12px] max-md:h-[12px]" />
                                    </button>
                                </td>
                                {/* Botão de exclusão */}
                                <td className="py-4 px-2 max-md:hidden">
                                    <button className="cursor-pointer hover:bg-amber-600 rounded-full h-[30px] w-[30px] flex items-center justify-center hover:text-white"
                                        onClick={() => handleDelete(item._id, item.name)}>
                                        <Trash2 className="w-4 h-4 max-md:w-[12px] max-md:h-[12px]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
