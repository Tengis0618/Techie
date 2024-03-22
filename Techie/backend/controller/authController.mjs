import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import {User} from '../db.mjs';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, category } = req.body;

  if (!username || !email || !password || !category) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    category,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      category: user.category,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data');
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if (user && (await bcrypt.compare(password, user.password))){
    req.user = user;
    console.log(req.user);
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      category: user.category,
      token: generateToken(user._id),
    })
  } else {
      res.status(400);
      throw new Error('Invalid credentials');
  }
})

const getMe = asyncHandler(async (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
})

export {
  registerUser,
  loginUser,
  getMe,
}

