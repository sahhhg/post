import express from "express";

const app = express();
const PORTA = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const usuarios = [
    { usuario: "admin", senha: "admin" },
];

const empresas = [];

app.get("/", function (req, res) {
    res.send(`
        <style>
            body { font-family: Arial; background: #f3f4f6; margin: 0; }
            header { background: #1e40af; color: white; padding: 18px; text-align: center; font-size: 24px; }
            .container {
                max-width: 1000px; margin: 35px auto; padding: 50px;
                border-radius: 8px; box-shadow: 0 0 8px #999;
                display: flex; flex-direction: column; gap: 20px;
            }
            button {
                padding: 10px 15px; cursor: pointer; background: #1e40af; color: white; border: none; border-radius: 5px;
            }
            button:hover { background: #1e3a8a; }
            a { text-decoration: none; color: #1e40af; font-weight: bold; }
        </style>

        <header>SISTEMA DE EMPRESAS</header>

        <div class="container">
            <h2>Menu</h2>
            <button onclick="window.location.href='/login'">Login</button>
            <button onclick="window.location.href='/logout'">Logout</button>
            <button onclick="window.location.href='/empresa'">Listar Empresas</button>
            <button onclick="window.location.href='/empresa/nova'">Cadastrar Empresa</button>
        </div>
    `);
});

app.get("/login", function (req, res) {
    res.send(`
        <style>
            body { font-family: Arial; background: #f3f4f6; margin: 0; }
            header { background: #1e40af; color: white; padding: 20px; text-align: center; font-size: 26px; }
            .container {
                max-width: 450px; background: white; margin: 40px auto; padding: 30px;
                border-radius: 6px; box-shadow: 0 0 8px #666;
            }
            input { width: 100%; padding: 10px; margin-top: 5px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #aaa; }
            button {
                padding: 10px 20px; background: #1e40af; border: none;
                color: white; cursor: pointer; border-radius: 5px; width: 100%;
            }
            button:hover { background: #1e3a8a; }
            a { display: block; margin-top: 15px; color: #1e40af; }
        </style>

        <header>LOGIN</header>

        <div class="container">
            <form method="POST" action="/login">
                <label>Usuário:</label>
                <input name="usuario" required />

                <label>Senha:</label>
                <input type="password" name="senha" required />

                <button type="submit">Entrar</button>
            </form>

            <a href="/">⬅ Voltar</a>
        </div>
    `);
});

app.post("/login", function (req, res) {
    const usuarioDigitado = req.body.usuario;
    const senhaDigitada = req.body.senha;

    const valido = usuarios.some(u => u.usuario === usuarioDigitado && u.senha === senhaDigitada);

    if (valido) {
        res.send(`
            <style>
                body { font-family: Arial; background: #f3f4f6; margin: 0; }
                header { background: #1e40af; color: white; padding: 20px; text-align: center; font-size: 25px; }
                .container {
                    max-width: 500px; background: white; margin: 40px auto; padding: 25px;
                    border-radius: 8px; box-shadow: 0 0 8px #777;
                }
                a { color: #1e40af; font-weight: bold; }
            </style>

            <header>SUCESSO</header>

            <div class="container">
                <h3>Login realizado com sucesso!</h3>
                <a href="/">Voltar ao Menu</a>
            </div>
        `);
    } else {
        res.send(`
            <style>
                body { font-family: Arial; background: #f3f4f6; margin: 0; }
                header { background: #c62828; color: white; padding: 20px; text-align: center; font-size: 25px; }
                .container {
                    max-width: 500px; background: white; margin: 40px auto; padding: 25px;
                    border-radius: 8px; box-shadow: 0 0 8px #777;
                }
                a { color: #c62828; font-weight: bold; }
            </style>

            <header>ERRO</header>

            <div class="container">
                <h3>Usuário ou senha incorretos!</h3>
                <a href="/login">Tentar novamente</a>
            </div>
        `);
    }
});

app.get("/logout", function (req, res) {
    res.send(`
        <style>
            body { font-family: Arial; background: #f3f4f6; margin: 0; }
            header { background: #1e40af; color: white; padding: 20px; text-align: center; font-size: 25px; }
            .container {
                max-width: 500px; background: white; margin: 40px auto; padding: 25px;
                border-radius: 8px; box-shadow: 0 0 8px #777;
            }
            a { color: #1e40af; font-weight: bold; }
        </style>

        <header>LOGOUT</header>

        <div class="container">
            <h3>Logout efetuado!</h3>
            <a href="/">Voltar</a>
        </div>
    `);
});

