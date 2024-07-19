// document.addEventListener('DOMContentLoaded', async function() {

//     const token = localStorage.getItem('noteAuthToken')

//     if(!token) {
//         window.location.href = 'login.html'
//     }

//     try {
//         const response = await fetch('http://localhost:4000/note/get-notes', {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('noteAuthToken')
//             }
//         });

//         const result = await response.json();
//         const data = result.notes
//         let notes = []
//         const notesGrid = document.getElementById('notesGrid');
//         let updatedData = []

//         const searchResult = document.getElementById('search')
//         searchResult.addEventListener('input', (e) => {
//             updatedData = data.map(note => {
//                 note.title.includes(e.target.value)
//             })
//         })

//         console.log(updatedData);

//         notes.forEach(note => {
//             const noteBox = document.createElement('div');
//             noteBox.classList.add('note');
//             const noteContainer = document.createElement('div')
//             noteContainer.classList.add('note-container')
//             if(note.backgroundColor === '#000000') {
//                 noteBox.style.backgroundColor = note.backgroundColor;
//                 noteBox.style.color = '#ffffff';
//                 noteContainer.style.backgroundColor = note.backgroundColor;
//                 noteContainer.style.color = '#ffffff';
//             } else {
//                 noteBox.style.backgroundColor = note.backgroundColor
//                 noteContainer.style.backgroundColor = note.backgroundColor;
//             }

//             const titleElement = document.createElement('div');
//             titleElement.classList.add('note-title');
//             titleElement.textContent = note.title;

//             const descriptionElement = document.createElement('div');
//             descriptionElement.classList.add('note-description');
//             descriptionElement.textContent = note.description;

//             const reminderElement = document.createElement('div');
//             reminderElement.classList.add('note-reminder');
//             reminderElement.textContent = note.reminder ? `Reminder: ${note.reminder.split('T')[0]}` : '';
//             if(note.backgroundColor === '#000000') {
//                 reminderElement.style.color = '#ffffff'
//             }
//             // reminderElement.style.visibility = note.reminder !== '' ? 'visible' : 'hidden';

//             const iconsBox = document.createElement('div');
//             iconsBox.classList.add('note-iconsBox');

//             const editButton = document.createElement('button')
//             editButton.classList.add('note-iconsBox-icon')
//             editButton.innerHTML = '<i class="fa fa-edit" style="font-size:20px;color:red"></i>'
//             editButton.title = 'edit'
//             editButton.id = 'edit'

//             const archiveButton = document.createElement('button')
//             archiveButton.classList.add('note-iconsBox-icon')
//             archiveButton.innerHTML = '<i class="fa fa-archive" style="font-size:20px"></i>'
//             archiveButton.title = 'archive'
//             archiveButton.id = 'archive'

//             const trashButton = document.createElement('button')
//             trashButton.classList.add('note-iconsBox-icon')
//             trashButton.innerHTML = '<i class="fa fa-trash-o" style="font-size:20px"></i>'
//             trashButton.title = 'move to trash'
//             trashButton.id = 'trash'

//             iconsBox.appendChild(editButton)
//             iconsBox.appendChild(archiveButton)
//             iconsBox.appendChild(trashButton)

//             noteBox.appendChild(titleElement);
//             noteBox.appendChild(descriptionElement);
//             noteBox.appendChild(reminderElement);

//             noteContainer.appendChild(noteBox)
//             noteContainer.appendChild(iconsBox)

//             notesGrid?.appendChild(noteContainer);

//             editButton?.addEventListener('click', () => {
//                 const editNote = note
//                 localStorage.setItem("editNote", JSON.stringify(editNote))
//                 window.location.href = 'addNote.html'
//             })

//             archiveButton?.addEventListener('click', async () => {
//                 const noteId = note._id
//                 try {
//                     const response = await fetch(`http://localhost:4000/note/archive/${noteId}`, {
//                         method: 'PUT',
//                         headers: {
//                             'Authorization': 'Bearer ' + localStorage.getItem('noteAuthToken')
//                         }
//                     })
//                     const result = await response.json()
//                     window.location.href = 'home.html'
//                     console.log(result)
//                 } catch(err) {
//                     console.log(err)
//                 }
//             })

//             trashButton?.addEventListener('click', async () => {
//                 try {
//                     const response = await fetch(`http://localhost:4000/note/trash/${note._id}`, {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${localStorage.getItem('noteAuthToken')}`
//                         }
//                     });

//                     if (response.ok) {
//                         window.location.href = 'home.html'
//                         noteBox.remove();
//                     } else {
//                         const error = await response.json();
//                         alert(`Error: ${error.message}`);
//                     }
//                 } catch (error) {
//                     console.error('Error moving note to trash:', error);
//                     alert('An error occurred. Please try again.');
//                 }
//             })
//         });

