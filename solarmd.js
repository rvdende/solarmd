"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarMdLoggerV2Driver = void 0;
var events_1 = require("events");
var puppeteer_1 = __importDefault(require("puppeteer"));
var SolarMdLoggerV2Driver = /** @class */ (function (_super) {
    __extends(SolarMdLoggerV2Driver, _super);
    function SolarMdLoggerV2Driver(options) {
        var _this = _super.call(this) || this;
        _this.hostname = 'loggerv2-serialnumber';
        _this.username = 'admin'; // default is admin
        _this.password = 'admin'; // default is admin
        _this.lastdata = undefined;
        _this.connect = function () { return __awaiter(_this, void 0, void 0, function () {
            var url, _a, page, pageCopy, client;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = 'http://' + this.hostname;
                        console.log(new Date().toISOString() + " \t Connecting " + url);
                        if (!this.browser) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.browser.close()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        // https://github.com/puppeteer/puppeteer/issues/1762
                        _a = this;
                        return [4 /*yield*/, puppeteer_1.default.launch({
                                headless: true,
                            })];
                    case 3:
                        // https://github.com/puppeteer/puppeteer/issues/1762
                        _a.browser = _b.sent();
                        return [4 /*yield*/, this.browser.newPage()];
                    case 4:
                        page = _b.sent();
                        return [4 /*yield*/, page.goto(url)];
                    case 5:
                        _b.sent();
                        // await page.focus('#loginForm\:j_idt12')
                        return [4 /*yield*/, page.evaluate(function (username) { document.querySelectorAll('input')[1].value = username; }, this.username)];
                    case 6:
                        // await page.focus('#loginForm\:j_idt12')
                        _b.sent();
                        return [4 /*yield*/, page.evaluate(function (password) { document.querySelectorAll('input')[2].value = password; }, this.password)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, page.click('button')];
                    case 8:
                        _b.sent();
                        pageCopy = page;
                        client = pageCopy._client;
                        client.on('Network.webSocketCreated', function (_a) {
                            var url = _a.url;
                            _this.emit('gotWSUri', url);
                        });
                        client.on('Network.webSocketClosed', function () { });
                        client.on('Network.webSocketFrameSent', function () { });
                        client.on('Network.webSocketFrameReceived', function (_a) {
                            var response = _a.response;
                            _this.processWebsocketPacket(response.payloadData);
                        });
                        return [4 /*yield*/, page.waitForSelector('.dashboardWraper', { visible: true, timeout: 0 })];
                    case 9:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        if (options) {
            if (options.hostname)
                _this.hostname = options.hostname;
            if (options.username)
                _this.username = options.username;
            if (options.hostname)
                _this.hostname = options.hostname;
        }
        _this.connect();
        _this.timer = setInterval(function () {
            if (_this.lastdata) {
                var timeago = new Date().getTime() - _this.lastdata.getTime();
                if (timeago > 30000) {
                    _this.connect();
                }
            }
            else {
            }
        }, 10000);
        return _this;
    }
    SolarMdLoggerV2Driver.prototype.processWebsocketPacket = function (payloadData) {
        this.lastdata = new Date();
        var a = payloadData.split('|');
        a.shift();
        var b = a.join('|');
        if (isJson(b)) {
            var status_1 = JSON.parse(b);
            this.emit('status', status_1);
            // Further process
            var known = false;
            if (status_1.msgType == 1)
                known = true;
            if (status_1.msgType == 0) {
                // STORAGE
                if (status_1.devModel === 11) {
                    known = true;
                    this.emit('storage', status_1.messageList);
                }
                // POWER
                if (status_1.devModel === 12) {
                    known = true;
                    this.emit('power', status_1.messageList);
                }
            }
            // DEVICE LIST
            if (status_1.msgType === "subDevStatus") {
                if (status_1.devModel === 10) {
                    known = true;
                    this.emit('devices', status_1.messageList);
                }
            }
            if (known === false) {
                console.log("=================== unknown PACKET ! =========");
            }
            // End
        }
    };
    return SolarMdLoggerV2Driver;
}(events_1.EventEmitter));
exports.SolarMdLoggerV2Driver = SolarMdLoggerV2Driver;
function isJson(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
