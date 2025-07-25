function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className="bg-slate-400 text-white p-2 rounded-md hover:bg-slate-500 transition-colors duration-200"
    >
      {props.children}
      {/* Aqui usamos props.children para renderizar o conteúdo passado entre as tags do componente Button */}
    </button>
  );
}

export default Button;
