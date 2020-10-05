import { EventEmitter } from 'events';
import puppeteer from 'puppeteer'

// export declare interface SolarMdLoggerV2Driver {
//     on(event: 'gotWSUri', listener: (url: string) => void): this;
//     on(event: 'status', listener: (status: LogV2MessageType1 | LogV2Message<any>) => void): this;
//     on(event: string, listener: Function): this;
// }


export class SolarMdLoggerV2Driver extends EventEmitter {
    hostname = 'loggerv2-serialnumber';
    username = 'admin'; // default is admin
    password = 'admin'; // default is admin

    constructor(options: { hostname: string, username?: string, password?: string }) {
        super();

        if (options) {
            if (options.hostname) this.hostname = options.hostname;
            if (options.username) this.username = options.username;
            if (options.hostname) this.hostname = options.hostname;
        }

        this.connect();
    }

    connect = () => {

        (async () => {
            // https://github.com/puppeteer/puppeteer/issues/1762
            const browser = await puppeteer.launch({
                headless: true, // set to false to see the browser while it works.
                // args: ['--start-fullscreen'] 
            });
            const page = await browser.newPage();

            let url = 'http://' + this.hostname
            console.log(`${new Date().toISOString()} \t Connecting ` + url)
            await page.goto(url);
            // await page.focus('#loginForm\:j_idt12')

            await page.evaluate((username) => { document.querySelectorAll('input')[1].value = username }, this.username);
            await page.evaluate((password) => { document.querySelectorAll('input')[2].value = password }, this.password);
            await page.click('button');

            // detects websockets
            let pageCopy: any = page;
            const client = pageCopy._client

            client.on('Network.webSocketCreated', ({ url }: { url: string }) => {
                this.emit('gotWSUri', url);
            })

            client.on('Network.webSocketClosed', () => { })

            client.on('Network.webSocketFrameSent', () => { })

            client.on('Network.webSocketFrameReceived', ({ response }: { response: { payloadData: string } }) => {
                this.processWebsocketPacket(response.payloadData);
            })


            await page.waitForSelector('.dashboardWraper', { visible: true, timeout: 0 });

        })();


    }

    processWebsocketPacket(payloadData: string) {
        let a = payloadData.split('|')
        a.shift()
        let b = a.join('|');

        if (isJson(b)) {
            let status = JSON.parse(b);
            this.emit('status', status);

            // Further process

            let known = false;

            if (status.msgType == 1) known = true;

            if (status.msgType == 0) {
                // STORAGE
                if (status.devModel === 11) {
                    known = true;
                    this.emit('storage', status.messageList)
                }
                // POWER
                if (status.devModel === 12) {
                    known = true;
                    this.emit('power', status.messageList)
                }
            }

            // DEVICE LIST
            if (status.msgType === "subDevStatus") {
                if (status.devModel === 10) {
                    known = true;

                    this.emit('devices', status.messageList)
                }
            }

            if (known === false) {
                console.log("=================== unknown PACKET ! =========");
            }

            // End
        }
    }


}





// ------------------- data 2


export interface PowerData {
    powerW: number
    weeklyEnergyWh: number
    voltageV: number
    serialNumber: any
    currentA: number
    onlineDevices: number
    available: boolean
    monthlyEnergyWh: number
    offlineDevices: number
    deviceID: any,
    powerName: string
    energyWh: number
    yearlyEnergyWh: number
    lastUpdate: number
    dailyEnergyWh: number
    ratedPowerW: number
    powerType: any
}

// ----------------- data 3


export interface DischargeData {
    powerW: number
    ratedDischargeCurrentC: number
    voltageV: number
    serialNumber?: any
    currentA: number
    capacityAh: number
    ratedChargeCurrentC: number
    remainingTimeSign: number
    available: boolean,
    deviceID?: any,
    ratedVoltageV: number
    storageName: string
    lastUpdate: number
    capacityP: number
    ratedCapacityAh: number
}



function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}