import React from 'react'
import type { PolymorphProps } from '@/shared/types/polymorph'
import s from './Card.module.scss'
import clsx from 'clsx'

export type CardVariant = 'primary' | 'secondary'
export type CardBorder = 'round-s' | 'round-m'

export type CardProps = {
  variant?: CardVariant
  max?: boolean
  border?: CardBorder
}

type TagComponent = <T extends React.ElementType>(
  props: PolymorphProps<T, CardProps>,
) => React.ReactNode

export const Card: TagComponent = <T extends React.ElementType = 'div'>(
  props: PolymorphProps<T>,
) => {
  const {
    as: Component = 'div',
    className,
    children,
    max,
    variant = 'primary',
    border = 'round-m',
    ...rest
  } = props

  const classNames = clsx(
    s.card,
    s[variant],
    s[border],
    max && s.max,
    className,
  )

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  )
}
