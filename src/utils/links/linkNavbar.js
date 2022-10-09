import { AiOutlineOrderedList } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdQuiz } from "react-icons/md";

const links = [
  {
    id: 1,
    text: "list questions",
    path: "/",
    icon: <AiOutlineOrderedList />,
  },
  { id: 2, text: "list users", path: "list-users", icon: <BiUser /> },
  {
    id: 3,
    text: "add question",
    path: "add-question",
    icon: <AiFillFileAdd />,
  },
  { id: 4, text: "add user", path: "add-user", icon: <AiOutlineUserAdd /> },
  { id: 5, text: "play quiz", path: "add-user", icon: <MdQuiz /> },
];

export default links;
