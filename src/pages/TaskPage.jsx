import { ChevronLeftIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom"; // a gente importa isso pra poder usar as search params da url, que são os parametros que a gente passa na url quando clica no botao de ver mais detalhes da Task

function TaskPage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title"); //aqui é onde ele pega o parametro da url, na url vai ta tipo: title=algumaCoisa e aqui ele vai pegar esse algumaCoisa e colocar dentro dessa variavel pra gente usar no codigo
  const description = searchParams.get("description"); // mesma coisa que a linha de cima, mas para a descrição
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative">
          <button
            className="absolute left-0 top-0 bottom-0 bg-slate-500 text-slate-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-400 transition-colors duration-200"
            onClick={() => window.history.back()} // esse window.history.back() faz com que o navegador volte para a página anterior, ou seja, a página de tarefas
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Detalhes da Tarefa
          </h1>
        </div>
        <main className="bg-slate-200 p-4 rounded-md shadow-md space-y-4">
          <h2 className="text-2xl text-slate-600 font-medium text-center">
            {title}
          </h2>
          <p className="text-slate-500 text-center">{description}</p>
        </main>
      </div>
    </div>
  );
}
export default TaskPage;
