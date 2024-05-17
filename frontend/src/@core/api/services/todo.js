import API_URI from '@constant/uri';
import { authAxios } from '..';

export const requestSaveTodo = async data => {
  return authAxios.post(`${API_URI.TODO}`, data);
};

// to_do 목록 조회
export const requestTodoList = async projectId => {
  console.log('get todos');
  return await authAxios.get(`${API_URI.TODO_LIST}/${projectId}`);
};
