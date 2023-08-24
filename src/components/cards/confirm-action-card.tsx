interface ConfirmActionCardProps {
  handleConfirm: () => void;
  handleClose: () => void;
  isModalOpen: boolean;
}

export const ConfirmActionCard = ({
  handleConfirm,
  handleClose,
  isModalOpen,
}: ConfirmActionCardProps) => {
  return (
    <>
      {isModalOpen && (
        <div className="absolute inset-0 h-screen w-screen bg-[rgba(0,0,0,0.6)]">
          <section className="absolute inset-0 flex justify-center items-center">
            <div className="min-w-[10rem] md:min-w-[40rem] bg-primary rounded p-4 flex flex-col gap-4 z-50 opacity-100">
              <p className="text-lg">Tem certeza que deseja excluir?</p>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirm}
                  className="bg-red-600 text-white rounded p-2"
                >
                  Excluir
                </button>
                <button
                  onClick={handleClose}
                  className="bg-green-600 text-white rounded p-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
