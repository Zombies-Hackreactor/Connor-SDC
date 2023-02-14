const models = require('../models/questions');

module.exports = {
  getOne: (req, res) => {
    models.getOne(req.params.question_id)
      .then((data) => res.status(200).send(data.rows))
      .catch(() => res.status(400).send('Could not get Question'));
  },
  postQuestion: (req, res) => {
    models.addQuestion(req.body)
      .then((data) => res.status(201).send(data))
      .catch(() => res.status(400).send('Unable to add question'));
  },
  helpful: (req, res) => {
    models.markHelpful(req.params.question_id)
      .then(() => res.sendStatus(204))
      .catch(() => res.status(400).send('Unable to mark as helpful'));
  },
  report: (req, res) => {
    models.reportQuestion(req.params.question_id)
      .then(() => res.sendStatus(204))
      .catch(() => res.status(400).send('Unable to report question'));
  },
  getQandASubQuery: (req, res) => {
    console.log(req.query);
    models.getQandASubQuery(req.query.productID, req.query.page, req.query.count)
      .then((data) => {
        const returnObj = {
          product_id: req.query.productID,
          results: data.rows[0].json_agg,
        };
        res.status(200).send(returnObj);
      })
      .catch(() => res.status(400).send('Unable to get questions'));
  },
};
