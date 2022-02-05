import {Alert} from '@/components/structure/alert'
import {Footer} from '@/components/structure/footer'
import {Meta} from '@/components/structure/meta'
import { FC } from 'react'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

export const Layout: FC<Props> = ({ preview, children }: Props) => (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )