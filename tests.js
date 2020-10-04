"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var solar = new index_1.SolarMdLoggerV2Driver({
    hostname: 'loggerv2-slv213643303',
    username: 'admin',
    password: 'admin'
});
solar.on('status', function (status) {
    console.log(status);
});
