const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//Fetch All Properties
async function fetchProperties({showFeatured = false} = {}) {
    try {
        //Handle the case where the domain is not available yet.
      if(!apiDomain) {
        return [];
      }

      // const endpoint = showFeatured
      // ? `${apiDomain}/properties/featured`
      // : `${apiDomain}/properties`;
  
      const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured' : ''}`
        ,{cache: 'force-cache'}
        //,{cache:'no-store'}
      );

      if(!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //Fetch Single Property
  async function fetchProperty(id) {
    try {
        //Handle the case where the domain is not available yet.
      if(!apiDomain) {
        return null;
      }
  
      const res = await fetch(`${apiDomain}/properties/${id}`
      //  ,{cache:'no-store'}
      );

      if(!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export {fetchProperties, fetchProperty} ;