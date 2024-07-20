document.addEventListener('DOMContentLoaded', async (e) => {
  const editNote = JSON.parse(localStorage.getItem("editNote"));
  const edit = editNote === undefined ? false : true;
  if (editNote) {
    document.getElementById("title").value = editNote.title;
    document.getElementById("description").value = editNote.description;
    document.getElementById("reminder").value = editNote.reminder
    document.getElementById("backgroundColor").value = editNote.backgroundColor
  }

  document
    .getElementById("addNoteForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('noteAuthToken')

        const noteData = {
            title : document.getElementById("title").value,
            description : document.getElementById("description").value,
            backgroundColor : document.getElementById("backgroundColor").value,
            reminder : document.getElementById("reminder").value
        }

      try {
        let response 

        if(editNote) {
            response = await fetch(`https://notes-application-l14a.onrender.com/note/edit-note/${editNote._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData)
            })
        } else {
            response = await fetch("https://notes-application-l14a.onrender.com/note/add-note", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
              });
        }

        const result = await response.json();

        if (response.ok) {
          localStorage.removeItem('editNote')
          alert("note created successfully");
          window.location.href = "index.html";
        } else {    
          console.log(result);
          alert("note not created");
        }
      } catch (err) {
        console.log(err);
      }
    });
});
