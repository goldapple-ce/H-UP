import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './Todo.module.scss';
import TodoForm from './TodoForm';
import { TodoListState } from '@recoil/todolist';
import { useParams } from 'react-router-dom';
import { GetTodoList, PostTodo } from '@api/services/todoapi';
import { authAxios } from '@api/index';

const Todo = () => {
  const [TodoList, setTodoList] = useRecoilState(TodoListState);
  const { projectId } = useParams();


  useEffect(() => {
    const getTodoList = async () => {
      const response = await GetTodoList(1);
      const todoList = response.data.todoInfoList;
      const memberResponse = await authAxios.get(`https://h-up.site/api/team/members/${1}`);

      const modifiedList = todoList.map(item => {
        const [content, createdAt, endAt] = item.content.split('#$%');
        return { id:item.todoId, content, createdAt, endAt, assigneeList:memberResponse.data.memberInfoList };
      })

      setTodoList(modifiedList);
    }
    getTodoList();
  }, [setTodoList]);

  return (
    <div className={styles.Todo}>
      
      
      <TodoForm TodoList={TodoList} setTodoList={setTodoList}/>

    </div>
  );
};

export default Todo;
