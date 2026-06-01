export interface Recipe {
  id: string;
  name: string;
  category: string;
  mealType: string;
  diet: string;
  time: number; // en minutos
  difficulty: "Fácil" | "Media" | "Difícil";
  ingredientsRequired: string[]; // de la lista de ingredientes
  steps: string[];
  rating: number;
  imageUrl: string;
  description: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
}

export const CATEGORIES = [
  "Verduras",
  "Frutas",
  "Carne",
  "Pescado",
  "Lácteos y Huevos",
  "Legumbres y Cereales",
  "Condimentos",
  "Otros"
];

export const INGREDIENTS: Ingredient[] = [
  // Verduras
  { id: "patatas", name: "Patatas", category: "Verduras" },
  { id: "cebolla", name: "Cebolla", category: "Verduras" },
  { id: "ajo", name: "Ajo", category: "Verduras" },
  { id: "tomates", name: "Tomates", category: "Verduras" },
  { id: "zanahorias", name: "Zanahorias", category: "Verduras" },
  { id: "pimiento", name: "Pimiento", category: "Verduras" },
  { id: "guisantes", name: "Guisantes", category: "Verduras" },
  { id: "esparragos", name: "Espárragos blancos", category: "Verduras" },
  { id: "lechuga", name: "Lechuga", category: "Verduras" },
  { id: "calabacin", name: "Calabacín", category: "Verduras" },
  { id: "berenjena", name: "Berenjena", category: "Verduras" },
  { id: "champinones", name: "Champiñones", category: "Verduras" },

  // Frutas
  { id: "manzanas", name: "Manzanas", category: "Frutas" },
  { id: "platanos", name: "Plátanos", category: "Frutas" },
  { id: "naranjas", name: "Naranjas", category: "Frutas" },
  { id: "fresas", name: "Fresas", category: "Frutas" },
  { id: "limon", name: "Limones", category: "Frutas" },
  { id: "aguacate", name: "Aguacates", category: "Frutas" },

  // Carne
  { id: "chorizo", name: "Chorizo", category: "Carne" },
  { id: "panceta", name: "Panceta", category: "Carne" },
  { id: "pollo", name: "Pechuga de pollo", category: "Carne" },
  { id: "carne_picada", name: "Carne picada de ternera", category: "Carne" },
  { id: "jamon", name: "Jamón serrano", category: "Carne" },

  // Pescado
  { id: "merluza", name: "Merluza", category: "Pescado" },
  { id: "atun", name: "Atún en conserva", category: "Pescado" },
  { id: "salmon", name: "Salmón", category: "Pescado" },
  { id: "gambas", name: "Gambas", category: "Pescado" },

  // Lácteos y Huevos
  { id: "huevos", name: "Huevos", category: "Lácteos y Huevos" },
  { id: "parmesano", name: "Queso parmesano", category: "Lácteos y Huevos" },
  { id: "leche", name: "Leche", category: "Lácteos y Huevos" },
  { id: "mantequilla", name: "Mantequilla", category: "Lácteos y Huevos" },
  { id: "mozzarella", name: "Queso mozzarella", category: "Lácteos y Huevos" },

  // Legumbres y Cereales
  { id: "lentejas", name: "Lentejas", category: "Legumbres y Cereales" },
  { id: "espaguetis", name: "Espaguetis", category: "Legumbres y Cereales" },
  { id: "arroz", name: "Arroz", category: "Legumbres y Cereales" },
  { id: "harina", name: "Harina", category: "Legumbres y Cereales" },
  { id: "pan", name: "Pan", category: "Legumbres y Cereales" },
  { id: "garbanzos", name: "Garbanzos", category: "Legumbres y Cereales" },

  // Condimentos
  { id: "aceite", name: "Aceite de oliva", category: "Condimentos" },
  { id: "sal", name: "Sal", category: "Condimentos" },
  { id: "pimienta", name: "Pimienta negra", category: "Condimentos" },
  { id: "laurel", name: "Laurel", category: "Condimentos" },
  { id: "perejil", name: "Perejil", category: "Condimentos" },
  { id: "oregano", name: "Orégano", category: "Condimentos" },

  // Otros
  { id: "vino_blanco", name: "Vino blanco", category: "Otros" },
  { id: "caldo_pescado", name: "Caldo de pescado", category: "Otros" },
  { id: "azucar", name: "Azúcar", category: "Otros" },
  { id: "chocolate", name: "Chocolate", category: "Otros" },
  { id: "nueces", name: "Nueces", category: "Otros" }
];

