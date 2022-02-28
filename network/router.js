import user from "../components/user/network.js";
import acciones_comunitarias from "../components/acciones_comunitarias/network.js";
import acciones_prevencion_salud from "../components/acciones_prevencion_salud/network.js";
import atencion_salud from "../components/atencion_salud/network.js";
import capacitacion from "../components/capacitacion/network.js";
import suicidio from "../components/suicidio/network.js";
import sisma from "../components/sisma/network.js";

const routes = function (server) {
  server.use("/user", user);
  server.use("/acciones_comunitarias", acciones_comunitarias);
  server.use("/acciones_prevencion_salud", acciones_prevencion_salud);
  server.use("/atencion_salud", atencion_salud);
  server.use("/capacitacion", capacitacion);
  server.use("/suicidio", suicidio);
  server.use("/sisma", sisma);
};

export default routes;