import { I18n } from 'i18n-js'
import { useSelector } from 'react-redux'

import { en } from 'assets/translations/en'
import { es } from 'assets/translations/es'
import { pt } from 'assets/translations/pt'
import { fr } from 'assets/translations/fr'
import dayjs from 'dayjs'

// dayjs locales for portuguese and spanish
require('dayjs/locale/pt')
require('dayjs/locale/es')

export const useI18n = () => {
  const lang = useSelector((state) => state.app.lang)

  const i18n = new I18n({
    en,
    es,
    pt,
    fr,
  })

  dayjs.locale(lang)

  if (!lang) return
  i18n.defaultLocale = lang
  i18n.locale = lang

  return { i18n, t: (key) => i18n.t(key) }
}
