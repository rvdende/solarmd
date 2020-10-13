# solarmd
Interact with Solar MD hardware.

## Changelog

| version | changes 
|---------|--------------------------------
| 0.0.1   | Initial release. EXPERIMENTAL! 
| 0.0.2   | Fix not emitting status bug   
| 0.0.3   | Add .d.ts typings for typescript   
| 0.0.4   | Improved typings for `status` packets
| 0.0.5   | Improved typings and added `power`, `storage` and `devices` events.
| 0.0.6   | Added auto reconnect after 30sec inactivity

## Install

```
npm install solarmd
```

## Usage

Replace the serialnumber of your logger v2 in the hostname below. Be on the same local network.

```js
const solarmd = require('solarmd')

let solar = new solarmd.SolarMdLoggerV2Driver({
    hostname: 'loggerv2-slv213643303',
    username: 'admin',
    password: 'admin'
});
```

## Event: `status`

```js
solar.on('status', (status) => {
    console.log(status);
})
```

Outputs raw websocket stream. Rather use the events below as they are parsed from the status event stream.   

## Event: `storage`

```js
solar.on('storage', (storage) => {
    console.log(storage);
})
```
Example storage data:

```js
[
  {
    powerW: -233.00378,
    ratedDischargeCurrentC: 0.694,
    voltageV: 52.243,
    serialNumber: null,
    currentA: -4.46,
    capacityAh: 22.134141944444444,
    ratedChargeCurrentC: 0.694,
    remainingTimeSign: -18196,
    available: true,
    deviceID: null,
    ratedVoltageV: 51.2,
    storageName: 'bank1',
    lastUpdate: 1601876467861,
    capacityP: 15,
    ratedCapacityAh: 144
  }
]
```

## Event: `power`

```js
solar.on('power', (power) => {
    console.log(power);
})
```

Example power data:
```js
[
  {
    powerW: 230.71833600000002,
    weeklyEnergyWh: 2622.4062960056763,
    voltageV: 52.246,
    serialNumber: null,
    currentA: 4.416,
    onlineDevices: 1,
    available: true,
    monthlyEnergyWh: 40700.699443356425,
    offlineDevices: 0,
    deviceID: null,
    powerName: 'bank1-dischargingPower',
    energyWh: 221475.66601936772,
    yearlyEnergyWh: 221475.66601936772,
    lastUpdate: 1601876469796,
    dailyEnergyWh: 2622.4062960056763,
    ratedPowerW: 5116,
    powerType: null
  }
]
```

## Event: `devices`

```js
solar.on('devices', (devices) => {
    console.log(devices);
})
```

## Output


```ts
[
  {
    parrentId: null,
    serialNumber: 'SLV#####',
    hidden: false,
    hwVer: '202',
    modelID: 1,
    fwVer: '6.602',
    deviceID: 1,
    deviceName: 'Logger myPower V1',
    manufacturer: 'SolarMD (pty) ltd.',
    connected: true,
    lastSeen: 0,
    subModelID: 1,
    installedDate: 1580222244000,
    typeID: 100,
    status: null
  },
  {
    parrentId: null,
    serialNumber: 'SMD-VD-PS####',
    hidden: false,
    hwVer: '0',
    modelID: 12,
    fwVer: '501',
    deviceID: 4,
    deviceName: 'Power Service',
    manufacturer: 'Solar MD dev team',
    connected: true,
    lastSeen: 0,
    subModelID: 0,
    installedDate: 1580222245000,
    typeID: 0,
    status: null
  },
  {
    parrentId: null,
    serialNumber: 'SMDBEM####',
    hidden: false,
    hwVer: '1002',
    modelID: 22,
    fwVer: '4100',
    deviceID: 8,
    deviceName: 'LiIon EM Series',
    manufacturer: 'SolarMD (Pty) ltd.',
    connected: true,
    lastSeen: 1601812660665,
    subModelID: 14185,
    installedDate: 1600067980000,
    typeID: 300,
    status: null
  },
  {
    parrentId: null,
    serialNumber: 'LoggerV2-Relay1',
    hidden: false,
    hwVer: null,
    modelID: 14,
    fwVer: null,
    deviceID: 2,
    deviceName: 'LoggerV2-Relay1',
    manufacturer: null,
    connected: true,
    lastSeen: 0,
    subModelID: 2,
    installedDate: null,
    typeID: 2001,
    status: null
  },
  {
    parrentId: null,
    serialNumber: 'LoggerV2-Relay2',
    hidden: false,
    hwVer: null,
    modelID: 14,
    fwVer: null,
    deviceID: 3,
    deviceName: 'LoggerV2-Relay2',
    manufacturer: null,
    connected: true,
    lastSeen: 0,
    subModelID: 2,
    installedDate: null,
    typeID: 2001,
    status: null
  }
]

```
