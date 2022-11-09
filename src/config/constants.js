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

export const filters = [
  {
    id: 0,
    name: 'distance',
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
    unit: 'hour',
  },
  {
    id: 2,
    name: 'difficulty',
    icon: <Icons.Balance color={COLORS.textAccent} width={25} />,
    options: [
      {
        id: 6,
        value: 'Easy',
      },
      {
        id: 7,
        value: 'Medium',
      },
      {
        id: 8,
        value: 'Hard',
      },
    ],
    unit: '',
  },
]
