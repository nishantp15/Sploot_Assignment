
const express = require('express')
const articleRouter = express.Router()
const auth = require('../middleware/auth');

const articleControllers = require('../controllers/articleController');

// READ
articleRouter.get('/articles', async (req, res) => {

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
        totalRecords: totalarticles,
        data: articles
    })
})

// READ
articleRouter.get('/article/:id', async (req, res) => {

    const id = req.params.id;

    let article = null;
    try {
        article = await articleControllers.findById(id);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            // message: 'Server ran into an unexpected error'
            message: err.message
        })
    }

    if (article) {
        return res.send({
            data: article
        })
    } else {
        return res.status(404).send({
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
            message: err.message // 'Server ran into an unexpected error'
        })
    }

    return res.send({
        data: article
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
            message: err.message // 'Server ran into an unexpected error'
        })
    }

    return res.send({
        data: article
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
            message: err.message // 'Server ran into an unexpected error'
        })
    }

    if (article) {
        return res.send({
            data: article
        })
    } else {
        return res.status(404).send({
            message: 'article with given id does not exist'
        })
    }
})

module.exports = articleRouter;
