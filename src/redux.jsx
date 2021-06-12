import React, {useContext, useEffect, useState} from "react";

export const store = {
    state: {
        user: {name: 'nick', age: 18}
    },
    setState(newState) {
        store.state = newState;
        store.listeners.map(fn => fn(store.state));
    },
    listeners: [],
    subscribe: (fn) => {
        store.listeners.push(fn)
        return () => {
            const index = store.listeners.findIndex(item => item === fn);
            store.listeners.splice(index, 1);
        }
    }
}

const reducer = (state, {type, payload}) => {
    if (type === 'updateUserInfo') {
        return {
            ...state,
            user: {
                ...state.user,
                ...payload
            },
        }
    } else {
        return state
    }
}

export const connect = (selector) => (Component) => {
    return (props) => {
        const {state, setState} = useContext(appContext)
        const [, update] = useState(0);
        useEffect(() => {
            store.subscribe(() => {
                update(n => n + 1);
            })
        }, [])
        const dispatch = (action) => {
            setState(reducer(state, action))
        }
        const data = selector ? selector(state) : {state}
        return <Component {...props} dispatch={dispatch} {...data}/>
    }
}

export const appContext = React.createContext(null)
