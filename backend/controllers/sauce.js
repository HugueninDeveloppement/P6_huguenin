const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id }).then(
    () => {
      res.status(201).json({
        message: 'sauce updated successfully!'
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
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink('images/' + filename, () => {
      Sauce.deleteOne({_id: req.params.id}).then(
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
  })
  .catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
};

exports.likedSauce = (req, res, next) => {
  const like = req.body.like;
	const userId = req.body.userId;

  const sauce = Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          if (like == 1) {
            console.log(Sauce.userLikes.includes(userId))
            if (Sauce.userLikes.includes(userId)){
              res.statut(406).json({error: "Vous avez déjà voté"})
            }else{
              // si on like
              Sauce.updateOne(
                // appelle de la fonction updateOne
                { _id: req.params.id }, // en JSON, on vérifie que l'ID du tableau d'objet est égale à l'id de l'URL
                {
                  $push: { userLikes: userId }, // on push dans le tableau usersLikes[] l'id du User qui like
                  $inc: { likes: 1 }
                } // on incrémente de le nombre de like de un
              )
              .then(() => res.status(200).json({ message: "Like ajouté !" }))
              .catch((error) => res.status(400).json({ error }));
            }
            } else if (like == -1) {
            if (Sauce.userDislikes== userId){
                res.statut(406).json({error: "Vous avez déjà voté"})
            }else{
            Sauce.updateOne(
              { _id: req.params.id },
              { $push: { userDislikes: userId },
              $inc: { dislikes: 1 } }
            )
              .then(() => res.status(200).json({ message: "dislike ajouté !" }))
              .catch((error) => res.status(400).json({ error }));
            } 
          } else if (like == 0) {
            Sauce.findOne({ _id: req.params.id }) // on cherche la sauce sur laquelle on se trouve par son url (params)
              .then((sauce) => {
                if (sauce.userLikes.includes(req.body.userId)) {
                  // on vérifie si le tableau de la sauce trouvée possède l'ID de l'user (donc si ce dernier a déjà liké)) ==> si le tableau userLiked contient l'id du user de la requête

                  Sauce.updateOne(
                    // si cette confition est remplie, alors on update la sauce, toujours en la qualifiant par ID.
                    { _id: req.params.id },
                    { $pull: { userLikes: userId }, $inc: { likes: -1 } }
                  )
                    .then(() => res.status(200).json({ message: " like retiré !" }))
                    .catch((error) => res.status(400).json({ error }));
                } else if (sauce.userDislikes.includes(req.body.userId)) {
                  //
                  Sauce.updateOne(
                    { _id: req.params.id },
                    { $pull: { userDislikes: userId }, $inc: { dislikes: -1 } }
                  )
                    .then(() => res.status(200).json({ message: " dislike retiré !" }))
                    .catch((error) => res.status(400).json({ error }));
                }
              })
              .catch((error) => res.status(400).json({ error }));
          } else {
            return res.status(400).json({ error });
          }
        })
        .catch(error => res.status(500).json({ error }))
};


exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'La sauce a bien été supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));

}

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};