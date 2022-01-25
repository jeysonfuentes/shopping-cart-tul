import { User } from "src/core/models/user.model";


export interface AuthAppState {
  currentUser: User;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const defaultAuthState: AuthAppState = {
  currentUser: null,
  loading: false,
  loaded: false,
  error: null,
};