export const RECIPES: Recipe[] = [
  {
    id: "tortilla_patatas",
    name: "Tortilla de Patatas Tradicional",
    category: "Española",
    mealType: "Cena",
    diet: "Vegetariana",
    time: 30,
    difficulty: "Media",
    ingredientsRequired: ["patatas", "cebolla", "huevos", "aceite", "sal"],
    description: "La joya de la gastronomía española: jugosa, sabrosa y perfecta fría o caliente.",
    imageUrl: "https://images.unsplash.com/photo-1573225342350-1ae7c1265780?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Pela las patatas y la cebolla. Córtalas en rodajas finas, estilo panadera.",
      "Fríelas despacio en una sartén con abundante aceite de oliva caliente, hasta que se ablanden sin llegar a dorarse en exceso.",
      "Mientras tanto, bate los huevos en un bol grande con una pizca de sal hasta que queden espumosos.",
      "Escurre las patatas y la cebolla del aceite, incorpóralas al bol con el huevo batido y mezcla bien. Deja reposar durante unos 5 minutos.",
      "Pon a calentar la sartén con una cucharada del aceite escurrido, vierte la mezcla y cocina a fuego moderado. Dale la vuelta con la ayuda de un plato llano tras 3 minutos y cuaja por el otro lado."
    ],
    rating: 4.9
  },
  {
    id: "salmorejo_cordobes",
    name: "Salmorejo Cordobés Genuino",
    category: "Española",
    mealType: "Entrante",
    diet: "Vegetariana",
    time: 15,
    difficulty: "Fácil",
    ingredientsRequired: ["tomates", "pan", "aceite", "ajo", "sal", "jamon", "huevos"],
    description: "Una crema fría de tomate untuosa, ideal para los días calurosos, coronada con jamón y huevo cocido.",
    imageUrl: "https://images.unsplash.com/photo-1592317730990-2bb80cb2b216?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Quita el pedúnculo a los tomates, lávalos bien and tritúralos con batidora o robot de cocina hasta lograr un puré fino sin colar de primera mano.",
      "Trocea el pan del día anterior (mejor de miga densa) y añádelo al cuenco del tomate triturado dejándolo reposar 10 minutos para que absorba el jugo.",
      "Añade la muesca de un ajo (sin el germen central para que no repita) y la pizca de sal, y bate todo con fuerza.",
      "Mientras bates a alta velocidad, ve incorporando el aceite de oliva virgen extra en un hilo constante para emulsionar como una mayonesa espesa.",
      "Enfría en la nevera durante 2 horas. Sírvase con huevo duro picadito y taquitos de jamón serrano por encima."
    ],
    rating: 4.8
  },
  {
    id: "lentejas_chorizo",
    name: "Lentejas de la Abuela con Chorizo",
    category: "Guisos",
    mealType: "Almuerzo",
    diet: "Carnívora",
    time: 45,
    difficulty: "Media",
    ingredientsRequired: ["lentejas", "chorizo", "patatas", "zanahorias", "cebolla", "ajo", "pimiento", "laurel", "sal", "aceite"],
    description: "El clásico guiso de herencia reconfortante cargado de sabor casero tradicional.",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Pon las lentejas en remojo opcional si es necesario, o lávalas y mételas directamente en una cazuela amplia cubiertas de agua helada.",
      "Incorpora la cebolla picadita, los ajos triturados, la zanahoria cortada en rodajas y el pimiento verde a cuadraditos.",
      "Añade el chorizo cortado en rodajas gruesas, la patata chascada (para espesar el caldo) y la hoja de laurel.",
      "Añade un chorrecito de aceite, tapa la ola y calienta a fuego vivo hasta que hierva, después baja a fuego suave durante unos 35-40 minutos.",
      "Comprueba el punto de las lentejas y pon a punto de sal antes de servir muy templado."
    ],
    rating: 4.7
  },
  {
    id: "aguacates_rellenos",
    name: "Aguacates Rellenos de Atún y Huevo",
    category: "Verduras, Pescado y Huevos",
    mealType: "Entrante",
    diet: "Pesquetariana",
    time: 10,
    difficulty: "Fácil",
    ingredientsRequired: ["aguacate", "atun", "huevos", "limon", "sal", "pimienta"],
    description: "Un plato súper saludable, cremoso y rápido de preparar. Perfecto como cena exprés o entrante veraniego.",
    imageUrl: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Cuece los huevos en agua hirviendo durante 9 minutos y déjalos enfriar.",
      "Corta los aguacates por la mitad de forma longitudinal y retira el hueso central.",
      "Extrae parte de la pulpa con cuidado de no romper la piel y colócala en un bol.",
      "Mezcla la pulpa del aguacate con el atún escurrido, el huevo cocido picado, unas gotas de limón, sal y pimienta.",
      "Rellena las mitades de aguacate con la mezcla cremosa y sirve inmediatamente bien frío."
    ],
    rating: 4.9
  },
  {
    id: "salteado_champis",
    name: "Salteado Express de Champiñones y Ajo",
    category: "Verduras",
    mealType: "Plato Secundario",
    diet: "Vegana",
    time: 12,
    difficulty: "Fácil",
    ingredientsRequired: ["champinones", "ajo", "aceite", "sal", "perejil", "pimienta"],
    description: "Champiñones salteados al ajillo crujientes y muy jugosos. Ideal como acompañamiento saludable, ligero y súper rápido.",
    imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Limpia bien los champiñones para retirar restos de tierra y córtalos en cuartos o láminas gruesas.",
      "Pela y lamina los dientes de ajo muy finos.",
      "Calienta unas cucharadas de aceite de oliva en una sartén grande y dora el ajo levemente.",
      "Añade los champiñones a fuego muy vivo para que se doren rápidamente sin soltar toda su agua.",
      "Sazona con sal, pimienta negra molida y espolvorea perejil fresco antes de apartar."
    ],
    rating: 4.6
  },
  {
    id: "paella_marisco",
    name: "Paella de Marisco y Pescado Tradicional",
    category: "Arroces",
    mealType: "Almuerzo",
    diet: "Pesquetariana",
    time: 50,
    difficulty: "Difícil",
    ingredientsRequired: ["arroz", "gambas", "merluza", "pimiento", "ajo", "tomates", "aceite", "sal", "caldo_pescado", "limon"],
    description: "La icónica paella marinera española con arroz suelto, socarrat perfecto, gambas y caldo concentrado de pescado.",
    imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600",
    steps: [
      "En una paellera amplia con un buen chorro de aceite de oliva, marca las gambas durante un minuto por lado para perfumar el aceite. Retira y reserva.",
      "Sofrie el pimiento rojo y verde picado finamente junto con los dientes de ajo triturados.",
      "Incorpora el tomate rallado y sofríelo despacio hasta que reduzca su agua y quede oscuro.",
      "Vierte el arroz y nacáralo (dóralo) durante dos minutos removiendo continuamente para impregnar los sabores.",
      "Vierte el caldo de pescado caliente y cuece a fuego vivo 8 minutos. Baja el fuego al mínimo, añade la merluza desmenuzada, las gambas y cuece 10 minutos más sin remover. Reposa 5 minutos con un paño."
    ],
    rating: 4.9
  },
  {
    id: "club_sandwich",
    name: "Sándwich Club de Pollo Crujiente y Queso",
    category: "Aves",
    mealType: "Cena",
    diet: "Carnívora",
    time: 15,
    difficulty: "Fácil",
    ingredientsRequired: ["pan", "pollo", "mozzarella", "tomates", "lechuga", "aceite", "sal", "pimienta"],
    description: "Cena de comida rápida saludable: un apetitoso sándwich club con filete de pechuga tierno, mozzarella y lechuga crujiente.",
    imageUrl: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Tuesta rebanadas de pan en una sartén con un poco de aceite de oliva o mantequilla.",
      "En otra sartén muy caliente, marca la pechuga de pollo cortada fina con sal y pimienta.",
      "Coloca la mozzarella sobre la pechuga caliente para que se funda lentamente en la misma sartén.",
      "Monta las capas del sándwich con lechuga crujiente, rodajas de tomate jugosas y la pechuga con queso derretido.",
      "Cierra el sándwich, córtalo en diagonal y fíjalo para comer con las manos de inmediato."
    ],
    rating: 4.8
  },
  {
    id: "guisado_ternera",
    name: "Guisado de Ternera Tradicional con Patatas",
    category: "Guisos",
    mealType: "Almuerzo",
    diet: "Carnívora",
    time: 65,
    difficulty: "Media",
    ingredientsRequired: ["carne_picada", "patatas", "zanahorias", "cebolla", "ajo", "vino_blanco", "laurel", "aceite", "sal", "pimienta"],
    description: "Estofado meloso con patatas chascadas que se cocina lentamente para lograr un resultado tierno que reconforta el alma.",
    imageUrl: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Forma pequeñas albóndigas redondeadas con la carne de ternera picada sazonada con ajo y sal.",
      "Dóralas en una olla profunda con aceite de oliva por todos lados y retíralas.",
      "En ese mismo aceite, pocha la cebolla picadita y las zanahorias cortadas en rodajas lentamente.",
      "Reincorpora la carne, añade la hoja de laurel, vierte el vino blanco y deja reducir el alcohol durante unos minutos.",
      "Añade las patatas chascadas y agua cubriendo lo justo. Tapa la olla de barro y cuece suave 45 minutos hasta ablandar la patata."
    ],
    rating: 4.8
  },
  {
    id: "berenjenas_rellenas",
    name: "Berenjenas Rellenas de Ternera",
    category: "Verduras y Carnes",
    mealType: "Almuerzo",
    diet: "Carnívora",
    time: 35,
    difficulty: "Media",
    ingredientsRequired: ["berenjena", "carne_picada", "cebolla", "tomates", "mozzarella", "aceite", "sal", "pimienta", "oregano"],
    description: "Berenjenas asadas rellenas de una boloñesa espesa y gratinadas al horno con abundante queso fundido aromático.",
    imageUrl: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Corta las berenjenas por la mitad e introduce cortes en diagonal en la pulpa sin traspasar la piel exterior.",
      "Asa las berenjenas en el horno o microondas hasta que la pulpa esté blanda. Retírala con una cuchara con cuidado.",
      "Saltea la cebolla picada con la carne de ternera picada en una sartén con aceite de oliva.",
      "Agrega la pulpa de la berenjena troceada, el tomate frito, sal, pimienta y orégano. Mezcla bien.",
      "Rellena las pieles vacías, cubre con mozzarella rallada y gratina al horno a 200ºC hasta que esté dorado."
    ],
    rating: 4.7
  },
  {
    id: "pollo_limon",
    name: "Pechuga de Pollo Express al Limón",
    category: "Aves",
    mealType: "Almuerzo",
    diet: "Carnívora",
    time: 15,
    difficulty: "Fácil",
    ingredientsRequired: ["pollo", "limon", "ajo", "aceite", "sal", "perejil", "pimienta"],
    description: "Saludable y exprés. Filetes de pollo marinados con limón y ajo fresco hechos a la plancha rápidamente.",
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Bate en un cuenco pequeño el aceite de oliva, el zumo de limón, ajo picado, perejil picado, sal y pimienta.",
      "Coloca las pechugas de pollo en el adobo y déjalas reposar durante 5-10 minutos.",
      "Calienta una sartén o plancha a fuego medio-alto.",
      "Cocina las pechugas de pollo 3 o 4 minutos por cada lado, hasta que adquieran un color dorado e hidratado.",
      "Sirve rociando el delicioso almíbar de limón sobrante de la sartén por encima."
    ],
    rating: 4.7
  },
  {
    id: "salmorejo_saludable",
    name: "Ensalada Templada de Garbanzos y Aguacate",
    category: "Legumbres",
    mealType: "Entrante",
    diet: "Vegetariana",
    time: 10,
    difficulty: "Fácil",
    ingredientsRequired: ["garbanzos", "aguacate", "tomates", "cebolla", "esparragos", "aceite", "sal", "limon"],
    description: "Una ensalada de legumbres súper nutritiva y refrescante que se prepara en 10 minutos con garbanzos listos y aguacate cremoso.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Enjuaga y escurre bien los garbanzos cocidos de bote.",
      "Corta el aguacate, la cebolla y los tomates en dados medianos del mismo tamaño.",
      "Trocea los espárragos blancos en pedazos apetitosos.",
      "Mezcla con cuidado todos los ingredientes en una ensaladera evitando aplastar la pulpa del aguacate.",
      "Realza los sabores sazonando al instante con aceite de oliva virgen extra y unas gotas de limón."
    ],
    rating: 4.8
  },
  {
    id: "chocoteja_nueces",
    name: "Chocotejas Dulces con Nueces de Extremadura",
    category: "Postres",
    mealType: "Postre",
    diet: "Vegetariana",
    time: 15,
    difficulty: "Media",
    ingredientsRequired: ["chocolate", "nueces", "leche", "azucar", "mantequilla"],
    description: "Un dulce bocado premium de chocolate negro fundido relleno de nueces crujientes ligeramente caramelizadas.",
    imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Funde el chocolate negro picado al baño maría o microondas con la mantequilla y un hilo de leche para darle suavidad.",
      "En una sartén pequeña, tuesta las nueces con una cucharadita de azúcar para crear una capa ligeramente caramelizada.",
      "Coloca ramilletes pequeños de nueces crujientes sobre un papel encerado o de horno.",
      "Baña las nueces con una cucharada de chocolate fundido tibio dándole forma de disco o teja.",
      "Lleva el papel a la nevera durante 20 minutos para que el chocolate cuaje de forma brillante."
    ],
    rating: 4.5
  },
  {
    id: "flan_casero",
    name: "Flan de Huevo y Leche Tradicional",
    category: "Postres",
    mealType: "Postre",
    diet: "Vegetariana",
    time: 45,
    difficulty: "Media",
    ingredientsRequired: ["huevos", "leche", "azucar", "limon"],
    description: "El mítico flan cremoso de las casas españolas, horneado lentamente al baño maría con caramelo artesano.",
    imageUrl: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&q=80&w=600",
    steps: [
      "En un cazo, derrite 4 cucharadas de azúcar con unas gotas de limón y un chorrito de agua hasta obtener un caramelo rubio. Viértelo en el fondo de las flaneras.",
      "Bate vigorosamente los huevos con el resto del azúcar en un bol espacioso.",
      "Suma la leche a temperatura ambiente poco a poco sin dejar de remover con varillas.",
      "Rellena las flaneras con la mezcla y colócalas en una bandeja honda con agua caliente cubriendo la mitad.",
      "Introduce al horno a 170ºC durante 35-40 minutos hasta que estén cuajados y déjalos enfriar en nevera."
    ],
    rating: 4.8
  },
  {
    id: "croquetas_jamon",
    name: "Croquetas de Jamón Serrano Extra Cremosas",
    category: "Española",
    mealType: "Entrante",
    diet: "Carnívora",
    time: 45,
    difficulty: "Difícil",
    ingredientsRequired: ["jamon", "mantequilla", "harina", "leche", "huevos", "pan", "aceite", "sal"],
    description: "La joya de la corona de la abuela. Requiere una cocción lenta de la bechamel y un rebozado crujiente de primera.",
    imageUrl: "https://images.unsplash.com/photo-1562601519-1b4de0cd121a?auto=format&fit=crop&q=80&w=600",
    steps: [
      "En una cazuela rehoga la mantequilla, añade la harina y cocínala un minuto para quitar el sabor a crudo.",
      "Ve vertiendo la leche tibia muy poco a poco mientras bates enérgicamente con varillas para evitar los grumos.",
      "Añade el jamón serrano picado finísimo cuando la bechamel empiece a espesar y cuece 15 minutos removiendo continuamente.",
      "Vierte la masa en una bandeja plana, tápala con film a ras para que no haga costra y enfríala en nevera mínimo 4 horas.",
      "Forma las croquetas pasándolas secuencialmente por huevo batido y después por pan rallado fino, y fríelas en abundante aceite bien caliente."
    ],
    rating: 4.9
  },
  {
    id: "merluza_vasca",
    name: "Merluza a la Vasca con Salsa Verde",
    category: "Pescados",
    mealType: "Almuerzo",
    diet: "Pesquetariana",
    time: 25,
    difficulty: "Difícil",
    ingredientsRequired: ["merluza", "guisantes", "esparragos", "ajo", "harina", "vino_blanco", "caldo_pescado", "perejil", "aceite"],
    description: "Un plato elegante que resalta lo mejor de la merluza con su tradicional salsa emulsionada de ajo y vino blanco.",
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600",
    steps: [
      "En una cazuela baja de barro, dora finas láminas de ajo con el aceite de oliva vigilando que no cojan demasiado color.",
      "Sazona las rodajas de merluza, espolvoréalas ligeramente con un pellizco de harina y colócalas en la cazuela.",
      "Vierte el vino blanco, remueve suavemente con movimientos de vaivén para ligar la salsa con la gelatina de la merluza.",
      "Suma el caldo de pescado caliente, los guisantes colados y los espárragos blancos.",
      "Agrega una lluvia generosa de perejil picado muy fino y cuece todo junto durante 8 u 10 minutos moviendo la cazuela constantemente."
    ],
    rating: 4.6
  },
  {
    id: "macedonia_frutas",
    name: "Macedonia Campestre Cremosa",
    category: "Postres",
    mealType: "Postre",
    diet: "Vegana",
    time: 10,
    difficulty: "Fácil",
    ingredientsRequired: ["manzanas", "platanos", "naranjas", "fresas", "limon", "azucar"],
    description: "Una mezcla frutal colorida rebosante de vitaminas que refrescará tu paladar tras la comida.",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Pela las naranjas, manzanas y plátanos con un cuchillo afilado de cocina.",
      "Corta todas las frutas picadas en trozos uniformes medianos para que se puedan pinchar bien.",
      "Dispón las frutas en un cuenco grande y lávalas con el zumo de la naranja natural y las gotas de limón.",
      "Esparce opcionalmente una cucharada de azúcar si te gusta más dulce o deja que repose de forma natural en nevera.",
      "Sirve bien fresca tras 20 minutos de reposo para potenciar los sabores compenetrados."
    ],
    rating: 4.5
  },
  {
    id: "pasta_carbonara",
    name: "Pasta Carbonara Italiana Tradicional",
    category: "Pastas",
    mealType: "Almuerzo",
    diet: "Carnívora",
    time: 20,
    difficulty: "Media",
    ingredientsRequired: ["espaguetis", "panceta", "huevos", "parmesano", "pimienta", "sal"],
    description: "Auténticos espaguetis carbonara romanos sin nata: todo el cremoso sabor se obtiene emulsionando huevo y queso.",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Pon a cocer los espaguetis en abundante agua con sal para que queden listos 'al dente'. No uses aceite en el agua.",
      "En una sartén con mínima grasa, tuesta la panceta cortada en dados pequeños hasta que esté crujiente y escurra su aroma.",
      "Bate las yemas de huevo con abundante queso parmesano rallado y bastante pimienta negra picada.",
      "Escurre la pasta, pero conserva un buen cazo del agua de cocción con almidón.",
      "Vuelca la pasta caliente a la sartén de la panceta fuera del fuego, rocía la salsa de yemas y bate rítmicamente con cucharadas del agua reservada para formar una crema sedosa."
    ],
    rating: 4.8
  },
  // Novedades de Postre solicitadas:
  {
    id: "tarta_abuela",
    name: "Tarta de Chocolate y Galletas de la Abuela",
    category: "Postres",
    mealType: "Postre",
    diet: "Vegetariana",
    time: 25,
    difficulty: "Fácil",
    ingredientsRequired: ["chocolate", "leche", "mantequilla", "azucar", "pan"],
    description: "La entrañable tarta de cumpleaños de las familias españolas, montada por capas alternas de galleta empapada en leche fría y chocolate cremoso.",
    imageUrl: "https://images.unsplash.com/photo-1624353322073-b7af12415101?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Prepara un chocolate espeso fundiendo las tabletas con leche y mantequilla en un cazo a fuego lento hasta homogeneizar.",
      "Moja ligeramente las galletas (o migas de pan artesanal) en un bol con leche fría perfumada con azúcar.",
      "En un molde rectangular, coloca una primera base de galletas humedecidas en orden.",
      "Vierte por encima una capa jugosa de chocolate fundido de forma uniforme.",
      "Repite el proceso en capas sucesivas y finaliza con chocolate negro liso. Deja cuajar en la nevera durante un mínimo de 6 horas."
    ],
    rating: 4.9
  },
  {
    id: "manzanas_asadas",
    name: "Manzanas Asadas al Limón y Canela",
    category: "Postres",
    mealType: "Postre",
    diet: "Vegana",
    time: 30,
    difficulty: "Fácil",
    ingredientsRequired: ["manzanas", "limon", "azucar", "agua"],
    description: "Una receta tradicional muy reconfortante: manzanas de huerto asadas al horno con un corazón tierno impregnado de almíbar cítrico y canela.",
    imageUrl: "https://images.unsplash.com/photo-1589133177114-f0edff37ad2d?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Lava muy bien las manzanas de piel firme y descorazónalas con cuidado sin llegar a perforar del todo la base.",
      "En cada hueco añade una cucharadita de azúcar y unas gotitas de zumo de limón fresco.",
      "Disponlas en una fuente segura apta para horno y añade un fondo de medio vaso de agua.",
      "Hornea a 180ºC durante unos 25-30 minutos hasta que la piel se arrugue y la manzana esté tierna al pinchar.",
      "Baña las manzanas calientes con su propio jugo caramelizado y sirve templadas."
    ],
    rating: 4.6
  },
  // Novedades de Entrante / Starters:
  {
    id: "patatas_bravas",
    name: "Patatas Bravas Crujientes al Estilo Madrileño",
    category: "Española",
    mealType: "Entrante",
    diet: "Vegetariana",
    time: 20,
    difficulty: "Fácil",
    ingredientsRequired: ["patatas", "ajo", "aceite", "sal", "harina"],
    description: "El aperitivo más canalla de los bares madrileños. Patatas cortadas en dados rústicos fritos a fuego lento y dorados a fuego fuerte, regadas con salsa picante.",
    imageUrl: "https://images.unsplash.com/photo-1518013006314-430635ccaad7?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Pela y troncha las patatas en gajos irregulares de bocado para que suelten el almidón y espesen la fritura.",
      "Ponlas a pochar en abundante aceite de oliva a fuego medio hasta que estén blandas, luego retira.",
      "Antes de servir, calienta el aceite al máximo y fríelas de golpe 2 minutos hasta crear una costra crujiente dorada.",
      "Elabora la salsa brava cocinando harina, ajo finamente sobado, y una porción picante en caldo o aceite virgen.",
      "Sazona las patatas calientes y báñalas con una ración generosa de salsa brava humeante."
    ],
    rating: 4.8
  },
  {
    id: "pimientos_piquillo",
    name: "Pimientos del Piquillo Rellenos de Atún",
    category: "Española",
    mealType: "Entrante",
    diet: "Pesquetariana",
    time: 15,
    difficulty: "Fácil",
    ingredientsRequired: ["pimiento", "atun", "huevos", "ajo", "aceite", "sal"],
    description: "Fabulosas tostas frías de pimientos del piquillo del norte español rellenos de atún fino de conserva desmigado y huevo duro picado.",
    imageUrl: "https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Cuece los huevos frescos durante 9 minutos, pélalos bajo el grifo de agua fría y pícalos muy finos con ayuda de un tenedor o cuchillo.",
      "En un bol, desmenuza el atún en lata bien escurrido del aceite sobrante.",
      "Mezcla el atún desmenuzado con el huevo duro, un toque ligero de ajo crudo rayado y una cucharadita de aceite.",
      "Rellena con sumo cuidado y la ayuda de una cuchara pequeña los pimientos del piquillo enteros para que no se rasguen.",
      "Dispón los pimientos en una bandeja alargada, rocía un hilo de aceite de oliva virgen extra y sirve fríos o templados."
    ],
    rating: 4.7
  },
  // Novedades de Platos Secundarios / Acompañamientos:
  {
    id: "pisto_manchego",
    name: "Pisto Manchego Tradicional con Huevo",
    category: "Española",
    mealType: "Plato Secundario",
    diet: "Vegetariana",
    time: 35,
    difficulty: "Media",
    ingredientsRequired: ["tomates", "calabacin", "pimiento", "cebolla", "ajo", "huevos", "aceite", "sal"],
    description: "Guiso tradicional de verduras del campo español cortadas finas y fritas despacio en aceite de oliva, servido jugoso con huevo.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Pica en trocitos pequeños la cebolla, el pimiento verde y el calabacín tierno.",
      "En una sartén honda calienta aceite de oliva and sofríe la cebolla y el pimiento con una pizca de sal 10 minutos.",
      "Agrega el calabacín y continúa cocinando todo junto otros 10 minutos hasta que ablande.",
      "Incorpora el tomate natural maduro rallado y cocina a fuego muy lento durante 15 minutos más hasta que espese.",
      "Fríe un huevo en aceite muy caliente para coronar cada porción individual colocándolo encima."
    ],
    rating: 4.9
  },
  {
    id: "pure_patatas",
    name: "Puré de Patatas Cremoso a la Mantequilla",
    category: "Acompañamientos",
    mealType: "Plato Secundario",
    diet: "Vegetariana",
    time: 25,
    difficulty: "Fácil",
    ingredientsRequired: ["patatas", "leche", "mantequilla", "sal", "pimienta"],
    description: "Una guarnición perfecta y versátil de puré suave de patatas cocidas, emulsionado con mantequilla fundida, leche entera y pimienta negra molida.",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Pela las patatas and trocéalas en cuartos uniformes para que se cuezan por igual.",
      "Cuece las patatas en una cacerola con abundante agua con sal hasta que estén completamente tiernas al pincharlas.",
      "Escurre el agua, vierte las patatas calientes en un bol espacioso and machácalas con un prensapatatas o tenedor.",
      "Agrega de inmediato la mantequilla a temperatura ambiente y remueve para que se funda completamente con el calor del puré.",
      "Suma un chorrito de leche tibia despacio para aligeras la consistencia y pon a punto de pimienta y sal al gusto."
    ],
    rating: 4.8
  },
  {
    id: "lentejas_diverxo",
    name: "Lentejas Estofadas al Curry de Tres Estrellas",
    category: "Gourmet",
    mealType: "Almuerzo",
    diet: "Vegetariana",
    time: 40,
    difficulty: "Media",
    ingredientsRequired: ["lentejas", "zanahorias", "cebolla", "ajo", "laurel", "limon", "aceite", "sal", "pimienta"],
    description: "Una versión galáctica de las lentejas tradicionales del chef Dabiz Muñoz: untuosas, rematadas con zanahoria asada al horno, toques cítricos de limón y especias de su cocina madrileña vanguardista.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Cuece las lentejas limpias con agua, la hoja de laurel y zanahoria cortada fina durante unos 30 minutos a fuego suave.",
      "Mientras tanto, prepara una salsa sofrita pochando la cebolla picada y el ajo con un chorrito de aceite de oliva hasta caramelizar.",
      "Sazonar el sofrito con pimienta y el jugo del limón fresco exprimido para aportar acidez vanguardista.",
      "Une todo en la cazuela principal junto con las lentejas y cuece 10 minutos a fuego alegre para integrar de forma cremosa y perfecta."
    ],
    rating: 5.0
  },
  {
    id: "croquetas_diverxo",
    name: "Croquetas de Jamón y Parmesano Líquidas",
    category: "Gourmet",
    mealType: "Entrante",
    diet: "Carnívora",
    time: 50,
    difficulty: "Difícil",
    ingredientsRequired: ["jamon", "parmesano", "mantequilla", "harina", "leche", "huevos", "pan", "aceite", "sal"],
    description: "La reinterpretación majestuosa del chef Dabiz Muñoz: una bechamel súper fluida saborizada con caldo intensivo de jamón serrano y virutas fundentes de parmesano maduro.",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Funde la mantequilla y tuesta la harina para formar una roux suave. Añade leche hirviendo despacio e integra con fuerza.",
      "Añade copos muy finos de jamón y el parmesano rallado de golpe. Cocina a fuego lento durante 20 minutos hasta lograr consistencia fina.",
      "Vierte la bechamel fluida en una placa de frío y cúbrela inmediatamente. Refrigera doce horas para poder moldearlas.",
      "Pasa cada croqueta por huevo batido espumoso y pan rallado. Fríelas por inmersión a 190ºC para lograr una corteza impenetrable y un interior totalmente fundente."
    ],
    rating: 4.9
  },
  {
    id: "huevos_ramsay",
    name: "Huevos Revueltos de Natilla 'Gordon Ramsay'",
    category: "Gourmet",
    mealType: "Cena",
    diet: "Vegetariana",
    time: 8,
    difficulty: "Fácil",
    ingredientsRequired: ["huevos", "mantequilla", "sal", "pimienta"],
    description: "El desayuno más famoso de las redes por el chef Gordon Ramsay. Textura ultra cremosa que se logra batiendo enérgicamente los huevos con mantequilla fría de forma alternada dentro y fuera del fuego directo.",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Introduce en una cazuela pequeña los huevos enteros fríos y un dado generoso de mantequilla helada (sin batirlos previamente).",
      "Coloca al fuego vivo y remueve constantemente con una espátula de silicona llegando a todos los rincones.",
      "Retira la cazuela del fuego cada 30 segundos mientras continúas batiendo sin parar para templar la cocción, y vuelve al fuego.",
      "En el último segundo, añade sal, pimienta negra recién molida y una cucharada extra de mantequilla fría para frenar la cocción y servir como crema."
    ],
    rating: 4.9
  },
  {
    id: "salmon_ramsay",
    name: "Lomo de Salmón con Costra Crujiente Ramsay",
    category: "Gourmet",
    mealType: "Almuerzo",
    diet: "Pesquetariana",
    time: 15,
    difficulty: "Fácil",
    ingredientsRequired: ["salmon", "ajo", "limon", "aceite", "sal", "pimienta"],
    description: "El método maestro de Gordon Ramsay para el salmón perfecto de restaurante: piel súper crujiente hecha a presión suave con la mano y un corazón jugoso humedecido con adobo caliente de ajo y limón sutil.",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Seca muy bien la piel del salmón y haz tres cortes limpios y poco profundos sobre ella. Sazona generosamente con sal.",
      "Pon a calentar la sartén con un chorrito de aceite de oliva. Cuando esté humeando, posa el salmón por el lado de la piel.",
      "Presiona el lomo hacia abajo firmemente con tus dedos durante 2 minutos para evitar que se curve y asegurar un contacto perfecto.",
      "Cocina el 80% del tiempo de ese lado. Dale la vuelta con suavidad, añade el ajo machacado y el zumo de limón para bañar la carne un minuto antes de extraer."
    ],
    rating: 5.0
  },
  {
    id: "tortilla_adria",
    name: "Tortilla de Patatas Deconstruida en Copa",
    category: "Gourmet",
    mealType: "Entrante",
    diet: "Vegetariana",
    time: 25,
    difficulty: "Media",
    ingredientsRequired: ["patatas", "cebolla", "huevos", "aceite", "sal"],
    description: "La célebre creación molecular de Ferran Adrià que revolucionó ElBulli: servida de arriba a abajo en una copa estilizada con crema suave de patatas, yema caliente y dulce de cebolla confitada.",
    imageUrl: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Pela y hierve las patatas con sal. Tritúralas calientes y monta con mantequilla o aceite de oliva y un poco de agua caliente de cocción para formar un puré muy fino.",
      "Pica la cebolla fina y póchala muy lentamente en abundante aceite de oliva durante una hora hasta que quede de color marrón oscuro sutilmente caramelizado.",
      "Calienta la cebolla confitada y colócala en la base de la copa.",
      "Deposita sobre ella la yema de huevo cruda atemperada con sumo cuidado.",
      "Cubre todo con la espuma templada o crema de patata batida bien caliente. Se degusta introduciendo la cuchara hasta el fondo."
    ],
    rating: 5.0
  },
  {
    id: "pasta_jamie",
    name: "Espaguetis Rústicos al Limón Express",
    category: "Gourmet",
    mealType: "Almuerzo",
    diet: "Vegetariana",
    time: 12,
    difficulty: "Fácil",
    ingredientsRequired: ["espaguetis", "limon", "parmesano", "aceite", "sal", "pimienta"],
    description: "La receta fetiche de Jamie Oliver para comidas de diario: pasta fresca envuelta en una emulsión mágica e instantánea de zumo cítrico maduro, gran cantidad de parmesano rallado de calidad y aceite de oliva virgen aromático.",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600",
    steps: [
      "Ponte a cocer la pasta en abundante agua con sal para que mantenga un punto crujiente al dente.",
      "En un bol rústico grande, mezcla el zumo de limón, un chorretón de aceite de oliva virgen extra y ralla abundante parmesano hasta formar una pasta espesa.",
      "Escurre la pasta al dente directamente en el bol e incorpora un par de cucharadas de agua con almidón de la olla.",
      "Mezcla enérgicamente con pinzas para crear una salsa cremosa sedosa espontánea. Decora con ralladura extra de limón y pimienta negra molida."
    ],
    rating: 4.8
  }
];

