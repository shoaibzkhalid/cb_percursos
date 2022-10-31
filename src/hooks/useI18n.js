import { I18n } from 'i18n-js'
import { useSelector } from 'react-redux'

import { en } from 'assets/translations/en'
import { es } from 'assets/translations/es'
import { pr } from 'assets/translations/pr'

export const useI18n = () => {
  const lang = useSelector((state) => state.app.lang)

  const i18n = new I18n({
    en,
    es,
    pr,
  })

  i18n.defaultLocale = lang
  i18n.locale = lang

  // console.log('i18n', i18n, i18n.t('CHOOSE_LANG'))

  return { i18n, t: (key) => i18n.t(key) }
}
