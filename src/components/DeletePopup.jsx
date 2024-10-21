import ProgressBar from "./ProgressBar";

function DeletePopup({ onCancel, onDeleteConfirm, isDeleting, type }) {
  return (
    <div className="fixed inset-0  flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-black border border-slate-500 rounded-lg p-5 text-white text-center w-1/3 h-fit">
        {isDeleting ? (
          <>
            <ProgressBar />
            <p className="text-xl font-medium mb-4">Deleting your {type}...</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Delete {type}</h1>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              <p className="text-xl font-semibold">
                Are you sure you want to delete this {type} ? 
              </p>
              <p className="text-sm font-normal text-slate-200">
              Once deleted, you will not be able to recover it.
              </p>              
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={onDeleteConfirm}
                className="bg-red-600 text-white w-24 py-1 px-2 font-semibold text-lg rounded"
              >
                Delete
              </button>
              <button
                onClick={onCancel}
                className="bg-slate-600 text-white w-24 py-1 px-2 font-semibold text-lg rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeletePopup;
