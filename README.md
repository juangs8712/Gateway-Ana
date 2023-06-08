<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Steps

## 1. Required installations

  * VSCode or similar

  * Nest CLI 
   ``` 
   npm i -g  @nestjs/cli
   ```
  * Yarn
  ```
  npm install --global yarn
  ```

  * Docker
  * Postman (Optional)
  * Table Plus (Optional) 

---
## Preparing the project 

 * Install dependencies

```
yarn install
```
 * Run docker-compose 
  ```
  docker-compose up -d
  ```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
The Swagger will be running locally on **```localhost:<port>:api/v1```** and it is also deployed in this [link.](https://gateways-backend.onrender.com/api/v1)

