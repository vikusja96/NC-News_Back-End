const db = require("../db/connection");

exports.selectArticleById = async (article_id) => {
  const maxId = await db.query(
    `SELECT articles.article_id FROM articles
        ORDER BY articles.article_id desc
        LIMIT 1;`
  );

  const commentsById = await db.query(
    `SELECT articles.*, COUNT(comments.comment_id) AS comment_count
        FROM articles
        JOIN comments USING(article_id)
        WHERE articles.article_id = $1
        GROUP BY articles.article_id;`,
    [article_id]
  );

  if (article_id > maxId.rows[0].article_id) {
    return Promise.reject({ status: 404, msg: "Not Found!" });
  }
  return commentsById.rows;
};

exports.updateArticleById = async (article_id, votesUpdate) => {
  if (!votesUpdate.hasOwnProperty("inc_votes")) {
    return Promise.reject({ status: 400, msg: "Bad Request!" });
  }
  const { inc_votes } = votesUpdate;
  const maxId = await db.query(
    `SELECT articles.article_id FROM articles
        ORDER BY articles.article_id desc
        LIMIT 1;`
  );
  if (article_id > maxId.rows[0].article_id) {
    return Promise.reject({ status: 404, msg: "Not Found!" });
  }
  const articleById = await db.query(
    `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 Returning*;`,
    [inc_votes, article_id]
  );
  return articleById.rows[0];
};

exports.selectArticles = async (sort_by = "created_at", order = "desc", topic) => {
  if(sort_by && !["author", "title", "article_id", "topic", "created_at", "votes","comment_count"].includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad Request!" });
  }

  if(order && !["desc", "asc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad Request!" });
  }

  const topicInArticlesTable = await db.query(`SELECT * FROM articles WHERE topic = $1;`, [topic]);
  const topicInTopicTable = await db.query(`SELECT * FROM topics WHERE slug = $1`, [topic]);
  
  if (topic && topicInArticlesTable.rows.length === 0 && topicInTopicTable.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Not Found!" });
  } else if (topic && topicInArticlesTable.rows.length === 0) {
    return [];
  }

  let queryWithJoinOn = `SELECT articles.author, articles.title, articles.article_id, articles.topic,
        articles.created_at, articles.votes, COUNT(comments.comment_id) AS comment_count
        FROM articles
        JOIN comments 
        ON articles.article_id = comments.article_id`;
  let queryWithWhere = ` WHERE articles.topic = $1`;
  let queryWithGroupBy = ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`
  
  if (topic) {
    const articles = await db.query(`
      ${queryWithJoinOn}
      ${queryWithWhere}
      ${queryWithGroupBy}`, [topic]);
    return articles.rows;
  } else {
    const articles = await db.query(`
      ${queryWithJoinOn}
      ${queryWithGroupBy}`);
    return articles.rows;
  }
};

exports.selectArticleComments = async (article_id) => {
  const maxId = await db.query(
    `SELECT articles.article_id FROM articles
        ORDER BY articles.article_id desc
        LIMIT 1;`
  );
  if (article_id > maxId.rows[0].article_id) {
    return Promise.reject({ status: 404, msg: "Not Found!" });
  }
  const comments = await db.query(
    `SELECT comments.comment_id, comments.votes, comments.created_at,
         comments.author, comments.body FROM comments
         WHERE article_id = $1;`,
    [article_id]
  );
  return comments.rows;
};

exports.insertCommentByArticleId = async (article_id, comment) => {
  const maxId = await db.query(
    `SELECT articles.article_id FROM articles
        ORDER BY articles.article_id desc
        LIMIT 1;`
  );
  if (article_id > maxId.rows[0].article_id) {
    return Promise.reject({ status: 404, msg: "Not Found!" });
  }
  const { username, body } = comment;
  if (!comment.hasOwnProperty("username", "body") || body.length === 0) {
    return Promise.reject({ status: 400, msg: "Bad Request!" });
  }
  const insertComment = await db.query(
    `INSERT INTO comments
            (author, article_id, body)
        VALUES ($1, $2, $3)
        Returning*;`,
    [username, article_id, body]
  );
  return insertComment.rows;
};
