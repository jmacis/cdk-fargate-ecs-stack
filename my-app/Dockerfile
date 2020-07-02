FROM node:12.13.1

WORKDIR /code
COPY ./app/package.json ./package.json
COPY ./app/package-lock.json ./package-lock.json 
COPY ./app/build ./build

RUN npm run preinstall

EXPOSE 5000

CMD ["npm", "run", "start-prod"] 