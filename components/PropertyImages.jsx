import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';   // Import the Gallery and Item components


const PropertyImages = ({images}) => {
  return (

    <Gallery>
            <section className='bg-blue-50 p-4'>
        <div className="container mx-auto">
            {images.length === 1 ? (
                <Item
                
                original={images[0]}
                thumbnail={images[0]}
                width="1000"
                height="600"
                >
                    {({ ref, open }) => (
                        <Image
                            ref={ref}
                            src={images[0]}
                            alt=''
                            className='object-cover h-[400px] mx-auto rounded-xl'
                            width={1800}
                            height={400}
                            onClick={open}
                            priority={true}
                        >
                            
                        </Image>
                    )}

                </Item>
                
            ) : (
                <div className='grid grid-cols-2 gap-4'>
                    {images.map((image, index) => (
                        <div 
                            key={index} 
                            className={`${
                                images.length === 3  && index == 2
                                ? 'col-span-2'
                                : 'col-span-1'
                            }`}>

                                <Item
                                original={image}
                                thumbnail={image}
                                width="1000"
                                height="600"
                                >
                                    {({ ref, open }) => (
                                        <Image
                                            ref={ref}
                                            src={image}
                                            alt=''
                                            className='object-cover h-[400px] w-full mx-auto rounded-xl'
                                            width={1800}
                                            height={400}
                                            onClick={open}
                                            priority={true}
                                        >
                                            
                                        </Image>
                                    )}
                                    </Item>
                                
                        </div>
                    ))}
                </div>
            )}
        </div>
    </section>

    </Gallery>


  )
}

export default PropertyImages