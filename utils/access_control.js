import { AccessControl } from "accesscontrol";

export const rolesList = {
  su: "super usuario",
  admin: "administrador",
  capa: "capa",
  inst: "institucion",
};

export const resourcesList = {
  acciones_comunitarias: "acciones_comunitarias",
  acciones_prevencion_salud: "acciones_prevencion_salud",
  atencion_salud: "atencion_salud",
  capacitacion: "capacitacion",
  politicas_publicas: "politicas_publicas",
  suicidio: "suicidio",
  user: "user",
};

const access_control = new AccessControl();

access_control
  .grant([rolesList.su, rolesList.admin, rolesList.capa, rolesList.inst])

  .read([
    resourcesList.acciones_comunitarias,
    resourcesList.acciones_prevencion_salud,
    resourcesList.atencion_salud,
    resourcesList.capacitacion,
    resourcesList.politicas_publicas,
    resourcesList.suicidio,
  ])
  .grant([rolesList.su, rolesList.admin, rolesList.capa])
  .create([
    resourcesList.acciones_comunitarias,
    resourcesList.acciones_prevencion_salud,
    resourcesList.atencion_salud,
    resourcesList.capacitacion,
    resourcesList.politicas_publicas,
    resourcesList.suicidio,
  ])
  .grant([rolesList.su, rolesList.admin])
  .read(resourcesList.user)
  .create(resourcesList.user);

export default access_control;
