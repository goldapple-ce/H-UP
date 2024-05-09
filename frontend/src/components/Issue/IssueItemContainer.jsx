import { useNavigate } from 'react-router-dom';
import IssueItem from './IssueItem';

const IssueItemContainer = ({ issue }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/issue/${issue.issueId}`);
  };
  return <IssueItem issue={issue} onClick={handleClick} />;
};

export default IssueItemContainer;
