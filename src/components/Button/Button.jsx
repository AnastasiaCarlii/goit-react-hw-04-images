import React from 'react';

import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={css.loadMoreBtn} type="button" onClick={onClick}>
      load more
    </button>
  );
};

export default Button;
