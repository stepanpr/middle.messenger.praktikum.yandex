import store from '../../app/Store';

class MessagesController {
    addMessage(message: any, chatId: string) {
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