app.get("/empresa/nova", function (req, res) {
    res.send(`
        <style>
            body { font-family: Arial; background: #f3f4f6; margin: 0; }
            header { background: #1e40af; color: white; padding: 20px; text-align: center; font-size: 24px; }
            .container {
                max-width: 650px; background: white; margin: 40px auto; padding: 30px;
                border-radius: 8px; box-shadow: 0 0 10px #888;
            }
            input { width: 100%; padding: 10px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #bbb; }
            button {
                padding: 12px 20px; background: #1e40af; border: none;
                color: white; cursor: pointer; border-radius: 5px; width: 100%;
            }
            button:hover { background: #1e3a8a; }
            a { color: #1e40af; font-weight: bold; display: block; margin-top: 10px; }
        </style>

        <header>NOVA EMPRESA</header>

        <div class="container">
            <form method="POST" action="/empresa">

                <label>CNPJ (14 números):</label>
                <input name="cnpj" required />

                <label>Razão Social:</label>
                <input name="razaoSocial" required />

                <label>Nome Fantasia:</label>
                <input name="nomeFantasia" required />

                <label>Cidade:</label>
                <input name="cidade" required />

                <label>UF:</label>
                <input name="uf" maxlength="2" required />

                <label>CEP:</label>
                <input name="cep" required />

                <label>Email:</label>
                <input name="email" required />

                <label>Telefone:</label>
                <input name="telefone" required />

                <button type="submit">Cadastrar</button>
            </form>

            <a href="/">Voltar</a>
        </div>
    `);
});

app.post("/empresa", function (req, res) {
    const cnpj = req.body.cnpj;
    const razaoSocial = req.body.razaoSocial;
    const nomeFantasia = req.body.nomeFantasia;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
    const cep = req.body.cep;
    const email = req.body.email;
    const telefone = req.body.telefone;

    const regraEmail = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const regraTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    if (cnpj.length !== 14 || isNaN(cnpj)) return res.send("CNPJ inválido!");
    if (!regraEmail.test(email)) return res.send("Email inválido!");
    if (!regraTelefone.test(telefone)) return res.send("Telefone inválido!");
    if (!razaoSocial || razaoSocial.trim() === "") {
        return res.send("Razão Social é obrigatória!");
    }

    if (!nomeFantasia || nomeFantasia.trim() === "") {
        return res.send("Nome Fantasia é obrigatório!");
    }

    if (!cidade || cidade.trim() === "") {
        return res.send("Cidade é obrigatória!");
    }

    if (!uf || uf.trim().length !== 2) {
        return res.send("UF inválida! Deve ter 2 caracteres.");
    }

    if (!cep || cep.trim() === "") {
        return res.send("CEP é obrigatório!");
    }

    empresas.push({
        cnpj,
        razaoSocial,
        nomeFantasia,
        cidade,
        uf: uf.toUpperCase(),
        cep,
        email,
        telefone
    });

    res.send(`
        <style>
            body { font-family: Arial; background: #f9fafb; margin: 0; }
            header { background: #1e40af; color: white; padding: 20px; text-align: center; font-size: 24px; }
            .container {
                max-width: 500px; background: white; margin: 40px auto; padding: 20px;
                border-radius: 8px; box-shadow: 0 0 8px #777;
            }
            a { color: #1e40af; font-weight: bold; text-decoration: none; }
            a:hover { text-decoration: underline; }
        </style>

        <header>EMPRESA CADASTRADA</header>

        <div class="container">
            <h3>Empresa cadastrada com sucesso!</h3>
            <a href="/empresa">Ver lista</a><br>
            <a href="/empresa/nova">Cadastrar outra</a>
        </div>
    `);

});

app.get("/empresa", function (req, res) {
    let linhas = empresas.map(e => `
        <tr>
            <td>${e.cnpj}</td>
            <td>${e.razaoSocial}</td>
            <td>${e.nomeFantasia}</td>
            <td>${e.cidade}/${e.uf}</td>
            <td>${e.cep}</td>
            <td>${e.email}</td>
            <td>${e.telefone}</td>
        </tr>
    `).join("");

    res.send(`
        <style>
            body { font-family: Arial; background: #f9fafb; margin: 0; }
            header { background: #1e40af; color: white; padding: 20px; text-align: center; font-size: 24px; }
            .container {
                max-width: 900px; background: white; margin: 40px auto; padding: 25px;
                border-radius: 8px; box-shadow: 0 0 8px #777;
            }
            table { width: 100%; border-collapse: collapse; }
            th {
                background: #e0e7ff;
                padding: 12px;
                text-align: left;
            }
            td { padding: 12px; border-bottom: 1px solid #ccc; }
            a { color: #1e40af; font-weight: bold; }
        </style>

        <header>EMPRESAS CADASTRADAS</header>

        <div class="container">
            <table>
                <tr>
                    <th>CNPJ</th>
                    <th>Razão Social</th>
                    <th>Nome Fantasia</th>
                    <th>Cidade/UF</th>
                    <th>CEP</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr>
                ${linhas}
            </table>

            <br>
            <a href="/">Voltar</a>
        </div>
    `);
});

app.listen(PORTA, function () {
    console.log("Servidor rodando na porta " + PORTA);
});
