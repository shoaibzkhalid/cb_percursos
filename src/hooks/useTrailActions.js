import _ from 'lodash'
import { COLORS, Icons } from 'theme'
import { useI18n } from './useI18n'

export const useTrailActions = () => {
  const { t } = useI18n()

  const getTrailSpecs = (item) => {
    const { properties } = item
    const { distance, duration, difficulty } = properties
    const hours = Math.abs((duration / 60).toFixed(1))
    const maxEl = parseFloat(_.max(item.elevations)).toFixed(1)

    const specs = [
      {
        id: 0,
        icon: <Icons.Compass color={COLORS.textAccent} />,
        value: `${(distance / 1000).toLocaleString('pt-PT')} km`,
        title: t('DISTANCE'),
      },
      {
        id: 1,
        icon: <Icons.Hourglass color={COLORS.textAccent} />,
        value: `${hours.toLocaleString('pt-PT')} hr`,
        title: t('DURATION'),
      },
      {
        id: 2,
        icon: <Icons.Balance color={COLORS.textAccent} />,
        value: `${t(difficulty.toUpperCase())}`,
        title: t('DIFFICULTY'),
      },

      {
        id: 3,
        icon: <Icons.Elevation color={COLORS.textAccent} />,
        value: `${maxEl} m`,
        title: t('ELEVATION'),
      },
    ]

    return _.max(item.elevations) ? specs.slice(0) : specs.slice(0, 3)
  }

  return { getTrailSpecs }
}
