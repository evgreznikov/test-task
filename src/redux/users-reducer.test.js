import {addNewUser, setChosenUser, setFilteredUsers, usersReducer} from './users-reducer'

let state = {
    users:[],
    user:{
       id: 5,
       firstName: "Roman"
    }
}

it('chosen user should be set', () => {
    //1
    let action = setChosenUser(state.user)

    //2
    let newState = usersReducer(state, action)

    //3
    expect(newState.chosenUser).toBe(state.user)
});

it('user should be added to array users', () => {
    //1
    let action = addNewUser(state.user)

    //2
    let newState = usersReducer(state, action)

    //3
    expect(newState.users.length).toBe(1)
});
