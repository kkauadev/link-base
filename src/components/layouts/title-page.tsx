export const PageTitle = ({ title }: { title: string }) => {
  return (
    <>
      <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">{title}</h1>
    </>
  );
};
