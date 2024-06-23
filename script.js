document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('cadastro-form');
    const userList = document.getElementById('user-list');
    const clearButton = document.getElementById('btn-limpar-form');
    const clearAllButton = document.getElementById('btn-clear-all');
    const searchInput = document.getElementById('search-input');

    // Salvar informações usuário LocalStorage
    const saveUserData = (email, username) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const date = new Date().toLocaleString();
        users.push({ email, username, date });
        localStorage.setItem('users', JSON.stringify(users));
    };

    // Deletar usuário LocalStorage
    const deleteUserData = (index) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        displayUserData();
    };

    // Limpar informações usuário LocalStorage
    const clearAllUserData = () => {
        localStorage.removeItem('users');
        displayUserData();
    };

    // Mostrar informações usuário LocalStorage
    const displayUserData = (searchQuery = '') => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userList.innerHTML = '';
        users.forEach((user, index) => {
            if (user.email.includes(searchQuery) || user.username.includes(searchQuery)) {
                const li = document.createElement('li');
                li.textContent = `${user.date} - Email: ${user.email}, Nome de usuário: ${user.username}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deleteUserData(index));
                li.appendChild(deleteButton);
                userList.appendChild(li);
            }
        });
    };

    // Submit
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email-input').value;
        const username = document.getElementById('username-input').value;

        if (email && username) {
            saveUserData(email, username);
            displayUserData();
            form.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Limpar individual
    clearButton.addEventListener('click', () => {
        form.reset();
    });

    // Limpar todos
    clearAllButton.addEventListener('click', () => {
        if (confirm('Você tem certeza que deseja excluir todos os usuários?')) {
            clearAllUserData();
        }
    });

    // Pesquisa usuário
    searchInput.addEventListener('input', () => {
        displayUserData(searchInput.value);
    });

    displayUserData();
});
