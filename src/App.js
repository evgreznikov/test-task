import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PersonInfo from "./components/PersonInfo/PersonInfo";
import store from "./redux/store";
import {connect, Provider} from "react-redux";
import {find, setPartOfUsers, refreshUsers} from "./redux/users-reducer";
import TableContainer from "./components/Table/TableContainer";

function App() {
  return (
    <div className="container">
      <TableContainer />
      <PersonInfo />
    </div>
  );
}

const mapStateToProps = (state) => ({
})

let AppContainer = connect(mapStateToProps, {find, setPartOfUsers, refreshUsers})(App)

let TestApp = (props) => {
    return <Provider store={store}>
            <AppContainer/>
        </Provider>
}

export default TestApp;
