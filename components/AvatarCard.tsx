import { useContext } from "react";
import AvatarCardWrapper from "./svg/AvatarCardWrapper";
import EditIcon from "./svg/EditIcon";
import { MainPageContext } from "@/app/main";
import AvatarMale from "./svg/AvatarMale";
import AvatarFemale from "./svg/AvatarFemale";
import capitalizeFirstLetter from "@/myfunctions/capitalizeFirstLetter";
import getAge from "@/myfunctions/getAge";

interface AvatarCardProps {}

const AvatarCard: React.FC<AvatarCardProps> = ({}) => {
  const { setIsEditingUserData, userData } = useContext(MainPageContext);

  const userName = `${capitalizeFirstLetter(
    userData.first_name
  )} ${capitalizeFirstLetter(userData.last_name)}`;

  const userSex = capitalizeFirstLetter(userData.sex);

  const userAge = getAge(userData.birth_date);

  return (
    <div className="flex justify-center">
      <div className="relative">
        <AvatarCardWrapper />
        <div className="absolute top-4 right-3">
          <EditIcon onClick={() => setIsEditingUserData(true)} />
        </div>
        <div className="absolute top-14 transform left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
          {userData.sex === "male" ? <AvatarMale /> : <AvatarFemale />}
          <p className="text-center text-white text-base font-bold mt-6 mb-1">
            {userName}
          </p>
          <p className="text-center text-white text-xs mb-1">{userSex}</p>
          <p className="text-center text-white text-xs">{userAge} yrs</p>
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
