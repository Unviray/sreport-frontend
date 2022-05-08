import { Fragment } from "react"
import { NextPage } from "next"
import type { AppProps } from "next/app"

import { Provider } from "react-redux"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import moment from 'moment'
import 'moment/locale/fr'

import Layout from "../src/components/layout"
import store from '../src/store'

import "../styles/globals.css"


moment.locale('fr')

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)


type MyNextPage = NextPage & {
  noLayout?: boolean
}

type MyAppProps = AppProps & {
  Component: MyNextPage
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const IfLayout = Component.noLayout ? Fragment : Layout

  return (
    <Provider store={store}>
      <IfLayout>
        <Component {...pageProps} />
      </IfLayout>
    </Provider>
  )
}

export default MyApp
