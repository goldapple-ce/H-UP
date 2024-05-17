import { requestTodoList } from '@api/services/todo';
import QUERY_KEY from '@constant/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useTodoListQuery = projectId => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.TODO_LIST, projectId],
    queryFn: () => requestTodoList(projectId),
    select: data => data.data.todoInfoList,
    refetchInterval: 5000,
  });
  return {
    isLoading,
    isError,
    data,
  };
};
