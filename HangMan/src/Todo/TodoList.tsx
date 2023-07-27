import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
} from 'react';
import { useState } from 'react';
import './Todo.css';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

let CustomMap: { [key: string]: any } = {};
function Todo() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<string[]>([]);
  const [editTodoIdx, setEditTodoIdx] = useState<number | null>();
  const [doneMap, setDoneMap] = useState<typeof CustomMap>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const eListStr: string | null = localStorage.getItem('todoList') ?? '';
    const existingList: string[] =
      eListStr?.length > 0 ? JSON.parse(eListStr) : [];
    setTodoList(existingList);
    let doneMap: typeof CustomMap;
    if (localStorage.getItem('doneMap')) {
      doneMap = JSON.parse(localStorage.getItem('doneMap') ?? '');
    } else {
      doneMap = {};
    }
    setDoneMap(doneMap);
  }, []);

  const getExistingList = (): string[] => {
    const eListStr: string | null = localStorage.getItem('todoList') ?? '';
    const existingList: string[] =
      eListStr?.length > 0 ? JSON.parse(eListStr) : [];
    return existingList;
  };

  const saveTodoList = (toSave: string[]) => {
    localStorage.setItem('todoList', JSON.stringify(toSave));
    setTodoList(toSave);
  };

  const enterTodo: MouseEventHandler<Element> = () => {
    const existingList = getExistingList();
    console.log(todo);
    if (editTodoIdx != null) {
      existingList[editTodoIdx] = todo;
    } else {
      existingList.push(todo);
    }
    localStorage.setItem('todoList', JSON.stringify(existingList));
    setTodoList(existingList);
    setTodo('');
    setEditTodoIdx(null);
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const editTodo: MouseEventHandler<Element> = (
    btn: React.MouseEvent<HTMLElement>
  ) => {
    let temp = btn.target as HTMLTextAreaElement;
    const existingList = getExistingList();
    const nBeingEdited = Number(temp.value);
    const todo = existingList[Number(temp.value)];
    setTodo(todo);
    setEditTodoIdx(nBeingEdited);
  };

  const handleChange: ChangeEventHandler<Element> = (event: ChangeEvent) => {
    let elem = event.target as HTMLTextAreaElement;

    setTodo(elem.value);
  };

  const saveDoneTodo = (idxNoStr: string) => {
    const doneMap: typeof CustomMap = JSON.parse(
      localStorage.getItem('doneMap') ?? '{}'
    );
    const idx = Number(idxNoStr);
    doneMap[idx] = !doneMap[idx];
    setDoneMap(doneMap);
    localStorage.setItem('doneMap', JSON.stringify(doneMap));
  };

  const markDone: MouseEventHandler<Element> = (
    btn: React.MouseEvent<HTMLElement>
  ) => {
    const idxNoStr = (btn.target as HTMLTextAreaElement).value;
    saveDoneTodo(idxNoStr);
  };

  const markDoneChange: ChangeEventHandler<Element> = (event: ChangeEvent) => {
    let elem = event.target as HTMLTextAreaElement;
    saveDoneTodo(elem.value);
  };

  const deleteTodo: MouseEventHandler<Element> = (
    btn: React.MouseEvent<HTMLElement>
  ) => {
    const idxNoStr = (btn.target as HTMLTextAreaElement).value;
    const idx = Number(idxNoStr);
    const existingList = getExistingList();
    existingList.splice(idx, 1);
    saveTodoList(existingList);
  };

  return (
    <div className='App'>
      <header>
        <Link
          style={{ fontSize: '30px', position: 'absolute', left: '80px' }}
          to='/hangman'
        >
          HANGMAN
        </Link>
        <Link
          style={{ fontSize: '30px', position: 'absolute', left: '255px' }}
          to='/'
        >
          HOME
        </Link>
        <h2> React todo list with Typescript</h2>
      </header>
      <div>
        <div>
          <div className='TodoArea'>
            <div>
              <input
                type='text'
                placeholder='enter todo'
                onChange={handleChange}
                value={todo}
              />
              <button className='btn_save' onClick={enterTodo}>
                Save
              </button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <MuiAlert elevation={6} variant='filled' severity='success'>
                  Todo Added!
                </MuiAlert>
              </Snackbar>
            </div>
            <ul>
              {todoList.map((t: string, idx: number) => (
                <div className='Todo' key={idx}>
                  {doneMap[idx] ? (
                    <input
                      type='checkbox'
                      checked
                      value={'' + idx}
                      onChange={markDoneChange}
                    />
                  ) : (
                    <input
                      type='checkbox'
                      value={'' + idx}
                      onChange={markDoneChange}
                    />
                  )}
                  <li style={{ fontSize: '30px', padding: '20px' }}> {t} </li>
                  <p style={{ marginLeft: 10 }}>
                    <button
                      className='btn_edit'
                      value={'' + idx}
                      onClick={editTodo}
                    >
                      {' '}
                      Edit
                    </button>
                    <button
                      className='btn_delete'
                      value={'' + idx}
                      onClick={deleteTodo}
                    >
                      {' '}
                      Delete
                    </button>
                    <button
                      className='btn_save'
                      value={'' + idx}
                      onClick={markDone}
                    >
                      {' '}
                      Done
                    </button>
                  </p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
