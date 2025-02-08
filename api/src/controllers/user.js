import { User } from "../db.js";

export async function getUsers(_, res) {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
}

export async function addUser(req, res) {
    try {
        const UserBody = {
            name: req.body.name,
            email: req.body.email,
            birth: req.body.birth,
            password: req.body.password,
        };

        const user = new User(UserBody);
        await user.save();

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao salvar usuário" });
    }
};

export async function updateUser(req, res) {
    try {
        const UserBody = {
            name: req.body.name,
            email: req.body.email,
            birth: req.body.birth,
            password: req.body.password,
        };

        const user = await User.findByIdAndUpdate(req.params.id, UserBody, { new: true });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao editar dados do usuário" });
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Usuário deletado com sucesso", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao excluir usuário" });
    }
};
