const Sauce = require('../models/sauce');

exports.userChoose = (req, res, next)=>{    
  const choose = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;

    switch (choose) {
      //si l'utilisateur retire un vote
      case 0:              
        //on appele la sauce                                      
        Sauce.findOne({ _id: sauceId })
          .then((sauce) => {
            //on verifie dans le tableau userLikes si l'utilisateur y est dèjà
            if (sauce.userLikes.includes(userId)) {
              // si il y est on retire son like et on le retire du tableau  
              Sauce.updateOne({ _id: sauceId }, { 
                $pull: { userLikes: userId },
                $inc: { likes: -1 }
              })
              .then(() => { res.status(201).json({ message: "dislikes retiré."}); }) 
              .catch((error) => { res.status(400).json({error}); });
  
            } 
            //on verifie dans le tableau userDislikes si l'utilisateur y est dèjà
            else if (sauce.userDislikes.includes(userId)) { 
              // si il y est on retire son dislike et on le retire du tableau
              Sauce.updateOne({ _id: sauceId }, {
                $pull: { userDislikes: userId },
                $inc: { dislikes: -1 }
              })
              .then(() => { res.status(201).json({ message: "dislikes retiré." }); })
              .catch((error) => { res.status(400).json({error}); });
            }
          })
          .catch((error) => { res.status(404).json({error}); });
        break;
      
      // si l'utilisateur aime une sauce 
      case 1:                                                 
        //on appele la sauce                                      
        Sauce.findOne({ _id: sauceId })
          .then((sauce) => {
            //on verifie dans le tableau userLikes si l'utilisateur y est dèjà
            if (sauce.userLikes.includes(userId)) {
              // si il y est on retire on like a 0  
              Sauce.findOne({ _id: sauceId })
               .then(() => { res.status(201).json({ message: "like déjà enregistré." }); })
               .catch((error) => { res.status(400).json({error}); });
            }             
            //on verifie dans le tableau userDislikes si l'utilisateur y est dèjà
            else if (sauce.userDislikes.includes(userId)) { 
              // si il y est on retire son dislike et on le retire du tableau
              Sauce.updateOne({ _id: sauceId },
                 {
                    $pull: { userDislikes: userId },
                    $inc: { dislikes: -1, likes: 1},
                    $push: { userLikes: userId }
                })
                .then(() => { res.status(201).json({ message: "changement de vote dislikes=>likes." }); })
                .catch((error) => { res.status(400).json({error}); });
            }
            else{
              Sauce.updateOne(
                // on met userId dans la table userlikes
                { _id: sauceId },
                { $push: { userLikes: userId },
                 $inc: { likes: 1 } }
              )
                .then(() => res.status(200).json({ message: " like ajouté !" }))
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((error) => { res.status(404).json({error}); });
        break;
      
      // si l'utilisateur n'aime pas une sauce
      case -1:                                                  
        //on appele la sauce                                      
        Sauce.findOne({ _id: sauceId })
          .then((sauce) => {
            //on verifie dans le tableau userDislikes si l'utilisateur y est dèjà
            if (sauce.userDislikes.includes(userId)) {
              // si il y est on retire on like a 0  
              Sauce.findOne({ _id: sauceId })
               .then(() => { res.status(201).json({ message: "dislikes déjà enregistré." }); })
               .catch((error) => { res.status(400).json({error}); });  
            } 
            //on verifie dans le tableau userLikes si l'utilisateur y est dèjà
            else if (sauce.userLikes.includes(userId)) { 
              // si il y est on retire son dislike et on le retire du tableau
              Sauce.updateOne({ _id: sauceId },
                 {
                    $pull: { userLikes: userId },
                    $inc: { likes: -1 ,dislikes : 1},
                    $push: { userDislikes: userId }
                })
                .then(() => { res.status(201).json({ message: "changement de vote likes => dislikes" }); })
                .catch((error) => { res.status(400).json({error}); });
            }
            else{
              Sauce.updateOne(
                // on met userId dans la table userDislikes
                { _id: sauceId },
                { $push: { userDislikes: userId },
                 $inc: { dislikes: 1 } }
              )
                .then(() => res.status(200).json({ message: " dislikes ajouté !" }))
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((error) => { res.status(404).json({error}); });
        break;
      default:
        console.error("je ne comprends pas la question");
    }
};
