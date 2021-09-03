const socket = io();

const lblNuevoTicket = document.getElementById('lblNuevoTicket');
const btnNuevoTicket = document.getElementById('btnNuevoTicket');

socket.on('connect', () => {
    // console.log('Conectado');
    btnNuevoTicket.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnNuevoTicket.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    //console.log(ultimo);
    lblNuevoTicket.innerText = 'Ticket: '+ultimo;
});


btnNuevoTicket.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
        //console.log('Desde el server', ticket );
    });

});