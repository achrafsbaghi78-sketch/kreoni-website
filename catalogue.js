// Stable references shared by catalogue, preview and order.
const catalogDesigns = [
  {
    "id": "DTF-114",
    "name": "Dragon — Lame écarlate",
    "category": "Streetwear",
    "collection": "Japan Street",
    "image": "assets/DTF-114.webp",
    "thumbnail": "assets/thumbs/DTF-114.webp",
    "frontImage": "assets/DTF-114-FRONT.webp"
  },
  {
    "id": "DTF-119",
    "name": "Tanger — Nuits du détroit",
    "category": "Maroc",
    "collection": "Morocco Street",
    "image": "assets/DTF-119.webp",
    "thumbnail": "assets/thumbs/DTF-119.webp",
    "frontImage": "assets/DTF-119-FRONT.webp"
  },
  {
    "id": "DTF-124",
    "name": "Loup — Regard polaire",
    "category": "Illustrations",
    "collection": "Wild Spirit",
    "image": "assets/DTF-124.webp",
    "thumbnail": "assets/thumbs/DTF-124.webp",
    "frontImage": "assets/DTF-124-FRONT.webp"
  },
  {
    "id": "DTF-115",
    "name": "Samouraï — Lune silencieuse",
    "category": "Streetwear",
    "collection": "Japan Street",
    "image": "assets/DTF-115.webp",
    "thumbnail": "assets/thumbs/DTF-115.webp",
    "frontImage": "assets/DTF-115-FRONT.webp"
  },
  {
    "id": "DTF-120",
    "name": "Tigre — Zellige royal",
    "category": "Maroc",
    "collection": "Morocco Street",
    "image": "assets/DTF-120.webp",
    "thumbnail": "assets/thumbs/DTF-120.webp",
    "frontImage": "assets/DTF-120-FRONT.webp"
  },
  {
    "id": "DTF-125",
    "name": "Tigre blanc — Instinct",
    "category": "Illustrations",
    "collection": "Wild Spirit",
    "image": "assets/DTF-125.webp",
    "thumbnail": "assets/thumbs/DTF-125.webp",
    "frontImage": "assets/DTF-125-FRONT.webp"
  },
  {
    "id": "DTF-116",
    "name": "Koi — Courant éternel",
    "category": "Streetwear",
    "collection": "Japan Street",
    "image": "assets/DTF-116.webp",
    "thumbnail": "assets/thumbs/DTF-116.webp",
    "frontImage": "assets/DTF-116-FRONT.webp"
  },
  {
    "id": "DTF-121",
    "name": "Lion — Force de l’Atlas",
    "category": "Maroc",
    "collection": "Morocco Street",
    "image": "assets/DTF-121.webp",
    "thumbnail": "assets/thumbs/DTF-121.webp",
    "frontImage": "assets/DTF-121-FRONT.webp"
  },
  {
    "id": "DTF-126",
    "name": "Aigle — Envol libre",
    "category": "Illustrations",
    "collection": "Wild Spirit",
    "image": "assets/DTF-126.webp",
    "thumbnail": "assets/thumbs/DTF-126.webp",
    "frontImage": "assets/DTF-126-FRONT.webp"
  },
  {
    "id": "DTF-117",
    "name": "Kitsune — Esprit nocturne",
    "category": "Streetwear",
    "collection": "Japan Street",
    "image": "assets/DTF-117.webp",
    "thumbnail": "assets/thumbs/DTF-117.webp",
    "frontImage": "assets/DTF-117-FRONT.webp"
  },
  {
    "id": "DTF-122",
    "name": "Portes — Âme de la médina",
    "category": "Maroc",
    "collection": "Morocco Street",
    "image": "assets/DTF-122.webp",
    "thumbnail": "assets/thumbs/DTF-122.webp",
    "frontImage": "assets/DTF-122-FRONT.webp"
  },
  {
    "id": "DTF-127",
    "name": "Panthère — Ombre sauvage",
    "category": "Illustrations",
    "collection": "Wild Spirit",
    "image": "assets/DTF-127.webp",
    "thumbnail": "assets/thumbs/DTF-127.webp",
    "frontImage": "assets/DTF-127-FRONT.webp"
  },
  {
    "id": "DTF-118",
    "name": "Grue — Vent du matin",
    "category": "Streetwear",
    "collection": "Japan Street",
    "image": "assets/DTF-118.webp",
    "thumbnail": "assets/thumbs/DTF-118.webp",
    "frontImage": "assets/DTF-118-FRONT.webp"
  },
  {
    "id": "DTF-123",
    "name": "Faucon — Horizon du Maroc",
    "category": "Maroc",
    "collection": "Morocco Street",
    "image": "assets/DTF-123.webp",
    "thumbnail": "assets/thumbs/DTF-123.webp",
    "frontImage": "assets/DTF-123-FRONT.webp"
  },
  {
    "id": "DTF-128",
    "name": "Cerf — Couronne des bois",
    "category": "Illustrations",
    "collection": "Wild Spirit",
    "image": "assets/DTF-128.webp",
    "thumbnail": "assets/thumbs/DTF-128.webp",
    "frontImage": "assets/DTF-128-FRONT.webp"
  },
  {
    "id": "DTF-084",
    "name": "Naruto — Tourbillon solaire",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-084.webp",
    "thumbnail": "assets/thumbs/DTF-084.webp"
  },
  {
    "id": "DTF-094",
    "name": "Ichigo — Lame du destin",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-094.webp",
    "thumbnail": "assets/thumbs/DTF-094.webp"
  },
  {
    "id": "DTF-104",
    "name": "Sung Jinwoo — Monarque des ombres",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-104.webp",
    "thumbnail": "assets/thumbs/DTF-104.webp"
  },
  {
    "id": "DTF-085",
    "name": "Sasuke — Éclair indigo",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-085.webp",
    "thumbnail": "assets/thumbs/DTF-085.webp"
  },
  {
    "id": "DTF-095",
    "name": "Rukia — Neige silencieuse",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-095.webp",
    "thumbnail": "assets/thumbs/DTF-095.webp"
  },
  {
    "id": "DTF-105",
    "name": "Igris — Serment du chevalier",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-105.webp",
    "thumbnail": "assets/thumbs/DTF-105.webp"
  },
  {
    "id": "DTF-086",
    "name": "Itachi — Nuée écarlate",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-086.webp",
    "thumbnail": "assets/thumbs/DTF-086.webp"
  },
  {
    "id": "DTF-096",
    "name": "Byakuya — Mille pétales",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-096.webp",
    "thumbnail": "assets/thumbs/DTF-096.webp"
  },
  {
    "id": "DTF-106",
    "name": "Beru — Roi des fourmis",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-106.webp",
    "thumbnail": "assets/thumbs/DTF-106.webp"
  },
  {
    "id": "DTF-087",
    "name": "Kakashi — Foudre argentée",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-087.webp",
    "thumbnail": "assets/thumbs/DTF-087.webp"
  },
  {
    "id": "DTF-097",
    "name": "Toshiro — Dragon de glace",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-097.webp",
    "thumbnail": "assets/thumbs/DTF-097.webp"
  },
  {
    "id": "DTF-107",
    "name": "Cha Hae-In — Lame de lumière",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-107.webp",
    "thumbnail": "assets/thumbs/DTF-107.webp"
  },
  {
    "id": "DTF-088",
    "name": "Gaara — Gardien du sable",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-088.webp",
    "thumbnail": "assets/thumbs/DTF-088.webp"
  },
  {
    "id": "DTF-098",
    "name": "Kenpachi — Force brute",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-098.webp",
    "thumbnail": "assets/thumbs/DTF-098.webp"
  },
  {
    "id": "DTF-108",
    "name": "Choi Jong-In — Cercle de feu",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-108.webp",
    "thumbnail": "assets/thumbs/DTF-108.webp"
  },
  {
    "id": "DTF-089",
    "name": "Minato — Éclair jaune",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-089.webp",
    "thumbnail": "assets/thumbs/DTF-089.webp"
  },
  {
    "id": "DTF-099",
    "name": "Urahara — Ombre émeraude",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-099.webp",
    "thumbnail": "assets/thumbs/DTF-099.webp"
  },
  {
    "id": "DTF-109",
    "name": "Baek Yoonho — Tigre blanc",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-109.webp",
    "thumbnail": "assets/thumbs/DTF-109.webp"
  },
  {
    "id": "DTF-090",
    "name": "Hinata — Paumes jumelles",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-090.webp",
    "thumbnail": "assets/thumbs/DTF-090.webp"
  },
  {
    "id": "DTF-100",
    "name": "Yoruichi — Éclair félin",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-100.webp",
    "thumbnail": "assets/thumbs/DTF-100.webp"
  },
  {
    "id": "DTF-110",
    "name": "Yoo Jinho — Courage fidèle",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-110.webp",
    "thumbnail": "assets/thumbs/DTF-110.webp"
  },
  {
    "id": "DTF-091",
    "name": "Madara — Volonté de fer",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-091.webp",
    "thumbnail": "assets/thumbs/DTF-091.webp"
  },
  {
    "id": "DTF-101",
    "name": "Aizen — Illusion parfaite",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-101.webp",
    "thumbnail": "assets/thumbs/DTF-101.webp"
  },
  {
    "id": "DTF-111",
    "name": "Jinwoo — Éveil bleu",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-111.webp",
    "thumbnail": "assets/thumbs/DTF-111.webp"
  },
  {
    "id": "DTF-092",
    "name": "Pain — Onde gravitationnelle",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-092.webp",
    "thumbnail": "assets/thumbs/DTF-092.webp"
  },
  {
    "id": "DTF-102",
    "name": "Ulquiorra — Lune d’émeraude",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-102.webp",
    "thumbnail": "assets/thumbs/DTF-102.webp"
  },
  {
    "id": "DTF-112",
    "name": "Jinwoo et Igris — Pacte des ombres",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-112.webp",
    "thumbnail": "assets/thumbs/DTF-112.webp"
  },
  {
    "id": "DTF-093",
    "name": "Kurama — Neuf queues",
    "category": "Anime",
    "collection": "Naruto",
    "image": "assets/DTF-093.webp",
    "thumbnail": "assets/thumbs/DTF-093.webp"
  },
  {
    "id": "DTF-103",
    "name": "Grimmjow — Instinct bleu",
    "category": "Anime",
    "collection": "Bleach",
    "image": "assets/DTF-103.webp",
    "thumbnail": "assets/thumbs/DTF-103.webp"
  },
  {
    "id": "DTF-113",
    "name": "Jinwoo et Beru — Garde du monarque",
    "category": "Anime",
    "collection": "Solo Leveling",
    "image": "assets/DTF-113.webp",
    "thumbnail": "assets/thumbs/DTF-113.webp"
  },
  {
    "id": "DTF-054",
    "name": "Tanjiro — Danse des éléments",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-054.webp",
    "thumbnail": "assets/thumbs/DTF-054.webp"
  },
  {
    "id": "DTF-064",
    "name": "Luffy — Liberté Gear 5",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-064.webp",
    "thumbnail": "assets/thumbs/DTF-064.webp"
  },
  {
    "id": "DTF-074",
    "name": "Gojo — Infini violet",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-074.webp",
    "thumbnail": "assets/thumbs/DTF-074.webp"
  },
  {
    "id": "DTF-055",
    "name": "Nezuko — Lune rose",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-055.webp",
    "thumbnail": "assets/thumbs/DTF-055.webp"
  },
  {
    "id": "DTF-065",
    "name": "Zoro — Trois sabres",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-065.webp",
    "thumbnail": "assets/thumbs/DTF-065.webp"
  },
  {
    "id": "DTF-075",
    "name": "Sukuna — Roi des malédictions",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-075.webp",
    "thumbnail": "assets/thumbs/DTF-075.webp"
  },
  {
    "id": "DTF-056",
    "name": "Zenitsu — Éclair doré",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-056.webp",
    "thumbnail": "assets/thumbs/DTF-056.webp"
  },
  {
    "id": "DTF-066",
    "name": "Sanji — Pas de feu",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-066.webp",
    "thumbnail": "assets/thumbs/DTF-066.webp"
  },
  {
    "id": "DTF-076",
    "name": "Yuji — Impact noir",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-076.webp",
    "thumbnail": "assets/thumbs/DTF-076.webp"
  },
  {
    "id": "DTF-057",
    "name": "Inosuke — Instinct sauvage",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-057.webp",
    "thumbnail": "assets/thumbs/DTF-057.webp"
  },
  {
    "id": "DTF-067",
    "name": "Ace — Flamme éternelle",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-067.webp",
    "thumbnail": "assets/thumbs/DTF-067.webp"
  },
  {
    "id": "DTF-077",
    "name": "Megumi — Ombres jumelles",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-077.webp",
    "thumbnail": "assets/thumbs/DTF-077.webp"
  },
  {
    "id": "DTF-058",
    "name": "Rengoku — Cœur ardent",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-058.webp",
    "thumbnail": "assets/thumbs/DTF-058.webp"
  },
  {
    "id": "DTF-068",
    "name": "Law — Cercle du destin",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-068.webp",
    "thumbnail": "assets/thumbs/DTF-068.webp"
  },
  {
    "id": "DTF-078",
    "name": "Toji — Force silencieuse",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-078.webp",
    "thumbnail": "assets/thumbs/DTF-078.webp"
  },
  {
    "id": "DTF-059",
    "name": "Giyu — Silence de l’eau",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-059.webp",
    "thumbnail": "assets/thumbs/DTF-059.webp"
  },
  {
    "id": "DTF-069",
    "name": "Shanks — Horizon rouge",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-069.webp",
    "thumbnail": "assets/thumbs/DTF-069.webp"
  },
  {
    "id": "DTF-079",
    "name": "Yuta — Lien indestructible",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-079.webp",
    "thumbnail": "assets/thumbs/DTF-079.webp"
  },
  {
    "id": "DTF-060",
    "name": "Shinobu — Ailes de nuit",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-060.webp",
    "thumbnail": "assets/thumbs/DTF-060.webp"
  },
  {
    "id": "DTF-070",
    "name": "Robin — Fleur mystérieuse",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-070.webp",
    "thumbnail": "assets/thumbs/DTF-070.webp"
  },
  {
    "id": "DTF-080",
    "name": "Geto — Spirale obscure",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-080.webp",
    "thumbnail": "assets/thumbs/DTF-080.webp"
  },
  {
    "id": "DTF-061",
    "name": "Tengen — Rythme éclatant",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-061.webp",
    "thumbnail": "assets/thumbs/DTF-061.webp"
  },
  {
    "id": "DTF-071",
    "name": "Nami — Boussole céleste",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-071.webp",
    "thumbnail": "assets/thumbs/DTF-071.webp"
  },
  {
    "id": "DTF-081",
    "name": "Nanami — Précision",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-081.webp",
    "thumbnail": "assets/thumbs/DTF-081.webp"
  },
  {
    "id": "DTF-062",
    "name": "Muichiro — Brume azur",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-062.webp",
    "thumbnail": "assets/thumbs/DTF-062.webp"
  },
  {
    "id": "DTF-072",
    "name": "Chopper — Petit courage",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-072.webp",
    "thumbnail": "assets/thumbs/DTF-072.webp"
  },
  {
    "id": "DTF-082",
    "name": "Nobara — Volonté d’acier",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-082.webp",
    "thumbnail": "assets/thumbs/DTF-082.webp"
  },
  {
    "id": "DTF-063",
    "name": "Akaza — Lune de combat",
    "category": "Anime",
    "collection": "Demon Slayer",
    "image": "assets/DTF-063.webp",
    "thumbnail": "assets/thumbs/DTF-063.webp"
  },
  {
    "id": "DTF-073",
    "name": "Thousand Sunny — Cap sur l’aventure",
    "category": "Anime",
    "collection": "One Piece",
    "image": "assets/DTF-073.webp",
    "thumbnail": "assets/thumbs/DTF-073.webp"
  },
  {
    "id": "DTF-083",
    "name": "Maki — Détermination",
    "category": "Anime",
    "collection": "Jujutsu Kaisen",
    "image": "assets/DTF-083.webp",
    "thumbnail": "assets/thumbs/DTF-083.webp"
  },
  {
    "id": "DTF-051",
    "name": "Le dernier souffle de la forêt",
    "category": "Anime",
    "image": "assets/DTF-051.webp",
    "thumbnail": "assets/thumbs/DTF-051.webp",
    "collection": "Histoires & émotions",
    "message": "Protéger le vivant",
    "story": "Un loup veille sur une jeune pousse entre forêt vivante et branches brûlées. Même après la destruction, un geste de protection peut faire renaître la vie."
  },
  {
    "id": "DTF-052",
    "name": "Au-delà des distances",
    "category": "Anime",
    "image": "assets/DTF-052.webp",
    "thumbnail": "assets/thumbs/DTF-052.webp",
    "collection": "Histoires & émotions",
    "message": "Le lien qui demeure",
    "story": "Deux silhouettes éloignées restent reliées par un fil rouge sous les étoiles. Une histoire de mémoire, de rencontre et d’espoir malgré la distance."
  },
  {
    "id": "DTF-053",
    "name": "Une seconde chance",
    "category": "Anime",
    "image": "assets/DTF-053.webp",
    "thumbnail": "assets/thumbs/DTF-053.webp",
    "collection": "Histoires & émotions",
    "message": "Choisir de se comprendre",
    "story": "Deux mains se rapprochent au-dessus des mêmes ondes. Écouter, réparer et pardonner ouvrent la voie à une nouvelle rencontre."
  },
  {
    "id": "DTF-001",
    "name": "Lune écarlate",
    "category": "Anime",
    "image": "assets/DTF-001.webp",
    "thumbnail": "assets/thumbs/DTF-001.webp"
  },
  {
    "id": "DTF-002",
    "name": "Dragon céleste",
    "category": "Fantasy",
    "image": "assets/DTF-002.webp",
    "thumbnail": "assets/thumbs/DTF-002.webp"
  },
  {
    "id": "DTF-003",
    "name": "Esprit des vagues",
    "category": "Illustrations",
    "image": "assets/DTF-003.webp",
    "thumbnail": "assets/thumbs/DTF-003.webp"
  },
  {
    "id": "DTF-004",
    "name": "Samouraï néon",
    "category": "Anime",
    "image": "assets/DTF-004.webp",
    "thumbnail": "assets/thumbs/DTF-004.webp"
  },
  {
    "id": "DTF-005",
    "name": "Phénix solaire",
    "category": "Fantasy",
    "image": "assets/DTF-005.webp",
    "thumbnail": "assets/thumbs/DTF-005.webp"
  },
  {
    "id": "DTF-006",
    "name": "Danse des koïs",
    "category": "Illustrations",
    "image": "assets/DTF-006.webp",
    "thumbnail": "assets/thumbs/DTF-006.webp"
  },
  {
    "id": "DTF-007",
    "name": "Gardienne sakura",
    "category": "Anime",
    "image": "assets/DTF-007.webp",
    "thumbnail": "assets/thumbs/DTF-007.webp"
  },
  {
    "id": "DTF-008",
    "name": "Ronin des brumes",
    "category": "Anime",
    "image": "assets/DTF-008.webp",
    "thumbnail": "assets/thumbs/DTF-008.webp"
  },
  {
    "id": "DTF-009",
    "name": "Renard des étoiles",
    "category": "Anime",
    "image": "assets/DTF-009.webp",
    "thumbnail": "assets/thumbs/DTF-009.webp"
  },
  {
    "id": "DTF-010",
    "name": "Course néon",
    "category": "Anime",
    "image": "assets/DTF-010.webp",
    "thumbnail": "assets/thumbs/DTF-010.webp"
  },
  {
    "id": "DTF-011",
    "name": "Lame de glace",
    "category": "Anime",
    "image": "assets/DTF-011.webp",
    "thumbnail": "assets/thumbs/DTF-011.webp"
  },
  {
    "id": "DTF-012",
    "name": "Chat astronaute",
    "category": "Anime",
    "image": "assets/DTF-012.webp",
    "thumbnail": "assets/thumbs/DTF-012.webp"
  },
  {
    "id": "DTF-013",
    "name": "Tempête rouge",
    "category": "Anime",
    "image": "assets/DTF-013.webp",
    "thumbnail": "assets/thumbs/DTF-013.webp"
  },
  {
    "id": "DTF-014",
    "name": "Robot botanique",
    "category": "Anime",
    "image": "assets/DTF-014.webp",
    "thumbnail": "assets/thumbs/DTF-014.webp"
  },
  {
    "id": "DTF-015",
    "name": "Masque kitsune",
    "category": "Anime",
    "image": "assets/DTF-015.webp",
    "thumbnail": "assets/thumbs/DTF-015.webp"
  },
  {
    "id": "DTF-016",
    "name": "Esprit du vent",
    "category": "Anime",
    "image": "assets/DTF-016.webp",
    "thumbnail": "assets/thumbs/DTF-016.webp"
  },
  {
    "id": "DTF-017",
    "name": "Loup lunaire",
    "category": "Fantasy",
    "image": "assets/DTF-017.webp",
    "thumbnail": "assets/thumbs/DTF-017.webp"
  },
  {
    "id": "DTF-018",
    "name": "Tigre de jade",
    "category": "Fantasy",
    "image": "assets/DTF-018.webp",
    "thumbnail": "assets/thumbs/DTF-018.webp"
  },
  {
    "id": "DTF-019",
    "name": "Serpent astral",
    "category": "Fantasy",
    "image": "assets/DTF-019.webp",
    "thumbnail": "assets/thumbs/DTF-019.webp"
  },
  {
    "id": "DTF-020",
    "name": "Griffon impérial",
    "category": "Fantasy",
    "image": "assets/DTF-020.webp",
    "thumbnail": "assets/thumbs/DTF-020.webp"
  },
  {
    "id": "DTF-021",
    "name": "Cerf des aurores",
    "category": "Fantasy",
    "image": "assets/DTF-021.webp",
    "thumbnail": "assets/thumbs/DTF-021.webp"
  },
  {
    "id": "DTF-022",
    "name": "Corbeau d’obsidienne",
    "category": "Fantasy",
    "image": "assets/DTF-022.webp",
    "thumbnail": "assets/thumbs/DTF-022.webp"
  },
  {
    "id": "DTF-023",
    "name": "Dragon des mers",
    "category": "Fantasy",
    "image": "assets/DTF-023.webp",
    "thumbnail": "assets/thumbs/DTF-023.webp"
  },
  {
    "id": "DTF-024",
    "name": "Lion solaire",
    "category": "Fantasy",
    "image": "assets/DTF-024.webp",
    "thumbnail": "assets/thumbs/DTF-024.webp"
  },
  {
    "id": "DTF-025",
    "name": "Papillon cosmique",
    "category": "Fantasy",
    "image": "assets/DTF-025.webp",
    "thumbnail": "assets/thumbs/DTF-025.webp"
  },
  {
    "id": "DTF-026",
    "name": "Gardien des ruines",
    "category": "Fantasy",
    "image": "assets/DTF-026.webp",
    "thumbnail": "assets/thumbs/DTF-026.webp"
  },
  {
    "id": "DTF-027",
    "name": "Méduse céleste",
    "category": "Illustrations",
    "image": "assets/DTF-027.webp",
    "thumbnail": "assets/thumbs/DTF-027.webp"
  },
  {
    "id": "DTF-028",
    "name": "Poulpe profond",
    "category": "Illustrations",
    "image": "assets/DTF-028.webp",
    "thumbnail": "assets/thumbs/DTF-028.webp"
  },
  {
    "id": "DTF-029",
    "name": "Baleine des nuages",
    "category": "Illustrations",
    "image": "assets/DTF-029.webp",
    "thumbnail": "assets/thumbs/DTF-029.webp"
  },
  {
    "id": "DTF-030",
    "name": "Fleur de minuit",
    "category": "Illustrations",
    "image": "assets/DTF-030.webp",
    "thumbnail": "assets/thumbs/DTF-030.webp"
  },
  {
    "id": "DTF-031",
    "name": "Soleil géométrique",
    "category": "Illustrations",
    "image": "assets/DTF-031.webp",
    "thumbnail": "assets/thumbs/DTF-031.webp"
  },
  {
    "id": "DTF-032",
    "name": "Éclipse sauvage",
    "category": "Illustrations",
    "image": "assets/DTF-032.webp",
    "thumbnail": "assets/thumbs/DTF-032.webp"
  },
  {
    "id": "DTF-033",
    "name": "Oiseau de paradis",
    "category": "Illustrations",
    "image": "assets/DTF-033.webp",
    "thumbnail": "assets/thumbs/DTF-033.webp"
  },
  {
    "id": "DTF-034",
    "name": "Vague infinie",
    "category": "Illustrations",
    "image": "assets/DTF-034.webp",
    "thumbnail": "assets/thumbs/DTF-034.webp"
  },
  {
    "id": "DTF-035",
    "name": "Cœur chromé",
    "category": "Streetwear",
    "image": "assets/DTF-035.webp",
    "thumbnail": "assets/thumbs/DTF-035.webp"
  },
  {
    "id": "DTF-036",
    "name": "Rose électrique",
    "category": "Streetwear",
    "image": "assets/DTF-036.webp",
    "thumbnail": "assets/thumbs/DTF-036.webp"
  },
  {
    "id": "DTF-037",
    "name": "Œil galactique",
    "category": "Streetwear",
    "image": "assets/DTF-037.webp",
    "thumbnail": "assets/thumbs/DTF-037.webp"
  },
  {
    "id": "DTF-038",
    "name": "Crâne fleuri",
    "category": "Streetwear",
    "image": "assets/DTF-038.webp",
    "thumbnail": "assets/thumbs/DTF-038.webp"
  },
  {
    "id": "DTF-039",
    "name": "Basket cosmique",
    "category": "Streetwear",
    "image": "assets/DTF-039.webp",
    "thumbnail": "assets/thumbs/DTF-039.webp"
  },
  {
    "id": "DTF-040",
    "name": "Cassette rétro",
    "category": "Streetwear",
    "image": "assets/DTF-040.webp",
    "thumbnail": "assets/thumbs/DTF-040.webp"
  },
  {
    "id": "DTF-041",
    "name": "Panthère urbaine",
    "category": "Streetwear",
    "image": "assets/DTF-041.webp",
    "thumbnail": "assets/thumbs/DTF-041.webp"
  },
  {
    "id": "DTF-042",
    "name": "Énergie liquide",
    "category": "Streetwear",
    "image": "assets/DTF-042.webp",
    "thumbnail": "assets/thumbs/DTF-042.webp"
  },
  {
    "id": "DTF-043",
    "name": "Porte de Tanger",
    "category": "Maroc",
    "image": "assets/DTF-043.webp",
    "thumbnail": "assets/thumbs/DTF-043.webp"
  },
  {
    "id": "DTF-044",
    "name": "Zellige royal",
    "category": "Maroc",
    "image": "assets/DTF-044.webp",
    "thumbnail": "assets/thumbs/DTF-044.webp"
  },
  {
    "id": "DTF-045",
    "name": "Atlas sauvage",
    "category": "Maroc",
    "image": "assets/DTF-045.webp",
    "thumbnail": "assets/thumbs/DTF-045.webp"
  },
  {
    "id": "DTF-046",
    "name": "Nuit du désert",
    "category": "Maroc",
    "image": "assets/DTF-046.webp",
    "thumbnail": "assets/thumbs/DTF-046.webp"
  },
  {
    "id": "DTF-047",
    "name": "Thé à la menthe",
    "category": "Maroc",
    "image": "assets/DTF-047.webp",
    "thumbnail": "assets/thumbs/DTF-047.webp"
  },
  {
    "id": "DTF-048",
    "name": "Lion de l’Atlas",
    "category": "Maroc",
    "image": "assets/DTF-048.webp",
    "thumbnail": "assets/thumbs/DTF-048.webp"
  },
  {
    "id": "DTF-049",
    "name": "Ruelle bleue",
    "category": "Maroc",
    "image": "assets/DTF-049.webp",
    "thumbnail": "assets/thumbs/DTF-049.webp"
  },
  {
    "id": "DTF-050",
    "name": "Main fleurie",
    "category": "Maroc",
    "image": "assets/DTF-050.webp",
    "thumbnail": "assets/thumbs/DTF-050.webp"
  }
];
