import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const sortTypes = {
  ALPHABET: 'ALPHABET',
  LENGTH: 'LENGTH',
};

const sortHandlers = {
  ALPHABET: (a, b) => a.localeCompare(b),
  LENGTH: (a, b) => a.length - b.length,
};

const getPreparedGoods = (listOfGoods, sortType, isReversed) => {
  const nextListOfGoods = [...listOfGoods];
  const sortHandler = sortHandlers[sortType];

  if (sortHandler) {
    nextListOfGoods.sort(sortHandler);
  }

  if (isReversed) {
    nextListOfGoods.reverse();
  }

  return nextListOfGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const listOfGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const isResetDisplayed = listOfGoods.toString() !== goodsFromServer.toString()
    || sortType !== null
    || isReversed;

  const handleSortAlphabetically = () => {
    setSortType(sortTypes.ALPHABET);
  };

  const handleSortByLength = () => {
    setSortType(sortTypes.LENGTH);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === sortTypes.ALPHABET ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === sortTypes.LENGTH ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetDisplayed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {listOfGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
