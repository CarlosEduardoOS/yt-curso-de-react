import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks(props) {
  const navigate = useNavigate();

  function onSeeDetails(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow-md max-h-[500px] overflow-y-auto hide-scrollbar">
      {props.tasks.map(
        (
          task //esse map pega todos os objetos que a gente tem naquele aray de obejtos que ta no app.jsx e vai replicando esse html aqui em baixo até não ter mais objetos dentro do array.
        ) => (
          <li key={task.id} className="flex gap-2">
            {" "}
            {/*Esse li é a linha dentro do card, contendo 2 botoes, o com o nome da task e um botao na lateral direita com o icone da seta*/}
            <button
              onClick={() => props.onTaskClick(task.id)} // se eu passar só props.onTaskClick(task.id) o React nao considera  a função em si, somente o resultado dela por isso a gente tem q passar () => props.onTaskClick(task.id) pq ai esse () é tipo uma função vazia que a unica coisa que vai fazer é chamar essa linha de codigo
              className={`bg-slate-400 text-left w-full text-white p-2 rounded-md hover:bg-slate-500 transition-colors duration-200 ${
                // aqui tem que usar a craze se quiser fazer esse esquema condicional
                task.isCompleted && "line-through !bg-slate-500" //esse ! faz o tailwind dar prioridade pra ele, pq como ja tem algo q muda a cor do fundo ali em cima ele conflita
              }`}
            >
              {task.title}
            </button>
            <Button onClick={() => onSeeDetails(task)}>
              {/*A partir do momento que isso virou um componente, o onClick deixou de ser uma função e se tornou uma prop que será tratada la dentro do */}
              <ChevronRightIcon />
              {/*No botao a gente passa a task atual inteira, completinha com todos os campos por isso ta so task e nao task.id ou task.title e por assim vai*/}
            </Button>
            <Button onClick={() => props.deleteTask(task.id)}>
              <TrashIcon />
            </Button>
          </li>
        )
      )}
    </ul>
  );
}

export default Tasks;
