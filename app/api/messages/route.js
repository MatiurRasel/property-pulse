
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

//GET /api/messages
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

        const readMessages = await Message.find({ recipient: userId,read: true })
            .sort({ createdAt: -1 }) //Sort by newest
            .populate('sender','username')
            .populate('property','name');

            const unReadMessages = await Message.find({ recipient: userId,read: false })
            .sort({ createdAt: -1 }) //Sort by newest
            .populate('sender','username')
            .populate('property','name');

        const messages = [
            ...unReadMessages,
            ...readMessages
        ]

        return new Response(JSON.stringify(messages), {
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
};

//POST /api/messages
export const POST = async (request) => {
    try {
        
        await connectDB();

        const { name, email, phone, message, property, recipient } = await request.json();

        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({
                message: 'You must be login to send a message'
            }), {
                    status: 401
                }
            );
        }

        const {user} = sessionUser;

        //Can't message yourself
        if(user.id === recipient) {
            return new Response(JSON.stringify({
                message: 'You cannot message yourself'
            }), {
                    status: 400
                }
            );
        }

        const newMessage = new Message({
            sender: user.id,
            recipient,
            email,
            phone,
            property,
            name,
            body: message,
        });

        await newMessage.save();

        return new Response(JSON.stringify({
            message: 'Message Sent'
        }), {
                status: 200
            }
        );

    } catch (error) {
        
        console.log(error);
        return new Response(JSON.stringify({
            message: 'Error sending message'
        }), {
                status: 500
            }
        );
    }
};