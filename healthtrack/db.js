require('dotenv').config();

const mysql = require('mysql2');

// Configuração da conexão com o banco de dados MySQL usando variáveis de ambiente
const db = mysql.createConnection({
    host: process.env.DB_HOST,       
    user: process.env.DB_USER,       
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME    
});

// Conexão com o banco de dados MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

// Exportando o objeto de conexão para ser utilizado em outras partes do projeto
module.exports = db;
