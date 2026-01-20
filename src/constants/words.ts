import { WordCategory } from '../types';

export const wordCategories: WordCategory[] = [
  {
    id: 'animales',
    name: 'Animales',
    icon: 'paw',
    words: [
      // Mamiferos domesticos
      'perro', 'gato', 'conejo', 'hamster', 'cobaya', 'huron', 'raton',
      // Mamiferos salvajes
      'elefante', 'tigre', 'leon', 'leopardo', 'guepardo', 'pantera', 'jaguar',
      'lobo', 'zorro', 'oso', 'oso polar', 'panda', 'koala', 'canguro',
      'mono', 'gorila', 'chimpance', 'orangutan', 'mandril', 'lemur',
      'jirafa', 'cebra', 'rinoceronte', 'hipopotamo', 'bufalo', 'bisonte',
      'ciervo', 'alce', 'reno', 'gacela', 'antilope', 'cabra montes',
      'jabali', 'cerdo', 'murcielago', 'armadillo', 'perezoso', 'oso hormiguero',
      'castor', 'nutria', 'foca', 'morsa', 'leon marino', 'manatI',
      // Mamiferos de granja
      'caballo', 'burro', 'mula', 'vaca', 'toro', 'oveja', 'cabra', 'cerdo', 'llama', 'alpaca',
      // Aves
      'aguila', 'halcon', 'buho', 'lechuza', 'cuervo', 'gaviotan', 'pelicano',
      'flamenco', 'cisne', 'pato', 'ganso', 'paloma', 'gorrion', 'colibri',
      'tucan', 'loro', 'periquito', 'cacatua', 'guacamayo', 'pavo real',
      'avestruz', 'pinguino', 'gallina', 'gallo', 'pavo', 'codorniz', 'faisán',
      // Reptiles
      'cocodrilo', 'caiman', 'lagarto', 'iguana', 'camaleon', 'gecko',
      'serpiente', 'cobra', 'piton', 'anaconda', 'vibora', 'boa',
      'tortuga', 'tortuga marina', 'galapago', 'dragon de komodo',
      // Anfibios
      'rana', 'sapo', 'salamandra', 'ajolote', 'triton',
      // Peces
      'tiburon', 'delfin', 'ballena', 'orca', 'mantarraya', 'pez espada',
      'atun', 'salmon', 'trucha', 'sardina', 'anchoa', 'bacalao',
      'pez payaso', 'pez globo', 'caballito de mar', 'anguila', 'piraña',
      // Invertebrados marinos
      'pulpo', 'calamar', 'medusa', 'estrella de mar', 'erizo de mar',
      'cangrejo', 'langosta', 'camaron', 'mejillon', 'ostra', 'almeja', 'caracol marino',
      // Insectos
      'mariposa', 'abeja', 'avispa', 'hormiga', 'mosca', 'mosquito',
      'libelula', 'grillo', 'saltamontes', 'cigarra', 'cucaracha',
      'escarabajo', 'mariquita', 'luciernaga', 'mantis', 'polilla',
      // Aracnidos
      'arana', 'tarantula', 'escorpion', 'garrapata',
      // Otros
      'caracol', 'babosa', 'lombriz', 'cienpies', 'milpies',
    ],
  },
  {
    id: 'comida',
    name: 'Comida',
    icon: 'restaurant',
    words: [
      // Comida mexicana
      'tacos', 'burritos', 'enchiladas', 'quesadillas', 'tamales', 'pozole',
      'mole', 'chilaquiles', 'tostadas', 'tlacoyos', 'sopes', 'gorditas',
      'carnitas', 'barbacoa', 'birria', 'tortas', 'molletes', 'huaraches',
      'elote', 'esquites', 'guacamole', 'pico de gallo', 'salsa verde',
      // Comida italiana
      'pizza', 'pasta', 'lasana', 'ravioli', 'gnocchi', 'risotto',
      'carpaccio', 'bruschetta', 'minestrone', 'ossobuco', 'tiramisU',
      // Comida espanola
      'paella', 'tortilla espanola', 'gazpacho', 'jamon serrano', 'croquetas',
      'pulpo a la gallega', 'fabada', 'cochinillo', 'churros', 'patatas bravas',
      // Comida americana
      'hamburguesa', 'hot dog', 'sandwich', 'bagel', 'donut', 'brownie',
      'cheesecake', 'pancakes', 'waffles', 'bacon', 'costillas', 'alitas',
      // Comida asiatica
      'sushi', 'ramen', 'pad thai', 'curry', 'dim sum', 'arroz frito',
      'tempura', 'gyoza', 'pho', 'bibimbap', 'kimchi', 'tofu',
      'rollitos de primavera', 'wontons', 'satay', 'laksa', 'naan',
      // Comida latina
      'ceviche', 'empanada', 'arepa', 'pupusa', 'gallo pinto', 'bandeja paisa',
      'asado', 'chimichurri', 'milanesa', 'dulce de leche', 'alfajor',
      'lomo saltado', 'anticuchos', 'causa', 'aji de gallina', 'sancocho',
      // Basicos
      'arroz', 'frijoles', 'lentejas', 'garbanzos', 'pan', 'pan integral',
      'huevo', 'tortilla', 'omelette', 'ensalada', 'sopa', 'caldo', 'crema',
      // Carnes
      'pollo', 'carne de res', 'cerdo', 'cordero', 'pato', 'pavo', 'conejo',
      'bistec', 'chuleta', 'filete', 'albondigas', 'hamburguesa', 'salchicha',
      // Mariscos
      'pescado', 'camaron', 'langosta', 'cangrejo', 'pulpo', 'calamar',
      'mejillones', 'almejas', 'ostras', 'atun', 'salmon', 'bacalao',
      // Lacteos
      'queso', 'yogurt', 'mantequilla', 'crema', 'leche', 'helado',
      'queso crema', 'queso azul', 'mozzarella', 'parmesano', 'cheddar',
      // Postres
      'pastel', 'galletas', 'flan', 'gelatina', 'pie', 'tarta', 'mousse',
      'natillas', 'arroz con leche', 'tres leches', 'crepa', 'profiteroles',
      // Bebidas
      'cafe', 'te', 'jugo', 'limonada', 'horchata', 'atole', 'champurrado',
    ],
  },
  {
    id: 'paises',
    name: 'Paises',
    icon: 'globe',
    words: [
      // America del Norte
      'Mexico', 'Estados Unidos', 'Canada',
      // Centroamerica y Caribe
      'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panama',
      'Cuba', 'Republica Dominicana', 'Haiti', 'Jamaica', 'Puerto Rico', 'Bahamas',
      'Trinidad y Tobago', 'Barbados', 'Belice',
      // America del Sur
      'Argentina', 'Brasil', 'Colombia', 'Peru', 'Chile', 'Venezuela', 'Ecuador',
      'Bolivia', 'Uruguay', 'Paraguay', 'Guyana', 'Surinam',
      // Europa Occidental
      'Espana', 'Francia', 'Italia', 'Alemania', 'Inglaterra', 'Portugal',
      'Belgica', 'Holanda', 'Suiza', 'Austria', 'Irlanda', 'Escocia',
      'Monaco', 'Luxemburgo', 'Liechtenstein', 'Andorra',
      // Europa del Norte
      'Suecia', 'Noruega', 'Dinamarca', 'Finlandia', 'Islandia',
      // Europa del Este
      'Rusia', 'Polonia', 'Ucrania', 'Rumania', 'Hungria', 'Republica Checa',
      'Eslovaquia', 'Bulgaria', 'Serbia', 'Croacia', 'Eslovenia', 'Bosnia',
      'Grecia', 'Turquia', 'Albania', 'Macedonia', 'Montenegro', 'Kosovo',
      'Moldavia', 'Bielorrusia', 'Lituania', 'Letonia', 'Estonia',
      // Asia
      'Japon', 'China', 'India', 'Corea del Sur', 'Corea del Norte', 'Vietnam',
      'Tailandia', 'Indonesia', 'Filipinas', 'Malasia', 'Singapur', 'Taiwan',
      'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka', 'Myanmar', 'Camboya',
      'Laos', 'Mongolia', 'Kazajistan', 'Uzbekistan',
      // Medio Oriente
      'Arabia Saudita', 'Emiratos Arabes', 'Israel', 'Iran', 'Irak', 'Siria',
      'Jordania', 'Libano', 'Kuwait', 'Qatar', 'Oman', 'Yemen', 'Afganistan',
      // Africa
      'Egipto', 'Marruecos', 'Argelia', 'Tunez', 'Libia', 'Sudafrica',
      'Nigeria', 'Kenia', 'Etiopia', 'Ghana', 'Tanzania', 'Uganda', 'Senegal',
      'Costa de Marfil', 'Camerun', 'Zimbabwe', 'Mozambique', 'Madagascar',
      'Namibia', 'Botsuana', 'Zambia', 'Ruanda', 'Mali', 'Congo',
      // Oceania
      'Australia', 'Nueva Zelanda', 'Fiji', 'Papua Nueva Guinea', 'Samoa',
    ],
  },
  {
    id: 'ciudades',
    name: 'Ciudades',
    icon: 'business',
    words: [
      // Mexico
      'Ciudad de Mexico', 'Guadalajara', 'Monterrey', 'Cancun', 'Tijuana',
      'Puebla', 'Merida', 'Oaxaca', 'San Miguel de Allende', 'Playa del Carmen',
      // Espana
      'Madrid', 'Barcelona', 'Sevilla', 'Valencia', 'Bilbao', 'Granada',
      'Malaga', 'Zaragoza', 'San Sebastian', 'Toledo', 'Salamanca', 'Ibiza',
      // Latinoamerica
      'Buenos Aires', 'Lima', 'Bogota', 'Santiago', 'Caracas', 'Quito',
      'La Habana', 'Montevideo', 'Cartagena', 'Medellin', 'Cali', 'Cusco',
      'Arequipa', 'Valparaiso', 'Cordoba', 'Rosario', 'La Paz', 'Guayaquil',
      'Panama City', 'San Jose', 'San Juan', 'Santo Domingo', 'Asuncion',
      // Estados Unidos
      'Nueva York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco',
      'Las Vegas', 'Houston', 'Boston', 'Washington', 'Seattle', 'Denver',
      'Phoenix', 'San Diego', 'Dallas', 'Atlanta', 'Philadelphia', 'Orlando',
      // Canada
      'Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Calgary', 'Quebec',
      // Europa
      'Paris', 'Londres', 'Roma', 'Berlin', 'Amsterdam', 'Viena', 'Praga',
      'Lisboa', 'Atenas', 'Moscu', 'Estocolmo', 'Copenhague', 'Oslo', 'Helsinki',
      'Bruselas', 'Varsovia', 'Budapest', 'Dublin', 'Edimburgo', 'Florencia',
      'Venecia', 'Milan', 'Napoles', 'Munich', 'Frankfurt', 'Colonia', 'Zurich',
      'Ginebra', 'Cracovia', 'San Petersburgo', 'Kiev', 'Estambul', 'Dubrovnik',
      // Asia
      'Tokio', 'Pekin', 'Shanghai', 'Hong Kong', 'Singapur', 'Seoul', 'Bangkok',
      'Hanoi', 'Kuala Lumpur', 'Taipei', 'Osaka', 'Kyoto', 'Mumbai', 'Delhi',
      'Dubai', 'Abu Dhabi', 'Tel Aviv', 'Jerusalen', 'Bali', 'Ho Chi Minh',
      // Africa
      'El Cairo', 'Marrakech', 'Casablanca', 'Ciudad del Cabo', 'Johannesburgo',
      'Nairobi', 'Lagos', 'Tunez', 'Alejandria', 'Fez', 'Dakar', 'Accra',
      // Oceania
      'Sydney', 'Melbourne', 'Auckland', 'Wellington', 'Brisbane', 'Perth',
      // Brasil
      'Rio de Janeiro', 'Sao Paulo', 'Brasilia', 'Salvador', 'Fortaleza',
    ],
  },
  {
    id: 'deportes',
    name: 'Deportes',
    icon: 'football',
    words: [
      // Deportes de equipo
      'futbol', 'baloncesto', 'voleibol', 'beisbol', 'softball', 'rugby',
      'futbol americano', 'hockey sobre hielo', 'hockey sobre pasto', 'lacrosse',
      'handball', 'waterpolo', 'polo', 'cricket', 'ultimate frisbee',
      // Deportes de raqueta
      'tenis', 'badminton', 'ping pong', 'squash', 'padel', 'frontenis',
      // Deportes de combate
      'boxeo', 'karate', 'judo', 'taekwondo', 'kung fu', 'muay thai',
      'jiu jitsu', 'lucha libre', 'lucha grecorromana', 'esgrima', 'kendo',
      'aikido', 'capoeira', 'kickboxing', 'MMA',
      // Deportes acuaticos
      'natacion', 'waterpolo', 'surf', 'windsurf', 'kitesurf', 'wakeboard',
      'esqui acuatico', 'buceo', 'snorkel', 'remo', 'kayak', 'canoa', 'vela',
      'paddleboard', 'rafting', 'clavados', 'nado sincronizado', 'triatlon',
      // Deportes de invierno
      'esqui', 'snowboard', 'patinaje sobre hielo', 'patinaje artistico',
      'hockey sobre hielo', 'curling', 'bobsled', 'luge', 'biathlon',
      'esqui de fondo', 'salto de esqui',
      // Atletismo
      'atletismo', 'maraton', 'sprint', 'salto de altura', 'salto de longitud',
      'salto triple', 'salto con garrocha', 'lanzamiento de bala', 'lanzamiento de disco',
      'lanzamiento de jabalina', 'lanzamiento de martillo', 'decatlon', 'heptathlon',
      'carrera de obstaculos', 'marcha', 'relevo',
      // Ciclismo
      'ciclismo', 'ciclismo de montana', 'BMX', 'ciclismo de pista', 'ciclocross',
      // Gimnasia
      'gimnasia artistica', 'gimnasia ritmica', 'gimnasia acrobatica', 'trampolIn',
      // Deportes de motor
      'Formula 1', 'NASCAR', 'MotoGP', 'rally', 'motocross', 'karting',
      // Otros deportes
      'golf', 'boliche', 'billar', 'dardos', 'arqueria', 'tiro',
      'equitacion', 'rodeo', 'escalada', 'alpinismo', 'parkour',
      'skateboard', 'patinaje', 'rollerblade', 'paracaidismo', 'parapente',
      'ala delta', 'bungee', 'paintball', 'airsoft', 'crossfit', 'powerlifting',
      'halterofilia', 'culturismo', 'yoga', 'pilates', 'tai chi',
      'ajedrez', 'poker', 'dominó', 'breakdance', 'pesca deportiva',
    ],
  },
  {
    id: 'profesiones',
    name: 'Profesiones',
    icon: 'briefcase',
    words: [
      // Medicina y salud
      'medico', 'enfermera', 'cirujano', 'dentista', 'pediatra', 'cardiologo',
      'neurologo', 'psicologo', 'psiquiatra', 'dermatologo', 'oftalmologo',
      'ginecologo', 'urologo', 'ortopedista', 'anestesiologo', 'radiologo',
      'fisioterapeuta', 'nutriologo', 'veterinario', 'paramedico', 'farmaceutico',
      'optometrista', 'quiropractico', 'podólogo', 'patologo', 'oncologo',
      // Legal y gobierno
      'abogado', 'juez', 'fiscal', 'notario', 'politico', 'diplomata',
      'alcalde', 'senador', 'diputado', 'gobernador', 'presidente',
      // Seguridad
      'policia', 'bombero', 'detective', 'guardia', 'militar', 'soldado',
      'marine', 'piloto militar', 'agente secreto', 'guardian de seguridad',
      // Educacion
      'maestro', 'profesor', 'director', 'tutor', 'instructor', 'entrenador',
      'rector', 'decano', 'bibliotecario', 'orientador', 'pedagogo',
      // Ingenieria y tecnologia
      'ingeniero', 'ingeniero civil', 'ingeniero mecanico', 'ingeniero electrico',
      'programador', 'desarrollador', 'diseñador web', 'analista de sistemas',
      'cientifico de datos', 'hacker etico', 'administrador de redes',
      // Ciencia
      'cientifico', 'investigador', 'biologo', 'quimico', 'fisico', 'matematico',
      'astronomo', 'geologo', 'arqueologo', 'antropologo', 'sociologo',
      'astronauta', 'meteorologo', 'oceanografo', 'botanico', 'zoologo',
      // Construccion y oficios
      'arquitecto', 'albanil', 'electricista', 'plomero', 'carpintero',
      'mecanico', 'soldador', 'pintor', 'techador', 'vidriero', 'cerrajero',
      'jardinero', 'paisajista', 'fumigador', 'tapicero',
      // Arte y entretenimiento
      'actor', 'actriz', 'director de cine', 'productor', 'guionista',
      'musico', 'cantante', 'compositor', 'DJ', 'bailarin', 'coreografo',
      'pintor', 'escultor', 'fotografo', 'camarografo', 'editor de video',
      'animador', 'ilustrador', 'diseñador grafico', 'tatuador', 'maquillista',
      'estilista', 'modelo', 'comediante', 'mago', 'payaso', 'acrobata',
      // Comunicacion
      'periodista', 'reportero', 'presentador', 'locutor', 'comentarista',
      'editor', 'redactor', 'copywriter', 'community manager', 'influencer',
      // Negocios y finanzas
      'contador', 'economista', 'banquero', 'corredor de bolsa', 'auditor',
      'consultor', 'empresario', 'gerente', 'CEO', 'CFO', 'vendedor',
      'agente de bienes raices', 'agente de seguros', 'importador', 'exportador',
      // Hospitalidad y servicio
      'chef', 'cocinero', 'pastelero', 'barista', 'bartender', 'sommelier',
      'mesero', 'recepcionista', 'conserje', 'botones', 'ama de llaves',
      'guia turistico', 'azafata', 'sobrecargo', 'piloto', 'copiloto',
      // Otros
      'escritor', 'poeta', 'traductor', 'interprete', 'psicoanalista',
      'astrologo', 'tarotista', 'detective privado', 'taxista', 'chofer',
      'repartidor', 'cartero', 'agricultor', 'ganadero', 'pescador',
      'minero', 'leñador', 'sastre', 'costurera', 'zapatero', 'joyero',
      'relojero', 'panadero', 'carnicero', 'florista', 'anticuario',
    ],
  },
  {
    id: 'peliculas',
    name: 'Peliculas',
    icon: 'film',
    words: [
      // Clasicos
      'Titanic', 'El Padrino', 'Casablanca', 'Lo que el viento se llevo',
      'Psicosis', 'El Exorcista', 'Tiburon', 'ET', 'Forrest Gump', 'Gladiador',
      'Braveheart', 'Scarface', 'Goodfellas', 'Taxi Driver', 'Apocalypse Now',
      'El Resplandor', 'Pulp Fiction', 'El Club de la Pelea', 'Matrix',
      // Ciencia ficcion
      'Star Wars', 'Star Trek', 'Blade Runner', 'Alien', 'Predator',
      'Terminator', 'Robocop', 'Volver al Futuro', 'Jurassic Park',
      'Avatar', 'Inception', 'Interstellar', 'Gravity', 'The Martian',
      'Dune', 'Tron', 'Wall-E', 'District 9', 'Ex Machina', 'Arrival',
      // Superheroes
      'Spider-Man', 'Batman', 'Superman', 'Iron Man', 'Thor', 'Hulk',
      'Capitan America', 'Los Vengadores', 'Black Panther', 'Wonder Woman',
      'Aquaman', 'Flash', 'X-Men', 'Deadpool', 'Guardianes de la Galaxia',
      'Ant-Man', 'Doctor Strange', 'Venom', 'Joker', 'The Batman',
      // Accion
      'Die Hard', 'Rambo', 'Rocky', 'Indiana Jones', 'James Bond',
      'Mision Imposible', 'Fast and Furious', 'John Wick', 'Mad Max',
      'Kill Bill', 'Piratas del Caribe', 'Transformers', 'Top Gun',
      'The Bourne Identity', 'Taken', 'Expendables', 'Rush Hour',
      // Animacion
      'Toy Story', 'Buscando a Nemo', 'Los Increibles', 'Monsters Inc',
      'Cars', 'Up', 'COCO', 'Soul', 'Ratatouille', 'Brave',
      'Frozen', 'Moana', 'Encanto', 'El Rey Leon', 'Aladdin',
      'La Sirenita', 'La Bella y la Bestia', 'Mulan', 'Pocahontas',
      'Shrek', 'Madagascar', 'Kung Fu Panda', 'Como entrenar a tu dragon',
      'Mi Villano Favorito', 'Los Minions', 'Zootopia', 'Big Hero 6',
      // Terror
      'El Conjuro', 'It', 'Halloween', 'Viernes 13', 'Pesadilla en Elm Street',
      'El Aro', 'El Grudge', 'Actividad Paranormal', 'Saw', 'Scream',
      'Chucky', 'Annabelle', 'Insidious', 'Get Out', 'A Quiet Place',
      // Drama
      'Titanic', 'Schindlers List', 'The Shawshank Redemption', 'Green Mile',
      'A Beautiful Mind', 'The Pursuit of Happyness', 'Whiplash',
      'La La Land', 'The Notebook', 'The Fault in Our Stars',
      // Comedia
      'Superbad', 'The Hangover', 'Bridesmaids', 'Step Brothers',
      'Anchorman', 'Dumb and Dumber', 'Ace Ventura', 'Mrs Doubtfire',
      'Home Alone', 'The Mask', 'Liar Liar', 'Bruce Almighty',
      // Fantasia
      'Harry Potter', 'El Senor de los Anillos', 'El Hobbit', 'Narnia',
      'El Laberinto del Fauno', 'Stardust', 'The Princess Bride',
      'Edward Scissorhands', 'Charlie y la Fabrica de Chocolate',
    ],
  },
  {
    id: 'musica',
    name: 'Musica',
    icon: 'musical-notes',
    words: [
      // Instrumentos de cuerda
      'guitarra', 'guitarra electrica', 'bajo', 'violin', 'viola', 'violonchelo',
      'contrabajo', 'arpa', 'mandolina', 'banjo', 'ukelele', 'sitar', 'laud',
      // Instrumentos de viento
      'flauta', 'clarinete', 'saxofon', 'oboe', 'fagot', 'trompeta', 'trombon',
      'tuba', 'corno frances', 'armonica', 'flauta de pan', 'ocarina', 'gaita',
      // Instrumentos de percusion
      'bateria', 'tambor', 'bongo', 'conga', 'timbales', 'xilofono', 'marimba',
      'vibrafono', 'campanas', 'triangulo', 'pandereta', 'maracas', 'guiro',
      'castanuelas', 'platillos', 'gong', 'cajon peruano', 'djembe', 'steel drum',
      // Instrumentos de teclado
      'piano', 'teclado', 'organo', 'acordeon', 'sintetizador', 'clavicordio',
      // Generos musicales
      'rock', 'pop', 'jazz', 'blues', 'soul', 'funk', 'disco', 'house',
      'techno', 'electronica', 'dubstep', 'trap', 'hip hop', 'rap',
      'reggaeton', 'salsa', 'bachata', 'merengue', 'cumbia', 'vallenato',
      'tango', 'flamenco', 'mariachi', 'ranchera', 'corridos', 'banda',
      'nortena', 'reggae', 'ska', 'punk', 'metal', 'heavy metal', 'grunge',
      'alternativo', 'indie', 'folk', 'country', 'bluegrass', 'gospel',
      'R&B', 'clasica', 'opera', 'sinfonica', 'barroca', 'romantica',
      'new age', 'ambient', 'lofi', 'K-pop', 'J-pop', 'bossa nova', 'samba',
      // Terminos musicales
      'melodia', 'ritmo', 'armonia', 'acorde', 'escala', 'tempo', 'compas',
      'estribillo', 'verso', 'puente', 'solo', 'riff', 'beat', 'drop',
      'remix', 'cover', 'unplugged', 'acustico', 'en vivo', 'concierto',
      'album', 'sencillo', 'EP', 'disco', 'vinilo', 'cassette', 'playlist',
      'streaming', 'karaoke', 'coro', 'dueto', 'banda', 'orquesta', 'cuarteto',
    ],
  },
  {
    id: 'hogar',
    name: 'Objetos del Hogar',
    icon: 'home',
    words: [
      // Muebles
      'silla', 'mesa', 'sofa', 'sillon', 'cama', 'litera', 'cuna', 'hamaca',
      'escritorio', 'estante', 'librero', 'armario', 'closet', 'comoda',
      'tocador', 'buro', 'mesita de noche', 'mesa de centro', 'banco',
      'taburete', 'mecedora', 'puff', 'otomana', 'vitrina', 'aparador',
      // Electrodomesticos
      'refrigerador', 'estufa', 'horno', 'microondas', 'tostador', 'licuadora',
      'batidora', 'cafetera', 'tetera', 'exprimidor', 'procesador de alimentos',
      'lavadora', 'secadora', 'lavavajillas', 'aspiradora', 'robot aspiradora',
      'plancha', 'ventilador', 'aire acondicionado', 'calentador', 'calefactor',
      'deshumidificador', 'humidificador', 'purificador de aire', 'extractor',
      // Electronica
      'television', 'computadora', 'laptop', 'tablet', 'celular', 'telefono',
      'radio', 'bocina', 'audifonos', 'consola de videojuegos', 'proyector',
      'impresora', 'router', 'modem', 'camara', 'videocamara', 'monitor',
      // Iluminacion
      'lampara', 'lampara de pie', 'lampara de mesa', 'lampara de techo',
      'candil', 'foco', 'linterna', 'vela', 'candelabro', 'luz LED',
      // Cocina
      'olla', 'sarten', 'cacerola', 'wok', 'comal', 'olla de presion',
      'olla de cocimiento lento', 'freidora', 'arrocera', 'waflera', 'sandwichera',
      'plato', 'taza', 'vaso', 'copa', 'jarra', 'termo', 'botella',
      'cuchillo', 'tenedor', 'cuchara', 'cucharón', 'espatula', 'pinzas',
      'rallador', 'pelador', 'abrelatas', 'sacacorchos', 'tabla de cortar',
      'colador', 'embudo', 'molde', 'rodillo', 'mortero', 'mandolina',
      // Bano
      'inodoro', 'lavabo', 'ducha', 'banera', 'bidet', 'espejo',
      'toallero', 'jabonera', 'porta cepillo de dientes', 'cortina de bano',
      'bascula', 'secador de pelo', 'rizador', 'plancha de pelo',
      // Decoracion
      'cuadro', 'poster', 'espejo decorativo', 'reloj de pared', 'florero',
      'maceta', 'alfombra', 'tapete', 'cortina', 'persiana', 'cojin',
      'manta', 'edredon', 'sabanas', 'almohada', 'colchon',
      // Limpieza
      'escoba', 'trapeador', 'recogedor', 'cubeta', 'balde', 'cepillo',
      'esponja', 'trapo', 'plumero', 'guantes de limpieza', 'bote de basura',
      // Otros
      'cerradura', 'llave', 'timbre', 'intercomunicador', 'alarma',
      'extintor', 'detector de humo', 'caja fuerte', 'perchero', 'paragüero',
    ],
  },
  {
    id: 'ropa',
    name: 'Ropa',
    icon: 'shirt',
    words: [
      // Parte superior
      'camisa', 'camiseta', 'blusa', 'polo', 'top', 'crop top', 'tank top',
      'sueter', 'sudadera', 'hoodie', 'cardigan', 'chaqueta', 'chamarra',
      'abrigo', 'gabardina', 'impermeable', 'chaleco', 'blazer', 'saco',
      'smoking', 'esmoquin', 'traje', 'tuxedo', 'poncho', 'capa',
      // Parte inferior
      'pantalon', 'jeans', 'shorts', 'bermudas', 'falda', 'minifalda',
      'falda larga', 'leggins', 'mallas', 'pants', 'joggers', 'cargo',
      'pantalon de vestir', 'capri', 'culotte', 'palazzo',
      // Prendas completas
      'vestido', 'vestido de noche', 'vestido de coctel', 'jumpsuit',
      'romper', 'overol', 'mono', 'conjunto', 'traje de bano', 'bikini',
      'tankini', 'trikini', 'bañador', 'wetsuit',
      // Ropa interior
      'calzoncillo', 'boxer', 'slip', 'tanga', 'brasier', 'sosten',
      'camiseta interior', 'faja', 'body', 'pijama', 'bata', 'camison',
      'calcetines', 'medias', 'pantimedia', 'calcetas', 'tobilleras',
      // Calzado
      'zapatos', 'tenis', 'zapatillas', 'botas', 'botines', 'sandalias',
      'chanclas', 'huaraches', 'mocasines', 'loafers', 'tacones', 'stilettos',
      'plataformas', 'wedges', 'alpargatas', 'crocs', 'pantuflas', 'babuchas',
      'botas de lluvia', 'botas vaqueras', 'zapatos de vestir', 'oxford',
      'derby', 'brogues', 'sneakers', 'converse', 'slip-ons', 'bailarinas',
      // Accesorios
      'sombrero', 'gorra', 'boina', 'fedora', 'pamela', 'visera', 'beanie',
      'bufanda', 'pashmina', 'chal', 'echarpe', 'pañuelo', 'mascada',
      'guantes', 'mitones', 'manoplas', 'cinturon', 'tirantes', 'fajilla',
      'corbata', 'corbatin', 'mancuernillas', 'broche', 'prendedor', 'pin',
      'reloj', 'pulsera', 'collar', 'aretes', 'anillo', 'diadema', 'bandana',
      'lentes', 'gafas de sol', 'bolsa', 'cartera', 'mochila', 'maleta',
      'portafolio', 'clutch', 'banano', 'rinonera', 'paraguas', 'abanico',
      // Uniformes
      'uniforme escolar', 'uniforme de trabajo', 'bata de laboratorio',
      'bata de medico', 'overol de mecanico', 'traje de chef', 'mandil',
    ],
  },
  {
    id: 'frutas',
    name: 'Frutas',
    icon: 'nutrition',
    words: [
      // Frutas tropicales
      'mango', 'papaya', 'pina', 'coco', 'platano', 'banana', 'guayaba',
      'maracuya', 'granadilla', 'lichi', 'rambutan', 'mangostino', 'pitaya',
      'dragon fruit', 'carambola', 'guanabana', 'chirimoya', 'tamarindo',
      'mamey', 'zapote', 'nispero', 'toronja', 'pomelo', 'kiwi', 'fruta de la pasion',
      // Citricos
      'naranja', 'limon', 'lima', 'mandarina', 'tangerina', 'clementina',
      'toronja', 'pomelo', 'kumquat', 'cidra', 'bergamota', 'yuzu',
      // Frutas de hueso
      'durazno', 'melocoton', 'nectarina', 'albaricoque', 'chabacano',
      'ciruela', 'cereza', 'guinda', 'mango', 'aguacate', 'datil', 'aceituna',
      // Frutas de pepita
      'manzana', 'pera', 'membrillo', 'nispero', 'granada',
      // Bayas
      'fresa', 'frambuesa', 'mora', 'zarzamora', 'arandano', 'arandano rojo',
      'grosella', 'grosella negra', 'uchuva', 'physalis', 'acai', 'goji',
      // Melones
      'sandia', 'melon', 'melon verde', 'melon cantalupo', 'melon honeydew',
      // Uvas
      'uva', 'uva verde', 'uva morada', 'uva pasa', 'pasa',
      // Higos
      'higo', 'breva', 'higo seco',
      // Frutas exoticas
      'durian', 'jackfruit', 'fruta del pan', 'longan', 'salak',
      'pitahaya', 'pepino dulce', 'feijoa', 'lucuma', 'camu camu',
      'acerola', 'jabuticaba', 'cupuacu', 'bacuri', 'buriti',
      // Frutas secas (aunque son semillas/nueces)
      'cacao', 'cafe', 'vainilla',
      // Latinoamerica especificas
      'tuna', 'xoconostle', 'tejocote', 'capulin', 'jocote', 'nance',
      'pitanga', 'caimito', 'corozo', 'chontaduro', 'borojo', 'marañon',
    ],
  },
  {
    id: 'verduras',
    name: 'Verduras',
    icon: 'leaf',
    words: [
      // Verduras de hoja
      'lechuga', 'espinaca', 'acelga', 'col', 'repollo', 'kale', 'arugula',
      'berro', 'endibia', 'escarola', 'radicchio', 'col rizada', 'bok choy',
      'col china', 'hojas de mostaza', 'hojas de remolacha', 'quelites',
      // Cruciferas
      'brocoli', 'coliflor', 'col de bruselas', 'romanesco', 'nabo',
      'rabano', 'colinabo', 'daikon', 'wasabi',
      // Solanaceas
      'tomate', 'jitomate', 'tomate cherry', 'tomatillo', 'pimiento',
      'chile', 'jalapeño', 'serrano', 'habanero', 'poblano', 'chipotle',
      'berenjena', 'papa', 'patata',
      // Cucurbitaceas
      'pepino', 'calabaza', 'calabacin', 'zucchini', 'chayote',
      'calabaza butternut', 'calabaza bellota', 'calabaza spaghetti',
      // Raices y tuberculos
      'zanahoria', 'remolacha', 'betabel', 'camote', 'batata', 'yuca',
      'malanga', 'name', 'taro', 'jengibre', 'curcuma', 'rabano picante',
      'chirivía', 'apio nabo', 'salsifi', 'tupinambo', 'jicama',
      // Bulbos
      'cebolla', 'ajo', 'puerro', 'cebollín', 'chalota', 'echalote',
      'cebolla morada', 'cebolla cambray', 'ajo negro',
      // Tallos
      'apio', 'esparrago', 'hinojo', 'ruibarbo', 'palmito', 'nopal',
      // Legumbres verdes
      'ejote', 'chícharo', 'haba', 'edamame', 'frijol verde',
      // Hongos
      'champinon', 'portobello', 'shiitake', 'oyster', 'cremini',
      'hongo porcini', 'enoki', 'maitake', 'trufa', 'huitlacoche',
      // Flores comestibles
      'alcachofa', 'flor de calabaza', 'brocoli', 'coliflor',
      // Hierbas aromaticas
      'perejil', 'cilantro', 'albahaca', 'menta', 'hierbabuena', 'oregano',
      'tomillo', 'romero', 'salvia', 'eneldo', 'laurel', 'mejorana',
      'estragón', 'cebollín', 'epazote', 'hoja santa', 'papaloquelite',
      // Germinados
      'brotes de soya', 'germinado de alfalfa', 'brotes de bambú',
    ],
  },
  {
    id: 'emociones',
    name: 'Emociones',
    icon: 'happy',
    words: [
      // Emociones positivas basicas
      'felicidad', 'alegria', 'amor', 'paz', 'calma', 'serenidad',
      'tranquilidad', 'satisfaccion', 'gratitud', 'esperanza', 'optimismo',
      'entusiasmo', 'euforia', 'extasis', 'dicha', 'jubilo', 'regocijo',
      // Emociones positivas complejas
      'orgullo', 'confianza', 'seguridad', 'determinacion', 'valentia',
      'admiracion', 'respeto', 'aprecio', 'ternura', 'carino', 'afecto',
      'compasion', 'empatia', 'simpatia', 'generosidad', 'amabilidad',
      'curiosidad', 'fascinacion', 'asombro', 'maravilla', 'inspiracion',
      // Emociones negativas basicas
      'tristeza', 'miedo', 'enojo', 'ira', 'rabia', 'furia', 'colera',
      'frustracion', 'irritacion', 'molestia', 'fastidio', 'hastio',
      // Emociones negativas complejas
      'ansiedad', 'angustia', 'preocupacion', 'estres', 'tension', 'nerviosismo',
      'panico', 'terror', 'horror', 'espanto', 'susto', 'alarma',
      'depresion', 'melancolia', 'nostalgia', 'soledad', 'aislamiento',
      'desesperacion', 'desesperanza', 'desanimo', 'desaliento', 'abatimiento',
      // Emociones sociales negativas
      'verguenza', 'culpa', 'remordimiento', 'arrepentimiento', 'humillacion',
      'envidia', 'celos', 'resentimiento', 'rencor', 'odio', 'desprecio',
      'desconfianza', 'sospecha', 'paranoia', 'inseguridad', 'inferioridad',
      // Emociones neutras o mixtas
      'sorpresa', 'asombro', 'confusion', 'perplejidad', 'incertidumbre',
      'ambivalencia', 'indiferencia', 'apatia', 'aburrimiento', 'monotonia',
      'anticipacion', 'expectativa', 'intriga', 'suspenso', 'impaciencia',
      // Estados de animo
      'buen humor', 'mal humor', 'irritabilidad', 'sensibilidad', 'vulnerabilidad',
      'fortaleza', 'resistencia', 'resiliencia', 'fragilidad',
      // Sentimientos relacionados con el amor
      'pasion', 'deseo', 'atraccion', 'encanto', 'enamoramiento', 'devocion',
      'adoracion', 'obsesion', 'posesividad', 'dependencia', 'apego',
      'desapego', 'indiferencia', 'desamor', 'rechazo', 'abandono',
    ],
  },
  {
    id: 'lugares',
    name: 'Lugares',
    icon: 'location',
    words: [
      // Naturaleza
      'playa', 'montana', 'bosque', 'selva', 'desierto', 'pradera', 'sabana',
      'tundra', 'glaciar', 'volcan', 'isla', 'peninsula', 'valle', 'canon',
      'gruta', 'cueva', 'cascada', 'catarata', 'lago', 'laguna', 'rio',
      'arroyo', 'manantial', 'pantano', 'manglar', 'arrecife', 'oceano',
      'mar', 'bahia', 'golfo', 'estrecho', 'fiordo', 'delta', 'oasis',
      // Urbanos publicos
      'parque', 'plaza', 'jardin', 'alameda', 'paseo', 'malecon', 'muelle',
      'puerto', 'aeropuerto', 'estacion de tren', 'estacion de autobus',
      'terminal', 'parada', 'estacionamiento', 'garage', 'gasolinera',
      // Comerciales
      'supermercado', 'mercado', 'tianguis', 'centro comercial', 'tienda',
      'boutique', 'farmacia', 'panaderia', 'carniceria', 'pescaderia',
      'verduleria', 'fruteria', 'floreria', 'libreria', 'papeleria',
      'ferreteria', 'zapateria', 'joyeria', 'relojeria', 'optica',
      'peluqueria', 'salon de belleza', 'spa', 'gimnasio',
      // Alimentacion
      'restaurante', 'cafeteria', 'bar', 'cantina', 'pub', 'discoteca',
      'antro', 'club nocturno', 'food court', 'food truck', 'taqueria',
      'pizzeria', 'marisqueria', 'heladeria', 'pasteleria', 'panadería',
      // Servicios
      'hospital', 'clinica', 'consultorio', 'laboratorio', 'farmacia',
      'banco', 'cajero automatico', 'correo', 'oficina de gobierno',
      'embajada', 'consulado', 'notaria', 'despacho', 'tribunal', 'juzgado',
      // Educacion y cultura
      'escuela', 'colegio', 'preparatoria', 'universidad', 'facultad',
      'biblioteca', 'museo', 'galeria', 'teatro', 'auditorio', 'cine',
      'planetario', 'acuario', 'zoologico', 'jardin botanico', 'observatorio',
      // Religion
      'iglesia', 'catedral', 'basilica', 'capilla', 'templo', 'mezquita',
      'sinagoga', 'monasterio', 'convento', 'santuario', 'ermita', 'cementerio',
      // Deportes y recreacion
      'estadio', 'arena', 'gimnasio', 'piscina', 'alberca', 'cancha',
      'campo de futbol', 'campo de golf', 'pista de tenis', 'pista de hielo',
      'boliche', 'billar', 'casino', 'hipodromo', 'autodromo', 'velodromo',
      'skatepark', 'parque de diversiones', 'feria', 'circo', 'balneario',
      // Hospedaje
      'hotel', 'motel', 'hostal', 'hostel', 'posada', 'resort', 'airbnb',
      'camping', 'glamping', 'cabana', 'villa', 'hacienda', 'rancho',
      // Trabajo
      'oficina', 'fabrica', 'almacen', 'bodega', 'taller', 'estudio',
      'laboratorio', 'clinica', 'consultorio', 'despacho', 'coworking',
      // Hogar y residencial
      'casa', 'departamento', 'condominio', 'edificio', 'vecindad', 'mansion',
      'palacio', 'castillo', 'fortaleza', 'torre', 'rascacielos', 'choza',
    ],
  },
  {
    id: 'transporte',
    name: 'Transporte',
    icon: 'car',
    words: [
      // Automoviles
      'carro', 'coche', 'auto', 'sedan', 'hatchback', 'coupe', 'convertible',
      'SUV', 'camioneta', 'pickup', 'minivan', 'van', 'furgoneta',
      'deportivo', 'limusina', 'todoterreno', 'jeep', 'crossover',
      // Vehiculos comerciales
      'camion', 'trailer', 'tractocamion', 'camion de carga', 'camion cisterna',
      'camion de volteo', 'grua', 'montacargas', 'camion de mudanza',
      // Transporte publico terrestre
      'autobus', 'microbus', 'metrobus', 'trolebus', 'tranvia', 'tren ligero',
      'metro', 'tren', 'tren bala', 'AVE', 'taxi', 'uber', 'didi', 'cabify',
      // Motocicletas
      'motocicleta', 'moto', 'scooter', 'vespa', 'motoneta', 'cuatrimoto',
      'triciclo motorizado', 'sidecar', 'chopper', 'moto deportiva',
      // Bicicletas
      'bicicleta', 'bici', 'bicicleta de montana', 'bicicleta de ruta',
      'BMX', 'bicicleta electrica', 'triciclo', 'tandem', 'bicicleta plegable',
      // Movilidad personal
      'patineta', 'skateboard', 'longboard', 'scooter electrico', 'hoverboard',
      'segway', 'monociclo', 'patines', 'patines en linea', 'roller',
      // Aereo
      'avion', 'avioneta', 'jet privado', 'helicoptero', 'globo aerostatico',
      'dirigible', 'planeador', 'ultraligero', 'dron', 'parapente', 'ala delta',
      'cohete', 'transbordador espacial', 'nave espacial',
      // Maritimo
      'barco', 'bote', 'lancha', 'yate', 'velero', 'catamarán', 'ferry',
      'crucero', 'trasatlantico', 'portaaviones', 'fragata', 'destructor',
      'submarino', 'canoa', 'kayak', 'balsa', 'gondola', 'piragua',
      'jet ski', 'moto acuatica', 'tabla de surf', 'paddleboard', 'hidroavion',
      // Emergencias
      'ambulancia', 'patrulla', 'camion de bomberos', 'helicoptero medico',
      // Construccion y trabajo
      'excavadora', 'bulldozer', 'retroexcavadora', 'rodillo', 'mezcladora',
      'grua torre', 'plataforma elevadora', 'tractor', 'cosechadora',
      // Transporte de cable
      'teleferico', 'funicular', 'telesilla', 'telecabina', 'gondola',
      // Antiguos e historicos
      'carreta', 'carroza', 'diligencia', 'carruaje', 'trineo', 'rickshaw',
      'calesa', 'carro de caballos', 'bicicleta antigua',
    ],
  },
  {
    id: 'famosos',
    name: 'Personajes Famosos',
    icon: 'star',
    words: [
      // Musicos
      'Michael Jackson', 'Madonna', 'Elvis Presley', 'Beatles', 'Queen',
      'Freddie Mercury', 'Bob Marley', 'Bob Dylan', 'David Bowie', 'Prince',
      'Whitney Houston', 'Aretha Franklin', 'Beyonce', 'Taylor Swift', 'Adele',
      'Ed Sheeran', 'Bruno Mars', 'Lady Gaga', 'Rihanna', 'Drake', 'Eminem',
      'Shakira', 'Bad Bunny', 'J Balvin', 'Daddy Yankee', 'Luis Miguel',
      'Juan Gabriel', 'Jose Jose', 'Vicente Fernandez', 'Marc Anthony', 'Juanes',
      // Actores
      'Tom Hanks', 'Leonardo DiCaprio', 'Brad Pitt', 'Johnny Depp', 'Tom Cruise',
      'Will Smith', 'Denzel Washington', 'Morgan Freeman', 'Robert De Niro',
      'Al Pacino', 'Meryl Streep', 'Julia Roberts', 'Angelina Jolie', 'Nicole Kidman',
      'Scarlett Johansson', 'Jennifer Lawrence', 'Emma Watson', 'Natalie Portman',
      'Gael Garcia Bernal', 'Salma Hayek', 'Penelope Cruz', 'Antonio Banderas',
      // Deportistas
      'Messi', 'Cristiano Ronaldo', 'Maradona', 'Pele', 'Neymar', 'Mbappe',
      'Michael Jordan', 'LeBron James', 'Kobe Bryant', 'Shaquille ONeal',
      'Serena Williams', 'Roger Federer', 'Rafael Nadal', 'Novak Djokovic',
      'Usain Bolt', 'Muhammad Ali', 'Mike Tyson', 'Floyd Mayweather',
      'Tiger Woods', 'Michael Phelps', 'Simone Biles', 'Tom Brady',
      // Cientificos e inventores
      'Einstein', 'Newton', 'Darwin', 'Tesla', 'Edison', 'Marie Curie',
      'Galileo', 'Copérnico', 'Hawking', 'Freud', 'Pasteur', 'Mendel',
      // Artistas
      'Picasso', 'Van Gogh', 'Da Vinci', 'Miguel Angel', 'Rembrandt',
      'Monet', 'Dali', 'Frida Kahlo', 'Diego Rivera', 'Banksy', 'Warhol',
      // Escritores
      'Shakespeare', 'Cervantes', 'Gabriel Garcia Marquez', 'Pablo Neruda',
      'Octavio Paz', 'Jorge Luis Borges', 'Julio Cortazar', 'Mario Vargas Llosa',
      'Isabel Allende', 'Stephen King', 'J.K. Rowling', 'Agatha Christie',
      // Lideres historicos
      'Napoleon', 'Julio Cesar', 'Cleopatra', 'Alejandro Magno', 'Gandhi',
      'Mandela', 'Martin Luther King', 'Lincoln', 'Churchill', 'Kennedy',
      'Che Guevara', 'Fidel Castro', 'Simon Bolivar', 'Benito Juarez',
      // Empresarios y tecnologia
      'Steve Jobs', 'Bill Gates', 'Elon Musk', 'Jeff Bezos', 'Mark Zuckerberg',
      'Warren Buffett', 'Oprah Winfrey', 'Walt Disney', 'Carlos Slim',
      // Filosofos
      'Socrates', 'Platon', 'Aristoteles', 'Confucio', 'Buda', 'Nietzsche',
      // Influencers y personalidades modernas
      'Kim Kardashian', 'Kylie Jenner', 'PewDiePie', 'MrBeast', 'Cristiano Ronaldo',
    ],
  },
  {
    id: 'videojuegos',
    name: 'Videojuegos',
    icon: 'game-controller',
    words: [
      // Nintendo clasicos
      'Super Mario Bros', 'Mario Kart', 'Super Smash Bros', 'Zelda',
      'Breath of the Wild', 'Pokemon', 'Animal Crossing', 'Metroid',
      'Donkey Kong', 'Kirby', 'Star Fox', 'F-Zero', 'Fire Emblem',
      'Splatoon', 'Luigi Mansion', 'Pikmin', 'Wii Sports', 'Mario Party',
      // Sony PlayStation
      'God of War', 'The Last of Us', 'Uncharted', 'Spider-Man', 'Horizon',
      'Ghost of Tsushima', 'Bloodborne', 'Demons Souls', 'Gran Turismo',
      'Ratchet and Clank', 'Crash Bandicoot', 'Spyro', 'Jak and Daxter',
      'Shadow of the Colossus', 'Final Fantasy', 'Kingdom Hearts',
      // Xbox y PC
      'Halo', 'Gears of War', 'Forza', 'Sea of Thieves', 'Fable',
      'Mass Effect', 'Dragon Age', 'Elder Scrolls', 'Skyrim', 'Fallout',
      'Doom', 'Wolfenstein', 'Dishonored', 'Prey', 'Starfield',
      // Shooters
      'Call of Duty', 'Battlefield', 'Counter Strike', 'Valorant', 'Overwatch',
      'Rainbow Six Siege', 'Apex Legends', 'Fortnite', 'PUBG', 'Warzone',
      'Destiny', 'Borderlands', 'Bioshock', 'Half-Life', 'Portal',
      // RPG y aventura
      'Dark Souls', 'Elden Ring', 'Sekiro', 'The Witcher', 'Cyberpunk 2077',
      'Red Dead Redemption', 'GTA', 'Assassins Creed', 'Far Cry', 'Watch Dogs',
      'Resident Evil', 'Silent Hill', 'Metal Gear Solid', 'Death Stranding',
      // Deportes
      'FIFA', 'eFootball', 'PES', 'NBA 2K', 'Madden', 'MLB The Show',
      'WWE 2K', 'Tony Hawk', 'Rocket League', 'Golf With Friends',
      // Sandbox y construccion
      'Minecraft', 'Terraria', 'Roblox', 'Fortnite Creative', 'The Sims',
      'Cities Skylines', 'Planet Coaster', 'Stardew Valley', 'Valheim',
      // Battle Royale y multijugador
      'Among Us', 'Fall Guys', 'Gang Beasts', 'Jackbox Party', 'Pummel Party',
      'Phasmophobia', 'Left 4 Dead', 'Dead by Daylight', 'It Takes Two',
      // Estrategia
      'Age of Empires', 'Civilization', 'StarCraft', 'Warcraft', 'Command and Conquer',
      'XCOM', 'Total War', 'Crusader Kings', 'Europa Universalis',
      // MOBA y competitivo
      'League of Legends', 'Dota 2', 'Heroes of the Storm', 'Smite',
      // Movil y casual
      'Candy Crush', 'Clash Royale', 'Clash of Clans', 'Pokemon GO',
      'Angry Birds', 'Fruit Ninja', 'Subway Surfers', 'Temple Run',
      'Flappy Bird', 'Wordle', 'Genshin Impact', 'PUBG Mobile', 'Free Fire',
      // Clasicos arcade
      'Pac-Man', 'Tetris', 'Space Invaders', 'Galaga', 'Street Fighter',
      'Mortal Kombat', 'Tekken', 'Sonic', 'Mega Man', 'Castlevania',
      // Indies
      'Hollow Knight', 'Celeste', 'Hades', 'Undertale', 'Cuphead',
      'Shovel Knight', 'Dead Cells', 'Ori', 'Inside', 'Limbo',
    ],
  },
  {
    id: 'marcas',
    name: 'Marcas',
    icon: 'pricetag',
    words: [
      // Tecnologia
      'Apple', 'Google', 'Microsoft', 'Amazon', 'Samsung', 'Sony', 'LG',
      'HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'Intel', 'AMD', 'Nvidia',
      'Huawei', 'Xiaomi', 'OnePlus', 'Motorola', 'Nokia', 'Canon', 'Nikon',
      'GoPro', 'Bose', 'JBL', 'Beats', 'Logitech', 'Razer', 'Corsair',
      // Redes sociales y apps
      'Facebook', 'Instagram', 'Twitter', 'TikTok', 'YouTube', 'Snapchat',
      'WhatsApp', 'Telegram', 'Discord', 'LinkedIn', 'Pinterest', 'Reddit',
      'Netflix', 'Spotify', 'Disney Plus', 'HBO Max', 'Prime Video', 'Twitch',
      'Uber', 'Airbnb', 'PayPal', 'Zoom', 'Slack',
      // Ropa y moda
      'Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour', 'New Balance',
      'Converse', 'Vans', 'Jordan', 'Fila', 'Asics', 'Skechers',
      'Zara', 'H&M', 'Uniqlo', 'Forever 21', 'Shein', 'Primark', 'Gap',
      'Levis', 'Wrangler', 'Calvin Klein', 'Tommy Hilfiger', 'Ralph Lauren',
      'Lacoste', 'Hugo Boss', 'Armani', 'Gucci', 'Prada', 'Louis Vuitton',
      'Chanel', 'Dior', 'Versace', 'Balenciaga', 'Burberry', 'Fendi',
      'Supreme', 'Off-White', 'Yeezy', 'North Face', 'Patagonia', 'Columbia',
      // Comida rapida
      'McDonalds', 'Burger King', 'Wendys', 'KFC', 'Popeyes', 'Chick-fil-A',
      'Taco Bell', 'Chipotle', 'Subway', 'Dominos', 'Pizza Hut', 'Papa Johns',
      'Little Caesars', 'Starbucks', 'Dunkin', 'Tim Hortons', 'Krispy Kreme',
      'Baskin Robbins', 'Dairy Queen', 'Five Guys', 'In-N-Out', 'Shake Shack',
      // Bebidas
      'Coca Cola', 'Pepsi', 'Sprite', 'Fanta', 'Mountain Dew', 'Dr Pepper',
      'Gatorade', 'Red Bull', 'Monster Energy', 'Nestle', 'Evian', 'Perrier',
      'Heineken', 'Corona', 'Budweiser', 'Modelo', 'Stella Artois',
      // Snacks y alimentos
      'Oreo', 'Doritos', 'Cheetos', 'Lays', 'Pringles', 'Ruffles',
      'M&Ms', 'Snickers', 'KitKat', 'Twix', 'Hersheys', 'Reeses',
      'Nutella', 'Kelloggs', 'General Mills', 'Nestle', 'Kraft', 'Heinz',
      // Autos
      'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Volkswagen',
      'BMW', 'Mercedes Benz', 'Audi', 'Porsche', 'Ferrari', 'Lamborghini',
      'Tesla', 'Mazda', 'Hyundai', 'Kia', 'Jeep', 'Land Rover', 'Volvo',
      'Subaru', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln',
      // Retail
      'Walmart', 'Target', 'Costco', 'IKEA', 'Home Depot', 'Best Buy',
      'Sephora', 'Ulta', 'Victoria Secret', 'Bath and Body Works',
      // Lujo y joyeria
      'Rolex', 'Omega', 'Tag Heuer', 'Cartier', 'Tiffany', 'Swarovski',
      'Pandora', 'Ray-Ban', 'Oakley',
    ],
  },
];

export const getCategoryById = (id: string): WordCategory | undefined => {
  return wordCategories.find((cat) => cat.id === id);
};

export const getRandomWordFromCategory = (categoryId: string): string => {
  const category = getCategoryById(categoryId);
  if (!category) return '';
  const randomIndex = Math.floor(Math.random() * category.words.length);
  return category.words[randomIndex];
};
