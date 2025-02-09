import axios from "axios";
import { toast } from 'react-toastify';
import { User } from "../@types/user";
import { calcularIdade } from "../utils/birth";
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from "react";


type Props = {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
    setOnEdit: React.Dispatch<React.SetStateAction<User>>
}

export function Grid({ users, setUsers, setOnEdit }: Props) {
    const [byName, setByName] = useState(false);
    const [byAge, setByAge] = useState(false);

    function handleEdit(item: User) {
        setOnEdit(item)
    }

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

        setOnEdit({ _id: "", birth: "", email: "", name: "" })
    }

    // async function fetchUsers() {
    //     try {
    //         const res = await axios.get('http://localhost:3001/', {
    //             params: {
    //                 orderByName: byName,
    //                 orderByAge: byAge,
    //             }
    //         });
    //         setUsers(res.data)
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             toast.error(error.message);
    //         } else {
    //             toast.error("Ocorreu um erro inesperado.");
    //         }
    //     }
    // }

    async function handleSetByName() {

        await setByName(!byName);

        console.log(byName, byAge)
        // fetchUsers()
    }

    async function handleSetByAge() {
        await setByAge(!byAge);
        console.log(byName, byAge)
        // fetchUsers()
    }


    return (
        <table className="w-full bg-white rounded-[6px] max-w-[900px] my-5 mx-auto break-all scroll-auto">
            <thead>
                <tr className="border-b border-b-gray-300 max-md:text-[12px]">
                    <th className="text-start py-4 px-5 "><button onClick={() => handleSetByName()}>Nome completo</button></th>
                    <th className="text-start py-4 px-2">E-mail</th>
                    <th className="text-start py-4 px-2"><button onClick={() => handleSetByAge()}>Idade</button></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((item) => (
                    <tr key={item._id} id={item._id} className="text-center border-b border-b-gray-100 max-md:text-[12px]">
                        <td className="py-4 px-5 text-start w-[30%]">{item.name}</td>
                        <td className="py-4 px-2 text-start w-[40%]">{item.email}</td>
                        <td className="py-4 px-2 text-start w-[10%]">{calcularIdade(item.birth)}</td>
                        <td className="py-4 px-2"><button className="cursor-pointer hover:bg-amber-600 rounded-full h-[30px] w-[30px] flex items-center justify-center hover:text-white"
                            onClick={() => handleEdit(item)}><SquarePen className="w-4 h-4 max-md:w-[12px] max-md:h-[12px]" /></button></td>
                        <td className="py-4 px-2"><button className="cursor-pointer hover:bg-amber-600 rounded-full h-[30px] w-[30px] flex items-center justify-center hover:text-white"
                            onClick={() => handleDelete(item._id, item.name)}><Trash2 className="w-4 h-4 max-md:w-[12px] max-md:h-[12px]" /></button></td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}