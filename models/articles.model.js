const db = require("../db/connection");
const format = require("pg-format");

exports.selectArticleById = async (article_id) => {
    const commentsById = await db.query(
        `SELECT * FROM comments WHERE article_id = $1;`, [article_id])
        comment_count = commentsById.rows.length
    const articleById = await db.query(
        `SELECT * FROM articles WHERE article_id = $1;`, [article_id]);
        articleById.rows[0].comment_count = comment_count;
    return articleById.rows
};

exports.updateArticleById = async (article_id, votesUpdate) => {
   const {inc_votes} = votesUpdate;
    const articleById = await db.query(
        `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 Returning*;`,
        [inc_votes, article_id]);
    return articleById.rows[0]
};

exports.selectArticles = async (sort_by = 'created_at', order = 'desc', topic) => {
    let queryWithSortByOrder = 
        `SELECT articles.author, articles.title, articles.article_id, articles.topic,
        articles.created_at, articles.votes, COUNT(comments.comment_id) AS comment_count
        FROM articles
        JOIN comments 
        ON articles.article_id = comments.article_id
        `
    
    if (topic) { 
        const articles = await db.query(
            queryWithSortByOrder += `WHERE articles.topic = $3 
                                    GROUP BY articles.article_id
                                    ORDER BY $1, $2;`, [sort_by, order, topic])
        return articles.rows
    } else {
        const articles = await db.query(
            queryWithSortByOrder += `GROUP BY articles.article_id
                                    ORDER BY $1, $2;`, [sort_by, order]);
        return articles.rows
    };
};

exports.selectArticleComments = async (article_id) => {
    const comments = await db.query(
        `SELECT comments.comment_id, comments.votes, comments.created_at,
         comments.author, comments.body FROM comments
         WHERE article_id = $1;`, [article_id])
    return comments.rows;
};

exports.insertCommentByArticleId = async (article_id, comment) => {
    const {username, body} = comment;
    const insertComment = await db.query( 
        `INSERT INTO comments
            (author, article_id, body)
        VALUES ($1, $2, $3)
        Returning*;`, [username, article_id, body]);
    return insertComment.rows
}