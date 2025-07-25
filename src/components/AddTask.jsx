import { useState } from "react";
import Input from "./Input"; // Importando o componente Input que criamos para reutilizar o estilo de input

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow-md flex flex-col">
      <Input // tudo isso aqui embaixo virou props pro componente input trabalhar em cima
        type="text"
        placeholder="Digite o título da tarefa "
        value={title} //fazendo isso ele ja conecta automaticamente com o useState la em cima, incrivel cara
        onChange={(event) => setTitle(event.target.value)}
      />

      <Input
        type="text"
        placeholder="Digite a descrição da tarefa "
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        onClick={() => {
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-600 transition-colors duration-200"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
