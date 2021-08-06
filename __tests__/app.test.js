const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("topics", () => {
  test("GET 200: returns an array of topic objects with all properties", async () => {
    await request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(Array.isArray(topics)).toBe(true);
        expect(body.topics).toEqual([
          { slug: "mitch", description: "The man, the Mitch, the legend" },
          { slug: "cats", description: "Not dogs" },
          { slug: "paper", description: "what books are made of" },
        ]);
      });
  });
});

describe('articles', () => {
  test('GET 200: returns an article object by id', async () => {
    await request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({body}) => {
        const { article } = body;
        expect(Array.isArray(article)).toBe(true);
        expect(article).toEqual([{
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String) 
        }])
      })
  })
  test('Error 400: responds with an error message when passed invalid ID', () => {
    return request(app)
      .get('/api/articles/notAnID')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request');
      });
    });
  test('Error 404: responds with an error message when passed id does not exist', () => {
    return request(app)
      .get('/api/articles/20')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not Found!');
      });
    });
  

  test('PATCH 200: responds with the updated article', async () => {
    const votesUpdate = {inc_votes : -100};
    await request(app)
      .patch('/api/articles/3')
      .send(votesUpdate)
      .expect(200)
      .then(({body}) => {
        expect(body.article).toEqual({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: -100,
        });
      });
  });

  test("GET 200: returns an array of articles objects with all properties", async () => {
    await request(app)
      .get('/api/articles')
      .expect(200)
      .then(({body}) => {
        const { articles } = body;
        expect(Array.isArray(articles)).toBe(true)
        expect(articles[0]).toEqual({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String)
        })
      });
  });
});

describe('article comments', () => {
  test('GET 200: returns comments objects by article id', async () => {
    await request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({body}) => {
        const { comments } = body;
        expect(Array.isArray(comments)).toBe(true);
        expect(comments[0]).toEqual({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String)
        })
      })
  })
  test('POST 201: responds with comment added to database by article_id', async () => {
    const newComment = {
      username: 'icellusedkars',
      body: 'I am testing if this comment will be posted'
    }
    await request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .expect(201)
      .then(({body}) => {
        const { insertComment } = body;
        expect(Array.isArray(insertComment)).toBe(true);
        expect(insertComment[0]).toEqual({
          comment_id: expect.any(Number),
          author: 'icellusedkars',
          article_id: 1,
          votes: expect.any(Number),
          created_at: expect.any(String),
          body: 'I am testing if this comment will be posted'
        })
      })
  })
})
describe('api', () => {
  test('GET 200: responds with all endpoints', async () => {
    await request(app)
      .get('/api')
      .expect(200)
      .then(({body}) => {
        const { endpoints } = body;
        expect(typeof(endpoints)).toBe('object');
        expect(endpoints['GET /api']).toEqual({
        description: 'serves up a json representation of all the available endpoints of the api'
        })
      })
  })
})