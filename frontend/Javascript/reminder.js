document.addEventListener('DOMContentLoaded', async function() {

    const token = localStorage.getItem('noteAuthToken')

    if(!token) {
        window.location.href = 'login.html'
    }

    try {
        const response = await fetch('https://notes-application-l14a.onrender.com/note/reminder', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('noteAuthToken')
            }
        });
        const result = await response.json();
        const notes = result.notes
        const notesGrid = document.getElementById('notesGrid');
        const display = document.querySelector('.display')
        const noteDisplay = document.querySelector('.note-display')

        if(notes.length === 0) {
            display.textContent = "No reminder notes"
        } else {
            noteDisplay.textContent = "Notes with upcoming reminders"
        }

        notes.forEach(note => {
            const noteBox = document.createElement('div');
            noteBox.classList.add('archive-note');
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
            reminderElement.classList.add('from-reminder');
            reminderElement.style.visibility = note.reminder !== '' ? 'visible' : 'hidden';
            reminderElement.textContent = note.reminder ? `Reminder: ${note.reminder.split('T')[0]}` : '';
            if(note.backgroundColor === '#000000') {
                reminderElement.style.color = '#ffffff'
            }

            const iconsBox = document.createElement('div');
            iconsBox.classList.add('note-iconsBox');

            const archiveButton = document.createElement('button')
            archiveButton.classList.add('note-iconsBox-icon')
            archiveButton.innerHTML = '<i class="fa fa-archive" style="font-size:18px"></i>'
            archiveButton.title = 'unarchive'
            archiveButton.id = 'archive'

            iconsBox.appendChild(archiveButton)

            noteBox.appendChild(titleElement);
            noteBox.appendChild(descriptionElement);
            noteBox.appendChild(reminderElement);
            // noteBox.appendChild(iconsBox);

            notesGrid.appendChild(noteBox);
        });

    } catch (error) {
        console.error('Error fetching notes:', error);
    }
});

