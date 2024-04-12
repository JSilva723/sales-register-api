## Start
### 1 - Add env file
```sh
cp .env.example .env
```
### 2 - Config database with Prisma
Sync schema for prisma/client
```sh
npx prisma generate
```
Migrate
```sh
npx prisma migrate dev --name init
```
