import React from 'react'
import { NotifierContextProvider } from 'react-headless-notifier'
import { FormProvider, useForm } from 'react-hook-form'

import { ClaimerDataContext, initialClaimerData } from '../../context'
import { ClaimerData } from '../../types'

type ProvidersProps = {
  children: React.ReactNode
}

const dataReducer = (state: ClaimerData, action: Partial<ClaimerData>) => {
  console.debug('Update claimer data', action)
  return { ...state, ...action }
}

export function AppProvider({ children }: ProvidersProps) {
  const formMethods = useForm()
  const claimerDataContextValue = React.useReducer(dataReducer, initialClaimerData)

  return (
    <FormProvider {...formMethods}>
      <NotifierContextProvider config={{ max: 3, duration: 5000, position: 'topRight' }}>
        <ClaimerDataContext.Provider value={claimerDataContextValue}>{children}</ClaimerDataContext.Provider>
      </NotifierContextProvider>
    </FormProvider>
  )
}
