const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('../db'); 

// Middleware para validar entradas
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Função para verificar se o email já está cadastrado
const checkEmailExists = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await db.promise().query(query, [email]);
    if (rows.length > 0) throw new Error('E-mail já cadastrado.');
};

// Função para criptografar a senha
const hashPassword = (senha) => bcrypt.hash(senha, 10);

// Função para cadastrar o usuário
const createUser = async (nome, email, hashedPassword, peso, altura, idade, sexo, problemas) => {
    const query = 'INSERT INTO usuarios (nome, email, senha, peso, altura, idade, sexo, problemas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    await db.promise().query(query, [nome, email, hashedPassword, peso, altura, idade, sexo, problemas || null]);
};

// Rota para cadastro de usuário
router.post(
    '/cadastro',
    [
        body('nome').notEmpty().withMessage('Nome é obrigatório.'),
        body('email').isEmail().withMessage('E-mail inválido.'),
        body('senha').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
        body('peso').isFloat({ gt: 0 }).withMessage('Peso inválido.'),
        body('altura').isFloat({ gt: 0 }).withMessage('Altura inválida.'),
        body('idade').isInt({ gt: 0 }).withMessage('Idade inválida.'),
        body('sexo').isIn(['Masculino', 'Feminino', 'Outro']).withMessage('Sexo inválido.')
    ],
    handleValidationErrors,
    async (req, res) => {
        const { nome, email, senha, peso, altura, idade, sexo, problemas } = req.body;

        try {
            // Verificar se o email já está cadastrado
            await checkEmailExists(email);

            // Criptografar a senha
            const hashedPassword = await hashPassword(senha);

            // Inserir o usuário no banco de dados
            await createUser(nome, email, hashedPassword, peso, altura, idade, sexo, problemas);

            return res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!' });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
);

// Função para validar a senha do usuário durante o login
const validatePassword = (senha, hashedPassword) => bcrypt.compare(senha, hashedPassword);

// Rota para login de usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [results] = await db.promise().query(query, [email]);

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado.',
            });
        }

        const user = results[0];

        // Verificar a senha
        const isPasswordValid = await validatePassword(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Senha incorreta.',
            });
        }

        // Retornar dados do usuário após login bem-sucedido
        res.status(200).json({
            success: true,
            message: 'Login bem-sucedido!',
            user: {
                nome: user.nome,
                email: user.email,
                peso: user.peso,
                altura: user.altura,
                idade: user.idade,
            }
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
