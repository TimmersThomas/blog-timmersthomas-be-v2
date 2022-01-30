import cn from 'classnames'
import { FC, HTMLProps } from 'react'

export const TextLink: FC<HTMLProps<HTMLAnchorElement>> = ({ className, rel, target, href, children, ...props }: HTMLProps<HTMLAnchorElement>) => {
  return (
    <a
      rel={rel || 'noopener'}
      target={target || '_blank'}
      href={href}
      className={cn(
        'underline',
        'hover:text-success',
        'duration-200',
        'transition-colors',
        'underline-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}