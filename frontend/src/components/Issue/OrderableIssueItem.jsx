import { useNavigate } from "react-router-dom";
import IssueItem from "./IssueItem";

const OrderableIssueItem = ({ issue }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/issueId=${issue.id}`);
  };
  return <IssueItem issue={issue} onClick={handleClick} />;
};

export default OrderableIssueItem;