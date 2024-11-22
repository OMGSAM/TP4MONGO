// Connexion 
use DBS;

// 1. Insérer  
db.seminaires.insertOne({
  _id: "s1",
  theme: "Animation 3D",
  Description: "Introduction à l'animation 3D",
  cout_journalier: 500,
  Durée: 13,
  Activités: [
    {
      _id: "1",
      nomActivité: "Personnages en 3D",
      descriptionActivité: "Atelier 3D"
    }
  ]
});

// 2. Afficher les thèmes et les descriptions des séminaires
 
db.seminaires.find({}, { theme: 1, Description: 1, _id: 0 }) 

// 3. Afficher le nombre d'activités pour le séminaire ayant le thème "Animation 3D"
 
db.seminaires.aggregate([
  { $match: { theme: "Animation 3D" } },
  { $project: { nombreActivités: { $size: "$Activités" } } }
]) 

// 4. Modifier le coût journalier du séminaire ayant _id = "s2" à 700
db.seminaires.updateOne(
  { _id: "s2" },
  { $set: { cout_journalier: 700 } }
);

// 5. Supprimer les séminaires ayant une durée supérieure à 20
db.seminaires.deleteMany({ Durée: { $gt: 20 } });

// 6. Ajouter une nouvelle activité au séminaire ayant _id = "s1"
db.seminaires.updateOne(
  { _id: "s1" },
  { $push: { Activités: { _id: "2", nomActivité: "Rendu en 3D", descriptionActivité: "Techniques avancées" } } }
);

// 7. Rechercher les séminaires dont le coût journalier est supérieur à 500
 
db.seminaires.find({ cout_journalier: { $gt: 500 } }) 

// 8. Afficher les thèmes des séminaires avec une durée comprise entre 10 et 15 jours
 
db.seminaires.find(
  { Durée: { $gte: 10, $lte: 15 } },
  { theme: 1, _id: 0 }
) 
// 9. Mettre à jour le champ Description pour le séminaire avec _id = "s1"
db.seminaires.updateOne(
  { _id: "s1" },
  { $set: { Description: "Introduction à l'animation 3D. Formation complète sur les bases et avancées." } }
);

// 10. Supprimer toutes les activités d'un séminaire ayant une durée inférieure à 10 jours
db.seminaires.updateMany(
  { Durée: { $lt: 10 } },
  { $unset: { Activités: "" } }
);

// 11. Compter le nombre total de séminaires dans la collection
 

// 12. Ajouter un nouveau séminaire avec un thème "Réalité virtuelle"
db.seminaires.insertOne({
  _id: "s3",
  theme: "Réalité virtuelle",
  Description: "Introduction à la réalité virtuelle",
  cout_journalier: 600,
  Durée: 15,
  Activités: [
    {
      _id: "1",
      nomActivité: "Création de mondes virtuels",
      descriptionActivité: "Immersion totale"
    }
  ]
});

// 13. Trouver le séminaire le plus cher (coût journalier maximal)
 
db.seminaires.find().sort({ cout_journalier: -1 }).limit(1) 

// 14. Afficher les thèmes des séminaires classés par ordre décroissant de leur durée
 
db.seminaires.find({}, { theme: 1, _id: 0 }).sort({ Durée: -1 })
