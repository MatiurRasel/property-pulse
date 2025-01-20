
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import { fetchProperties } from '@/utils/requests';

// This is a server component
 const PropertiesPage = async () => {

  // Fetch properties server-side
  const properties = await fetchProperties();

  //Sort Properties by date
  properties.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return (
    <>
        {/* Static Header Section */}
        <section className="bg-blue-700 py-4">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                <PropertySearchForm></PropertySearchForm>
  
            </div>
        </section>
  
        {/* Dynamic Properties Section */}
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.length === 0 ? (
                  <p>No properties found</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map((property, index) => (
                        <PropertyCard key={index} property={property}></PropertyCard>
                      ))
                    }
                </div>
                )}
                
          </div>
        </section>
              
    </>
  )
}



export default PropertiesPage;