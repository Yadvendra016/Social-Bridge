# Social-Bridge
Welcome to the Social Media Web App project! This project is built using the MERN (MongoDB, Express, React, Node.js) stack. It includes features like user authentication using JWT, interactive UI components from Ant Design (antd), toast notifications using Toastify, cloudinary to store the post image and more.

## Table of Contents
- [Demo Video](#demo-video)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)


## Demo Video

https://github.com/Yadvendra016/Social-Bridge/assets/91756355/b776a791-42fa-4924-a772-bc09d1377713


Click the above image to watch the full demo video of the project in action.
## Configuration

Create a `.env` file in the `server` directory and add the following environment variables with your own values:
```
DATABASE=mongodb+srv://your-mongodb-connection-string<br>
PORT=8000<br>
JWT_SECRET=your-jwt-secret<br>
CLOUDINARY_NAME=your-cloudinary-name<br>
CLOUDINARY_KEY=your-cloudinary-key<br>
CLOUDINARY_SECRET=your-cloudinary-secret<br>
```
Replace `your-mongodb-connection-string`, `your-jwt-secret`, `your-cloudinary-name`, `your-cloudinary-key`, and `your-cloudinary-secret` with your actual environment variable values.


## Installation

1. Clone this repository to your local machine using:
 ```
https://github.com/your-username/your-social-media-app.git
```
2. Navigate to the project directory:
```
cd your-social-media-app
```
3. Install the server dependencies:
```
cd server
```
```
npm install
```
4. Install the client dependencies:
```
cd client
```
```
npm install
```
## Usage

1. Start the server:
```
cd server
```
```
npm start
```
2. start the client
```
cd client
```
```
npm start
```
3. Open your web browser and visit: `http://localhost:3000` to use the app.

## Features

- User registration and login using JWT authentication.
- Interactive UI components from Ant Design (antd) for a modern look.
- User Can create and delete a post (used CRUD operationo)
- user can like/unlike and comment
- user can follow and unfollow user
- user can update their profile(username, about)

## Technologies Used

- MongoDB: Database for storing user and post data.
- Express: Server framework for building APIs.
- React: Frontend library for building user interfaces.
- Node.js: JavaScript runtime for server-side development.
- JWT: JSON Web Tokens for user authentication.
- Ant Design (antd): UI library for building interactive components.
- Toastify: Library for displaying toast notifications.

## Contributing

Contributions are welcome! If you have any improvements or feature suggestions, feel free to submit a pull request. Please follow the standard coding conventions and create clear commit messages.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m "Add your message here"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## Contributors

Thanks to these amazing people who have contributed to this project:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/yadvendra016">
        <img src="https://github.com/yadvendra016.png" width="100px;" alt=""/>
        <br />
        <sub><b>Yadvendra Shukla</b></sub>
      </a>
    </td>
    <!-- Add more contributors in a similar way -->
  </tr>
</table>

