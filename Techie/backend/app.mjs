import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import {config} from 'dotenv';

import authRoutes from './routes/authRoutes.mjs';
import errorHandler from './middleware/error.mjs';
import userRoutes from './routes/userRoutes.mjs';
import jobRoute from './routes/jobRoutes.mjs';
import {User} from './db.mjs';

config();

//database connection
mongoose.connect(process.env.DSN).then(()=>console.log("DB connected"))
.catch((err) => console.log(err));


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Middlewares
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

/*
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));*/

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(morgan("combined"));
app.use(cors());

//app.use(passport.initialize());
//app.use(passport.session());

// Passport Local Strategy
//passport.use(User.createStrategy());

// To use with sessions
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

app.use('/api/users', authRoutes);
app.use('/api/jobs', jobRoute);
app.use('/api/user', userRoutes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);
app.listen(process.env.PORT || 5000);
