// Stable references shared by catalogue, preview and order.
const catalogDesigns = [
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
