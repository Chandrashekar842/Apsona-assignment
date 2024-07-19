import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  addNote,
  addToArchived,
  editNotes,
  getArchivedNotes,
  getNotes,
  getTrashedNotes,
  moveToTrash,
  reminderNotes,
  removeFromArchive,
  restoreNote,
} from "../Controllers/noteControllers.js";

export const noteRouter = express.Router();

noteRouter.post("/add-note", authMiddleware, addNote);

noteRouter.get("/get-notes", authMiddleware, getNotes);

noteRouter.put("/edit-note/:noteId", authMiddleware, editNotes);

noteRouter.put("/archive/:noteId", authMiddleware, addToArchived);

noteRouter.get("/archives", authMiddleware, getArchivedNotes);

noteRouter.put(
  "/remove-from-archive/:noteId",
  authMiddleware,
  removeFromArchive
);

noteRouter.put('/trash/:noteId', authMiddleware, moveToTrash)

noteRouter.get('/trash', authMiddleware, getTrashedNotes)

noteRouter.put('/remove-from-trash/:noteId', authMiddleware, restoreNote)

noteRouter.get('/reminder', authMiddleware, reminderNotes)
