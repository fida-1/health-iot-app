# Étape 1 : Build React App
FROM node:20-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application React en production
RUN npm run build

# Étape 2 : Servir le build avec Nginx
FROM nginx:alpine

# Copier le build dans le dossier de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copier la configuration custom si nécessaire
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port
EXPOSE 3000

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
