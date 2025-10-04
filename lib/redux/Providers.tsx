'use client'

import { Provider } from "react-redux"
import { persistor, store } from "./store"
import { PersistGate } from "redux-persist/integration/react"


type PropType = {
    children: React.ReactNode
}

export default function Providers({ children }: PropType) {
   
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}  >
                {children}
            </PersistGate>
        </Provider>
    )
}