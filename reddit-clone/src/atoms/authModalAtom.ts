
import {atom} from 'recoil'

// we create an interface for our modal
export interface AuthModalState {
  // determine wether the modal is open or not
  open:boolean;
  // what are the different modal we can open
  view:'login'|'signup'|'resetPassword';
}

const defaultModalState: AuthModalState = {
  // by default it is false
  open:false,
  // by default we show the login modal
  view:'login'
}

// we pass it in an atom from recoil and export it
export const authModalState = atom<AuthModalState>({
  key:'authModalState',
  default:defaultModalState
})