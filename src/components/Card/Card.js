import React from "react";
import styles from "./Card.module.scss";

function Card({ onFavorite, title, imageUrl, price, onPlus, favorited }) {
  // деструктуризыция, вынули из props это все.
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded); // при каджом клике значение инвертируется.
  }; // меняем '+' на 'галочку' при добавлении и обратно.

  // React.useEffect(() => {
  //   console.log("изменилась"); // выводит это сообщение когда isAdded изменён.
  // }, [isAdded]); // useEffect следит за изменением в массиве isAdded.

  const onClickFavorite = () => {
    onFavorite({ title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div onClick={onClickFavorite} className={styles.favorite}>
        <img
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt={title} />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
