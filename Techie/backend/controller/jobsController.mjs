import { JobListing, Applicants_Schema, User } from "../db.mjs";
import asyncHandler from 'express-async-handler';

const getJobs = asyncHandler(async (req, res) => {
    const jobs = await JobListing.find({});
    res.status(200).json(jobs);

})

const createJob = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error('Please add all fields');
      }
    console.log(req.body.jobtype);
    const job = await JobListing.create({
        user: req.user.id,
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        jobtype: req.body.jobtype,
        requirements: req.body.requirements,
        contacts: req.body.contacts,
        details: req.body.details,
    })
    res.status(200).json(job);
})

const updateJob = asyncHandler(async (req, res) => {
    const job = await JobListing.findById(req.params.id)
  
    if (!job) {
      res.status(400)
      throw new Error('Job not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Make sure the logged in user matches the goal user
    if (job.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    const updatedJob = await JobListing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedJob);
})

const myJobs = asyncHandler(async (req, res) => {
    const jobs = await JobListing.find({user: req.user.id});
    res.status(200).json(jobs);
})

const getAppliedJobs = asyncHandler(async (req, res) => {
  const jobs = await JobListing.find({ 'applicant_list.user': req.user.id })
  console.log(jobs);

  res.status(200).json(jobs);
})

const applyJob = asyncHandler(async (req, res) => {
    console.log("got here!");
    const job = await JobListing.findById(req.params.id);
    console.log(req.user._id);
    const user = await User.findById(req.user._id);
    if (!job) {
      res.status(400);
      throw new Error('Job not found');
    }

    if (!req.user) {
      res.status(401);
      console.log("no User!!!");
      throw new Error('User not found');
    }

    const applicant = {
      user: user.id,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      email: user.email,
    }

    job.applicant_list.push(applicant);
    job.save()
    console.log(job.applicant_list);
    res.status(200).json({
      id: req.user.id,
    })
})


const deleteJob = asyncHandler(async (req, res) => {
    const job = await JobListing.findById(req.params.id);
  
    if (!job) {
      res.status(400);
      throw new Error('Job not found');
    }
  
    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }
  
    // Make sure the logged in user matches the goal user
    if (job.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }
    console.log(job);
    await JobListing.deleteOne({_id: req.params.id})
  
    res.status(200).json({ id: req.user.id })
  })

export {
    createJob, 
    getJobs,
    updateJob,
    myJobs,
    deleteJob,
    applyJob,
    getAppliedJobs,
}