# Utilisez une image Node.js comme base
FROM node:18.2.0
ENV NODE_ENV=production

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm install --production

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Construisez l'application React
RUN npm run build

# Configurez le port exposé par le conteneur
EXPOSE 80

# Commande pour démarrer le serveur React
CMD ["npm", "start"]