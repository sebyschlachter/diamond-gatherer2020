const socket = io();

socket.on('counter', function(counter) {
    console.log(counter);
    const counterContainer = document.getElementById('showCounter');
    counterContainer.innerHTML = `Counter value is: ${counter}`;

    /*const counterValueElement = document.createElement('p');
    counterValue.innerHTML = counter;
    counterContainer.appendChild(counterValue);*/
});

document.getElementById('counter-button').addEventListener('click', function() {
    socket.emit('counter-incremented');
})