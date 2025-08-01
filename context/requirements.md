FullStack Intern Coding Challenge
Tech Stack
● Backend: Any one of backend framework from this ExpressJs/Loopback/NestJs
● Database: PostgreSQL/MySQL
● Frontend: ReactJs
Requirements
We need a web application that allows users to submit ratings for stores registered on the
platform. The ratings should range from 1 to 5.
A single login system should be implemented for all users. Based on their roles, users will
have access to different functionalities upon logging in.
Normal users should be able to sign up on the platform through a registration page.
User Roles
1. System Administrator
2. Normal User
3. Store Owner
Functionalities
System Administrator
● Can add new stores, normal users, and admin users.
● Has access to a dashboard displaying:
○ Total number of users
○ Total number of stores
○ Total number of submitted ratings
● Can add new users with the following details:
○ Name
○ Email
○ Password
○ Address
● Can view a list of stores with the following details:
○ Name, Email, Address, Rating
● Can view a list of normal and admin users with:
○ Name, Email, Address, Role
● Can apply filters on all listings based on Name, Email, Address, and Role.
● Can view details of all users, including Name, Email, Address, and Role.
○ If the user is a Store Owner, their Rating should also be displayed.
● Can log out from the system.
Normal User

● Can sign up and log in to the platform.
● Signup form fields:
○ Name
○ Email
○ Address
○ Password
● Can update their password after logging in.
● Can view a list of all registered stores.
● Can search for stores by Name and Address.
● Store listings should display:
○ Store Name
○ Address
○ Overall Rating
○ User's Submitted Rating
○ Option to submit a rating
○ Option to modify their submitted rating
● Can submit ratings (between 1 to 5) for individual stores.
● Can log out from the system.
Store Owner
● Can log in to the platform.
● Can update their password after logging in.
● Dashboard functionalities:
○ View a list of users who have submitted ratings for their store.
○ See the average rating of their store.
● Can log out from the system.
Form Validations
● Name: Min 20 characters, Max 60 characters.
● Address: Max 400 characters.
● Password: 8-16 characters, must include at least one uppercase letter and one
special character.
● Email: Must follow standard email validation rules.
Additional Notes
● All tables should support sorting (ascending/descending) for key fields like Name,
Email, etc.
● Best practices should be followed for both frontend and backend development.
● Database schema design should adhere to best practices.