import React, {useContext, useState} from 'react'

const appContext = React.createContext(null)

const App = () => {
    const [appState, setAppState] = useState({
        user: {name: 'nick', age: 18}
    })
    const contextValue = {appState, setAppState}
    return (
        <appContext.Provider value={contextValue}>
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
        const {appState, setAppState} = useContext(appContext)
        const dispatch = (action) => {
            setAppState(reducer(appState, action))
        }
        return <Component {...props} dispatch={dispatch} state={appState}/>
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
const User = () => {
    const contextValue = useContext(appContext)
    return <div>User:{contextValue.appState.user.name}</div>
}


export default App;
