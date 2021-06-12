import React, {useContext, useEffect, useState} from 'react'

const appContext = React.createContext(null)

const store = {
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

const App = () => {
    return (
        <appContext.Provider value={store}>
            <FirstChild/>
            <SecondChild/>
            <ThirdChild/>
        </appContext.Provider>
    )
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

const connect = (Component) => {
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
        return <Component {...props} dispatch={dispatch} state={state}/>
    }
}

const UserModifier = connect(({dispatch, state}) => {
    const onChange = (e) => {
        dispatch({type: 'updateUserInfo', payload: {name: e.target.value}})
    }
    return <div>
        <input value={state.user.name}
               onChange={onChange}/>
    </div>
})

const FirstChild = () => <section>first<User/></section>
const SecondChild = () => <section>second<UserModifier/></section>
const ThirdChild = () => <section>third</section>
const User = connect(() => {
    const {state} = useContext(appContext)
    return <div>User:{state.user.name}</div>
})


export default App;
