import { createContext, ReactNode, useState } from "react"

type HeaderTitleContextProps = {
  title: string
  onSetTitle: (title: string) => void
}

type HeaderTitleContextProviderProps = {
  children: ReactNode
}

export const HeaderTitleContext = createContext<HeaderTitleContextProps>({} as HeaderTitleContextProps)

export function HeaderTitleContextProvider({ children }: HeaderTitleContextProviderProps) {
  const [title, setTitle] = useState('')

  function onSetTitle(value: string) {
    setTitle(value)
  }

  return (
    <HeaderTitleContext.Provider value={{
      title,
      onSetTitle
    }}>
      {children}
    </HeaderTitleContext.Provider>
  )
}