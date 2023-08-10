class EventBus {
    private readonly listeners: Record<string, any[]> = {};

    on(event: string, callback: any) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event]?.push(callback);
    }

    off(event: string, callback: any) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event]!.filter((listener) => listener !== callback);
    }

    emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event]!.forEach((listener) => {
            listener(...args);
        });
    }
}

export default EventBus;
