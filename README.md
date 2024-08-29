# API REST para un estudio de tatuajes 

## Descripción

 API REST para la gestión de reservas  de un restaurante. La API permitirá a los usuarios realizar operaciones como registar,login , actualizar , eliminar citas y perfiles, gestionar usuarios y reservas


## Características Principales

- Gestión de Usuarios
- Gestión de reservas
- Visualización de reservas
- Actualizacion de reservas
- Visualización de Usuarios
- Visualización de perfil
- Actualizacion de Perfil de Usuario
- Registro y Login de Usuarios
- Eliminar citas
- Eliminar usuarios

## Tecnologías
-  **Javascript**.
-  **Express.js**.
- ORM: **TypeOrm**.
-  **TypeScript**.

## Base de Datos Relacional
![Database](./src/EsquemaBaseDeDatos.png)
## Endpoints principales

### Users

| Método | URI                              | Acción                     | Rol     |
|--------|----------------------------------|----------------------------|---------|
| POST   | `/api/users/registerAdmin`       | Registrar                  | admin   |
| POST   | `/api/users/register`            | Registrar                  | client  |
| POST   | `/api/users/login `              | Actualiza perfil           | client  |
| GET    | `/api/users/profile `            | Obtener usuario            | client  |
| GET    | `/api/users//getall  `           | ver todos los usuarios     | client  |
| Patch  | `/api/users/profile/update `     | actualizar datos de usuario| client  |


### Reservations

| Método | URI                                    | Acción         | Rol         |
|--------|----------------------------------------|----------------|-------------|
| POST   | `/api/reservations/newAppointment`     | Crear cita     | client      |
| PATCH  | `/api/reservations/:id`                | Actualizar     | admin       |
| DELETE | `/api/reservations/deleteUser/:id`     | Eliminar citas | client      |
| GET    | `/api/myreservation/reservation/:id`   | ver cita por id| client      |
| GET    | `/api/reservations/get`                |ver todas citas | admin       |




##  Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos la base de datos que se encunetra en el archivo ```.env ```.
 ```  // Environment variables ```
   ```  NODE_ENV= ```

   ```   // Server configuration```
   ```   PORT=```

   ```  // Database configuration```
	```DB_HOST=```
	```DB_PORT=```
	```DB_USER=```
	```DB_PASSWORD=```
	```DB_DATABASE=  ```

   ``` // Secret Token```
	```JWT_SECRET= "" ```

4. Para rellenar base de datos se puede hacer de dos maneras, una manualmente y dos con los factories, seeders con la librería faker. ```npx ts-node ./src/database/seeders/dbSeeder.ts```
5. Ejecutamos las migraciones con ``` npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts ```
6. utilizamos ```npm run dev  ``` para ejecutar la base de datos.
7. utilizamos los Endpoints

## ✔️⚙️Endpoints
   📑📇 Registro 
   ``` http://localhost:3000/api/users/registerAdmin ```
   
body:
        
   ```
        { 
          "first_name":"admin",
          "last_name": "admin",
          "email":"admin@git.com",
          "password":"123456789"
        }
```  
    
    ✔️ Login
 ``` http://localhost:3000/api/users/login  ```
    
    body:
```
       "email":"admin@git.com",
       "password":"12345678"
```
   ✔️ Actualizar perfil (Ten presente introducir el token para la autenticacion )✔️
 ``` http://localhost:3000/api/users/update  ```
    
    body:
``` { 
          "first_name":"lucas",
          "last_name": "perez",
          "email":"lucas15@git.com",
         
        }
```

   📑📇 Crear cita 
   ``` http://localhost:3000/reservations/newReservation ```
   
body:
        
   ```
        { 
          "Name":"Rosa",
          "last_name" :  "perz",
          "user_id":" 2",
          "Menu": "Menu Arroces",
          "Comensales": "2",
          "table": "2",
          "date": "12/10/24 12:30pm "
        }
```  
 ✔️ Actializar cita 
   ``` http://localhost:3000/api/reservations/:id ```
   
body:
        
   ```
        { 
          "Menu":"Menu 1",
         
        }
```  
## Licencia 💳

Este proyecto está bajo la licencia MIT. Ver el archivo ![Bower License](https://img.shields.io/bower/l/bootstrap)  para más detalles.

## Contacto 📞
Si tienes preguntas, comentarios sugerencias, puedes ponerte en contacto conmigo al siguiente correo jahirtoloza14@gmail.com 

