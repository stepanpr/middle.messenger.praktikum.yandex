import store from '../../app/Store';

export interface IMessage {
    chat_id: number;
    content: string;
    file: any;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}
class MessagesController {
    addMessage(message: IMessage, chatId: string) {
        const { messages = {} } = store.getState();
        if (Array.isArray(message)) {
            messages[chatId as any] = message.reverse();
        } else {
            messages[chatId as any].push(message);
        }

        store.set('messages', messages);
    }
}

const messagesController = new MessagesController();
export default messagesController;
