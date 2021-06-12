import React from 'react'
import {appContext, connect, createStore} from "./redux";
import {connectToUser, userSelector} from "./connectors/userConnector";

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

const store = createStore(reducer, {
    user: {name: 'nick', age: 18},
    group: 'frontend'
})

const App = () => {
    return (
        <appContext.Provider value={store}>
            <FirstChild/>
            <SecondChild/>
            <ThirdChild/>
        </appContext.Provider>
    )
}

const UserModifier = connectToUser(({updateUserInfo, user}) => {
    const onChange = (e) => {
        updateUserInfo({name: e.target.value})
    }
    return <div>
        <input value={user.name}
               onChange={onChange}/>
    </div>
})

const User = connect(userSelector)(({user}) => {
    return <div>User:{user.name}</div>
})

const FirstChild = () => <section>first<User/></section>
const SecondChild = () => <section>second<UserModifier/></section>
const ThirdChild = connect(state => ({group: state.group}))(({group}) => <section>group: {group} </section>)


export default App;
