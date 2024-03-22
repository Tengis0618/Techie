import {User} from '../db.mjs';
import asyncHandler from 'express-async-handler';

const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
})

const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        throw new Error('Profile Not Found');
    }
    /*
    const updatedProfile = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
    })*/
    user.profile.firstName = req.body.firstName
    user.profile.lastName = req.body.lastName
    user.email = req.body.email
    user.profile.experience = req.body.experience
    user.profile.education = req.body.education
    user.profile.projects = req.body.projects
    user.profile.achievements = req.body.achievements
    user.profile.skills = req.body.skills
    user.leetcode = req.body.leetcode
    user.save();
    console.log(user.leetcode);
    res.status(200).json(user);
})

export {getProfile, updateProfile}