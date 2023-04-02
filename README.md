# Let's travel project

This is a full-stack application that hosts a fake hotel booking site. Here you may browse through fictitious hotels around the world and simulate reserves. You can also create an account and order bookings that will be saved in the database! If you regret any booking, no worries, you may delete them!

Part of the code was written while watching a Skillshare class taught by Chris Dixon. It's a little bit old, but all the knowledge is still worthwhile!
I did my best to make this project look more like me and not simply be a copy of the teacher's code... and I'm still adding some features and correcting some bugs.

## Usage:

### Home

The header form sends a POST request to the backend so it will search for the user's query in the MongoDB database using the user's input. The response is rendered in the layout as a list of hotels that match the input.

![image](https://user-images.githubusercontent.com/115307935/229349311-fb957bc8-00bd-48ee-afcc-cfbb101c8b7e.png)

This is what it looks like when searching for destination Brazil:

![image](https://user-images.githubusercontent.com/115307935/229349901-943fc3ab-ddac-4920-bcf7-0e37dc5372a0.png)

### Logging in and signing up

The users are saved in the MongoDB database after validation and sanitization. Users with the same email address may not sign up more than once.

![image](https://user-images.githubusercontent.com/115307935/229350436-2edf8d2b-b921-4397-8083-c177eb467c1b.png)

This is what the users look like in the database:

![image](https://user-images.githubusercontent.com/115307935/229350623-b649c39a-a158-4157-b8ad-78e58d45bc13.png)

The password is hashed using mongooseBcrypt as a security good practice.


After signing up and logging in, the users may book hotels by navigating the site and placing orders

![image](https://user-images.githubusercontent.com/115307935/229350281-19df6281-fb56-4d93-b6b9-fb8850bcb0bc.png)


![image](https://user-images.githubusercontent.com/115307935/229350266-55c48d07-c38b-4f97-9da0-cc13c2df9d0d.png)

### Admin section

When the isAdmin field of a user is set to true in the database, it's possible to add new hotels, delete old ones and see users' bookings.

![image](https://user-images.githubusercontent.com/115307935/229351061-3f73dfca-b97f-435e-986e-ce5d43b2f937.png)

![image](https://user-images.githubusercontent.com/115307935/229351150-04c7557d-7ec5-4f1a-966d-5dabb67eb93c.png)



## What I learned in this project

Pug:
-An easy way to create templates with less code and reuse of implemented logic;

MVC pattern:
-Learned how the model, view, and controller pattern works and how it makes it easier to organize the directories and the logic as a whole;

Express:
-Learned how to create the backend with its routes, the logic needed to access the database, how to validate user input before storing them, and much more!;

MongoDB:
-Strengthened my knowledge in MongoDB, how to create schemas, data models, and others;

CRUD:
-Create, read, update, and delete data from the database through the backend;

Cloudinary:
-Storing images in the cloud;

Data validation sanitization with express-validator;

Passport.js;

password encrypting with bcrypt;
