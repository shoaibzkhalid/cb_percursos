import { FilterTypes } from 'enums/filterTypes'
import { COLORS, Icons } from 'theme'

export const FILTER_INITIAL_STATE = {
  type: [],
  duration: [],
  distance: [],
  difficulty: [],
}

export const languages = [
  {
    title: 'Inglês',
    code: 'en',
    image: 'english',
  },
  {
    title: 'português',
    code: 'pt',
    image: 'portuguese',
  },
  {
    title: 'Espanhol',
    code: 'es',
    image: 'espanol',
  },
  {
    title: 'Francês',
    code: 'fr',
    image: 'french',
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
    name: 'type',
    title: 'CHOOSE_TYPE',
    icon: <Icons.Category color={COLORS.textAccent} width={25} />,
    options: [
      {
        value: 'BIKE',
        id: FilterTypes.bike,
      },
      {
        id: 11,
        value: 'WALK',
        id: FilterTypes.walk,
      },
    ],
    unit: '',
  },
  {
    id: 1,
    name: 'distance',
    title: 'DISTANCE',
    icon: <Icons.Compass color={COLORS.textAccent} width={25} />,
    options: [
      {
        value: '0 - 10',
        id: FilterTypes.zeroTo10KM,
      },
      {
        value: '10 - 40',
        id: FilterTypes.tenTo40KM,
      },
      {
        value: '40 - 100',
        id: FilterTypes.fortyTo100KM,
      },
    ],
    unit: 'km',
  },
  {
    id: 2,
    name: 'duration',
    title: 'DURATION',
    icon: <Icons.Hourglass color={COLORS.textAccent} width={25} />,
    options: [
      {
        value: '1 - 4',
        id: FilterTypes.oneTo4Hr,
      },
      {
        value: '5 - 10',
        id: FilterTypes.fiveTo10hr,
      },
      {
        id: FilterTypes.above10Hr,
        value: '> 10',
      },
    ],
    unit: 'hr',
  },
  {
    id: 3,
    name: 'difficulty',
    title: 'DIFFICULTY',
    icon: <Icons.Balance color={COLORS.textAccent} width={25} />,
    options: [
      {
        value: 'EASY',
        id: FilterTypes.easy,
      },
      {
        value: 'MEDIUM',
        id: FilterTypes.medium,
      },
      {
        id: 9,
        value: 'HARD',
        id: FilterTypes.hard,
      },
    ],
    unit: '',
  },
]

const BIG_SIZE = 50
const ICON_SIZE = 35

export const trailTypes = {
  BIKE: {
    icon: <Icons.BikePin color={COLORS.textAccent} width={ICON_SIZE} height={ICON_SIZE} />,
    start: <Icons.BikePin color={COLORS.green} width={ICON_SIZE} height={ICON_SIZE} />,

    iconBig: <Icons.BikePin color={COLORS.textAccent} width={BIG_SIZE} height={BIG_SIZE} />,
    locationIcon: <Icons.Bike color={COLORS.textAccent} width={25} height={25} />,
    typeIcon: <Icons.Bike color={COLORS.white} width={20} height={20} />,
  },
  WALK: {
    icon: <Icons.WalkPin color={COLORS.textAccent} width={ICON_SIZE} height={ICON_SIZE} />,
    start: <Icons.BikePin color={COLORS.green} width={ICON_SIZE} height={ICON_SIZE} />,

    iconBig: <Icons.WalkPin color={COLORS.textAccent} width={BIG_SIZE} height={BIG_SIZE} />,
    locationIcon: <Icons.Walk color={COLORS.textAccent} width={25} height={25} />,
    typeIcon: <Icons.Walk color={COLORS.white} width={20} height={20} />,
  },
}

export const trailImages = {
  _21: require('../assets/images/21.jpg'),
  _22: require('../assets/images/22.jpg'),
  _23: require('../assets/images/23.jpg'),
  _24: require('../assets/images/24.jpg'),
  _25: require('../assets/images/25.jpg'),
  _26: require('../assets/images/26.jpg'),
  _27: require('../assets/images/27.jpg'),
  _28: require('../assets/images/28.jpg'),

  pr1: require('../assets/images/pr1.jpg'),
  pr2: require('../assets/images/pr2.jpg'),
  pr3: require('../assets/images/pr3.jpg'),
  pr4: require('../assets/images/pr4.jpg'),
  pr6: require('../assets/images/pr6.jpg'),
  pr7: require('../assets/images/pr7.jpg'),
  pr8: require('../assets/images/pr8.jpg'),
  pr9: require('../assets/images/pr9.jpg'),

  cg1: require('../assets/images/cg1.jpg'),
  cg2: require('../assets/images/cg2.jpg'),
  cg3: require('../assets/images/cg3.jpg'),
  cg4: require('../assets/images/cg4.jpg'),
  cg5: require('../assets/images/cg5.jpg'),
  cg6: require('../assets/images/cg6.jpg'),
  cg7: require('../assets/images/cg7.jpg'),
  cg8: require('../assets/images/cg8.jpg'),
  cg9: require('../assets/images/cg9.jpg'),
}
