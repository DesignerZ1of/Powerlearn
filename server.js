const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended
    : true}));
app.use(session({
    secret: "powerlearn123",
    resave: false,
    saveUninitialized: false
}));

const db = new
sqlite3.Database("database.db", (err) => {
        if (err){
            console.log("Erro ao conectar ao banco.");
        } else{
            console.log("Banco de dados conectado!");
        }
    });
db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
)
`);
app.post("/cadastro", (req, res) => {

    const { nome, email, senha } = req.body;

    bcrypt.hash(senha, 10, (err,
        senhaCriptografada) => {

    db.run(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senhaCriptografada],

        function (err) {

            if (err) {
                return res.send("Erro ao cadastrar usuário.");
            }

            res.redirect("/Login.html");
        }
    );
});

});

app.post("/login", (req, res) => {
    const { email, senha} =
    req.body;

    db.get(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],

    (err, usuario) => {

        if (err) {
            return res.send("Erro no servidor.");
        }

        if (!usuario) {
            return res.send("E-mail ou senha inválidos.");
        }

        bcrypt.compare(senha, usuario.senha, (err, resultado) => {

    if (resultado) {
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };

        res.redirect("/dashboard");
    } else {
        res.send("E-mail ou senha inválidos.");
    }

});

    }

);
})
const PORT = 3000;

// Permite acessar todos os arquivos da pasta PowerLearn
app.use(express.static(path.join(__dirname, "..")));

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});


app.get("/verificar-login", (req, res) => {

    if (req.session.usuario) {
        res.json({ logado: true });
    } else {
        res.json({ logado: false });
    }

});

app.get("/dashboard", (req, res) => {

    if (!req.session.usuario) {
        return res.redirect("/Login.html");
    }

    res.sendFile(path.join(__dirname, "..", "DashBoard.html"));

});

app.get("/usuario", (req, res) => {

    if (!req.session.usuario) {
        return res.json({ logado: false });
    }

    res.json({
        logado: true,
        nome: 
    req.session.usuario.nome,
        email: 
    req.session.usuario.email
    });

});

app.post("/atualizar-perfil", (req, res) => {

    if (!req.session.usuario) {
        return res.send("Usuário não logado.");
    }

    const { nome, email } = req.body;

    db.run(
        "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
        [nome, email, req.session.usuario.id],
        function(err){

            if(err){
                return res.send("Erro ao atualizar.");
            }

            req.session.usuario.nome = nome;
            req.session.usuario.email = email;

            res.send("Perfil atualizado com sucesso!");
        }
    );

});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando!`);
});