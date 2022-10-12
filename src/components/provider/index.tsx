import { NotifierContextProvider } from 'react-headless-notifier'
import { FormProvider, useForm } from 'react-hook-form'

type ProvidersProps = {
  children: React.ReactNode
}

export function AppProvider({ children }: ProvidersProps) {
  const formMethods = useForm()
  return (
    <FormProvider {...formMethods}>
      <NotifierContextProvider config={{ max: 3, duration: 5000, position: 'topRight' }}>
        {children}
      </NotifierContextProvider>
    </FormProvider>
  )
}
