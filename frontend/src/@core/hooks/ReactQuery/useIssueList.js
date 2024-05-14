import { requestIssueList } from '@api/services/issue';
import QUERY_KEY from '@constant/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useIssueListQuery = projectId => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.ISSUE_LIST, projectId],
    queryFn: () => requestIssueList(projectId),
    select: data => data.data.responseList,
  });
  return {
    isLoading,
    isError,
    data,
  };
};
