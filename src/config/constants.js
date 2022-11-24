import { COLORS, Icons } from 'theme'

export const FILTER_INITIAL_STATE = {
  duration: [],
  distance: [],
  difficulty: [],
  type: [],
}

export const languages = [
  {
    title: 'portuguese',
    code: 'pt',
  },
  {
    title: 'english',
    code: 'en',
  },
  {
    title: 'espanol',
    code: 'es',
  },
]

export const deltaCoordinates = {
  latitudeDelta: 0.1994,
  longitudeDelta: 0.1992,
}

export const deltaCoordinatesTrail = {
  latitudeDelta: 0.0009194,
  longitudeDelta: 0.009992,
}

export const filters = [
  {
    id: 0,
    name: 'distance',
    title: 'DISTANCE',
    icon: <Icons.Compass color={COLORS.textAccent} width={25} />,
    options: [
      {
        id: 0,
        value: '0 - 10',
      },
      {
        id: 1,
        value: '10 - 40',
      },
      {
        id: 2,
        value: '40 - 100',
      },
    ],
    unit: 'km',
  },
  {
    id: 1,
    name: 'duration',
    title: 'DURATION',
    icon: <Icons.Hourglass color={COLORS.textAccent} width={25} />,
    options: [
      {
        id: 3,
        value: '1 - 4',
      },
      {
        id: 4,
        value: '5 - 10',
      },
      {
        id: 5,
        value: '> 10',
      },
    ],
    unit: 'hr',
  },
  {
    id: 2,
    name: 'difficulty',
    title: 'DIFFICULTY',
    icon: <Icons.Balance color={COLORS.textAccent} width={25} />,
    options: [
      {
        id: 6,
        value: 'EASY',
      },
      {
        id: 7,
        value: 'MEDIUM',
      },
      {
        id: 8,
        value: 'HARD',
      },
    ],
    unit: '',
  },

  {
    id: 3,
    name: 'type',
    title: 'TYPE',
    icon: <Icons.Category color={COLORS.textAccent} width={25} />,
    options: [
      {
        id: 8,
        value: 'BIKE',
      },
      {
        id: 9,
        value: 'WALK',
      },
    ],
    unit: '',
  },
]

const BIG_SIZE = 50

export const trailTypes = {
  BIKE: {
    iconLight: <Icons.BikePin color={COLORS.white} width={25} height={25} />,
    icon: <Icons.BikePin color={COLORS.black} width={25} height={25} />,
    iconBig: <Icons.BikePin color={COLORS.black} width={BIG_SIZE} height={BIG_SIZE} />,
    locationIcon: <Icons.Bike color={COLORS.textAccent} width={25} height={25} />,
    typeIcon: <Icons.Bike color={COLORS.white} width={20} height={20} />,
    mapMode: 'BICYCLING',
  },
  WALK: {
    iconLight: <Icons.WalkPin color={COLORS.white} width={25} height={25} />,
    icon: <Icons.WalkPin color={COLORS.black} width={25} height={25} />,
    iconBig: <Icons.WalkPin color={COLORS.black} width={BIG_SIZE} height={BIG_SIZE} />,
    locationIcon: <Icons.Walk color={COLORS.textAccent} width={25} height={25} />,
    typeIcon: <Icons.Walk color={COLORS.white} width={20} height={20} />,
    mapMode: 'WALKING',
  },
}

export const trailImages1 = [
  require('../assets/images/21.jpg'),
  require('../assets/images/22.jpg'),
  require('../assets/images/23.jpg'),
  require('../assets/images/24.jpg'),
  require('../assets/images/24.jpg'),
  require('../assets/images/24.jpg'),
  require('../assets/images/24.jpg'),

  require('../assets/images/28.jpg'),
  require('../assets/images/28.jpg'),
  require('../assets/images/28.jpg'),
  require('../assets/images/28.jpg'),
  require('../assets/images/28.jpg'),
  require('../assets/images/28.jpg'),
  require('../assets/images/28.jpg'),
  // require('../assets/images/PR1.png'),
  // require('../assets/images/PR2.png'),
  // require('../assets/images/PR3.png'),
  // require('../assets/images/PR4.png'),
  // require('../assets/images/PR6.png'),
  // require('../assets/images/PR7.png'),
  // require('../assets/images/PR8.png'),
]

export const trailImages = {
  _21: require('../assets/images/21.jpg'),
  _22: require('../assets/images/22.jpg'),
  _23: require('../assets/images/23.jpg'),
  _24: require('../assets/images/24.jpg'),
  _25: require('../assets/images/24.jpg'),
  _26: require('../assets/images/24.jpg'),
  _27: require('../assets/images/24.jpg'),

  pr1: require('../assets/images/pr1.jpg'),
  pr2: require('../assets/images/pr4.jpg'),
  pr3: require('../assets/images/pr1.jpg'),
  pr4: require('../assets/images/pr4.jpg'),
  pr6: require('../assets/images/pr9.jpg'),
  pr7: require('../assets/images/pr7.jpg'),
  pr8: require('../assets/images/pr4.jpg'),
  pr9: require('../assets/images/pr9.jpg'),

  cg1: require('../assets/images/cg1.jpg'),
  cg2: require('../assets/images/cg2.jpg'),
  cg3: require('../assets/images/cg3.jpg'),
  cg4: require('../assets/images/cg4.jpg'),
  cg5: require('../assets/images/cg5.jpg'),
  cg6: require('../assets/images/cg6.jpg'),
  cg7: require('../assets/images/cg7.jpg'),
  cg8: require('../assets/images/cg8.jpg'),
}
