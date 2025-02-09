import { useEffect, useState } from "react";
import { User } from "../@types/user";
import { formatDate } from "../utils/formatdate";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
    users: User[],
    onEdit: User;
    getUsers: () => Promise<void>
    setOnEdit: React.Dispatch<React.SetStateAction<User>>
};

export function Form({ onEdit, setOnEdit, getUsers, users }: Props) {
    const [formData, setFormData] = useState<User>({
        name: "",
        email: "",
        birth: "",
    });
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (onEdit) {
            setFormData({
                ...onEdit,
                birth: formatDate(onEdit.birth),
            });
        }
    }, [onEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const user = {
            name: formData.name,
            email: formData.email,
            birth: formData.birth,
        };

        if (
            !formData.name ||
            !formData.email ||
            !formData.birth
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (!emailRegex.test(formData.email)) {
            return toast.error("Por favor, insira um e-mail válido.");
        }



        if (onEdit._id) {
            await axios
                .put(`http://localhost:3001/${onEdit._id}`, user)
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            if (users.some(user => user.email === formData.email)) {
                return toast.error("Este e-mail já está registrado.");
            } else {
                await axios
                    .post("http://localhost:3001", user)
                    .then(({ data }) => toast.success(data))
                    .catch(({ data }) => toast.error(data));
            }
        }
        formData.name = "";
        formData.email = "";
        formData.birth = "";

        setOnEdit({ _id: "", birth: "", email: "", name: "" });
        getUsers();
    };


    return (
        <form className="flex items-end gap-2.5 flex-wrap bg-white p-5 rounded-[6px] max-md:p-4 max-sm:flex-col max-sm:items-center max-md:justify-center max-md:text-[14px]" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label>Nome completo</label>
                <input
                    className="w-[270px] pl-2.5 rounded-[6px] border border-[#bbb] h-10 max-md:text-[14px] max-md:w-[200px]"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label>E-mail</label>
                <input
                    className="w-[270px] pl-2.5 rounded-[6px] border border-[#bbb] h-10 max-md:text-[14px] max-md:w-[200px]"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label>Data de Nascimento</label>
                <input
                    className="w-[170px] pl-2.5 rounded-[6px] border border-[#bbb] h-10 max-md:text-[14px] max-md:w-[140px]"
                    name="birth"
                    type="date"
                    min="1900-01-01"
                    max={today}
                    value={formData.birth}
                    onChange={handleChange}
                />
            </div>
            <button
                type="submit"
                className="p-2.5 cursor-pointer border-0 bg-amber-600 text-white h-10 rounded-[6px]"
            >
                Salvar
            </button>
        </form>
    );
}
