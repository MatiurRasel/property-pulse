'use client';
import PropertyCard from '@/components/PropertyCard';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const SavedPropertiesPage = () => {

    const [properties,setProperties] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedProperties = async() => {
            try {
                const res = await fetch('/api/bookmarks');
                if(res.status === 200) {
                    const data = await res.json();
                    setProperties(data);
                }
                else {
                    console.log(res.statusText);
                    toast.error('Failed to fetch saved properties');
                }
            } catch(error) {
                console.log(error);
                toast.error('Failed to fetch saved properties');
            } finally {
                setLoading(false);
            }
        }
        fetchSavedProperties();
    },[]);
//console.log(properties);
  return loading ? (<Spinner loading={loading}></Spinner>) : (
    <section className="px-4 py-6">
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        <div className="container-xl log:container m-auto px-4 py-6">
            {properties.length === 0 ? <p className="text-center">You have no saved properties</p> :
             <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {properties.map(property => (
                <PropertyCard key={property._id} property={property}></PropertyCard>
                     ))
                }
                </div>
                }
           
        </div>
    </section>
  )
}

export default SavedPropertiesPage