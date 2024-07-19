document.addEventListener('DOMContentLoaded', async function() {

    const token = localStorage.getItem('noteAuthToken')

    if(!token) {
        window.location.href = 'login.html'
    }

    try {
        const response = await fetch('http://localhost:4000/note/trash', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('noteAuthToken')
            }
        });
        const result = await response.json();
        console.log(result)
        const notes = result.notes
        const notesGrid = document.getElementById('notesGrid');
        const displayTrash = document.querySelector('.display-trash')

        if(notes.length === 0) {
            displayTrash.textContent = 'no trash'
        } else {
            displayTrash.textContent = 'Trashed Notes will be deleted in 30 days'
        }

        notes.forEach(note => {
            const noteBox = document.createElement('div');
            noteBox.classList.add('trash-note');
            if(note.backgroundColor === '#000000') {
                noteBox.style.backgroundColor = note.backgroundColor;
                noteBox.style.color = '#ffffff';
            } else {
                noteBox.style.backgroundColor = note.backgroundColor;
            }

            const titleElement = document.createElement('div');
            titleElement.classList.add('note-title');
            titleElement.textContent = note.title;

            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('note-description');
            descriptionElement.textContent = note.description;

            const reminderElement = document.createElement('div');
            reminderElement.classList.add('note-reminder');
            reminderElement.style.visibility = note.reminder !== '' ? 'visible' : 'hidden';
            reminderElement.textContent = note.reminder ? `Reminder: ${note.reminder}` : '';

            const iconsBox = document.createElement('div');
            iconsBox.classList.add('note-iconsBox');

            const trashButton = document.createElement('button')
            trashButton.classList.add('note-iconsBox-icon')
            trashButton.innerHTML = '<i class="fa fa-trash-o" style="font-size:18px"></i>'
            trashButton.title = 'restore'
            trashButton.id = 'trash'

            iconsBox.appendChild(trashButton)

            noteBox.appendChild(titleElement);
            noteBox.appendChild(descriptionElement);
            noteBox.appendChild(reminderElement);
            noteBox.appendChild(iconsBox);

            notesGrid.appendChild(noteBox);

            trashButton?.addEventListener('click', async () => {
                const noteId = note._id
                try {
                    const response = await fetch(`http://localhost:4000/note/remove-from-trash/${noteId}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('noteAuthToken')
                        }
                    })
                    const result = await response.json()
                    window.location.href = 'trash.html'
                    console.log(result)
                } catch(err) {
                    console.log(err)
                }
            })
        });

    } catch (error) {
        console.error('Error fetching notes:', error);
    }
});

