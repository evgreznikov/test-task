import React from 'react';
import Table from "./components/Table/Table";
import 'bootstrap/dist/css/bootstrap.css';
import Search from "./components/Search/Search";
import PersonInfo from "./components/PersonInfo/PersonInfo";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";

function App() {
  return (
    <div className="container">
      <Search></Search>
      <Table></Table>
      <PersonInfo></PersonInfo>
    </div>
  );
}

const mapStateToProps = (state) => ({
    // initialized: state.app.initialized
})

let AppContainer = compose(
    connect(mapStateToProps, {}))
(App)

let TestApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default TestApp;
