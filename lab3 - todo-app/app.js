class Note {
    constructor(title) {
        this.title = title;
        this.element = this.createElement(title);
        // HINT🤩 this.element = this.createElement(title);
    }

    createElement(title) {
        let newNote = document.createElement("li");

        // HINT🤩 newNote.addEventListener('click', this.remove.bind(newNote));
        newNote.addEventListener('click', this.remove.bind(newNote));
        newNote.innerHTML = title;

        return newNote;
    }

    add() {
        // HINT🤩
        // this function should append the note to the screen somehow
        let tasks = document.querySelector("#taskList");
        tasks.appendChild(this.element);
    }

    saveToStorage() {
        // HINT🤩
        // localStorage only supports strings, not arrays
        // if you want to store arrays, look at JSON.parse and JSON.stringify
        let savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
        if (savedNotes == null) savedNotes = [];
        savedNotes.push(this.title);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    }

    remove() {
        // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
        // in this function, 'this' will refer to the current note element
        // .removeChild(this)
        // remove the item from screen and from localstorage
        let tasks = document.querySelector("#taskList");
        tasks.removeChild(this);

        let value = this.innerText;

        let savedNotes = localStorage.getItem("savedNotes");
        savedNotes = JSON.parse(savedNotes) || [];

        let index = savedNotes.indexOf(value);
        savedNotes.splice(index, 1);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    }
}

class App {
    constructor() {
        console.log("👊🏼 The Constructor!");
        // HINT🤩
        // pressing the enter key in the text field triggers the createNote function
        // this.txtTodo = ???
        // this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
        // read up on .bind() -> we need to pass the current meaning of this to the eventListener
        // when the app loads, we can show previously saved noted from localstorage
        // this.loadNotesFromStorage();
        this.txtTodo = document.querySelector("#taskInput");
        this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
        this.loadNotesFromStorage();
    }

    loadNotesFromStorage() {
        // HINT🤩
        // load all notes from storage here and add them to the screen
        let savedNotes = localStorage.getItem("savedNotes");
        savedNotes = JSON.parse(savedNotes);
        if (savedNotes != null ) {
            for (let i = 0; i < savedNotes.length; i++) {
                let note = new Note(savedNotes[i]);
                note.add();
            }
        }
    }

    createNote(e) {
        // this function should create a new note by using the Note() class
        // HINT🤩
        // note.add();
        // note.saveToStorage();
        // clear the text field with .reset in this class
        // if (e.key === "Enter")
        if (e.key === "Enter") {
            e.preventDefault();
            let note = new Note(this.txtTodo.value);
            this.reset();
            note.add(note.element);
            note.saveToStorage();
        }
    }

    reset() {
        // this function should reset the form / clear the text field
        this.txtTodo.value = "";
    }
}

let app = new App();