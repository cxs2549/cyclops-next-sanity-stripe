import "../styles/globals.scss"
import { StateContext } from "../context/StateContext"
import Header from "../components/Header"
import Footer from '../components/Footer'
import { Toaster } from "react-hot-toast"
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Header />
      <Toaster />
      <Component {...pageProps} />
      <Footer />

    </StateContext>
  )
}

export default MyApp
