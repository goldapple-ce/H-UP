import API_URI from '@constant/uri';
import { authAxios } from '..';

// to_do 생성
export const requestSaveTodo = async data => {
  return await authAxios.post(`${API_URI.TODO}`, data);
};

// to_do 목록 조회
export const requestTodoList = async projectId => {
  console.log('get todos');
  return await authAxios.get(`${API_URI.TODO_LIST}/${projectId}`);
};

// 할당자 삭제
export const requestDeleteTodoAssignee = async ({ todoId, memberId }) => {
  return await authAxios.delete(
    `${API_URI.TODO}/${todoId}/assignee/${memberId}`,
  );
};

// to_do 수정
export const requestUpdateTodo = async data => {
  return await authAxios.put(`${API_URI.TODO}`, data);
};

// to_do 삭제
export const requestDeleteTodo = async todoId => {
  return await authAxios.delete(`${API_URI.TODO}/${todoId}`);
};

// to_do 상세 조회
export const requestTodoInfo = async todoId => {
  return await authAxios.get(`${API_URI.TODO}/${todoId}`);
};
