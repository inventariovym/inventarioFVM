# InventarioFVM
## Para descargar el proyecto
Seleccionar la carpeta donde se desea almacenar la app.
Descargar el proyecto en su computador e ingresar a la carpeta del proyecto:
```
git clone https://github.com/inventariovym/inventarioFVM
cd inventarioFVM
```
## Instalar las dependencias:
```
npm install
```
Crear una base de datos en postgres con el nombre inventario
## Importar la DB desde el server del proyecto
Una vez se esté dentro de la carpeta server, ejecutar
```
psql -U postgres -h localhost inventario < inventario.sql
```
## Cambiar el usuario en database.js por el local
```
user -> su usuario
password -> su contraseña
```
## Inicializar la app:
Una vez se esté dentro de la carpeta, ejecutar:
```
npm run dev
```
O en su defecto:
```
npm start
```
y finish, podrá ejecutar la aplicación y navegar por cada uno de los módulos.
