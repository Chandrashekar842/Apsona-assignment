import { Note } from "../Models/note.js";

export const addNote = async (req, res, next) => {
  const {
    title,
    description,
    tags,
    reminder,
    trashedAt,
    archived,
    backgroundColor,
  } = req.body;
  const userId = req.user.userId;
  try {
    const newNote = await Note.create({
      title: title,
      description: description,
      tags: tags,
      userId: userId,
      reminder: reminder,
      trashedAt: trashedAt,
      archived: archived,
      backgroundColor: backgroundColor,
    });

    res.status(200).json({ message: "note created", note: newNote });
  } catch (err) {
    res.status(500);
    console.log(err);
    throw new Error("Failed to add note. Please try again later.", err);
  }
};

export const getNotes = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const notes = await Note.find({ userId, archived: false, trashedAt: null });
    return res.status(200).json({ notes });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};

export const editNotes = async (req, res, next) => {
  const noteId = req.params.noteId;
  const {
    title,
    description,
    tags,
    reminder,
    trashedAt,
    archived,
    backgroundColor,
  } = req.body;

  try {
    const note = await Note.findOneAndUpdate({ _id: noteId }, {
        title: title,
        description: description,
        reminder: reminder,
        trashedAt: trashedAt,
        archived: archived,
        backgroundColor: backgroundColor,
        tags: tags
    });
    if(!note) {
        return res.status(500).json({ message: "couldn't update note" })
    }
    return res.status(200).json({ note: note });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};

export const addToArchived = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const existingNote = await Note.findById(noteId);
    existingNote.archived = true;
    const updatedNote = await Note.findByIdAndUpdate(noteId, existingNote);
    return res
      .status(200)
      .json({ message: "note added to archived", note: updatedNote });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};

export const getArchivedNotes = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const archivedNotes = await Note.find({ userId, archived: true });
    return res.status(200).json({ notes: archivedNotes });
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};

export const removeFromArchive = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const exisitngNote = await Note.findById(noteId);
    exisitngNote.archived = false;
    const updatedNote = await Note.findByIdAndUpdate(noteId, exisitngNote);
    return res.status(200).json({ msg: "removed from archives" });
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};

export const moveToTrash = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user.userId;

    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { trashedAt: new Date() }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTrashedNotes = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const trashedNotes = await Note.find({ userId, trashedAt: { $ne: null } });
    return res.status(200).json({ notes: trashedNotes });
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};

export const restoreNote = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user.userId;

    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId, trashedAt: { $ne: null } },
      { trashedAt: null },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found or not in trash" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const reminderNotes = async (req, res, next) => {
    const userId = req.user.userId

    try {
        const currentDate = new Date()
        const reminderNotes = await Note.find({ userId, reminder: { $gte: currentDate } }).sort({ reminder: 1 })
        return res.status(200).json({ notes: reminderNotes })
    } catch(err) {
        return res.status(500).json({ err: err })
    }
}