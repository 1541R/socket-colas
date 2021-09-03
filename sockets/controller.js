
const TicketControl =  require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit( 'ultimo-ticket', ticketControl.ultimo );
    socket.emit( 'estado-actual', ticketControl.ultimosTickets );
    
    socket.emit( 'total-tickets', ticketControl.tickets );

    socket.on('siguiente-ticket', ( payload, callback ) => {

        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        // notificar que hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimosTickets );
    });

    socket.on('atender-ticket', ( { escritorio }, callback) => {

        if( !escritorio ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        socket.broadcast.emit( 'estado-actual', ticketControl.ultimosTickets );
        socket.emit( 'total-tickets', ticketControl.tickets );
        socket.broadcast.emit( 'total-tickets', ticketControl.tickets );

        if( !ticket ) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        }

        return callback({
            ok: true,
            ticket
        })

    });

}



module.exports = {
    socketController
}

