# 1. Peruskuva: Node, koska rakennetaan projekti
FROM node:18-alpine AS build

# 2. Työhakemisto
WORKDIR /app

# 3. Kopioi riippuvuuksien määrittelyt ja asenna ne
COPY package*.json ./
RUN npm install

# 4. Kopioi muu koodi ja rakenna se
COPY . .
RUN npm run build

# 5. Ota käyttöön kevyt nginx-pohjainen palvella valmis buildi
# FROM nginx:stable-alpine

# 6. Kopioi rakennettu sovellus nginxin oletushakemistoon
#COPY --from=build /app/dist /usr/share/nginx/html

# 7. (ei tarvita nginx.conf kopiointia nyt)

# 8. Avaa portti 80 (ei 5173!)
EXPOSE 80

# 9. Käynnistä nginx
CMD ["nginx", "-g", "daemon off;"]
