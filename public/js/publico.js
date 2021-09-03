const socket = io();

const lblTicket1 = document.getElementById('lblTicket1');
const lblEscritorio1 = document.getElementById('lblEscritorio1');
const lblTicket2 = document.getElementById('lblTicket2');
const lblEscritorio2 = document.getElementById('lblEscritorio2');
const lblTicket3 = document.getElementById('lblTicket3');
const lblEscritorio3 = document.getElementById('lblEscritorio3');
const lblTicket4 = document.getElementById('lblTicket4');
const lblEscritorio4 = document.getElementById('lblEscritorio4');

socket.on('estado-actual', ( payload ) => {
    
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;
    lblTicket1.innerText = 'Ticket: ' + ticket1.numero;
    lblEscritorio1.innerText = ticket1.escritorio;
    lblTicket2.innerText = 'Ticket: ' + ticket2.numero;
    lblEscritorio2.innerText = ticket2.escritorio;
    lblTicket3.innerText = 'Ticket: ' + ticket3.numero;
    lblEscritorio3.innerText = ticket3.escritorio;
    lblTicket4.innerText = 'Ticket: ' + ticket4.numero;
    lblEscritorio4.innerText = ticket4.escritorio;
    //console.log( payload );
});


//console.log('Público HTML')