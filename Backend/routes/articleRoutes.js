
const express = require('express')
const articleRouter = express.Router()
const auth = require('../middleware/auth');

const articleControllers = require('../controllers/articleController');

// READ
articleRouter.get('/articles',auth, async (req, res) => {

    const {
        page = 1,
        pageSize = 20,
        sortOrder = 'desc',
        search = ''
    } = req.query

    const {totalarticles, articles} = await articleControllers.findPaginated({
        search, page, pageSize, sortOrder
    });

    res.send({
        statusCode: 200,
        data: {
            totalRecords: totalarticles,
            data: articles
        },
        error: "NA",
        message: "NA",
      })
})

// READ
articleRouter.get('/article/:id',auth, async (req, res) => {

    const id = req.params.id;

    let article = null;
    try {
        article = await articleControllers.findById(id);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            statusCode: 500,
            data: {
              data: {},
            },
            error: err.message, 
            message: "Something went wrong"
          })
    }

    if (article) {
        return res.status(200).send({
            statusCode: 200,
            data: {
              data: article,
            },
            error: "NA",
            message: "NA",
          })
    } else {
        return res.status(404).send({
            statusCode: 404,
            data: {
              data: {},
            },
            error: err.message, 
            message: 'article with given id does not exist'
          })
    }

})

// CREATE
articleRouter.post('/users/:userId/articles', auth, async (req, res) => {

    const articleData = req.body;

    const userId = req.params.userId;
//  const userId = req.user._id
    let article = null;
    try {
        article = await articleControllers.createarticle(userId, articleData);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            statusCode: 500,
            data: {
              data: {},
            },
            error: err.message, 
            message: "Something went wrong"
          })
    }

    return res.send({
        statusCode: 200,
        data: {
          data: article,
        },
        error: "NA",
        message: "NA",
      });
})

// UPDATE
articleRouter.patch('/article/:id', auth, async (req, res) => {

    const id = req.params.id;
    const userId = req.user._id;

    const articleData = req.body;

    let article = null;
    try {
        article = await articleControllers.updatearticle(userId, id, articleData);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            statusCode: 500,
            data: {
              data: {},
            },
            error: err.message, 
            message: "Something went wrong"
          })
    }

    return res.send({
        statusCode: 200,
        data: {
          data: article,
        },
        error: "NA",
        message: "NA",
      });
})

// DELETE
articleRouter.delete('/article/:id', auth, async (req, res) => {

    const id = req.params.id;
    const userId = req.user._id;

    let article = null;
    try {
        article = await articleControllers.deletearticle(userId, id);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            statusCode: 500,
            data: {
              data: {},
            },
            error: err.message, 
            message: "Something went wrong"
          })
    }

    if (article) {
        return res.send({
            statusCode: 200,
            data: {
              data: article,
            },
            error: "NA",
            message: "NA",
          })
    } else {
        return res.status(404).send({
            statusCode: 404,
            data: {
              data: {},
            },
            error: err.message, 
            message: 'article with given id does not exist'
          })
    }
})

module.exports = articleRouter;
