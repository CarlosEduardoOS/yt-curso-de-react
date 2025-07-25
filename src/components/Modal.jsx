import { ShieldAlertIcon } from "lucide-react";

function Modal({ isOpen, message, onClose }) {
  if (!isOpen) return null; // Não renderiza nada se não estiver aberto

  return (
    <div className="w-screen h-screen fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-md shadow-md text-center space-y-4 w-80">
        <ShieldAlertIcon className="w-10 h-10 text-red-500 mx-auto" />
        <p className="text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-colors duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Modal;
