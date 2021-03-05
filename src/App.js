import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";
import TodoPage from "./pages/Todo";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/todos">
                        <TodoPage />
                    </Route>
                    <Route exact path="/">
                        <LoginPage />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
