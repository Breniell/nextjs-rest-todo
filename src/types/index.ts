export type Todo = {
  id: string;
  title: string;
  done: boolean;
  description?: string;   
  dueDate?: string;       
  author?: string;        
  status?: 'pending' | 'done' | 'late';  
};
