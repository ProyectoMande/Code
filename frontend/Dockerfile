FROM node:lts-bullseye as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Segunda Etapa
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html