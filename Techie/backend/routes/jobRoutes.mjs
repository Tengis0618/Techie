import express from 'express';
import { createJob, myJobs, deleteJob, updateJob, getJobs, applyJob, getAppliedJobs} from '../controller/jobsController.mjs';
import protect from '../middleware/auth.mjs';
const router = express.Router();

router.route('/').get(protect, myJobs).post(protect, createJob);
router.route('/:id').delete(protect, deleteJob).post(protect, applyJob);
router.route('/alljobs').get(getJobs);
router.route('/appliedjobs').get(protect, getAppliedJobs);

export default router;