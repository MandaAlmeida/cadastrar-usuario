const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
const port = 3001

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birth: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema)

app.get("/", async (_, res) => {
    try {
        const users = await User.find()
        res.send(users)

        return res.status(201).json(users);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar usuários" });
    }

})

app.post("/", async (req, res) => {
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
});

app.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao excluir usuário" });
    }
})

app.put("/:id", async (req, res) => {
    try {
        const UserBody = {
            name: req.body.name,
            email: req.body.email,
            birth: req.body.birth,
            password: req.body.password,
        };

        const user = await User.findByIdAndUpdate(req.params.id, UserBody, { new: true });
        await user.save();

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao editar dados do usuário" });
    }
})

app.listen(port, () => {
    mongoose.connect(`mongodb+srv://almeidafonseca15:Ph4M4MO1N64GNgwF@cluster.x73zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`)
    console.log(`Exemplo app listening na porta ${port}`)
})