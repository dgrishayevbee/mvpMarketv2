import { Link } from "react-router-dom";
import { Card } from "../ui/Card.jsx";
import { IconTile } from "../ui/IconTile.jsx";
import { Tag, Status } from "../ui/Tag.jsx";
import { Price } from "../ui/Price.jsx";
import { Button } from "../ui/Button.jsx";
import { Icon } from "../ui/icons.jsx";
import "./ProductCard.css";

/*
  Карточка продукта из ДС: плитка иконки 40px и лейбл сверху, название и
  описание, внизу цена и одно действие. Hover только меняет рамку и даёт
  --shadow-sm, без подъёма.
*/
export function ProductCard({ product, categoryLabel, inCart, onAdd }) {
  return (
    <Card interactive className="product-card">
      <div className="product-card__top">
        <IconTile size={40}>
          <Icon name={product.icon} size={20} />
        </IconTile>
        {product.badge ? (
          <Tag tone="accent">{product.badge}</Tag>
        ) : inCart ? (
          <Status tone="success">В корзине</Status>
        ) : (
          categoryLabel && <Tag tone="sunken">{categoryLabel}</Tag>
        )}
      </div>

      <div className="product-card__text">
        <Link to={`/product/${product.id}`} className="product-card__title">
          {product.title}
        </Link>
        <span className="product-card__subtitle">{product.subtitle}</span>
      </div>

      <div className="product-card__foot">
        <Price value={product.price} label={product.priceLabel} note={product.priceNote} />
        <Button
          size="sm"
          variant={inCart ? "secondary" : "primary"}
          onClick={() => onAdd(product)}
        >
          {inCart ? "Ещё одну" : "Подключить"}
        </Button>
      </div>
    </Card>
  );
}
