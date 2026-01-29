export default function Modal({ isOpen, title, message, type, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl max-w-sm w-full text-center">
        <h2 className={`text-xl font-bold ${type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{title}</h2>
        <p className="my-4">{message}</p>
        <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Close</button>
      </div>
    </div>
  );
}