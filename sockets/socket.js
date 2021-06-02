const {io} = require('../index')


io.on("connection", (client) => {
  console.log("Cliente Conectado");
  client.on("disconnect", () => {
    console.log("Cliente fuera");
  });
  client.on("mensaje", (payload) => {
    console.log("Mensajee!!!", payload);
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });
});
