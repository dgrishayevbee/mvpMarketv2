import { Outlet, Link } from "react-router-dom";

/*
  Каркас кабинета продавца. Собственная навигация появится вместе
  с дизайн-системой; пока это просто вложенный Outlet.
*/
export function SellerLayout() {
  return (
    <div className="seller-layout">
      <nav className="seller-layout__nav">
        <Link to="/seller">Сводка</Link>
        <Link to="/seller/products">Товары</Link>
        <Link to="/seller/orders">Заказы</Link>
      </nav>
      <Outlet />
    </div>
  );
}
