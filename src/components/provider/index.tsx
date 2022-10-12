import { FormProvider, useForm } from 'react-hook-form'

type ProvidersProps = {
  children: React.ReactNode
}

export function AppProvider({ children }: ProvidersProps) {
  const formMethods = useForm()
  return <FormProvider {...formMethods}>{children}</FormProvider>
}
