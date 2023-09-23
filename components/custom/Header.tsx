import Title from "./Title";

interface HeaderInterface {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderInterface> = ({ children }) => {
  return (
    <div className="flex items-center justify-between w-full px-4 pt-4 ">
      <div className="flex items-center gap-4">{children}</div>
      <div className="w-20">
        <Title />
      </div>
    </div>
  );
};

export default Header;
