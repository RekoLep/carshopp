# 1. Peruskuva: Node, koska rakennetaan projekti
FROM node:18 AS build

# 2. Työhakemisto
WORKDIR /app

# 3. Kopioi riippuvuuksien määrittelyt ja asenna ne
COPY package*.json ./
RUN npm install

# 4. Kopioi muu koodi ja rakenna se
COPY . .
RUN npm run build

# 5. Ota käyttöön kevyt nginx-pohjainen palvella valmis buildi
FROM nginx:stable-alpine

# Poista tai kommentoi pois tämä rivi:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 7. Kopioi oma nginx-konfiguraatio (valinnainen mutta voi olla hyödyllinen)
# COPY nginx.conf /etc/nginx/nginx.conf

# 8. Avaa portti
EXPOSE 5173

# 9. Käynnistä nginx
CMD ["nginx", "-g", "daemon off;"]
