import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import axios from "axios";

function App() {
  const [items, setItems] = React.useState([]); // тут будут кроссы с бэкэнда идти(объектами в массиве).
  const [cartItems, setCartItems] = React.useState([]); // айтемы в корзине.
  const [favorites, setFavorites] = React.useState([]); // закладки.
  const [cartOpened, setCartOpened] = React.useState(false); // открывает/закрываем меню корзины, если корзина закрыта(cartOpened=false). см ниже отрисовку Drawer.
  const [searchValue, setSearchValue] = React.useState(""); // поиск.

  React.useEffect(() => {
    // fetch("https://64e72196b0fd9648b78f631d.mockapi.io/items") // отправили запрос на сервер.
    //   .then((res) => {
    //     // получили response и перевели в json.
    //     return res.json();
    //   })
    //   .then((json) => setItems(json));

    // далее аналог на axios:
    axios
      .get("https://64e72196b0fd9648b78f631d.mockapi.io/items")
      .then((res) => setItems(res.data)); // подгружаем с сервака все Item.

    axios
      .get("https://64e72196b0fd9648b78f631d.mockapi.io/cart")
      .then((res) => setCartItems(res.data)); // подгружаем с сервака добавленные item в корзину.

    axios
      .get("https://64e72196b0fd9648b78f631d.mockapi.io/favorites")
      .then((res) => setFavorites(res.data)); // не будет работать, больше двух не создать на серве.
  }, []); // [] что функция запросы вызовётся только при первом рендере, если useEffect не использовать, то при изменении items или cartOpened вся функция компонента перевызовется(перерисуется) и будут повторные запросы на сервак при каждом перерендере.

  const onAddToCart = (obj) => {
    axios.post("https://64e72196b0fd9648b78f631d.mockapi.io/cart", obj); // загружаем корзину на сервак.

    // приходит при нажатии на + в компоненте Card.
    setCartItems((prev) => [...prev, obj]); // ком. предыдущее состояние и добавляет в конец новое значение.
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64e72196b0fd9648b78f631d.mockapi.io/cart/${id}`); // передаём id.(delete это метод в mockapi, в других другой может быть).
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = (obj) => {
    axios.post("adress/favorites", obj);
    setFavorites((prev) => [...prev, obj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header items={cartItems} onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>
        <Route
          exact
          path="/favorites"
          element={<Favorites items={favorites} />} // favorites не будет работать, в mockapi нельзя больше двух делать.
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

// [
//   {
//    "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//    "price": 12999,
//    "imageUrl": "./img/sneakers/1.jpg"
//   },
//   {
//    "title": "Мужские Кроссовки Nike Air Max 270",
//    "price": 15600,
//    "imageUrl": "./img/sneakers/2.jpg"
//   },
//   {
//    "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//    "price": 8499,
//    "imageUrl": "./img/sneakers/3.jpg"
//   },
//   {
//    "title": "Мужские Кроссовки Puma X Aka Boku Future Rider",
//    "price": 8999,
//    "imageUrl": "./img/sneakers/4.jpg"
//   },
//   {
//    "title": "Мужские Кроссовки Nike Kyrie 7",
//    "price": 5344,
//    "imageUrl": "./img/sneakers/5.jpg"
//   },
//   {
//    "title": "Мужские Кроссовки Nike LeBron XVIII",
//    "price": 18900,
//    "imageUrl": "./img/sneakers/6.jpg"
//   },
//   {
//    "title": "Мужские Кроссовки Puma X Aka Boku Future Rider",
//    "price": 18900,
//    "imageUrl": "./img/sneakers/7.jpg"
//   }
//  ]
