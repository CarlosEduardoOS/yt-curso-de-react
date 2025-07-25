import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid"; // Importa a função v4 do pacote uuid, que gera IDs únicos
// O uuidv4() gera um ID único baseado em tempo, o que é útil para garantir que cada tarefa tenha um identificador exclusivo.
// Isso é importante para evitar conflitos de IDs quando adiciona ou remove novas tarefas
import { FrownIcon } from "lucide-react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [tasks, setTasks] = useState(() => {
    try {
      // Pega o que tá salvo no localStorage na chave "tasks"
      const saved = localStorage.getItem("tasks"); // isso aqui pega a string que tiver com a chave tasks que a gente colocou no localStorage, fizermos isso no useEffect la em baixo.
      // usar a variavel saved é opcional, mas é uma boa prática para evitar chamar localStorage.getItem várias vezes.
      // Se tem algo salvo, transforma a string JSON em objeto/array com JSON.parse, que é tipo um parse int so parse pra json, se abrir o localStorage vc vai ver a string q fica
      // se não tiver nada salvo (saved for null), retorna um array vazio []
      return saved ? JSON.parse(saved) : []; // se tiver algo salvo, ele transforma a string JSON em um array de objetos, se não tiver nada salvo, ele retorna um array vazio
    } catch {
      // Se der algum erro ao tentar fazer o parse (tipo JSON inválido),
      // simplesmente retorna um array vazio para evitar quebra no app
      return []; // o valor padrão é um array vazio
    }
  }); // aqui a gente ta pegando o localStorage e transformando em um array de objetos, se nao tiver nada no localStorage ele vai criar um array vazio

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // esse "tasks" é tipo um parametro, é so um nome pra ficar la no localStorage, o JSON.stringify(tasks) transforma o array de objetos em uma string JSON, que é o formato que o localStorage aceita
  }, [tasks]); // esse useEffect, executa a primeira função () sempre que algum valor que eu colocar aqui dentro dessa lista for alterado, ou seja eu nao preciso chamar ela em nenhum lugar pq ela se auto chama toda vez que o tasks é alterado, sendo na hora de adicionar ou remover



  //Esse useEffect aqui é embaixo vai chamar a API JASONPlaceholder. Primeira vez que eu vou trabalhar com APIS ent eu vou comentar bastante
  //Acabou que isso aqui foi só pra fins didaticos, mas eu gostei foi a primeira vez que eu mexi com uma API e não foi tao dificil.
  //DEMONSTRAÇÂO DE COMO SERIA CHAMAR UMA API 
  //useEffect(() => {
  //  const fetchTasks = async () => {
  //    //CHAMAR A API
  //    const response = await fetch(
  //      //Pega as informações da API
  //      "https://jsonplaceholder.typicode.com/todos?_limit=10", // essa url é dado no site da API https://jsonplaceholder.typicode.com
  //      { method: "GET" }
  //    ); // limit=10 limita para 10 o numero de tarefas que ele recebe da api
  //
  //    //PEGAR OS DADOS QUE ELA RETORNA
  //    const data = await response.json(); //Converte essas informações para JSON

  //    // ARAMAZENAR/PERSISTIR ESSES DADOS NO STATE
  //    setTasks(data);
  //  };
  //  fetchTasks(); // aqui a gente chama a função que acabou de criar, ela vai chamar a API e pegar os dados
  //}, []); //Por aqui ter uma lista vazia, esse useEffect so sera executado na primeira vez que o usuario acessar a aplicação



  function onTaskClick(taskId) {
    //Essa função é so pra atualizar o isCompleted do campo clicavel,
    const newTasks = tasks.map((task) => {
      //PRECISO ATUALIAR ESSA TASK
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted }; // o ... é um spread operator, eu vou explicar melhor no final da função
      }
      //NAO PRECISO ATUALIZAR ESSA TASK
      return task;
    });
    setTasks(newTasks);
    //Explicando a função: A função recebe o id ta Task clicada la do botao que ta no Task.jsx, com isso a gente cria um novo array chamado newTask esse array vai receber os dados por meio do map que a gente ja ta familiarizado (vai repetir o codigo pra todos os objetos do array/useState tasks) com isso ele vai verificar objeto por objeto verificando se o id atual bate com o id passado, enquanto não bate ele passa o objeto atual pra dentro do newTask e quando bater ele passa soq com o isCompleted invertido, mas ele nao para quando achar, ele vai ate o final. No final o newTasks se torna basicamente o mesmo array de objetos/useState soq com o isCompleted da task que a gente clicou invertido. Ai por fim ele seta o Task como o newTask
  }

  function deleteTask(taskId) {
    // essa funcção eu criei com a ajuda do gpt, ele me explicou um pouco sobre o uso do filter, mas a logica de criar um novo array task eu peguei da função de cima
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    //Explicando a função: A função recebe o id da Task que clicamos la no botao do componente Task.jsx, e com isso a gente cria um novo array chamado newTask igual fizemos na função de cima, aqui a gente usa o filter ao inves do map. Mas por que? bem, o map funciona para transformarmos um item do array de objetos/useState que temos la no topo, o filter() decide se vai manter ou remover cada item no novo array. Então o que acontece aqui no codigo é o seguinte ele analisa cada task, ate entao tudo igual o map, porem aqui ele so vai passar pro newTasks aqueles items que baterem com a condição que no caso aqui é se o id da Task Atual for diferente da task clicada, ou seja, quando o id da Task clicada for o mesmo da Task atual ele vai ignorar e continuar passando o array pra dentro do NewTask, depois com o newTasks ja gerado, com o item deletado, ele sobrescreve Tasks.
  }

  function onAddTaskSubmit(title, description) {
    if (!title.trim() || !description.trim()) {
      // se o titulo estiver vazio, aqui vai estar como false, ai vai puxar esse alert
      // esse trim é o mesmo que o strip do python, usa pra tirar os espaços em branco do começo e do final da string
      setModalMessage("O título e a descrição não podem estar vazios.");
      setIsModalOpen(true);
      return;
    }
    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    //Explicano a função: A função recebe o titulo e a descrição da Task que foi digitada la no componente AddTask.jsx, depois ela verifica se o titulo ou a descrição estão vazios, se estiverem ela mostra um alert e para a execução da função (por meio do return), caso contrario ela cria um novo objeto chamado newTask que vai receber o id que é o tamanho do array de tasks + 1 (isso garante que o id seja unico), depois ela seta o titulo e a descrição com os valores passados la do componente AddTask.jsx, e por fim seta o isCompleted como false. Depois disso ela chama a função setTasks passando um novo array que vai ser o array de tasks atual mais o newTask, isso é feito com o spread operator que é basicamente uma forma de copiar os valores de um array ou objeto para outro, nesse caso ele copia todos os valores do array de tasks e adiciona o newTask no final.
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onTaskClick={onTaskClick}
            deleteTask={deleteTask}
          />
        ) : (
          <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow-md text-center items-center text-slate-500 font-medium flex flex-col">
            <p>Nenhuma tarefa cadastrada.</p>
            <FrownIcon className="w-10 h-10" />
          </div>
        )}
        {/* prop tasks = o state tasks */}
      </div>
    </div>
  );
}

export default App;
