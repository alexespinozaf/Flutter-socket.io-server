const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Queen2"));
bands.addBand(new Band("Queen3"));
bands.addBand(new Band("Queen4"));

io.on("connection", (client) => {
    client.emit("active-bands", bands.getBands());

    client.on("disconnect", () => {
        console.log("Cliente fuera");
    });
    client.on("mensaje", (payload) => {
        io.emit("mensaje", { admin: "Nuevo mensaje" });
    });
    client.on("emitir-mensaje", (payload) => {
        //  io.emit('nuevo-mensaje',payload)
        client.broadcast.emit("emitir-mensaje", payload);
    });


    client.on("vote-band", (payload) => {
        bands.voteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });
    client.on("add-band", (payload) => {
        const newBand = new Band(payload.name)
        bands.addBand(newBand);
        io.emit("active-bands", bands.getBands());
    });

    client.on("delete-band", (payload) => {
        bands.deteteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });
});