"use client"

import { myStore } from "@/redux/store/store"
import { Provider } from "react-redux"


export default function MySession({children} : {children : React.ReactNode}) {
  return (
    <Provider store={myStore}>
        {children}
    </Provider>
  )
}
