import { useEffect, useState } from "react";
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodosList = (projectId: string | undefined) => {
  const [todos, setTodos] = useState({});

  useEffect(() => {
    if (projectId) {
      const todosDbRef = ref(db, `projects/${projectId}/todos`);
      return onValue(todosDbRef, (snapshot) => {
        const loadedTodos = snapshot.val() || {};
        setTodos(loadedTodos);
      });
    }
  }, [projectId]);

  return {
    todos,
  };
};
