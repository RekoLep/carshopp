# 1. Peruskuva: Node, koska rakennetaan projekti
FROM node:18-alpine AS build

# 2. Työhakemisto
WORKDIR /app

# 3. Kopioi riippuvuuksien määrittelyt ja asenna ne
COPY package*.json ./
RUN npm install

# 4. Kopioi muu koodi ja rakenna se
COPY . .

# HUOM: Jos sinun projektissa tarvitaan build-vaihe (esim. React/Vue frontend) säilytä tämä:
RUN npm run build

# 5. Käytetään taas Nodea tuotantokäyttöön
FROM node:18-alpine

# 6. Työhakemisto kontissa
WORKDIR /app

# 7. Kopioi build-vaiheen tulokset ja riippuvuudet
COPY --from=build /app /app

# 8. Asenna vain tuotantoriippuvuudet
RUN npm install --only=production

# 9. Avaa portti (yleensä 3000, mutta voi vaihtaa)
EXPOSE 3000

# 10. Käynnistä sovellus
CMD ["node", "server.js"]
