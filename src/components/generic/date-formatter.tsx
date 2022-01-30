import { parseISO, format } from 'date-fns'
import { FC } from 'react'

type Props = {
  dateString: string
}

export const DateFormatter: FC<Props> = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}
