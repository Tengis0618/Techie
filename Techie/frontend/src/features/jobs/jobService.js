import axios from 'axios';
const API_URL = '/api/jobs/';

const createJob = async (jobData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL, jobData, config);

    return response.data;
}

const myJobs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL,  config);

    return response.data;
}

const deleteJob = async (jobId, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    
    const response = await axios.delete(API_URL + jobId, config);

    return response.data;
}

const getJobs = async () => {
    const response = await axios.get(API_URL + 'alljobs');

    return response.data
}

const getAppliedJobs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + 'appliedjobs',  config);

    return response.data;
}

const applyJob = async (jobId, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(API_URL + jobId, jobId, config);

      return response.data;
}

const jobService = {
    applyJob,
    createJob,
    deleteJob,
    myJobs,
    getJobs,
    getAppliedJobs,
}

export default jobService;