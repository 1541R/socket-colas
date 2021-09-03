//REFERENCIAS HTML
const nombreEscritorio =  document.getElementById('nombreEscritorio');
const ultimoTicket = document.getElementById('ultimoTicket');
const btnAtenderTicket = document.getElementById('btnAtenderTicket');
const alertInfo = document.getElementById('alertInfo');
const lblPendientes = document.getElementById('lblPendientes');


const searchparams = new URLSearchParams( window.location.search );

if( !searchparams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchparams.get('escritorio');

nombreEscritorio.innerText = escritorio;
alertInfo.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtenderTicket.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtenderTicket.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    //console.log(ultimo);

});

socket.on('total-tickets', ( total ) => {
    lblPendientes.innerText = total.length;
    lblPendientes.display = ( total.length ) ? '' : 'none';
})


btnAtenderTicket.addEventListener('click', () => {
    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket }) => {
        
        if(!ok){
            ultimoTicket.innerText = `Nadie`;
            return alertInfo.style.display = '';
        }
        ultimoTicket.innerText = `Ticket ${ticket.numero}`

    } )
});
