import express, { Application, Request } from 'express';
import { Server } from 'http';
import { errorHandler } from './middlewares/errorHandler';
import { IRoutes } from './interfaces/common.interface';
import { configs } from './config';
import { appRoutes } from './routes';
import { BASE_URL, HTTP_STATUS, RoutesConstants } from './constants';
import { handleResponse, logger } from './utils';
import { connectToDatabase } from './databases';
import { ApiError } from './errors';
import cors from 'cors';

class App {
  public app: Application;
  public env: string;
  public port: number | boolean;
  public server!: Server;
  public cors = cors;
  constructor() {
    this.app = express();
    this.env = configs.NODE_ENV;
    this.port = configs.PORT;
    this.initializeCors();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeHealthRoute();
    this.initializeErrorHandling();
  }

  public async startServer(): Promise<void> {
    try {
      await connectToDatabase().then(() => {
        logger.info(`Database connected 🔥 on ${this.env} mode...`);
        this.listen();
      });
    } catch (error) {
      logger.error(`Database not connected: ${(error as Error)?.message}`);
      process.exit(1);
    }
  }
  private listen(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port} ENV: ${this.env} mode...`);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeHealthRoute(): void {
    this.app.get(RoutesConstants.HEALTH, (_req, res) => {
      return res.json(handleResponse('Server Running Fine !'));
    });
  }

  private initializeRoutes(): void {
    const routes: IRoutes[] = appRoutes;

    routes?.forEach(route => {
      this.app.use(BASE_URL + route?.path, route.router);
    });
  }

  private initializeCors() {
    this.app.use(this.cors({ origin: '*' }));
  }

  private initializeErrorHandling(): void {
    this.app.all(RoutesConstants.NOT_FOUND, (req: Request) => {
      throw new ApiError(`Can't find ${req.method} :${req?.originalUrl} on this server!`, HTTP_STATUS.NOT_FOUND);
    });
    this.app.use(errorHandler);
  }
}
export const appInstance = new App();
