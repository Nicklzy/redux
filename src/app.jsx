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
const SecondChild = () => <section>second<UserModifier/></section>
const ThirdChild = () => <section>third</section>
const User = () => {
    const contextValue = useContext(appContext)
    return <div>User:{contextValue.appState.user.name}</div>
}

const UserModifier = () => {
    const {appState, setAppState} = useContext(appContext)
    const onChange = (e) => {
        setAppState(reducer(appState, {type: 'updateUserInfo', payload: {name: e.target.value}}))
    }
    return <div>
        <input value={appState.user.name}
               onChange={onChange}/>
    </div>
}

export default App;
