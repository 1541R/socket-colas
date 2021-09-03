const path = require('path');
const fs = require('fs');

class Ticket {

    constructor( numero, escritorio ){
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TicketControl {

    constructor(){
        
        this.ultimo = 0;
        this.fecha = new Date().getDate();
        this.tickets = [];
        this.ultimosTickets = [];

        this.init();

    }

    get toJSON(){
        return {
            ultimo: this.ultimo,
            fecha: this.fecha,
            tickets: this.tickets,
            ultimosTickets: this.ultimosTickets,
        }
    }

    init(){

        const { fecha,ultimo, tickets, ultimosTickets } = require('../db/data.json');
        
        if( fecha === this.fecha ){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimosTickets = ultimosTickets;
        }else{
            this.guardarDB()
        }

    }

    guardarDB(){
        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJSON ) );
    }

    siguiente(){
        this.ultimo += 1;
        const ticket = new Ticket( this.ultimo, null );
        this.tickets.push( ticket );
        this.guardarDB();
        return 'Ticket: ' + ticket.numero;
    }

    atenderTicket( escritorio ){
        if( this.tickets.length === 0 ){
            return null;
        }
        //Eliminar el primer elemento del array tickets y retornarlo para signarlo a un escritorio
        const ticket = this.tickets.shift(); 
        ticket.escritorio = escritorio;

        //Agregar ticket a los ultimosTickets
        this.ultimosTickets.unshift( ticket );

        if( this.ultimosTickets.length > 4 ){
            this.ultimosTickets.slice(-1, 1);
        }

        this.guardarDB();

        return ticket;

    }


}

module.exports = TicketControl