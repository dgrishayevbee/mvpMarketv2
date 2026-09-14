import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

/*
  Каркас страницы: шапка и подвал — заглушки. Собираются по новой
  дизайн-системе вместе с первым экраном.
*/
export function Layout() {
  return (
    <>
      <header className="layout__header">
        <Link to="/" className="layout__logo">
          mvpMarket v2
        </Link>
        <nav className="layout__nav">
          <Link to="/">Каталог</Link>
          <Link to="/cart">Корзина</Link>
          <Link to="/admin">Контент</Link>
        </nav>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>

      <footer className="layout__footer">Прототип. Дизайн-система не подключена.</footer>
    </>
  );
}
