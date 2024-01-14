import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import config from "./config";
import sequelize from "./models";
import orderRouter from "./routers/order.router";
import productRouter from "./routers/product.router";
import vendorRouter from "./routers/vendor.router";

const app: Express = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/order", orderRouter);
app.use("/v1/product", productRouter);
app.use("/v1/vendor", vendorRouter);

async function bootstrap() {
  try {
    await sequelize.sync();
    app.listen(config.PORT, () => {
      console.log(`[server]: Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
