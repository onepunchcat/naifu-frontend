import React from 'react'

import { Web3Modal } from '../modal'
import { Header } from './header'

export function BaseLayout(props: Required<React.PropsWithChildren>) {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main" className="px-4 md:px-6 lg:px-8 min-h-full">
        {props.children}
      </main>
      <Web3Modal />
    </div>
  )
}
