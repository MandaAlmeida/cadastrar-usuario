import { User } from "../db.js";

export async function getUsers(req, res) {
    if (req.query.orderByName || req.query.orderByAge) {
        return getUserByOrderNameAndAge(req, res);
    }

    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
}

export async function getUser(req, res) {
    try {
        const users = await User.findById(req.params.id);
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

        return res.status(201).json({ message: "Usuário criado com sucesso", user });
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

        return res.status(200).json({ message: "Dados de usuário atualizados com sucesso", user });
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


export async function getUserByOrderNameAndAge(req, res) {
    try {
        const { orderByName, orderByAge } = req.query;

        let users = await User.find();

        if (orderByAge === 'true' && orderByName === 'false') {
            users.sort((a, b) => new Date(b.birth) - new Date(a.birth));
        }

        if (orderByName === 'true' && orderByAge === 'false') {
            users.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (orderByName === 'true' && orderByAge === 'true') {
            users.sort((a, b) => {
                const nameCompare = a.name.localeCompare(b.name);
                if (nameCompare === 0) {
                    return new Date(b.birth) - new Date(a.birth);
                }
                return nameCompare;
            });
        }


        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao listar usuários" });
    }
}


