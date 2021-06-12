import React, {useContext, useEffect, useState} from "react";

const isStateChange = (newState, oldState) => {
    for (const key in newState) {
        if (newState[key] !== oldState[key]) {
            return true
        }
    }
    return false
}

export const store = {
    state: {
        user: {name: 'nick', age: 18},
        group: 'frontend'
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
        const data = selector ? selector(state) : {state}
        useEffect(() => {
            return store.subscribe(() => {
                const newState = store.state;
                const newData = selector ? selector(newState) : {state: newState}
                if (isStateChange(newData, data)) {
                    update(n => n + 1);
                }
            })
        }, [selector])
        const dispatch = (action) => {
            setState(reducer(state, action))
        }
        return <Component {...props} dispatch={dispatch} {...data}/>
    }
}

export const appContext = React.createContext(null)
