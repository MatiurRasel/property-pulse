import React from 'react'
import'@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
    title: 'Property Pulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties, properties'
}

const MainLayout = ({children}) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
            <Navbar></Navbar>
            <main>{children}</main>
            <Footer></Footer>
        </body>
      </html>
    </AuthProvider>
    
  )
}

export default MainLayout;