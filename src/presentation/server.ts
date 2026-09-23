import express, { Router } from 'express';
import fileUpload from 'express-fileupload';

interface StartAppOptions {

  port: number;
  routes: Router;
  public_path?: string;

};

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: StartAppOptions) {
    this.port = options.port;
    this.routes = options.routes;
    this.publicPath = options.public_path || 'public';
    this.configureApp();
  };

  public async start() {
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });

  };

  private configureApp() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(fileUpload({
      limits: { fileSize: 1024 * 1024 * 5 }
    }));
    this.app.use(express.static(this.publicPath));
    this.app.use(this.routes);

    this.app.get('/*path', (_req, res) => {
      res.sendFile('index.html', { root: this.publicPath });
    });
  };

  public close() {
    this.serverListener?.close();
  };

};