//     } catch (error) {
//         console.error('Error fetching notes:', error);
//     }
// });

document.addEventListener("DOMContentLoaded", async () => {
  const notesGrid = document.getElementById("notesGrid");
  const searchInput = document.getElementById("search");

  const token = localStorage.getItem("noteAuthToken");

  if (!token) {
    window.location.href = "login.html";
  }

  try {
    const response = await fetch("http://localhost:4000/note/get-notes", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("noteAuthToken"),
        },
      });
    
      const result = await response.json();
      const notes = result.notes;
    
      const displayNotes = (filteredNotes) => {
        notesGrid.innerHTML = "";
        filteredNotes.forEach((note) => {
          const noteBox = document.createElement("div");
          noteBox.classList.add("note");
          const noteContainer = document.createElement("div");
          noteContainer.classList.add("note-container");
          if (note.backgroundColor === "#000000") {
            noteBox.style.backgroundColor = note.backgroundColor;
            noteBox.style.color = "#ffffff";
            noteContainer.style.backgroundColor = note.backgroundColor;
            noteContainer.style.color = "#ffffff";
          } else {
            noteBox.style.backgroundColor = note.backgroundColor;
            noteContainer.style.backgroundColor = note.backgroundColor;
          }
    
          const titleElement = document.createElement("div");
          titleElement.classList.add("note-title");
          titleElement.textContent = note.title;
    
          const descriptionElement = document.createElement("div");
          descriptionElement.classList.add("note-description");
          descriptionElement.textContent = note.description;
    
          const reminderElement = document.createElement("div");
          reminderElement.classList.add("note-reminder");
          reminderElement.textContent = note.reminder
            ? `Reminder: ${note.reminder.split("T")[0]}`
            : "";
          if (note.backgroundColor === "#000000") {
            reminderElement.style.color = "#ffffff";
          }
          // reminderElement.style.visibility = note.reminder !== '' ? 'visible' : 'hidden';
    
          const iconsBox = document.createElement("div");
          iconsBox.classList.add("note-iconsBox");
    
          const editButton = document.createElement("button");
          editButton.classList.add("note-iconsBox-icon");
          editButton.innerHTML =
            '<i class="fa fa-edit" style="font-size:20px;color:red"></i>';
          editButton.title = "edit";
          editButton.id = "edit";
    
          const archiveButton = document.createElement("button");
          archiveButton.classList.add("note-iconsBox-icon");
          archiveButton.innerHTML =
            '<i class="fa fa-archive" style="font-size:20px"></i>';
          archiveButton.title = "archive";
          archiveButton.id = "archive";
    
          const trashButton = document.createElement("button");
          trashButton.classList.add("note-iconsBox-icon");
          trashButton.innerHTML =
            '<i class="fa fa-trash-o" style="font-size:20px"></i>';
          trashButton.title = "move to trash";
          trashButton.id = "trash";
    
          iconsBox.appendChild(editButton);
          iconsBox.appendChild(archiveButton);
          iconsBox.appendChild(trashButton);
    
          noteBox.appendChild(titleElement);
          noteBox.appendChild(descriptionElement);
          noteBox.appendChild(reminderElement);
    
          noteContainer.appendChild(noteBox);
          noteContainer.appendChild(iconsBox);
    
          notesGrid?.appendChild(noteContainer);
    
          editButton?.addEventListener("click", () => {
            const editNote = note;
            localStorage.setItem("editNote", JSON.stringify(editNote));
            window.location.href = "addNote.html";
          });
    
          archiveButton?.addEventListener("click", async () => {
            const noteId = note._id;
            try {
              const response = await fetch(
                `http://localhost:4000/note/archive/${noteId}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("noteAuthToken"),
                  },
                }
              );
              const result = await response.json();
              window.location.href = "home.html";
              console.log(result);
            } catch (err) {
              console.log(err);
            }
          });
    
          trashButton?.addEventListener("click", async () => {
            try {
              const response = await fetch(
                `http://localhost:4000/note/trash/${note._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                      "noteAuthToken"
                    )}`,
                  },
                }
              );
    
              if (response.ok) {
                window.location.href = "home.html";
                noteBox.remove();
              } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
              }
            } catch (error) {
              console.error("Error moving note to trash:", error);
              alert("An error occurred. Please try again.");
            }
          });
        });
      };
    
      const filterNotes = (query) => {
        const filteredNotes = notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.description.toLowerCase().includes(query.toLowerCase())
        );
        displayNotes(filteredNotes);
      };
    
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value;
        if (query) {
          filterNotes(query);
        } else {
          displayNotes(notes);
        }
      });
      displayNotes(notes);

  } catch(err) {
    console.log("error while fetching notes")
  }
});
