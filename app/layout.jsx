import React from 'react'
import'@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'PropertyPulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties, properties'
}

const MainLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Navbar></Navbar>
            <main>{children}</main>
            <Footer></Footer>
        </body>
    </html>
  )
}

export default MainLayout;