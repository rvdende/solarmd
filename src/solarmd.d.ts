import { EventEmitter } from "events";

export declare interface SolarMdLoggerV2Driver {
    on(event: 'gotWSUri', listener: (url: string) => void): this;
    on(event: 'status', listener: (url: LogV2MessageType1 | LogV2MessageType0Possible) => void): this;
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

export interface LogV2MessageType1 {
    msgType: 1,
    data: string,
    requestID: number,
    success: boolean
    keepJsonData: boolean
    encodeMessageData: boolean
    sessionID: string
    requiredACK: boolean
    dataActual: boolean
}

export type LogV2MessageType0Possible = LogV2MessageType0<11, MessageDevModel11> | LogV2MessageType0<12, MessageDevModel12> | LogV2MessageType_subDevStatus

export interface LogV2MessageType0<D, T> {
    msgType: 0
    devModel: D
    messageList: T[]
    success: boolean
    dataClass: string
    keepJsonData: boolean
    encodeMessageData: boolean
    requiredACK: boolean
    dataActual: boolean
}

// STORAGE
export interface MessageDevModel11 {
    powerW: number
    ratedDischargeCurrentC: number
    voltageV: number,
    serialNumber: any
    currentA: number
    capacityAh: number
    ratedChargeCurrentC: number
    remainingTimeSign: number
    available: boolean
    deviceID: any
    ratedVoltageV: number
    storageName: string
    lastUpdate: number
    capacityP: number
    ratedCapacityAh: number
}

// DISCHARGING
export interface MessageDevModel12 {
    powerW: number
    weeklyEnergyWh: number
    voltageV: number
    serialNumber: any
    currentA: number
    onlineDevices: number
    available: boolean
    monthlyEnergyWh: number
    offlineDevices: number
    deviceID: any
    powerName: string // 'bank1-dischargingPower',
    energyWh: number
    yearlyEnergyWh: number
    lastUpdate: number
    dailyEnergyWh: number
    ratedPowerW: number
    powerType: any
}


// LIST OF DEVICES

export interface LogV2MessageType_subDevStatus {
    devType: number,
    ackID: number,
    msgType: 'subDevStatus',
    devModel: number,
    messageList:
    {
        parrentId: any
        serialNumber: string
        hidden: boolean
        hwVer: string
        modelID: number
        fwVer: string
        deviceID: number
        deviceName: string
        manufacturer: string
        connected: boolean
        lastSeen: number
        subModelID: number
        installedDate: number
        typeID: number
        status: any
    }[]
}