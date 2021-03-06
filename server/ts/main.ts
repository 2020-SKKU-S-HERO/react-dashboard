import express, { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { apiRouter } from './routes/api-route';
import cors from 'cors';

export const app: Express = express();
const port: number = 5000;

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route
app.use('/api', apiRouter);

// static
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