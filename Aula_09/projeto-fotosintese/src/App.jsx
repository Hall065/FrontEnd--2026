import React, { useState } from 'react';

// --- Ícones SVG embutidos ---
const LeafIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

// --- CSS Injetado para Keyframes ---
const injectCSS = `
  .cards-container {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
  
  .etapa-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  @keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; }
    70% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes glow {
    from { text-shadow: 0 0 5px #00bcd4, 0 0 10px #00bcd4; }
    to { text-shadow: 0 0 20px #4CAF50, 0 0 30px #4CAF50; }
  }

  .surprise-container {
    animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    margin-top: 20px;
    text-align: center;
  }

  .surprise-text {
    font-size: 2.5rem;
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 3px;
    animation: glow 2s infinite alternate;
  }

  .bubble {
    animation: float 3s ease-in-out infinite;
    display: inline-block;
    font-size: 1.5rem;
    margin: 0 5px;
  }

  @media (max-width: 768px) {
    .cards-container {
      flex-direction: column;
    }
  }
`;

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const aulas = [
    { id: 1, title: "Luz Solar", desc: "A planta absorve energia através da clorofila." },
    { id: 2, title: "Água e CO2", desc: "Retira água do solo e dióxido de carbono do ar." },
    { id: 3, title: "Glicose e O2", desc: "A energia vira alimento (açúcar) e libera oxigênio." }
  ];

  // Paleta de cores dinâmica
  const theme = {
    bg: isDarkMode ? '#121212' : '#f0f4f8',
    text: isDarkMode ? '#e0e0e0' : '#1a1a1a', 
    cardBg: isDarkMode ? '#1e1e1e' : '#ffffff',
    cardBorder: isDarkMode ? '#333' : '#d1d9e6',
    quizBg: isDarkMode ? '#1a2634' : '#e3f2fd',
    surpriseText: isDarkMode ? '#81c784' : '#009688'
  };

  const styles = {
    wrapper: { backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', transition: 'all 0.3s ease', padding: '40px 20px' },
    container: { fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', position: 'relative' },
    cardBase: { border: `1px solid ${theme.cardBorder}`, borderRadius: '12px', padding: '20px', backgroundColor: theme.cardBg, transition: 'all 0.3s ease', color: theme.text },
    button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', transition: '0.2s', marginTop: 'auto' },
    themeToggle: { position: 'absolute', top: '0', right: '0', padding: '12px', borderRadius: '50%', border: `1px solid ${theme.cardBorder}`, backgroundColor: theme.cardBg, color: theme.text, cursor: 'pointer', display: 'flex', alignItems: 'center', transition: '0.3s' }
  };

  return (
    <>
      <style>{injectCSS}</style>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          
          <button style={styles.themeToggle} onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Cabeçalho centralizado com padding balanceado para não sobrepor o botão */}
          <header style={{ textAlign: 'center', padding: '0 50px', marginBottom: '30px' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 10px 0', color: theme.text }}>
              <LeafIcon /> Aula Interativa: Fotossíntese
            </h1>
            <p style={{ margin: 0, opacity: 0.8, color: theme.text }}>Leia os cards abaixo para entender as etapas.</p>
          </header>
          
          <div className="cards-container">
            {aulas.map((aula) => (
              <div key={aula.id} className="etapa-card" style={styles.cardBase}>
                <div style={{ backgroundColor: '#4CAF50', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '15px' }}>
                  {aula.id}
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: theme.text }}>{aula.title}</h3>
                <p style={{ margin: '0 0 20px 0', opacity: 0.9 }}>{aula.desc}</p>
              </div>
            ))}
          </div>

          <Quiz styles={styles} theme={theme} />
        </div>
      </div>
    </>
  );
};

const Quiz = ({ styles, theme }) => {
  const [respondido, setRespondido] = useState(false);

  return (
    <section style={{ ...styles.cardBase, backgroundColor: theme.quizBg, textAlign: 'center' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 15px 0', color: theme.text }}>
        <BrainIcon /> Desafio Rápido
      </h3>
      <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: theme.text }}>
        O que as plantas liberam para os seres humanos durante a fotossíntese?
      </p>
      
      <button 
        onClick={() => setRespondido(!respondido)} 
        style={{ ...styles.button, backgroundColor: respondido ? '#607D8B' : '#1976D2', fontSize: '1.1rem', padding: '12px 30px' }}
      >
        {respondido ? 'Ocultar Resposta' : 'Revelar Resposta'}
      </button>
      
      {respondido && (
        <div className="surprise-container">
          <p className="surprise-text" style={{ color: theme.surpriseText }}>
            <span className="bubble" style={{ animationDelay: '0s' }}>💨</span>
            OXIGÊNIO (O2)!
            <span className="bubble" style={{ animationDelay: '0.5s' }}>💨</span>
          </p>
          <p style={{ marginTop: '10px', opacity: 0.8, color: theme.text }}>Sem elas, não estaríamos aqui para programar! 🌿</p>
        </div>
      )}
    </section>
  );
};

export default App;