const noteInput = document.querySelector('#note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.querySelector('#notes-container');
const emptyMessage = document.querySelector('#empty-message');

let notes = [];

function addNote(){
    let textInput = noteInput.value.trim();

    if(textInput === ''){
        alert('Nota vazia. Digite uma nota válida!');
        return;
    }

    let object = {
        id: Date.now(),
        text: textInput
    };

    notes.push(object);
    noteInput.value = '';
    
    // CHAMA O REDESENHO
    renderNotes(); 
}

// --- FUNÇÃO PARA REDESENHAR O DOM ---
function renderNotes() {
    // 1. Limpa o contêiner para evitar notas duplicadas
    notesContainer.innerHTML = '';
    
    // 2. Lógica para exibir/esconder a mensagem de "Nenhuma nota"
    if (notes.length === 0) {
        emptyMessage.classList.remove('hidden');
        return; // Sai da função, pois não há notas para exibir
    } else {
        emptyMessage.classList.add('hidden');
    }

    // 3. Itera sobre o Array de Objetos 'notes'
    notes.forEach(note => {
        // Cria o elemento principal da nota (card)
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        // Adicionamos um atributo 'data-id' para identificar a nota ao deletar
        noteCard.setAttribute('data-id', note.id); 

        // Monta o HTML interno
        noteCard.innerHTML = `
            <p class="note-text">${note.text}</p>
            <button class="delete-note-btn" data-id="${note.id}">X</button>
        `;
        
        // Adiciona a nota ao contêiner
        notesContainer.appendChild(noteCard);
    });
    
    // 4. Conecta os Event Listeners dos novos botões de deletar
    setupDeleteListeners();
}

// --- FUNÇÃO DE CONEXÃO DE EVENTOS (Para Deletar) ---
// Precisamos desta função para adicionar listeners a elementos criados dinamicamente
function setupDeleteListeners() {
    document.querySelectorAll('.delete-note-btn').forEach(button => {
        // Usa o evento 'click' para chamar a função de deletar
        button.addEventListener('click', deleteNote);
    });
}

// --- FUNÇÃO PARA DELETAR NOTA ---
function deleteNote(event) {
    // 1. O 'data-id' foi salvo no botão. Capturamos esse ID.
    // O valor do atributo data-id é sempre uma STRING.
    const noteIdToDelete = parseInt(event.target.dataset.id); // Convertemos para número inteiro

    // 2. O Método FILTER()
    // O filter cria um NOVO Array apenas com os elementos que passam no teste (retornam TRUE).
    // Queremos manter todas as notas cujo ID NÃO seja igual ao noteIdToDelete.
    notes = notes.filter(note => {
        return note.id !== noteIdToDelete;
    });

    // 3. Renderiza a lista atualizada
    renderNotes();
}

addNoteBtn.addEventListener('click', addNote)