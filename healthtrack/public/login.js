document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio tradicional do formulário

    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const result = await response.json();

        if (response.ok) {
            // Salvar as informações do usuário no localStorage
            localStorage.setItem('user', JSON.stringify(result));

            // Redirecionar para o perfil
            window.location.href = 'perfil.html';
        } else {
            // Exibir mensagem de erro
            document.getElementById('mensagemLoginErro').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro no login:', error);
        document.getElementById('mensagemLoginErro').style.display = 'block';
    }
});
