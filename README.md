# solarmd
Interact with Solar MD hardware.

## Changelog

| version | changes 
|---------|--------------------------------
| 0.0.1   | Initial release. EXPERIMENTAL! 
| 0.0.2   | Fix not emitting status bug   
| 0.0.3   | Add .d.ts typings for typescript   
| 0.0.4   | Improved typings for status packets

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

solar.on('status', (status) => {
    console.log(status);
})
```

## Output


```js
{
    powerW: -700.650342,
    ratedDischargeCurrentC: 0.694,
    voltageV: 53.249,
    serialNumber: null,
    currentA: -13.158,
    capacityAh: 124.8818388888889,
    ratedChargeCurrentC: 0.694,
    remainingTimeSign: -34107,
    available: true,
    deviceID: null,
    ratedVoltageV: 51.2,
    storageName: 'bank1',
    lastUpdate: 1601824567281,
    capacityP: 87,
    ratedCapacityAh: 144
}
```
