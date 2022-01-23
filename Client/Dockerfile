FROM node:17 AS development
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
EXPOSE 1234
CMD ["npm","run", "dev"]

FROM node:17 AS production
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --frozen-lockfile
COPY . ./
RUN npm build



