import { authAxios } from '@api';
import API_URI from '@constant/uri';

export const PostTodo = data => {
  return authAxios.post(`${API_URI.TODO}`, data);
};

export const PostTodoAssignee = data => {
  return authAxios.post(`${API_URI.TODO_ASSIGNEE}`, data);
};

export const DeleteTotoAssignee = ({todoId, memberId}) => {
  return authAxios.delete(`${API_URI.TODO}/${todoId}/assignee/${memberId}`);
};

export const ModifyTodo = data => {
  return authAxios.put(`${API_URI.TODO}`, data);
}

export const DeleteTodo = todoId => {
  return authAxios.delete(`${API_URI.TODO}/${todoId}`);
}

export const GetTodo = todoId => {
  return authAxios.get(`${API_URI.TODO}/${todoId}`);
};

export const GetTodoList = projectId => {
  return authAxios.get(`${API_URI.TODO}/list/${projectId}`);
};