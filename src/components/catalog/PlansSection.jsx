import { Button } from "../ui/Button.jsx";
import { Tag } from "../ui/Tag.jsx";
import { Price } from "../ui/Price.jsx";
import { Checklist } from "../ui/Checklist.jsx";
import { PLAN_ICONS } from "../ui/icons.jsx";
import { SectionHead } from "../layout/PageHead.jsx";
import "./PlansSection.css";

/*
  Тарифные колонки ДС: одна карточка, внутри колонки, разделённые тонкой
  линией (не рамками). Внутри колонки порядок строгий: иконка 28px →
  название serif 34px → подзаголовок → цена sans 600 → сноска →
  кнопка на всю ширину → линия → чеклист «Всё из …, плюс:».
*/
export function PlansSection({ plans, onChoose }) {
  return (
    <section className="section" id="plans">
      <SectionHead title={plans.title} subtitle={plans.subtitle} />

      <div className="plans">
        {plans.items.map((plan) => {
          const PlanIcon = PLAN_ICONS[plan.icon] || PLAN_ICONS.s;
          return (
            <div
              key={plan.id}
              className={["plan", plan.featured ? "plan--featured" : ""].filter(Boolean).join(" ")}
            >
              <PlanIcon />

              <div className="plan__head">
                <div className="plan__name-row">
                  <span className="plan__name serif">{plan.name}</span>
                  {plan.badge && <Tag tone="solid">{plan.badge}</Tag>}
                </div>
                <span className="plan__audience">{plan.audience}</span>
              </div>

              <div className="plan__price">
                <Price value={plan.price} label={plan.priceLabel} />
                <span className="plan__note">{plan.priceNote}</span>
              </div>

              <Button full variant={plan.ctaVariant || "primary"} onClick={() => onChoose(plan)}>
                {plan.cta}
              </Button>

              <div className="plan__features">
                <Checklist title={plan.inherit} items={plan.features} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
