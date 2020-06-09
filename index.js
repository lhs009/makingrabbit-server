const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./models');
const config = require('./common/config');
const httpResponse = require('./common/httpResponse');
const authRouter = require('./routes/authRouters');
const serviceRouter = require('./routes/serviceRouter');
const codeGenerateRouter = require('./routes/codeGenerateRouter');

const app = express();

/* set middlewares */
app.set('view engine', 'ejs');
app.use(cors()); // cross domain middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

/* set api server routers     */
app.use('/auth', authRouter);
app.use('/service', serviceRouter);

/* set code generator routers */
app.use('/codes', codeGenerateRouter);

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/config', (req, res) => {
  console.log(JSON.stringify(config));
  res.json(config);
});

/* database synchronize */
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("db connected");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

/* catch 404 and forward to error handler */
app.use((req, res, next) => {
  next(httpResponse.ResourceNotFound);
});

/* error handler */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.error(err.message + '::' + err.status);
  res.status(err.status || 500);
  res.json({ success: false, message: err.message });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server started listening on ${process.env.SERVER_PORT}`);
});
