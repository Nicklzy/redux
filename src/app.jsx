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

const UserModifier = connect((state) => ({
    user: state.user
}))(({dispatch, user}) => {
    const onChange = (e) => {
        dispatch({type: 'updateUserInfo', payload: {name: e.target.value}})
    }
    return <div>
        <input value={user.name}
               onChange={onChange}/>
    </div>
})

const FirstChild = () => <section>first<User/></section>
const SecondChild = () => <section>second<UserModifier/></section>
const ThirdChild = connect(state => ({group: state.group}))(({group}) => <section>group: {group} </section>)
const User = connect()(({state}) => {
    return <div>User:{state.user.name}</div>
})


export default App;
