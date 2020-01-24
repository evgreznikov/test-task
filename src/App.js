import React from 'react';
import Table from "./components/Table/Table";
import 'bootstrap/dist/css/bootstrap.css';
import Search from "./components/Search/Search";
import PersonInfo from "./components/PersonInfo/PersonInfo";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {find, setPartOfUsers, refreshUsers} from "./redux/users-reducer";

function App(props) {
    const onSubmit = (formData) => {
        if (!formData.search){
            props.refreshUsers()
            props.setPartOfUsers()
        } else {
            props.refreshUsers()
            debugger
            props.find(formData.search, formData.select)
            props.setPartOfUsers()
        }
    }
    let initialValues = {
        select: "id"
    }
  return (
    <div className="container">
      <Search onSubmit={onSubmit} initialValues={initialValues} />
      <Table />
      <PersonInfo />
    </div>
  );
}

const mapStateToProps = (state) => ({
    // initialized: state.app.initialized
})

let AppContainer = compose(
    connect(mapStateToProps, {find, setPartOfUsers, refreshUsers}))
(App)

let TestApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default TestApp;
