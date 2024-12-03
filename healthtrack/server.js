const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('./db'); // Arquivo para conexão com o banco de dados

const app = express();
const PORT = 3000;

// Middleware para parsear JSON e formulários
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (como front-end, se necessário)
app.use(express.static('public'));

// Middleware para validação de entrada
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Função auxiliar para verificação de email
const checkEmailExists = async (email) => {
    return new Promise((resolve, reject) => {
        const queryCheckEmail = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(queryCheckEmail, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0);
        });
    });
};

// Rota de cadastro de usuário
app.post(
    '/cadastro',
    [
        body('nome').notEmpty().withMessage('Nome é obrigatório'),
        body('email').isEmail().withMessage('Email inválido'),
        body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
        body('peso').isFloat({ gt: 0 }).withMessage('Peso inválido'),
        body('altura').isFloat({ gt: 0 }).withMessage('Altura inválida'),
        body('idade').isInt({ gt: 0 }).withMessage('Idade inválida'),
        body('sexo').isIn(['Masculino', 'Feminino', 'Outro']).withMessage('Sexo inválido'),
        body('problemas').optional().isString().withMessage('Problemas deve ser um texto'),
    ],
    handleValidationErrors,
    async (req, res) => {
        const { nome, email, senha, peso, altura, idade, sexo, problemas } = req.body;

        try {
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                return res.status(400).json({ success: false, message: 'Email já está em uso.' });
            }

            const hashSenha = await bcrypt.hash(senha, 10);

            const query = `
                INSERT INTO usuarios (nome, email, senha, peso, altura, idade, sexo, problemas)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(
                query,
                [nome, email, hashSenha, peso, altura, idade, sexo, problemas || null],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ success: false, message: 'Erro no servidor.' });
                    }
                    res.status(201).json({
                        success: true,
                        message: 'Usuário cadastrado com sucesso!',
                    });
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Erro ao processar o cadastro.' });
        }
    }
);

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Erro no servidor.' });
            }
            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado.',
                });
            }

            const user = results[0];
            const isPasswordCorrect = await bcrypt.compare(senha, user.senha);

            if (isPasswordCorrect) {
                res.status(200).json({
                    success: true,
                    message: 'Login bem-sucedido!',
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Senha incorreta.',
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao processar o login.' });
    }
});

// Rota de perfil do usuário
app.get('/perfil/:usuarioId', (req, res) => {
    const usuarioId = req.params.usuarioId;
    const query = 'SELECT nome, peso, altura, (peso / (altura * altura)) AS imc FROM usuarios WHERE id = ?';
  
    db.query(query, [usuarioId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erro no servidor.' });
        }
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado.',
            });
        }
        const usuario = result[0];
        res.status(200).json({
            success: true,
            perfil: usuario,
        });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});
