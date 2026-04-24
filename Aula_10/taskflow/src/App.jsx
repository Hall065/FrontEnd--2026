import React, { useState, useEffect } from 'react';
import './App.css';

const PRIORITY_ORDER = { Alta: 0, Média: 1, Baixa: 2 };

function App() {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Baixa');
  const [taskList, setTaskList] = useState(() => {
    try {
      const saved = localStorage.getItem('@taskflow_data');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('Erro ao carregar tarefas do localStorage:', error);
      return [];
    }
  });
  const [filter, setFilter] = useState('Todas');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, label: '' });

  // Salva no localStorage
  useEffect(() => {
    localStorage.setItem('@taskflow_data', JSON.stringify(taskList));
  }, [taskList]);

  // ─── Adicionar tarefa ─────────────────────────────────────────────────────
  const addTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    setTaskList([newTask, ...taskList]);
    setTaskText('');
  };

  // ─── Concluir / Reabrir ───────────────────────────────────────────────────
  const toggleTask = (id) => {
    setTaskList(taskList.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // ─── Edição inline ────────────────────────────────────────────────────────
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = (id) => {
    if (!editingText.trim()) return;
    setTaskList(taskList.map((t) => (t.id === id ? { ...t, text: editingText } : t)));
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // ─── Exclusão com modal ───────────────────────────────────────────────────
  const requestDelete = (task) => {
    setDeleteModal({ open: true, id: task.id, label: task.text });
  };

  const confirmDelete = () => {
    setTaskList(taskList.filter((t) => t.id !== deleteModal.id));
    setDeleteModal({ open: false, id: null, label: '' });
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, id: null, label: '' });
  };

  // ─── Ordenação automática (Alta → Média → Baixa) + filtro + busca ─────────
  const filteredTasks = taskList
    .filter((t) => {
      if (filter === 'Pendentes') return !t.completed;
      if (filter === 'Concluídas') return t.completed;
      return true;
    })
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="app-container">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestão de Produtividade</p>
      </header>

      {/* Formulário de criação */}
      <section className="form-section">
        <form onSubmit={addTask}>
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Descrição da tarefa..."
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <button type="submit">Criar</button>
        </form>
      </section>

      {/* Busca em tempo real */}
      <section className="search-section">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar tarefas..."
          className="search-input"
        />
      </section>

      {/* Filtros */}
      <section className="filter-section">
        {['Todas', 'Pendentes', 'Concluídas'].map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      {/* Grid de tarefas */}
      <main className="task-grid">
        {filteredTasks.length === 0 && (
          <p className="empty-msg">Nenhuma tarefa encontrada.</p>
        )}

        {filteredTasks.map((item) => (
          <div
            key={item.id}
            className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''}`}
          >
            <div className="task-content">
              {editingId === item.id ? (
                <input
                  className="edit-input"
                  value={editingText}
                  autoFocus
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(item.id);
                    if (e.key === 'Escape') cancelEdit();
                  }}
                />
              ) : (
                <h3 className={item.completed ? 'strikethrough' : ''}>{item.text}</h3>
              )}
              <span>Prioridade: {item.priority}</span>
              <small>Criada em: {item.createdAt}</small>
            </div>

            <div className="task-actions">
              <button onClick={() => toggleTask(item.id)}>
                {item.completed ? 'Reabrir' : 'Concluir'}
              </button>

              {editingId === item.id ? (
                <>
                  <button onClick={() => saveEdit(item.id)}>Salvar</button>
                  <button onClick={cancelEdit}>Cancelar</button>
                </>
              ) : (
                <button onClick={() => startEdit(item)}>Editar</button>
              )}

              <button onClick={() => requestDelete(item)} className="delete">
                Remover
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Modal de confirmação de exclusão */}
      {deleteModal.open && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Remover a tarefa:</p>
            <strong>"{deleteModal.label}"</strong>
            <div className="modal-actions">
              <button onClick={cancelDelete}>Cancelar</button>
              <button onClick={confirmDelete} className="modal-delete">
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
