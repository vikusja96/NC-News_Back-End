const db = require('../data');
const format = require('pg-format');

const seed = async ({ articleData, commentData, topicData, userData }) => {
  await db.query(`DROP TABLE IF EXISTS comments`);
  await db.query(`DROP TABLE IF EXISTS articles`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS topics`);

  await db.query(`CREATE TABLE topics (
    slug TEXT PRIMARY KEY NOT NULL,
    description TEXT NOT NULL
  );`);

  await db.query(`CREATE TABLE users (
    username VARCHAR(30) PRIMARY KEY NOT NULL,
    avatar_url TEXT,
    name VARCHAR(60) NOT NULL
  );`);

  await db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    votes INT,
    topic TEXT REFERENCES topics(slug),
    author VARCHAR(60) REFERENCES users(username),
    created_at TIMESTAMP
  );`)

  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(60) REFERENCES users(username),
    article_id INT REFERENCES articles(article_id),
    votes INT,
    created_at TIMESTAMP,
    body TEXT
  );`)
  
  // 2. insert data
};

module.exports = seed;
