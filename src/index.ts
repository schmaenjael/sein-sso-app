import helmet from 'helmet';
import express from 'express';
import { ConfigParams, auth } from 'express-openid-connect';

import * as path from 'path';
import * as dotenv from 'dotenv';

import router from './routes';
import { getUser } from './middleware/user';

dotenv.config({ path: `.env.app` });

const app = express();
const port = process.env.PORT || 3000;
const authConfig: ConfigParams = {
  authRequired: true,
  clientSecret: process.env.SECRET,
  authorizationParams: {
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: 'openid profile email',
    audience: 'http://localhost:8080/realms/master/protocol/openid-connect/auth',
  },
  baseURL: process.env.BASE_URL || `http://localhost:${port}`,
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(getUser);
app.use(helmet());
app.use(express.json());
app.use(auth(authConfig)); //* <-- important for OpenID Connect
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use((req, res, next) => {
  const err: Error & { status?: number } = new Error('Not Found');
  err.status = 404;

  next(err);
});

app.listen(port, () => console.log(`[SERVER]: Successfully started on port ${port}`));
