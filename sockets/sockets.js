const { io } = require("../index");

const Bands = require('../models/bands');
const Band = require("../models/band");

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Metalica'));
bands.addBand(new Band('Maldita vecindad'));
bands.addBand(new Band('El canto del loco'));
bands.addBand(new Band('Enanitos verdes'));

//Mensajes de sockets
io.on('connection', client => {
    // client.on('event', data => { /* … */ });
    client.emit('active-bands', bands.getBands());
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });
    client.on("mensaje",( payload )=>{
        console.log("mensakeee", payload);
        io.emit("mensaje",{admin: "Hola mensaje"});
    });

    client.on('vote-band', (payload)=>{
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload)=>{
        console.log(payload);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload)=>{
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on("emitir-mensaje",( payload )=>{  delete-band
    //     // io.emit("nuevo-mensaje",payload); //emite a todos
    //     client.broadcast.emit("nuevo-mensaje",payload); //emite a todos menos al que lo emitio
    // });
});