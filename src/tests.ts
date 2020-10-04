import { SolarMdLoggerV2Driver } from "./index";

let solar = new SolarMdLoggerV2Driver({
    hostname: 'loggerv2-slv213643303',
    username: 'admin',
    password: 'admin'
});

solar.on('status', (status) => {
    console.log(status);
})