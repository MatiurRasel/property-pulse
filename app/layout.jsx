import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';

import'@/assets/styles/globals.css';
import { GlobalProvider } from '@/context/GlobalContext';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';


export const metadata = {
    title: 'Property Pulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties, properties'
}

const MainLayout = ({children}) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
          <body>
              <Navbar></Navbar>
              <main>{children}</main>
              <Footer></Footer>
              <ToastContainer></ToastContainer>
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
   
    
  )
}

export default MainLayout;