import Popup from "reactjs-popup";
import MenuBarIcon from "./svg/MenuBar";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import MyButton from "./MyButton";
import "reactjs-popup/dist/index.css";

interface MenuBarProps {}

const MenuBar: React.FC<MenuBarProps> = () => {
  return (
    <Popup
      trigger={
        <button>
          <MenuBarIcon />
        </button>
      }
      offsetY={10}
      position="bottom left"
    >
      <div className="w-full flex justify-center py-2 px-1">
        <MyButton
          label="Sign Out"
          color="bg-white"
          borderColor="border border-red"
          textColor="text-red"
          pX={2}
          pY={0.5}
          onClick={() => {
            signOut(auth);
          }}
        />
      </div>
    </Popup>
  );
};

export default MenuBar;
