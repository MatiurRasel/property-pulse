import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

//PUT /api/messages/:id
export const PUT = async (request,{params}) => {
    try {
        await connectDB();

        const { id } = params;

        const sessionUser = await getSessionUser();

        //Check if user is logged in
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({
                message: 'You must be login to update a message'
            }), {
                status: 401
            }
            );
        }

        const { userId } = sessionUser;

        const message = await Message.findById(id);

        //Check if message exists
        if (!message) {
            return new Response(JSON.stringify({
                message: 'Message not found'
            }), {
                status: 404
            });
        }

        //Check if user is authorized to update message
        if (message.recipient.toString() !== userId) {
            return new Response(JSON.stringify({
                message: 'You are not authorized to update this message'
            }), {
                status: 401
            });
        }

        //Update message to read/unread based on current status
        message.read = !message.read;

        await message.save();

        return new Response(JSON.stringify(message), {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            message: 'Error updating message'
        }), {
            status: 500
        });
    }
}

//DELETE /api/messages/:id
export const DELETE = async (request,{params}) => {
    try {
        await connectDB();

        const { id } = params;

        const sessionUser = await getSessionUser();

        //Check if user is logged in
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({
                message: 'You must be login to delete a message'
            }), {
                status: 401
            }
            );
        }

        const { userId } = sessionUser;

        const message = await Message.findById(id);

        //Check if message exists
        if (!message) {
            return new Response(JSON.stringify({
                message: 'Message not found'
            }), {
                status: 404
            });
        }

        //Check if user is authorized to delete message
        if (message.recipient.toString() !== userId) {
            return new Response(JSON.stringify({
                message: 'You are not authorized to delete this message'
            }), {
                status: 401
            });
        }

        //Delete message
        await message.deleteOne();

        return new Response(JSON.stringify({
            message: 'Message deleted successfully'
        }), {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            message: 'Error deleting message'
        }), {
            status: 500
        });
    }
}