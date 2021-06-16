const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sourceData = JSON.parse(req.body.sauce);
  console.log(sourceData)
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    name: sourceData.name,
    manufacturer: sourceData.manufacturer,
    description: sourceData.description,
    mainPepper: sourceData.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    userId: sourceData.userId,
    heat: sourceData.heat,
    usersLiked: [],
    usersDislike: []
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  console.log('body', req.body)
  const sauceData = req.body

  if (req.file) {
    sauceData.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
  }

  Sauce.updateOne({
    _id: req.params.id
  }, sauceData).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        sauce.deleteOne({
          _id: req.params.id
        }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.likeSauce = (req, res, next) => {
  console.log(req.body)

  const userId = req.body.userId
  const like = req.body.like
  const id = req.params.id

  Sauce.findOne({
      _id: id
    })
    .then(sauce => {
      const sauceData = {
        _id: id
      }

      const usersDisliked = sauce.usersDisliked.includes(userId)

      if (like > 0) {
        sauceData.$inc = {
          likes: 1
        }
        sauceData.$push = {
          usersLiked: userId
        }
      } else if (like === -1) {
        sauceData.$inc = {
          dislikes: 1
        }
        sauceData.$push = {
          usersDisliked: userId
        }
      } else {
        if (usersDisliked) {
          sauceData.$inc = {
            dislikes: -1
          }
          sauceData.$pull = {
            usersDisliked: userId
          }
        } else {
          sauceData.$inc = {
            likes: -1
          }
          sauceData.$pull = {
            usersLiked: userId
          }
        }
      }

      console.log(sauceData)

      Sauce.updateOne({
          _id: id
        }, sauceData)
        .then(
          () =>
          res.status(201).json({
            message: 'Sauce has been liked! :)'
          })

        ).catch(
          (error) => {
            res.status(404).json({
              error: error
            });
          }
        );
    })
};