import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";


export const dynamic = 'force-dynamic';

//GET /api/bookmarks
export const GET = async() => {

    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required',{
                status: 401
            });
        }
        const{userId} = sessionUser;
        //Find user in database
        const user = await User.findOne({_id: userId});

        //Get users bookmarks
        const bookmarks = await Property.find({_id: {$in: user.bookmarks}});
        return new Response(JSON.stringify(bookmarks),{
            status: 200
        });

    } catch(error) {
        console.log(error);
        return new Response('Something went wrong',{
            status: 500
        });
    }
};

export const POST = async(request) => {
    try{
        await connectDB();
        
        const  {property}  = await request.json();

        if (!property || !property._id) {
            message = 'Invalid property data.';
            isBookmarked = false;
            return new Response(JSON.stringify({ message, isBookmarked }), {
                status: 400,
            });
        }

        const { _id: propertyId } = property;
        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required',{
                status: 401
            });
        }

        const {userId} = sessionUser;

        //Find user in database
        const user = await User.findOne({_id: userId});

        // Check if the property belongs to the user
        if (userId === property.owner) {
            return new Response(
                JSON.stringify({
                    message: 'You cannot bookmark your own property.',
                    isBookmarked: false,
                }),
                {
                    status: 403,
                }
            );
        }
        
        //Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);
        let message;


        if (isBookmarked) {
            // Remove bookmark
            user.bookmarks.pull(propertyId);
            message = 'Bookmark removed successfully.';
        } else {
            // Add bookmark
            user.bookmarks.push(propertyId);
            message = 'Bookmark added successfully.';
        }
        
        // Save changes to the user document
        try {
            await user.save();
        } catch (error) {
            return new Response(
                JSON.stringify({ message: 'Failed to update bookmarks.' }),
                {
                    status: 500,
                }
            );
        }
        
        return new Response(
            JSON.stringify({
                message,
                isBookmarked: !isBookmarked,
            }),
            {
                status: 200,
            }
        );

    } catch(error) {
        console.log(error);
        return new Response('Something went wrong',{
            status: 500
        });
    }
};