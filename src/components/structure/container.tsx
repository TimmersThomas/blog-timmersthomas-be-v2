import { ReactNode, FC } from 'react'

type Props = {
  children?: ReactNode
}

export const Container: FC = ({ children }: Props) => {
  return <div className="container mx-auto px-5">{children}</div>
}
