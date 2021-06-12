import React from 'react'
import {appContext, connect, store} from "./redux";
import {connectToUser, userSelector} from "./userDispatcher";

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
