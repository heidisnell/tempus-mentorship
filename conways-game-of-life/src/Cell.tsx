const Cell: React.FC<{ isAlive: boolean; toggleIsAlive: () => void }> = ({
  isAlive,
  toggleIsAlive,
}) => {
  const handleClick = () => {
    toggleIsAlive();
  };
  return (
    <div onMouseOver={handleClick}>
      <p className="bg-sky-900 text-xl text-center text-sky-300 h-8 w-8">
        {isAlive ? "▇" : "-"}
      </p>
    </div>
  );
};

export { Cell };
