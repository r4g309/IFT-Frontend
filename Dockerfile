FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

RUN bun run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos puerto
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
