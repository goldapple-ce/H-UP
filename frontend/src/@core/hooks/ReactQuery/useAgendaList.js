import { requestAgendaList } from '@api/services/agenda';
import QUERY_KEY from '@constant/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useAgendaListQuery = projectId => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.AGENDA_LIST, projectId],
    queryFn: () => requestAgendaList(projectId),
    select: data => data.data.agendaList,
  });
  return {
    isLoading,
    isError,
    data,
  };
};
