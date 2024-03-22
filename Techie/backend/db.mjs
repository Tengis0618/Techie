import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
    },
    category: {
        type: String,
        enum: ['recruiter', 'applicant'],
        required: true,
    },
    leetcode: {
      type: String,
      default: "",
    },
    profile: {
      firstName: {
        type: String,
        trim: true,
        maxlength: 32,
        default: "",
      },
      lastName: {
          type: String,
          trim: true,
          maxlength: 32,
          default: "",
      },
        experience: {
            type: String,
            default: "",
        },
        education: {
            type: String,
            default: "",
        },
        skills: {
            type: String,
            default: "",
        },
        projects: {
            type: String,
            default: "",
        },
        achievements: {
            type: String,
            default: "",
        },
    },
    contacts: String,
    });
    const applicants_Schema = new mongoose.Schema({
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
      },
      firstName: {
          type: String,
      },
      lastName: {
          type: String,
      },
      email: {
          type: String,
      },
  
  });
// Job Listing Schema
const jobListingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    default: '',
  },   //company
  jobtype: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship'],
    default: 'Full-time',
  },//string enum
  location: {
    type: String,
    default: '',
  },
  requirements: {
    type: String,
    default: '',
  },//string requirements
  contacts: {
    type: String,
    default: '',
  },    //string contacts
  details:  {
    type: String,
    default: '',
  },    //string details
  applicant_list: [applicants_Schema],// Add other job listing properties here
},
{
  timestamps: true,
}
);
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
const JobListing = mongoose.model('JobListing', jobListingSchema);
const Applicants_Schema = mongoose.model('applicants_Schema', applicants_Schema);

export { User, JobListing, Applicants_Schema };