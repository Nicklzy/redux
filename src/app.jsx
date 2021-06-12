import React from 'react'
import {appContext, connect, store} from "./redux";

const App = () => {
    return (
        <appContext.Provider value={store}>
            <FirstChild/>
            <SecondChild/>
            <ThirdChild/>
        </appContext.Provider>
    )
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
const User = connect(({state}) => {
    return <div>User:{state.user.name}</div>
})


export default App;
