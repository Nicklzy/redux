import React, {useEffect, useState} from "react";

const isStateChange = (newState, oldState) => {
    for (const key in newState) {
        if (newState.hasOwnProperty(key) && newState[key] !== oldState[key]) {
            return true
        }
    }
    return false
}
let _state = undefined;
let _reducer = undefined;
let _listeners = [];

const setState = (newState) => {
    _state = newState;
    _listeners.map(fn => fn(_state));
}

export const store = {
    getState() {
        return _state;
    },
    dispatch: (action) => {
        setState(_reducer(_state, action))
    },
    subscribe: (fn) => {
        _listeners.push(fn)
        return () => {
            const index = _listeners.findIndex(item => item === fn);
            _listeners.splice(index, 1);
        }
    }
}

export const createStore = (reducer, initState) => {
    _reducer = reducer;
    _state = initState;
    return store;
}

export const connect = (selector, mapDispatchToProps) => (Component) => {
    return (props) => {
        const [, update] = useState(0);
        const data = selector ? selector(_state) : {state: _state}
        const dispatchers = mapDispatchToProps ? mapDispatchToProps(store.dispatch) : {dispatch: store.dispatch}
        useEffect(() => {
            return store.subscribe(() => {
                const newState = _state;
                const newData = selector ? selector(newState) : {state: newState}
                if (isStateChange(newData, data)) {
                    update(n => n + 1);
                }
            })
        }, [selector])
        return <Component {...props} {...dispatchers} {...data}/>
    }
}

export const appContext = React.createContext(null)

export const Provider = ({store, children}) => {
    return <appContext.Provider value={store}>
        {children}
    </appContext.Provider>
}
