# Atividade Estrutura React

## 1. Props, State e Hooks

### Props (Propriedades)
Utilizadas para passar dados entre componentes.

No código:
- Header({ titulo })
- InputUsuario({ nome, setNome })
- CardSaudacao({ nome, temaEscuro })
- ContadorCliques({ cliques, setCliques })
- ThemeToggle({ dark, setDark })
- ListaRecursos({ itens })

Sempre que um componente recebe valores entre chaves {}, isso representa props.

---

### State (Estado)
Utilizado para armazenar dados que podem mudar durante a execução da aplicação.

No código:
- const [nome, setNome] = useState('')
- const [cliques, setCliques] = useState(0)
- const [temaEscuro, setTemaEscuro] = useState(false)

Esses estados controlam:
- nome: o nome digitado pelo usuário
- cliques: quantidade de cliques no botão
- temaEscuro: define se o tema está claro ou escuro

---

### Hooks
Hooks são funções especiais do React que permitem usar recursos como estado e efeitos em componentes funcionais.

No código:
- useState: utilizado para criar e gerenciar estados
- useEffect: utilizado para executar efeitos quando algo muda

Exemplo:
- useEffect(function() {
    document.title = "Cliques: " + cliques;
  }, [cliques]);

Esse hook atualiza o título da aba sempre que o valor de cliques é alterado.

---

## 2. Função técnica de cada elemento

### Props
Permitem a comunicação entre componentes, tornando o código mais reutilizável e organizado.

---

### State
Armazena dados dinâmicos que podem ser alterados conforme a interação do usuário.

---

### Hooks
Permitem adicionar funcionalidades aos componentes funcionais, como controle de estado e execução de efeitos colaterais.

---

## 3. Explicação dos Componentes

### Header
Responsável por exibir o título da aplicação no topo da página.

---

### InputUsuario
Renderiza um campo de entrada de texto onde o usuário pode digitar seu nome. Atualiza o estado nome em tempo real.

---

### CardSaudacao
Exibe uma mensagem de saudação com base no nome digitado. Também altera o estilo conforme o tema (claro ou escuro).

---

### ContadorCliques
Mostra a quantidade de vezes que o botão foi clicado e permite incrementar esse valor ao clicar no botão.

---

### ThemeToggle
Botão responsável por alternar entre tema claro e escuro.

---

### ListaRecursos
Exibe uma lista de itens utilizando o método map para renderizar cada elemento da lista.

---

### App (Componente Principal)
Gerencia todos os estados da aplicação e organiza a renderização dos componentes. Também controla o tema e o título da página através do useEffect.