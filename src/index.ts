// prevent module aliases from breaking once transpiled (test env)
import 'module-alias/register';
import initMongoConn from './database';
import app from './app';

/****************************
 *
 * Server Runtime Conf
 *
 ****************************/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
}); // TODO replace w/PM2

// initialize db conn
initMongoConn();
