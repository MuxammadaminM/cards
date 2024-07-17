document.addEventListener('DOMContentLoaded', () => {
    const userContainer = document.getElementById('user-container');
    const loadingDiv = document.getElementById('loading');

    function fetchUsers() {
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => {
                loadingDiv.style.display = 'none';
                displayUsers(data.users);
            })
            .catch(error => {
                loadingDiv.textContent = 'Failed to load users';
                console.error('Error fetching users:', error);
            });
    }

    function displayUsers(users) {
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            userCard.innerHTML = `
                <h3>${user.firstName} ${user.lastName}</h3>
                <p>${user.email}</p>
                <button onclick="confirmDelete(${user.id})">Delete</button>
            `;

            userContainer.appendChild(userCard);
        });
    }

    window.confirmDelete = function(userId) {
        if (confirm('Siz rostanam "Delete" qilmoqchisiz?')) {
            deleteUser(userId);
        }
    }

    function deleteUser(userId) {
        const userCard = document.querySelector(`.user-card button[onclick="confirmDelete(${userId})"]`).parentElement;
        userCard.innerHTML = 'Deleting...🖐️';

        fetch(`https://dummyjson.com/users/${userId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.isDeleted) {
                    userCard.remove();
                } else {
                    userCard.innerHTML = 'Failed to delete user';
                }
            })
            .catch(error => {
                userCard.innerHTML = 'Failed to delete user';
                console.error('Error deleting user:', error);
            });
    }

    fetchUsers();
});