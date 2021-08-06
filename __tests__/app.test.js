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
  test("Error 404: responds with an error message when passed route does not exist", async () => {
    await request(app)
      .get("/api/notARoute")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("Not Found!");
      });
  });
});

describe("articles", () => {
  describe("GET article by ID", () => {
    test("GET 200: returns an article object by id", async () => {
      await request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(Array.isArray(article)).toBe(true);
          expect(article).toEqual([
            {
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              body: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
            },
          ]);
        });
    });
    test("Error 400: responds with an error message when passed invalid ID", async () => {
      await request(app)
        .get("/api/articles/notAnID")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
    test("Error 404: responds with an error message when passed id does not exist", async () => {
      await request(app)
        .get("/api/articles/20")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found!");
        });
    });
  });

  describe("PATCH article votes by article ID", () => {
    test("PATCH 200: responds with the updated votes in article", async () => {
      const votesUpdate = { inc_votes: -100 };
      await request(app)
        .patch("/api/articles/3")
        .send(votesUpdate)
        .expect(200)
        .then(({ body }) => {
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
    test("Error 400: responds with an error message when passed invalid ID", async () => {
      const votesUpdate = { inc_votes: -100 };
      await request(app)
        .patch("/api/articles/notAnID")
        .send(votesUpdate)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
    test("Error 404: responds with an error message when passed id does not exist", async () => {
      const votesUpdate = { inc_votes: -100 };
      await request(app)
        .patch("/api/articles/20")
        .send(votesUpdate)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found!");
        });
    });
    test("Error 400: responds with an error message when malformed body/missing required fields", async () => {
      const votesUpdate = {};
      await request(app)
        .patch("/api/articles/3")
        .send(votesUpdate)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
    test("Error 400: responds with an error message when passed incorrect type", async () => {
      const votesUpdate = { inc_votes: "Hi" };
      await request(app)
        .patch("/api/articles/3")
        .send(votesUpdate)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
  });
  describe("GET all articles", () => {
    test("GET 200: returns an array of articles objects with all properties", async () => {
      await request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(Array.isArray(articles)).toBe(true);
          expect(articles[0]).toEqual({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          });
        });
    });
    test("Error 404: responds with an error message when passed route does not exist", async () => {
      await request(app)
        .get("/api/notARoute")
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe("Not Found!");
        });
    });
  });
});

describe("comments by article", () => {
  describe("GET comments", () => {
    test("GET 200: returns comments objects by article id", async () => {
      await request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(Array.isArray(comments)).toBe(true);
          expect(comments[0]).toEqual({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
    });
    test("Error 400: responds with an error message when passed invalid ID", async () => {
      await request(app)
        .get("/api/articles/notAnID/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
    test("Error 404: responds with an error message when passed id does not exist", async () => {
      await request(app)
        .get("/api/articles/20/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found!");
        });
    });
  });

  describe("POST comment", () => {
    test("POST 201: responds with comment added to database by article_id", async () => {
      const newComment = {
        username: "icellusedkars",
        body: "I am testing if this comment will be posted",
      };
      await request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          const { insertComment } = body;
          expect(Array.isArray(insertComment)).toBe(true);
          expect(insertComment[0]).toEqual({
            comment_id: expect.any(Number),
            author: "icellusedkars",
            article_id: 1,
            votes: expect.any(Number),
            created_at: expect.any(String),
            body: "I am testing if this comment will be posted",
          });
        });
    });
    test("Error 400: responds with an error message when passed invalid ID", async () => {
      const newComment = {
        username: "icellusedkars",
        body: "I am testing if this comment will be posted",
      };
      await request(app)
        .post("/api/articles/notAnID/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
    test("Error 404: responds with an error message when passed id does not exist", async () => {
      const newComment = {
        username: "icellusedkars",
        body: "I am testing if this comment will be posted",
      };
      await request(app)
        .post("/api/articles/20/comments")
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found!");
        });
    });
    test("Error 400: responds with an error message when malformed body/missing required fields", async () => {
      const newComment = {};
      await request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
    test("Error 400: responds with an error message when passed incorrect type", async () => {
      let newComment = {
        username: "",
        body: "I am testing if this comment will be posted",
      };
      await request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
      newComment = {
        username: "icellusedkars",
        body: "",
      };
      await request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
  });
});

describe("api", () => {
  test("GET 200: responds with all endpoints", async () => {
    await request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { endpoints } = body;
        expect(typeof endpoints).toBe("object");
        expect(endpoints["GET /api"]).toEqual({
          description:
            "serves up a json representation of all the available endpoints of the api",
        });
      });
  });
});
