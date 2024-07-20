# Notes Application

A full-stack notes application that allows users to create, manage, and organize their notes with features such as tagging, reminders, and archiving. Built with html, css and javascript for the frontend, Node.js with Express for the backend, and MongoDB for the database.
  
# features

- User authentication with JWT
- Create, edit, and delete notes
- Set reminders for notes
- Archive and trash notes with automatic cleanup
- Search and filter notes
- Responsive and user-friendly UI

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express, MongoDB, Mongoose

## Api Endpoints

  **Authentication**:
- POST /auth/register: Register a new user.
- POST /auth/login: Log in and receive a JWT token.
- POST /auth/verify: Verify JWT token.

  **Notes**
- GET /note/get-notes: Fetch all notes for the logged-in user.
- POST /note/add-note: Create a new note.
- PUT /note/edit-note/:noteId : Update a note by ID.
- PUT /note/archive/:noteId : Make a note as archive
- GET /note/archives : Fetch all archived notes of the user
- PUT /note/remove-from-archive/:noteId : Unarchive a note
- PUT /trash/:noteId : Move note to trash
- PUT /remove-from-trash/:noteId : Restore note
- GET /trash : Fetch all deleted notes
- GET /reminder : Shows all the notes with latest due date

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB_URL`

`JWT_SECRET`
