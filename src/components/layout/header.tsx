import { useAccount, useConnectModal } from '@web3modal/react'
import React from 'react'

import { shortenIfAddress } from '../../utils'
import { Button } from '../form'
import { IconUser, IconWaiting } from '../icon'

export function Header() {
  const { isOpen, open } = useConnectModal()
  const { address, isConnected } = useAccount()
  const shortAddress = shortenIfAddress(address)

  const [loading, setLoading] = React.useState(false)

  const handleModalOpen = React.useCallback(() => {
    if (!isConnected) open()
  }, [isConnected, open])

  React.useEffect(() => {
    if (isOpen) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [isOpen])

  return (
    <header id="site-header" className="sticky top-0 flex flex-row justify-between bg-black p-4 md:px-6 lg:px-8">
      <div className="ml-auto">
        {!isConnected && (
          <Button className="uppercase" size="small" onClick={handleModalOpen}>
            {loading && <IconWaiting className="animate-spin mr-1 w-4 text-white" />}
            Connect Wallet
          </Button>
        )}
        {isConnected && (
          <div className="flex flex-row items-center px-2 py-1.5 text-5 leading-6 text-white">
            <IconUser className="mr-3 w-6" />
            {shortAddress}
          </div>
        )}
      </div>
    </header>
  )
}
