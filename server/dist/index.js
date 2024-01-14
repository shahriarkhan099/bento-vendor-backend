"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const models_1 = __importDefault(require("./models"));
const order_router_1 = __importDefault(require("./routers/order.router"));
const product_router_1 = __importDefault(require("./routers/product.router"));
const vendor_router_1 = __importDefault(require("./routers/vendor.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/v1/order", order_router_1.default);
app.use("/v1/product", product_router_1.default);
app.use("/v1/vendor", vendor_router_1.default);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield models_1.default.sync();
            app.listen(config_1.default.PORT, () => {
                console.log(`[server]: Server is running on port ${config_1.default.PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
bootstrap();
