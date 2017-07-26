import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import { json, urlencoded } from "body-parser";

import * as apis from "./routes/apis";

const app: express.Application = express();
const baseHref: string = '/';

app.disable("x-powered-by");

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(baseHref, express.static(path.resolve(__dirname, '../client')));
app.use(baseHref, express.static(path.resolve(__dirname, '../../node_modules')));
app.use('/apis', apis);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err: any, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export { app };
