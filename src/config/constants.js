import { COLORS, Icons } from 'theme'

export const languages = [
  {
    title: 'portuguese',
    code: 'pr',
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

  // {
  //   id: 3,
  //   name: 'type',
  //   title: 'TYPE',
  //   icon: <Icons.Balance color={COLORS.textAccent} width={25} />,
  //   options: [
  //     {
  //       id: 8,
  //       value: 'BIKE',
  //     },
  //     {
  //       id: 9,
  //       value: 'WALK',
  //     },
  //   ],
  //   unit: '',
  // },
]

export const trailTypes = {
  bike: {
    iconLight: <Icons.Bike color={COLORS.white} />,
    icon: <Icons.Bike color={COLORS.black} />,
    mapMode: 'BICYCLING',
  },
  walk: {
    iconLight: <Icons.Walk color={COLORS.white} />,
    icon: <Icons.Walk color={COLORS.black} />,
    mapMode: 'WALKING',
  },
}
