import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../context/ContentContext.jsx";
import { useProducts } from "../context/ProductsContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { PageHead } from "../components/layout/PageHead.jsx";
import { ProductCard } from "../components/product/ProductCard.jsx";
import { PlansSection } from "../components/catalog/PlansSection.jsx";
import { SearchField } from "../components/ui/Field.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Chip } from "../components/ui/Chip.jsx";
import { IconSearch, IconFilters } from "../components/ui/icons.jsx";
import "./HomePage.css";

export function HomePage() {
  const { content } = useContent();
  const { all } = useProducts();
  const { addItem, items } = useCart();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categoryLabel = useMemo(() => {
    const map = Object.fromEntries(content.categories.map((c) => [c.id, c.label]));
    return (id) => map[id] || "";
  }, [content.categories]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      const byCategory = category === "all" || p.category === category;
      const byQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.subtitle || "").toLowerCase().includes(q);
      return byCategory && byQuery;
    });
  }, [all, category, query]);

  const inCart = (id) => items.some((i) => i.id === id);

  const choosePlan = (plan) => {
    addItem({
      id: plan.id,
      title: `Тариф «${plan.name}»`,
      price: plan.price,
      seller: "Beeline Business",
      subtitle: plan.audience,
      icon: "phone",
    });
    navigate("/cart");
  };

  return (
    <>
      <PageHead
        crumbs={[{ label: "Каталог" }]}
        title={content.catalog.title}
        subtitle={`${all.length} решений · ${content.catalog.subtitle}`}
        actions={
          <>
            <SearchField
              icon={<IconSearch size={16} />}
              placeholder={content.catalog.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="secondary">
              <IconFilters size={16} />
              Фильтры
            </Button>
          </>
        }
      />

      <div className="chip-row">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          Все
        </Chip>
        {content.categories.map((c) => (
          <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryLabel={categoryLabel(product.category)}
              inCart={inCart(product.id)}
              onAdd={addItem}
            />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <span className="catalog-empty__title">Ничего не нашлось</span>
          <span className="catalog-empty__note">
            Измените запрос или снимите фильтр по категории.
          </span>
        </div>
      )}

      <PlansSection plans={content.plans} onChoose={choosePlan} />
    </>
  );
}
