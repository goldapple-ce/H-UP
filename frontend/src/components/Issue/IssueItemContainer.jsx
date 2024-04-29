import { useNavigate } from "react-router-dom";
import IssueItem from "./IssueItem";

const IssueItemContainer = ({ issue }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/issue/${issue.id}`);
  };
  return <IssueItem issue={issue} onClick={handleClick} />;
};

export default IssueItemContainer;