export interface Chef {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  stars: number;
  famousRecipes: string[]; // matches Recipe ID
}

export const FAMOUS_CHEFS: Chef[] = [
  {
    id: "dabiz_munoz",
    name: "Dabiz Muñoz",
    role: "Chef de DiverXO*** (Mejor Chef del Mundo)",
    avatarUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400",
    bio: "Reconocido como el mejor chef del mundo durante tres años consecutivos, Dabiz ha revolucionado la alta cocina con sus combinaciones extremas, divertidas, rústicas e hiper-sabrosas en DiverXO. Su lema es que no hay barreras para el sabor.",
    stars: 3,
    famousRecipes: ["lentejas_diverxo", "croquetas_diverxo"]
  },
  {
    id: "gordon_ramsay",
    name: "Gordon Ramsay",
    role: "Leyenda Culinaria & Galardonado Multimichelin",
    avatarUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400",
    bio: "Uno de los chefs más influyentes y conocidos del planeta. Gordon se distingue por su maestría técnica de precisión impecable y su insistencia en ingredientes súper frescos, frescos y limpios cocinados a la perfección rigurosa.",
    stars: 7,
    famousRecipes: ["huevos_ramsay", "salmon_ramsay"]
  },
  {
    id: "ferran_adria",
    name: "Ferran Adrià",
    role: "Creador de ElBulli*** • Padre del Vanguardismo",
    avatarUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=400",
    bio: "Considerado el pensador gastronómico y visionario más disruptivo de la historia moderna de la cocina. Ferran ideó el vanguardismo culinario desintegrando ingredientes, deconstruyendo platos míticos y enseñando a ver los alimentos de otro planeta.",
    stars: 3,
    famousRecipes: ["tortilla_adria", "esparragos_vasca"]
  },
  {
    id: "jamie_oliver",
    name: "Jamie Oliver",
    role: "Activista de la Cocina Fresca y Saludable Rústica",
    avatarUrl: "https://images.unsplash.com/photo-1560963661-059918c4e078?auto=format&fit=crop&q=80&w=400",
    bio: "Jamie revolucionó la forma de cocinar de millones de hogares. Su filosofía promueve cocinar platos rápidos, rústicos e increiblemente sabrosos desde cero utilizando lo que tengas en la nevera, de forma simple y divertida.",
    stars: 1,
    famousRecipes: ["pasta_jamie", "pure_patatas"]
  }
];
