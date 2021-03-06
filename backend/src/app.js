import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import 'dotenv/config';

import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import discordRouter from './routes/discord.js';
import challengeRouter from './routes/challenge.js';
import projectRouter from './routes/project.js';
import questionRouter from './routes/question.js';
import commentRouter from './routes/comment.js';

import {
  handleErrors,
  notFound,
  developmentErrors,
  productionErrors,
  CustomError
} from './handlers/errorHandler.js';
import logger from './handlers/logHandler.js';
import { port, CORSwhitelist } from './config.js';

const app = express();

app.set('view engine', 'ejs');

const corsOptions = {
  origin: (origin, callback) => {
    if (CORSwhitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

app.use(cors(corsOptions));

const morganLogStyle = app.get('env') === 'development' ? 'dev' : 'combined';

logger.stream = { write: message => logger.info(message) };

app.use(morgan(morganLogStyle, { stream: logger.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

app.use('/', indexRouter);
app.use('/api', indexRouter);

const v1 = express.Router();
app.use('/api/v1', v1);

v1.use('/', indexRouter);
v1.use('/user', userRouter);
v1.use('/discord', discordRouter);
v1.use('/challenge', challengeRouter);
v1.use('/project', projectRouter);
v1.use('/question', questionRouter);
v1.use('/comment', commentRouter);

app.get(
  '/error',
  handleErrors(() => {
    throw new CustomError('This is a custom mock error.', 'mockError', 401);
  })
);

app.use(notFound);

if (app.get('env') === 'development') app.use(developmentErrors);
else app.use(productionErrors);

// app.use(function (err, req, res, next) {
//   logger.error(
//     `${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`
//   );
//   next(err);
// });

// // Default Error Handler
// app.use((err, req, res, next) => {
//   winstom.error('Internal Server Error');

//   res.status(500).send('500. Internal Server Error');

//   next();
// });

// export default app;

app.listen({ port }, err => {
  if (err) throw err;

  console.log(`Server ready at http://localhost:${port}/api/v1/`);
});
