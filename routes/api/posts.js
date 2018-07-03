const express = require('express')
const passport = require('passport')
const router = express.Router()

// Load post model;
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// Load validation
const validatePostInput = require('../../validation/post')

// @route GET api/posts
// @desc Get posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({
      noPostsFound: 'No posts found'
    }))
})

// @route GET api/posts/:_id
// @desc Get post by id
// @access Public
router.get('/:_id', (req, res) => {
  Post.findById(req.params._id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({
      noPostFound: 'No post found with that id'
    }))
})

// @route POST api/posts
// @desc Create posts
// @access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validatePostInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Post.create({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    })
    .then(post => res.json(post))
})

// @route DELETE api/posts/:_id
// @desc Delete post by id
// @access Private
router.delete('/:_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(() => {
      Post.findById(req.params._id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            req.status(401).json({
              unauthorized: 'user not authorized'
            })
          }

          //Delete the post
          post.remove().then(() => res.json({
            success: true
          }))
        })
        .catch(() => res.status(404).json({
          postNotFound: 'Post not found'
        }))
    })
})

// @route POST api/posts/like/:_id
// @desc Create like 
// @access Private
router.post('/like/:_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(() => {
      Post.findById(req.params._id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
              alreadyLiked: 'User already liked this post'
            })
          }

          post.likes.unshift({
            user: req.user.id
          })
          post.save().then(post => res.json(post))

        })
        .catch((err) => res.status(404).json(err))
    })
})

// @route POST api/posts/unlike/:_id
// @desc Unlike post 
// @access Private
router.post('/unlike/:_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(() => {
      Post.findById(req.params._id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
              notLiked: 'User has not yest liked this post'
            })
          }

          const removeIndex = post.likes.map(like => like.user.toString())
            .indexOf(req.user.id)

          post.likes.splice(removeIndex, 1);

          post.save().then(post => res.json(post))

        })
        .catch((err) => res.status(404).json(err))
    })
})

// @route POST api/posts/comment/:id
// @desc Add comment post
// @access Private
router.post('/comment/:_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validatePostInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Post.findById(req.params._id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      // add comment to array
      post.comments.unshift(newComment);
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json(err))
})

// @route POST api/posts/comment/:_id/:comment_id
// @desc Remove comment from post
// @access Private
router.delete('/comment/:_id/:comment_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Post.findById(req.params._id)
    .then(post => {
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id) === 0) {
        return res.status(404).json({
          commentNotFound: 'Comment not found'
        })
      }

      const removeIndex = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.comment_id)

      post.comments.splice(removeIndex, 1)
      post.save().then(res.json(post))
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router