The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

# Techie

## Overview

Searching for a job is a necessary but arduous task. Especially, tech jobs seems to be in demand but it also seems oversaturated as the same time. Sooo... that's where Techie comes in! 

Techie is a comprehensive web application designed to revolutionize the tech job search experience. It offers a seamless and user-friendly platform for tech job seekers and employers to connect, making the job hunting process efficient and effective. With Techie, finding the perfect job or the ideal candidate has never been easier.

## Data Model
The application will store Users, and Job listings

* users can have profile (Categorized as recruiter and applicant)
* each job listings can have multiple items (Title, Company, Requirements, Contacts, Recruiter)

An Example User:

```javascript
{
  firstName: "applicant",
  lastName: //name
  email: //email
  hash: // a password hash,
  category: // string recruiter or applicant
  profile: //object that contains information embedded item
    {
      experience: ''
      education:  ''
      skills:     ''
      projects:   ''
      achievements:''
    }
  contacts:   //string contacts
}
```

A Job List with embedded items:

```javascript
{
  user: // a reference to a User object (recruiter)
  title: "job title",
  createdAt: // timestamp
  company:    //company
  jobtype: //string enum
  location: //location
  requirements: //string requirements
  contacts:     //string contacts
  details:      //string details
  applicant_list: [
    {user, firstName, lastName, email}
  ]
}
```


## [Link to Commented First Draft Schema](db.mjs) 

![db schema](/db.mjs)
## Wireframes

/login - page for login

![list create](documentation/login_page.png)

/signup - page for signup

![list](documentation/sign_up.png)

/user/.../profile - page for user profile

![list](documentation/profile.png)

/user/.../joblist - page for job list

![list](documentation/job_list.png)

/ - landing page

![list](documentation/landin_page.png)

/user/job_posting - page for posting job

![list](documentation/job_posting.png)

/user/job_posting/applicant_list - page for applicant list

![list](documentation/appplicant_list.png)


## Site map

![sitemap](documentation/sitemap.png)
## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create and edit my own profile
4. as a user, I can view all of the job listings
5. as a user, I can create, delete, read my own job posting
6. as a user, I can apply to job postings in the job listing
7. as a user, I can view the jobs I applied for


## Research Topics

* (3 points) Integrate user authentication
    * I'm going to be using JWT and bcryptjs for user authentication
* (1 points) Use of API's such as Leetcode API for user profile
    * use Leetcode API for retrieving the number of problems solved on leetcode
* (6 points) ReactJs 
    * use react as the frameworks for frontend, used with redux toolkit and axios;

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

![app.mjs](/app.mjs)

## Annotations / References Used

1. [bcryptjs authentication docs](https://github.com/dcodeIO/bcrypt.js) 
2. [leetcode api](https://leetcode-api-faisalshohag.vercel.app/) 
3. [react](https://legacy.reactjs.org/docs/getting-started.html)
