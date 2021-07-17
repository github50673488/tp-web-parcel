const logToPage = (msg: string) => {
    const ul = document.getElementById("list");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    // @ts-ignore
    ul.appendChild(li);
}

interface IPublisher {
    addSubscriber(observer: IObserver): void;

    removeSubscriber(observer: IObserver): void;

    notify(): void;
}

class PublisherA implements IPublisher {
    public state: number | undefined;

    private observerLst: IObserver[] = [];

    addSubscriber(observer: IObserver): void {
        if (this.observerLst.includes(observer)) {
            return logToPage(' already existing subscriber ');
        }
        this.observerLst.push(observer);
    }

    notify(): void {
        for (const observer of this.observerLst) {
            observer.update(this);
        }
    }

    removeSubscriber(observer: IObserver): void {
        const idx = this.observerLst.indexOf(observer);
        if (idx < 0) {
            return logToPage(' no existing subscriber');
        }
        this.observerLst.splice(idx, 1); // del
    }

    public someBusinessLogic(): void {
        this.state = Math.floor(Math.random() * (10 + 1));
        logToPage(`Subject: My state has just changed to: ${this.state}`);

        this.notify();
    }
}


interface IObserver {
    update(publisher: IPublisher): void;
}

class ObserverA implements IObserver {
    public update(publisher: IPublisher) {
        // @ts-ignore
        if (publisher instanceof PublisherA && publisher.state < 9) { // Observer can free add rule of receive
            // logToPage((`ObserverA reciever ${publisher.state}`);
            logToPage(`ObserverA reciever ${publisher.state}`);
        }
    }
}

class ObserverB implements IObserver {
    public update(publisher: IPublisher) {
        // @ts-ignore
        if (publisher instanceof PublisherA && publisher.state >= 3) { // Observer can free add rule of receive
            logToPage(`ObserverB reciever ${publisher.state}`);
        }
    }
}

const publisherA = new PublisherA();

const observerA = new ObserverA();
publisherA.addSubscriber(observerA);

const observerB = new ObserverB();
publisherA.addSubscriber(observerB);

publisherA.someBusinessLogic();
publisherA.someBusinessLogic();

// logToPage((' -----------  observerB deled ',)
logToPage(' -----------  observerB deled ');

publisherA.removeSubscriber(observerB);
publisherA.someBusinessLogic();
