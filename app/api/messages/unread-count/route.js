import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

//GET /api/messages/unread-count

export const GET = async (request) => {

    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({
                message: 'You must be login to view messages'
            }), {
                    status: 401
                }
            );
        }

        const {userId} = sessionUser;

        const unreadCount = await Message.countDocuments({ recipient: userId,read: false });

        return new Response(JSON.stringify({count: unreadCount}), {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            message: 'Error fetching messages'
        }), {
                status: 500
            }
        );
    }

}

