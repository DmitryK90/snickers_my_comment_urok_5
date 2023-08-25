import Card from "../components/Card/Card";

function Favorites({ items }) {
  return (
    <div className="content  p-40 ">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter(
            (item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase()) // все в нижний регист иначе проблеммы с поиском.
          )
          .map((
            item,
            index // пример массива который на серве ниже.
          ) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
      </div>
    </div>
  );
} // тоже самое, что и : cartOpened ? <Drawer onClose={() => setCartOpened(false)} /> : null}

export default Favorites;
