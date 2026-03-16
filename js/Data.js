import { getStorage, setStorage } from "./storageUtils.js";

const DEFAULT_MATRIZ = [
  [1,"Juan","Perez",30,1500000,"1994-03-10","2024-01-12","Masculino","Activo","Cliente",],
  [2,"Maria","Gomez",27,2200000,"1997-07-21","2024-02-05","Femenino","Activo","Cliente",],
  [3,"Carlos","Rodriguez",35,3000000,"1989-02-11","2024-03-18","Masculino","Inactivo","Cliente",],
  [4,"Laura","Fernandez",29,1800000,"1995-08-09","2024-04-09","Femenino","Activo","Cliente",],
  [5,"Andres","Martinez",40,4200000,"1984-01-15","2024-05-14","Masculino","Activo","Administrador",],
  [6,"Paula","Lopez",26,2100000,"1998-05-03","2024-06-21","Femenino","Activo","Cliente",],
  [7,"Diego","Ramirez",31,3500000,"1993-04-18","2024-07-02","Masculino","Inactivo","Cliente",],
  [8,"Camila","Torres",24,1700000,"2000-06-22","2024-07-15","Femenino","Activo","Cliente",],
  [9,"Felipe","Vargas",33,2800000,"1991-09-30","2024-08-10","Masculino","Activo","Cliente",],
  [10,"Valentina","Castro",28,2600000,"1996-12-14","2024-08-22","Femenino","Inactivo","Cliente",],
  [11,"Sergio","Moreno",36,3900000,"1988-10-08","2024-09-01","Masculino","Activo","Administrador",],
  [12,"Daniela","Rojas",23,1600000,"2001-02-19","2024-09-18","Femenino","Activo","Cliente",],
  [13,"Oscar","Navarro",41,4500000,"1983-03-27","2024-10-04","Masculino","Activo","Cliente",],
  [14,"Natalia","Ortega",32,3100000,"1992-11-02","2024-10-29","Femenino","Inactivo","Cliente",],
  [15,"Ricardo","Silva",37,4000000,"1987-04-12","2024-11-11","Masculino","Activo","Administrador",],
  [16,"Juliana","Herrera",25,2000000,"1999-01-05","2024-11-26","Femenino","Activo","Cliente",],
  [17,"Mateo","Castillo",34,3300000,"1990-07-17","2024-12-02","Masculino","Activo","Cliente",],
  [18,"Tatiana","Mendoza",29,2700000,"1995-06-11","2024-12-15","Femenino","Inactivo","Cliente",],
  [19,"Ivan","Guerrero",38,4100000,"1986-09-01","2025-01-08","Masculino","Activo","Cliente",],
  [20,"Adriana","Cortes",31,2900000,"1993-05-25","2025-01-20","Femenino","Activo","Cliente",],
  [21,"Brayan","Salazar",28,2400000,"1996-03-13","2025-02-01","Masculino","Activo","Cliente",],
  [22,"Karla","Pineda",30,2600000,"1994-04-01","2025-02-10","Femenino","Activo","Cliente",],
  [23,"Hector","Suarez",39,4200000,"1985-07-14","2025-02-21","Masculino","Inactivo","Cliente",],
  [24,"Monica","Campos",33,3100000,"1991-08-23","2025-03-05","Femenino","Activo","Cliente",],
  [25,"Luis","Reyes",45,5000000,"1979-09-10","2025-03-15","Masculino","Activo","Cliente",],
  [26,"Diana","Vega",22,1400000,"2002-12-02","2025-03-25","Femenino","Activo","Cliente",],

  // NUEVOS CLIENTES
  [27,"Jorge","Castro",34,2300000,"1990-06-12","2025-04-02","Masculino","Activo","Cliente",],
  [28,"Paola","Mendez",31,2500000,"1993-04-22","2025-04-10","Femenino","Activo","Cliente",],
  [29,"Fernando","Rios",36,3200000,"1988-01-19","2025-04-18","Masculino","Activo","Cliente",],
  [30,"Sandra","Pardo",28,2100000,"1996-07-30","2025-05-01","Femenino","Activo","Cliente",],
  [31,"Daniel","Galindo",33,2700000,"1991-09-09","2025-05-01","Masculino","Activo","Cliente",],
  [32,"Liliana","Salas",26,1900000,"1998-03-14","2025-05-25","Femenino","Activo","Cliente",],
  [33,"Cristian","Velasco",38,3400000,"1986-05-18","2025-06-02","Masculino","Activo","Cliente",],
  [34,"Marcela","Quintero",29,2200000,"1995-02-27","2025-06-14","Femenino","Activo","Cliente",],
  [35,"Eduardo","Peña",41,3600000,"1983-10-05","2025-06-28","Masculino","Activo","Cliente",],
  [36,"Andrea","Bustos",24,1700000,"2000-11-11","2025-07-05","Femenino","Activo","Cliente",],

  // Administradores
  [37,"Alejandro","Torres",40,6000000,"1984-06-10","2023-01-01","Masculino","Activo","Administrador",],

  // Super Admin
  [38,"Gabriel","Herrera",42,8000000,"1982-05-20","2022-01-01","Masculino","Activo","SuperAdmin",],

  // EMPLEADOS
  [39,"Pedro","Luna",29,2100000,"1996-08-15","2025-07-12","Masculino","Activo","Empleado",],
  [40,"Carolina","Rangel",27,2000000,"1997-03-19","2025-07-18","Femenino","Activo","Empleado",],
  [41,"Miguel","Duarte",35,2800000,"1989-12-04","2025-07-25","Masculino","Activo","Empleado",],
  [42,"Sandra","Beltran",31,2300000,"1993-09-11","2025-08-02","Femenino","Activo","Empleado",],
  [43,"Javier","Ocampo",37,3000000,"1987-01-23","2025-08-10","Masculino","Activo","Empleado",],
  [44,"Luisa","Cardenas",26,1950000,"1998-04-30","2025-08-18","Femenino","Activo","Empleado",],
];

export let matriz = getStorage("dashboard_data") || DEFAULT_MATRIZ;

export function saveData() {
  setStorage("dashboard_data", matriz);
}
