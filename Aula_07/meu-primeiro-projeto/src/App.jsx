import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div>
      <h1>Olá, React!</h1>
      <p>Estou alterando meu primeiro componente.</p>

      <Saudacao />
      <Perfil />
      <Painel />
      <NewPainel />
      <ComponenteComProps
        titulo="Título"
        descricao="Subtítulo"
        numero={8}
      />
      <PlacarFutebol />
    </div>
  )
}
export default App

function Saudacao() {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#007bff' }}>Olá, Mundo!</h2>
      <p>Este componente foi criado separadamente.</p>
    </div>
  )
}

function Perfil() {
  return (
    <div style={{ backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#2e7d32' }}>Perfil</h2>
      <p><strong>Nome:</strong> João Vitor</p>
      <p><strong>Email:</strong> joao@email.com</p>
      <p><strong>Cargo:</strong> Desenvolvedor Front-end</p>
    </div>
  )
}

function Painel() {
  return (
    <div style={{ backgroundColor: '#fff3e0', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#e65100' }}>Painel</h2>
      <p><strong>Tarefas:</strong> 5 pendentes</p>
      <p><strong>Mensagens:</strong> 3 novas</p>
      <p><strong>Status:</strong>Online</p>
    </div>
  )
}

function ComponenteComProps({ titulo, descricao, numero }) {
  return (
    <div style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#0d47a1' }}><strong>Componente: {titulo}</strong></h2>
      <p><strong>Subtitulo: {descricao}</strong></p>
      <p><strong>Numero:</strong> {numero}</p>
    </div>
  )
} 

function NewPainel() {
  const [texto, setTexto] = useState('');

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '15px', border: '1px dashed #ccc', marginTop: '20px' }}>
      <h4>Escreva uma mensagem:</h4>
      <input 
        type="text" 
        placeholder='Digite Algo...'
        onChange={(e) => setTexto(e.target.value)}
        style={{ padding: '8px', width: '80%'}}
      />

      <p>O que você digitou: <span style={{ color: 'red' }}>{texto}</span></p>
    </div>
  )
}

function PlacarFutebol() {
  const [golsA, setGolsA] = useState(0);
  const [golsB, setGolsB] = useState(0);

  const incrementarA = () => setGolsA(golsA + 1);
  const incrementarB = () => setGolsB(golsB + 1);
  const resetar = () => {
    setGolsA(0);
    setGolsB(0);
  };

  return (
    <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '10px', marginTop: '20px', textAlign: 'center' }}>
      <h2>Placar de Futebol</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3>Time A</h3>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#007bff' }}>{golsA}</div>
          <button onClick={incrementarA} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}>Gol!</button>
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>X</div>
        <div>
          <h3>Time B</h3>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#dc3545' }}>{golsB}</div>
          <button onClick={incrementarB} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}>Gol!</button>
        </div>
      </div>
      <button onClick={resetar} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}>Resetar Placar</button>
    </div>
  );
}