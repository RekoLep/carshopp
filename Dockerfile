# 1. Peruskuva: Node, koska tarvitsemme npm:n
FROM node:18-alpine AS build

# 2. Työhakemisto
WORKDIR /app

# 3. Kopioi riippuvuudet ja asenna
COPY package*.json ./
RUN npm install

# 4. Kopioi muu lähdekoodi ja rakenna
COPY . .
RUN npm run build

# 5. Käytä pientä Node-kuvaa julkaisuvaiheessa
FROM node:18-alpine

# 6. Työhakemisto ajovaiheessa
WORKDIR /app

# 7. Asenna kevyt serve-palvelin globaalisti
RUN npm install -g serve

# 8. Kopioi pelkkä rakennettu frontend-dist hakemisto
COPY --from=build /app/dist ./dist

# 9. Avaa portti (voit vaihtaa, oletus 3000)
EXPOSE 3000

# 10. Käynnistä staattinen palvelin
CMD ["serve", "-s", "dist", "-l", "3000"]
