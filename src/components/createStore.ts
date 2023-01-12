import { useSyncExternalStore } from 'react';

const identity = <T>(x: T) => x;
const callIdentity = <T extends Function>(x: T) => x();

type MiddlewareCallback<State> = (state: State) => State;
type StateCreator<S> = (
  set: (setter: (state: S) => S) => void,
  get: () => S
) => S;

function createStoreApi<State>(
  creator: StateCreator<State>,
  middleware: MiddlewareCallback<State>[] = []
) {
  let state = {} as State;
  const listeners = new Set<() => void>();

  const setState = (fn: (snapshot: State) => State) => {
    state = fn(state);
    for (const mw of middleware) {
      state = mw(Object.assign({}, state));
    }
    listeners.forEach(callIdentity);
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const getState = () => state;

  const initialState = creator(setState, getState);
  state = Object.assign({}, initialState);

  const getSnapshot = () => initialState;

  return { getState, setState, subscribe, getSnapshot };
}

class StoreApi<State> {
  private state = {} as State;
  private readonly listeners = new Set<() => void>();
  private readonly initialState: State;

  constructor(
    creator: StateCreator<State>,
    private middleware: MiddlewareCallback<State>[] = []
  ) {
    this.initialState = creator(this.setState, this.getState);
    this.state = Object.assign({}, this.initialState);
  }

  public setState = (fn: (snapshot: State) => State) => {
    this.state = fn(this.state);
    for (const mw of this.middleware) {
      this.state = mw(Object.assign({}, this.state));
    }
    this.listeners.forEach(callIdentity);
  };

  public getState = () => this.state;

  public getSnapshot = () => this.initialState;

  public subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

export default function <State>(
  creator: StateCreator<State>,
  middleware: Array<MiddlewareCallback<State>> = []
) {
  const api = new StoreApi(creator, middleware);
  return <SelectorOutput>(
    selector: (
      state: State
    ) => SelectorOutput = identity as () => SelectorOutput
  ): SelectorOutput =>
    useSyncExternalStore(
      api.subscribe,
      () => selector(api.getState()),
      () => selector(api.getSnapshot())
    );
}
