# Usamos la imagen oficial de Node.js (Punto 1.a)
FROM node:18-alpine

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código de la aplicación
COPY . .

# Exponemos el puerto en el que corre la app
EXPOSE 3000

# Comando para ejecutar la aplicación (Punto 1.d)
CMD ["npm", "start"]