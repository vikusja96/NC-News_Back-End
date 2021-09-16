# Northcoders News 

## About
This is a first part of the full-stack project that was created to demonstrate the knowledge, that was learned while studying on Northcoders Coding Bootcamp. The back-end project was built by using PostgreSQL database, Node.js & ExpressJS server with using TDD and Heroku hosting.  

## Step 1 - Clone the repo 
You need to clone this repo to be able to work with it. 
 1. Place in you terminal next command:
 ```
 git clone https://github.com/vikusja96/be-nc-news.git
 ``` 
 2. Enter the repo:
 ```
 cd be-nc-news
 ```
 
 3. Open it in code editor


## Step 2 - Instal dependencies
To instal dependencies use command:
```
npm install
```

## Step 3 - Create .env files
You need to create _two_ `.env` files for this project:
 1. Create file `.env.test` and add `PGDATABASE=nc_news_test`
 
 2. Create file `.env.development` and add `PGDATABASE=nc_news`
 
 3. Check that these `.env` files are `.gitignored`.


## Step 4 - Seeding and testing the database
Before seeding the database make sure that `PostgreSQL` is running on your computer.

1. Seed the test database by using command:
```
npm run seed
```
2. To test the database and API queries use command:
```
npm run app.test.js
```
3. To test the utility functions use command:
```
npm run utils.test.js
```

If you are happy with the tests before hosting them you should seed the development database by using command:
```
npm run seed:prod
```

## Step 5 - Hosting a PSQL database using Heroku
This project was hosted with Heroku and you can check all available endpoints on API here: https://vk-nc-news-server.herokuapp.com/api.

You can choose your hosting way. 

## Minimum versions needed!
Your node.js version should not be earlier than `16.3.0`. To check you node.js version use command:
```
node -v
```
Your PostgreSQL version should not  be earlier than `13.3`. check you postgres version use command:
```
postgres -v
```