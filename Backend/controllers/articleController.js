const { articleModel } = require("../Database/articles");
const { userModel } = require("../Database/users");

async function findPaginated({
    page = 1,
    pageSize = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search = ''
}) {

    const totalArticles = await articleModel.count({
        title: {
            $regex: search
        }
    });

    const articles = await articleModel.find({
        title: {
            $regex: search
        }
    })
    .sort({
        [sortBy]: sortOrder == 'asc' ? 1 : -1
    })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

    return {
        totalArticles,
        articles
    }
}

async function findById(id) {
    return articleModel.findById(id);
}

async function createarticle(userId, articleData) {

    const user = await userModel.findById(userId)

    if (!user) {
        throw new Error('User does not exist');
    }

    const article = await articleModel.create({
        title: articleData.title,
        description: articleData.description,
        author: {
            _id: user._id,
            name: user.name,
        }
    })

    return article;
}

async function updatearticle(userId, articleId, articleData) {
    
    const user = await userModel.findById(userId)

    if (!user) {
        throw new Error('User does not exist');
    }

    let post = await articleModel.findById(articleId);

    if (!post) {
        throw new Error('Post does not exist');
    }

    if (String(post.author._id) !== String(user._id)) {
        throw new Error('User ca\'t edit the post')
    }

    post.update({
        $set: {
            title: articleData.title,
            content: articleData.content,
        }
    })

    post = await articleModel.findById(articleId);

    return post;
}

async function deletearticle(userId, articleId) {
        
    const user = await userModel.findById(userId)

    if (!user) {
        throw new Error('User does not exist');
    }

    let post = await articleModel.findById(articleId);

    if (!post) {
        throw new Error('Post does not exist');
    }

    if (String(post.author._id) !== String(user._id)) {
        throw new Error('User ca\'t delete the post')
    }

    post = await articleModel.findByIdAndDelete(articleId)

    return post;
}

module.exports = {
    findById,
    findPaginated,
    createarticle,
    updatearticle,
    deletearticle
}