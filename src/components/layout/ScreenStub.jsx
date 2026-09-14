/*
  Временная заглушка экрана. Существует, чтобы роуты были живыми и список
  экранов был виден на сайте до того, как появится дизайн-система.
  Каждый собранный экран удаляет свою заглушку.
*/
export function ScreenStub({ name, route, note }) {
  return (
    <section className="screen-stub">
      <p className="screen-stub__route">{route}</p>
      <h1 className="screen-stub__title">{name}</h1>
      <p className="screen-stub__note">{note || "Ждёт новую дизайн-систему."}</p>
    </section>
  );
}
