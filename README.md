# Atendimento de Pacientes - Sistema de Triagem Hospitalar

## Descrição do Projeto

Este projeto consiste em um sistema de triagem hospitalar desenvolvido para gerenciar o fluxo de pacientes. O sistema classifica os pacientes de acordo com a prioridade de atendimento, baseada na gravidade de sua condição, utilizando um esquema de cores para fácil identificação:

- 🔴 **Vermelho**: Nível grave, prioridade máxima.
- 🟡 **Amarelo**: Nível brando, prioridade média.
- 🟢 **Verde**: Nível leve, prioridade baixa.

O objetivo é otimizar o processo de atendimento, garantindo que pacientes em estado mais crítico recebam atenção imediata.

## Deploy

O projeto está atualmente disponível em [https://frontend-ckkn.onrender.com](https://frontend-ckkn.onrender.com/).

3.  **Para ter acesso pelo longin use:**

    ```bash
    email:Ingreddoutora@gmail.com
    password:aaaasa
    ```

## Funcionalidades Principais

As seguintes funcionalidades foram implementadas e aprimoradas:

- **Sistema de Triagem**: Classificação de pacientes por nível de gravidade (Vermelho, Amarelo, Verde).
- **Gerenciamento de Pacientes**: Adição e atualização de informações de pacientes.
- **Autenticação e Autorização**: Login de usuários com separação de perfis (médico e atendente) e rotas protegidas.
- **Interface de Usuário**: Páginas dedicadas para Dashboard, Área Médica, Cadastro, Home e Login.
- **Visualização de TV**: Componente de TV com lista de espera para pacientes.
- **Geração de PDF**: Funcionalidade para gerar documentos em PDF (provavelmente relatórios de pacientes ou triagem).
- **Notificações**: Sistema de notificações (toasts) para feedback ao usuário.
- **Responsividade**: Ajustes para garantir a boa visualização em diferentes dispositivos.

## Tecnologias Utilizadas

As principais bibliotecas e ferramentas utilizadas no desenvolvimento deste projeto são:

| Biblioteca/Ferramenta | Versão   | Descrição                                     |
| :-------------------- | :------- | :-------------------------------------------- |
| `bootstrap`           | ^5.3.3   | Framework CSS para design responsivo.         |
| `react`               | ^18.3.1  | Biblioteca principal para construção de UIs.  |
| `react-bootstrap`     | ^2.10.10 | Componentes Bootstrap para React.             |
| `react-router-dom`    | ^7.6.3   | Roteamento declarativo para aplicações React. |
| `html2pdf.js`         | ^0.10.3  | Geração de PDFs a partir de conteúdo HTML.    |
| `react-dom`           | ^19.1.1  | Integração do React com o DOM.                |
| `react-toastify`      | ^11.0.5  | Biblioteca para notificações toast.           |
| `Vite`                | (latest) | Ferramenta de build para projetos frontend.   |
| `axios`               | (latest) | Cliente HTTP baseado em Promises.             |

## Interação com a API

O projeto utiliza **Axios** para realizar requisições HTTP à API de backend. A configuração base do Axios é definida em `src/api/index.js`, onde uma instância do Axios é criada com uma `baseURL` configurável e um interceptor para adicionar o token de autenticação (Bearer Token) a todas as requisições, caso esteja disponível no `localStorage`.

```javascript
// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

As funções específicas para interação com a API, como login, cadastro de usuário e verificação de token, são encapsuladas em serviços, como `authService` em `src/api/auth.js`:

```javascript
// src/api/auth.js
import api from ".";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    return response.data;
  },

  cadastrarUsuario: async (fullName, email, password, role = "user") => {
    const response = await api.post("/user", {
      fullName,
      email,
      password,
      role,
    });
    return response.data;
  },

  verificarToken: async () => {
    const response = await api.get("/check");
    return response.data;
  },
};
```

## Gerenciamento de Estado com Context API

O projeto faz uso da **Context API do React** para gerenciar o estado global da aplicação, especialmente para autenticação. O `AuthContext` (definido em `src/context/Auth/index.jsx`) provê o estado de autenticação (usuário logado, status de autenticação, loading) e funções relacionadas (login, cadastro, logout, verificação de admin) para todos os componentes que o consomem.

```javascript
// src/context/Auth/index.jsx (trecho relevante)
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ... (funções de login, cadastro, logout, isAdmin e useEffect para verificar status)

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    cadastrar,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

## Variáveis de Ambiente (`.env`)

O projeto utiliza variáveis de ambiente para gerenciar configurações sensíveis ou que variam entre diferentes ambientes (desenvolvimento, produção). No contexto deste projeto, a URL base da API é definida através da variável `VITE_BASEURL` no arquivo `.env`.

**Exemplo de arquivo `.env` (não versionado):**

```
# .env
VITE_BASEURL=http://localhost:4000
```

Para configurar o ambiente localmente, crie um arquivo `.env` na raiz do projeto (na mesma pasta do `package.json`) e defina a variável `VITE_BASEURL` com a URL da sua API de backend. O Vite expõe essas variáveis para o código frontend através de `import.meta.env`.

## Instalação e Execução

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Equipe-5AVANTE/Frontend.git
    cd Frontend
    ```

2.  **Crie o arquivo `.env`:**

    Na raiz do projeto, crie um arquivo chamado `.env` e adicione a URL da sua API:

    ```
    VITE_BASEURL=http://localhost:4000
    ```

    _Certifique-se de substituir `http://localhost:4000` pela URL correta da sua API de backend._

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Execute o projeto em modo de desenvolvimento:**

    ```bash
    npm run dev
    ```

    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).



## Autores e Contribuidores

Este projeto foi desenvolvido pela Equipe 5, com as seguintes contribuições principais:

- [@iingridliveira](https://www.github.com/iingridliveira) - Ingrid Oliveira
- [@xeniabia](https://www.github.com/xeniabia) - Xênia Beatriz

## Referências

Este projeto foi proposto como atividade do programa Capacita Brasil Residência em Tic, em colaboração com a Escola Atlântico Avanti e o professor Eliakim Gama.

- [PDF do Projeto](https://drive.google.com/file/d/16lfgzZ3nFDGI2Yfpvto4s4vCX-ziEpI6/view?usp=sharing)
- [Capacita Brasil](https://capacitabrasil.ifce.edu.br/)
