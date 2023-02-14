const router = require('express').Router();
const questions = require('./controllers/questions');
const answers = require('./controllers/answers');
// const photos = require('./controllers/photos');

/* Question Routes */
// router.get('/questions/:question_id', questions.getOne);
router.post('/questions', questions.postQuestion);
router.put('/questions/:question_id/helpful', questions.helpful);
router.put('/questions/:question_id/report', questions.report);
router.get('/questions/subquery', questions.getQandASubQuery);

/* Answer Routes */
router.post('/questions/:question_id/answers', answers.addAnswer);
router.put('/answers/:answer_id/helpful', answers.helpful);
router.put('/answers/:answer_id/helpful', answers.report);

module.exports = router;
