import React from 'react'

import { COLORS, Fonts, Icons } from 'theme'
import Content from 'features/Content'
import { useI18n } from 'hooks/useI18n'
import { FlatList, Flex } from 'native-base'

const Safety = () => {
  const { t } = useI18n()

  const content = {
    title: t('SAFETY'),
    icon: <Icons.Safety width={30} height={30} color={COLORS.white} style={{ margin: 10 }} />,
  }

  const rules = t('RULES')
    .split('•')
    .filter((r) => r)

  return (
    <>
      <Content content={content}>
        <Flex mt={'10px'}>
          <Fonts.RegularText>{t('RULES_HEADING')}</Fonts.RegularText>
        </Flex>

        <FlatList
          data={rules}
          renderItem={({ item }) => (
            <Flex my={1}>
              <Fonts.RegularTextLight color={COLORS.dark80}>
                • {item.trim()}
              </Fonts.RegularTextLight>
            </Flex>
          )}
        />
      </Content>
    </>
  )
}

export default Safety
