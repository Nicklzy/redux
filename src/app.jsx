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

const FirstChild = () => <section>first<User/></section>
const SecondChild = () => <section>second<Wrapper/></section>
const ThirdChild = () => <section>third</section>
const User = () => {
    const contextValue = useContext(appContext)
    return <div>User:{contextValue.appState.user.name}</div>
}

const Wrapper = () => {
    const {appState, setAppState} = useContext(appContext)
    const dispatch = (action) => {
        setAppState(reducer(appState, action))
    }
    return <UserModifier dispatch={dispatch} state={appState}/>
}

const UserModifier = ({dispatch, state}) => {
    const onChange = (e) => {
        dispatch({type: 'updateUserInfo', payload: {name: e.target.value}})
    }
    return <div>
        <input value={state.user.name}
               onChange={onChange}/>
    </div>
}

export default App;
