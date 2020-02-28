import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from '../action/todo.action';
import ToDo from '../model/todo.model';
import ToDoState, { initializeState } from '../state/todo.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(ToDoActions.GetToDoAction, state => state),
  on(ToDoActions.CreateToDoAction, (state: ToDoState, todo: ToDo) => {
    return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
  }),
  on(ToDoActions.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: payload };
  }),
  on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  on(ToDoActions.ErrorToDoAction, (state: ToDoState, error: Error) => {
    console.log(error);
    return { ...state, ToDoError: error };
  })
);

export function ToDoReducer(state: ToDoState | undefined, action: Action) {
  return reducer(state, action);
}
