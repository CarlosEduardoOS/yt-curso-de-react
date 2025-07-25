import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // npm i react-router-dom
import TaskPage from './pages/TaskPage.jsx';
//esse é o arquivo que renderiza a minha aplicação

const router = createBrowserRouter([
  {
    path: '/', // / significa que é a rota raiz, ou seja, quando o usuario acessar o site ele vai cair nessa rota
    element: <App />, // App é a rota inicial como se fosse o index.html
  },
  {
    path: '/task', // /tasks significa que quando o usuario acessar essa rota ele vai cair na pagina de tarefas
    element: <TaskPage />, // TaskPage é o componente que vai ser renderizado quando o usuario acessar a rota /tasks
  }
]);

//achei esse esquema mt verboso, vou ver se tem outro jeito mais facil de fazer isso, mas por enquanto vou deixar assim

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
