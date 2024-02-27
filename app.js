var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');


const verifyToken = require('./middlewares/verifyToken')
const User = require('./models/user');
const UserProfile = require('./models/userProfile')
const Friendship = require('./models/friend')
const  Message = require('./models/friend')

const userRouter = require('./routes/usersRoutes');
const signoutRouter = require('./routes/signoutRoutes')
const userProfileRouter = require('./routes/userProfileRoutes')
const friendRouter = require('./routes/friendRoutes')
const messageRouter = require('./routes/messagesRoutes')

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://zdes:zdeslav@cluster0.juicyif.mongodb.net/messenger_db?retryWrites=true&w=majority&appName=Cluster0";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}




var app = express();

app.use(logger('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads/avatars', express.static(path.join(__dirname, 'uploads/avatars')));

app.use('/api/signout', verifyToken); // Protect signout route


app.use('/api/', userRouter); // No token verification needed for registration
app.use('/api/signout', signoutRouter);
app.use('/api/', userProfileRouter);
app.use('/api/', friendRouter)
app.use('/api', messageRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
