function Input(props) {
  return (
    <input
      className="bg-slate-100 border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
      {...props} // espalhando as props recebidas para o input, ai ele pega todas as props que foram passadas no componente AddTask.jsx e passa pro input, como type, placeholder, value e onChange
    />
  );
}

export default Input;
