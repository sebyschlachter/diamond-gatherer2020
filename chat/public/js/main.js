const socket = io();

document.getElementById('join-chat-button').addEventListener('click', function() {
    const input = document.getElementById('user-name-input');
    const userName = input.value;
    if (userName.length > 0) {
        document.getElementById('user-name-missing').classList.add('display-none');
        socket.emit('join-chat', userName);
    } else {
        document.getElementById('user-name-missing').classList.remove('display-none');
    }
});

socket.on('joined-chat', function() {
    document.getElementById('menu').classList.add('display-none');
    document.getElementById('chat-container').classList.remove('display-none');
});

socket.on('new-user-connected', function(username) {
    const messageContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${username} joined chat!`;
    messageContainer.appendChild(messageElement);
})

socket.on('new-user-disconnected', function(username) {
    const messageContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${username} left chat!`;
    messageContainer.appendChild(messageElement);
})

socket.on('refresh-user-list', function(chatUsers) {
    document.getElementById("users-list").innerHTML = "";
    const listContainer = document.getElementById('users-list');
    for (const user in chatUsers) {
        const listElement = document.createElement('li');
        listElement.innerHTML = chatUsers[user];
        listContainer.appendChild(listElement);
    }
})

document.getElementById('send-message-button').addEventListener('click', function() {
    const message = document.getElementById('message').value;
    const messageColor = document.getElementById('message-color').value;
    document.getElementById('message').value = '';
    socket.emit('send-message', message, messageColor);
});

socket.on('new-message', function(user, message, messageColor) {
    const messageContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${user}: <span style='color: ${messageColor};'>${message}</span>`;
    messageContainer.appendChild(messageElement);
});

document.getElementById('leave-chat-button').addEventListener('click', function() {
    socket.emit('leave-chat');
});

socket.on('menu', function() {
    document.getElementById('menu').classList.remove('display-none');
    document.getElementById('chat-container').classList.add('display-none');
});