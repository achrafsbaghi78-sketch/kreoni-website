# Catalogue DTF et aperçu textile

Le catalogue contient 53 références stables, DTF-001 à DTF-053. Les 44 nouvelles illustrations ont été créées avec l’outil intégré de génération d’images. Les prompts figurent dans `catalogue-generation.json`. Les WebP conservent la transparence des sources; les miniatures de 384 × 576 maximum servent à parcourir le catalogue sans charger toutes les images originales.

## Ajouter des designs

1. Ajouter le visuel dans `assets/` et une miniature dans `assets/thumbs/`.
2. Ajouter une entrée dans `catalogue.js` avec une référence unique, un nom, une catégorie, une image et une miniature. Ne pas réutiliser les anciennes références.
3. Vérifier la qualité et les dimensions réelles avant de préparer le fichier d’impression. L’aperçu du site reste indicatif.

## Aperçu

Chaque produit utilise deux planches photo vierges, face et dos. Les trois panneaux sont toujours dans l’ordre Noir, Blanc, Beige. Le CSS affiche le panneau correspondant à la couleur choisie. L’illustration est une couche distincte: elle ne change pas de référence quand le textile change de couleur. Les vues devant/dos et poitrine ont des zones d’impression adaptées; le mode recto-verso présente les deux faces.

Le catalogue propose recherche sans accents, catégories, chargement de 12 cartes à la fois, affichage sur T-shirt ou design seul. La couleur du catalogue et celle du formulaire sont synchronisées. Le devis WhatsApp reprend référence, couleur, produit et emplacement.

## Vérification

Installer temporairement jsdom avec `npm install --no-save --no-package-lock jsdom`, puis lancer `node tests/catalogue.cjs`.

Le test contrôle 1 749 combinaisons de design, produit, couleur et emplacement; recherche, catégories, pagination; synchronisation des couleurs; référence de commande; retrait du design; B2B et liens du hero. Les images finales et leurs miniatures ont été décodées et les 53 fichiers principaux ont des empreintes distinctes. La validation visuelle dans le navigateur local n’a pas été possible dans l’environnement de travail (accès localhost bloqué).
