import express, { Express, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app: Express = express();
const port: number = 5000;

app.get('/hello', (req: Request, res: Response): void => {
  res.send('Hello CodeLab');
});

if (process.env.NODE_ENV === 'development') {
  app.use('/', createProxyMiddleware({ target: 'http://192.168.0.20:3000', changeOrigin: true }));
  
  app.listen(port, (): void => {
    console.log('Dev mode express is listening on port', port);
  });
} else if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('build'));
  
  app.listen(port, (): void => {
    console.log('Express is listening on port', port);
  });
}