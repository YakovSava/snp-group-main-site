export const CATEGORIES = ['engine', 'hydraulics', 'wheels', 'filters', 'lubricants'];

const PRODUCTS = [
  {
    id: 1,
    slug: 'mobil-super-3000-x1-5w-40',
    sku: '153789',
    brand: 'Mobil',
    group: 'MOBIL OIL',
    category: 'lubricants',
    price: 4200,
    oldPrice: 5100,
    deliveryDays: 3,
    weightKg: 0.95,
    sizeMm: '95x95x215',
    name: {
      en: 'Mobil SUPER 3000 X1 5W-40 engine oil, 1 L',
      ru: 'Масло моторное Mobil SUPER 3000 X1 5W-40, 1 л',
      hy: 'Շարժիչի յուղ Mobil SUPER 3000 X1 5W-40, 1 լ',
    },
    description: {
      en: 'Synthetic engine oil Mobil SUPER 3000 X1 5W-40 for diesel and petrol engines of trucks and special machinery. Reliable protection against wear and stable performance in all conditions.',
      ru: 'Синтетическое моторное масло Mobil SUPER 3000 X1 5W-40 для дизельных и бензиновых двигателей грузовой и специальной техники. Надёжная защита от износа и стабильная работа в любых условиях.',
      hy: 'Սինթետիկ շարժիչի յուղ Mobil SUPER 3000 X1 5W-40՝ բեռնատար և հատուկ տեխնիկայի դիզելային ու բենզինային շարժիչների համար։ Հուսալի պաշտպանություն մաշվածությունից և կայուն աշխատանք ցանկացած պայմաններում։',
    },
  },
  {
    id: 2,
    slug: 'blue-print-ad03r630-poly-v-belt',
    sku: 'AD03R630',
    brand: 'BLUE PRINT',
    group: 'BLUE PRINT CAR',
    category: 'engine',
    price: 5900,
    oldPrice: 6800,
    deliveryDays: 5,
    weightKg: 0.04,
    sizeMm: '79x15x280',
    name: {
      en: 'AD03R630 BLUE PRINT poly-V belt',
      ru: 'AD03R630 BLUE PRINT, поликлиновой ремень',
      hy: 'AD03R630 BLUE PRINT, պոլիգոտավոր գոտի',
    },
    description: {
      en: 'New original Blue Print AD03R630 poly-V belt. Best price for new parts, fast delivery, high product quality and the best service.',
      ru: 'Новый оригинал Blue Print AD03R630 поликлиновой ремень. Лучшая цена для новых деталей, быстрая доставка, высокое качество продукции и лучший сервис.',
      hy: 'Նոր օրիգինալ Blue Print AD03R630 պոլիգոտավոր գոտի։ Նոր դետալների լավագույն գինը, արագ առաքում, բարձր որակ և լավագույն սպասարկում։',
    },
  },
  {
    id: 3,
    slug: 'hydraulic-hose-dn16-2sn',
    sku: 'HH-16-2SN',
    brand: 'Hydrotech',
    group: 'HYDRAULIC HOSES',
    category: 'hydraulics',
    price: 3500,
    oldPrice: 4100,
    deliveryDays: 7,
    weightKg: 0.9,
    sizeMm: 'DN16 x 1000',
    name: {
      en: 'High-pressure hydraulic hose DN16 2SN, 1 m',
      ru: 'Рукав высокого давления DN16 2SN, 1 м',
      hy: 'Բարձր ճնշման հիդրավլիկ խողովակ DN16 2SN, 1 մ',
    },
    description: {
      en: 'Two-braid high-pressure hose for hydraulic systems of excavators, loaders and other special machinery. Resistant to oils and temperature changes.',
      ru: 'Двухоплёточный рукав высокого давления для гидравлических систем экскаваторов, погрузчиков и другой спецтехники. Устойчив к маслам и перепадам температур.',
      hy: 'Երկշերտ բարձր ճնշման խողովակ էքսկավատորների, բեռնիչների և հատուկ այլ տեխնիկայի հիդրավլիկ համակարգերի համար։ Դիմացկուն է յուղերին և ջերմաստիճանի փոփոխություններին։',
    },
  },
  {
    id: 4,
    slug: 'hydraulic-filter-element-hf-35',
    sku: 'HF-35-120',
    brand: 'FilterPro',
    group: 'HYDRAULIC FILTERS',
    category: 'filters',
    price: 9800,
    oldPrice: 11500,
    deliveryDays: 7,
    weightKg: 0.6,
    sizeMm: '110x110x240',
    name: {
      en: 'Hydraulic filter element HF-35-120',
      ru: 'Фильтрующий элемент гидравлики HF-35-120',
      hy: 'Հիդրավլիկայի ֆիլտրող տարր HF-35-120',
    },
    description: {
      en: 'Replacement hydraulic filter element for loaders and excavators. Keeps the hydraulic oil clean and extends the life of pumps and valves.',
      ru: 'Сменный фильтрующий элемент гидравлики для погрузчиков и экскаваторов. Сохраняет чистоту рабочей жидкости и продлевает срок службы насосов и клапанов.',
      hy: 'Փոխարինվող ֆիլտրող տարր բեռնիչների և էքսկավատորների հիդրավլիկայի համար։ Պահպանում է աշխատանքային հեղուկի մաքրությունը և երկարացնում պոմպերի ու փականների ծառայության ժամկետը։',
    },
  },
  {
    id: 5,
    slug: 'air-filter-af-2540-wheel-loader',
    sku: 'AF-2540',
    brand: 'FilterPro',
    group: 'AIR FILTERS',
    category: 'filters',
    price: 12400,
    oldPrice: 14200,
    deliveryDays: 10,
    weightKg: 1.4,
    sizeMm: '320x320x450',
    name: {
      en: 'Air filter AF-2540 for wheel loaders',
      ru: 'Воздушный фильтр AF-2540 для фронтальных погрузчиков',
      hy: 'Օդի ֆիլտր AF-2540՝ ճակատային բեռնիչների համար',
    },
    description: {
      en: 'Heavy-duty air filter for working in dusty conditions. Protects the engine from abrasive particles on construction sites and quarries.',
      ru: 'Воздушный фильтр для работы в условиях повышенной запылённости. Защищает двигатель от абразивных частиц на стройплощадках и в карьерах.',
      hy: 'Օդի ֆիլտր՝ մեծ փոշոտվածության պայմաններում աշխատելու համար։ Պաշտպանում է շարժիչը շինհրապարակների և քարհանքերի հղկող մասնիկներից։',
    },
  },
  {
    id: 6,
    slug: 'loader-tire-17-5-25-12pr',
    sku: 'TR-1725-12',
    brand: 'RoadMaster',
    group: 'TIRES',
    category: 'wheels',
    price: 385000,
    oldPrice: 420000,
    deliveryDays: 21,
    weightKg: 82,
    sizeMm: '17.5-25 / 12PR',
    name: {
      en: 'Loader tire 17.5-25 12PR',
      ru: 'Шина для погрузчика 17.5-25 12PR',
      hy: 'Բեռնիչի անվադող 17.5-25 12PR',
    },
    description: {
      en: 'Off-the-road tire with an aggressive tread for wheel loaders. High traction on soft soil, gravel and rock.',
      ru: 'Индустриальная шина с агрессивным протектором для фронтальных погрузчиков. Высокое сцепление на мягком грунте, щебне и скальных породах.',
      hy: 'Արդյունաբերական անվադող ագրեսիվ պրոտեկտորով՝ ճակատային բեռնիչների համար։ Բարձր կպչողականություն փափուկ գրունտի, մանրախճի և ժայռային ապարների վրա։',
    },
  },
  {
    id: 7,
    slug: 'fuel-filter-separator-fs-19532',
    sku: 'FS-19532',
    brand: 'FilterPro',
    group: 'FUEL FILTERS',
    category: 'filters',
    price: 7600,
    oldPrice: 8900,
    deliveryDays: 7,
    weightKg: 0.8,
    sizeMm: '100x100x210',
    name: {
      en: 'Fuel filter-water separator FS-19532',
      ru: 'Топливный фильтр-сепаратор FS-19532',
      hy: 'Վառելիքի ֆիլտր-բաժանիչ FS-19532',
    },
    description: {
      en: 'Fuel filter with water separation for diesel engines. Prevents injector damage and keeps the fuel system clean.',
      ru: 'Топливный фильтр с отделением воды для дизельных двигателей. Предотвращает повреждение форсунок и сохраняет чистоту топливной системы.',
      hy: 'Վառելիքի ֆիլտր՝ ջրի անջատմամբ դիզելային շարժիչների համար։ Կանխում է ներարկիչների վնասումը և պահպանում վառելիքային համակարգի մաքրությունը։',
    },
  },
  {
    id: 8,
    slug: 'hydraulic-cylinder-seal-kit-80x45',
    sku: 'SK-80-45',
    brand: 'Hydrotech',
    group: 'SEAL KITS',
    category: 'hydraulics',
    price: 15800,
    oldPrice: 17900,
    deliveryDays: 10,
    weightKg: 0.5,
    sizeMm: '80x45',
    name: {
      en: 'Hydraulic cylinder seal kit 80x45',
      ru: 'Ремкомплект гидроцилиндра 80x45',
      hy: 'Հիդրավլիկ ցիլինդրի վերանորոգման հավաքածու 80x45',
    },
    description: {
      en: 'Complete set of seals for repairing hydraulic cylinders with an 80 mm bore and a 45 mm rod.',
      ru: 'Полный комплект уплотнений для ремонта гидроцилиндров с диаметром поршня 80 мм и штока 45 мм.',
      hy: 'Կնքման ամբողջական հավաքածու 80 մմ մխոցով և 45 մմ ձողով հիդրավլիկ ցիլինդրների վերանորոգման համար։',
    },
  },
];

export const SPECIAL_OFFER_IDS = [1, 2, 3, 4, 5, 7];

export function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id);
}

export function getProductsByCategory(category) {
  return PRODUCTS.filter((product) => product.category === category);
}

export default PRODUCTS;
