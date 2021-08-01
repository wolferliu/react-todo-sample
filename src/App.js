import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { TodoList } from "./features/todo/TodoList";
import { TodoInput } from "./features/todo/TodoInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };
  return (
    <Router>
      <div className="todo-app">
        <div className="todo-title">
          <h2>{t("appName")}</h2>
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="zh-CN">中文</option>
          </select>
        </div>
        <Switch>
          <Route exact path="/">
            <TodoList />
          </Route>
          <Route exact path="/add">
            <TodoInput />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}
