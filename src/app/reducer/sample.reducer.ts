import { Action } from '@ngrx/store';

export function SampleReducer(state: string = 'Hello World', action:Action){
  console.log(action.type, state);

  switch(action.type){
    case 'TEST':
      return state = 'TEST STATE ACTIVE.';

    default:
      return false;
  }
}
