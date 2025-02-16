FROM node
WORKDIR /app
COPY package.json package-lock.json ./
# Устанавливаем зависимости
RUN npm install
# Копируем весь проект
COPY . .
EXPOSE 3000

# Запускаем сервер
CMD ["node", "app.js"]