const db = require('../db/db');

module.exports = {
  getOne: (questionID) => {
    const questionQueryString = `SELECT * FROM questions WHERE question_id = ${questionID}`;
    return db.query(questionQueryString);
  },
  addQuestion: (newQuestion) => {
    const inputs = Object.values(newQuestion);
    const addQuestQuery = 'INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpful) VALUES ($4, $1, current_timestamp, $2, $3, false, 0)';
    return db.query(addQuestQuery, inputs);
  },
  markHelpful: (questionID) => {
    const queryString = `UPDATE questions SET question_helpful = question_helpful + 1 WHERE question_id = ${questionID}`;
    return db.query(queryString);
  },
  reportQuestion: (questionID) => {
    const queryString = `UPDATE questions SET reported = true WHERE question_id = ${questionID}`;
    return db.query(queryString);
  },
  getQandASubQuery: (productID, page, count) => {
    const offset = (page - 1) * count;
    const queryString = `SELECT json_agg(resultArr) FROM (SELECT json_build_object(
      'question_id', question_id,
      'question_body', question_body,
      'question_date', question_date,
      'asker_name', asker_name,
      'question_helpfullness', question_helpful,
      'answers', (SELECT json_object_agg(
        answer_id, (SELECT COALESCE(json_build_object(
          'id', answer_id,
          'body', answer_body,
          'date', answer_date,
          'answerer_name', answerer_name,
          'helpfulness', answer_helpful,
          'photos', (SELECT COALESCE (json_agg(
            json_build_object(
              'id', photo_id,
              'url', photo_url
            )), '[]')
          FROM answerPhotos WHERE answerPhotos.answer_id = answers.answer_id)
        ), '{}'))
      ) FROM answers WHERE answers.question_id = questions.question_id)
    ) AS resultArr FROM questions WHERE questions.product_id = ${productID} LIMIT ${count} OFFSET ${offset}) AS result`;
    return db.query(queryString);
  },
};
