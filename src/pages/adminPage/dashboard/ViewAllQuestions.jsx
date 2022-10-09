import { TableQuestion } from "../../../components/TableQuestionComponent";
import { SearchQuiz } from "../../../components/questions/SearchQuizComponent";
const viewAllQuestions = () => {
  return (
    <>
      <SearchQuiz />
      <TableQuestion />
    </>
  );
};
export default viewAllQuestions;
