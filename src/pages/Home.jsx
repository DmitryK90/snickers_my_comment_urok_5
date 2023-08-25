import Card from "../components/Card/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart
}) {
  return (
    <div className="content  p-40 ">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
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
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
      </div>
    </div>
  );
} // тоже самое, что и : cartOpened ? <Drawer onClose={() => setCartOpened(false)} /> : null}

export default Home;
