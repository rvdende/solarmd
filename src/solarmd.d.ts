import { EventEmitter } from "events";

export declare interface SolarMdLoggerV2Driver {
    on(event: 'gotWSUri', listener: (url: string) => void): this;
    on(event: 'status', listener: (url: string) => void): this;
    on(event: string, listener: Function): this;
}

export class SolarMdLoggerV2Driver extends EventEmitter {
    hostname: string;
    username: string;
    password: string;

    constructor(options: { hostname: string, username?: string, password?: string });

    connect: () => void;
    processWebsocketPacket(payloadData: string);

}