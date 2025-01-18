import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const { id } = params;

        if (!id) {
            return new Response('Invalid or missing ID', { status: 400 });
        }

        const property = await Property.findById(id);

        if (!property) {
            return new Response('Property Not Found', { status: 404 });
        }

        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        console.error('GET Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
    try {
        await connectDB();

        const { id } = params;

        if (!id) {
            return new Response('Invalid or missing ID', { status: 400 });
        }

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const property = await Property.findById(id);

        if (!property) {
            return new Response('Property Not Found', { status: 404 });
        }

        if (property.owner.toString() !== sessionUser.userId) {
            return new Response('Unauthorized: Not the owner', { status: 401 });
        }

        await property.deleteOne();

        return new Response('Property Deleted Successfully', { status: 200 });
    } catch (error) {
        console.error('DELETE Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};


// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDB();

        const { id } = params;

        if (!id) {
            return new Response('Invalid or missing ID', { status: 400 });
        }

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const amenities = formData.getAll('amenities');

        const existingProperty = await Property.findById(id);

        if (!existingProperty) {
            return new Response('Property Not Found', { status: 404 });
        }

        if (existingProperty.owner.toString() !== sessionUser.userId) {
            return new Response('Unauthorized: Not the owner', { status: 401 });
        }

        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
        };

        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData, { new: true });

        return new Response(JSON.stringify(updatedProperty), { status: 200 });
    } catch (error) {
        console.error('PUT Error:', error);
        return new Response('Failed to update property', { status: 500 });
    }
};
