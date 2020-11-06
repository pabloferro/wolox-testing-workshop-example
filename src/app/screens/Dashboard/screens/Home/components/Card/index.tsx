import React from 'react';

import styles from './styles.module.scss';

interface Props {
  data: {
    description: string;
    height: string;
    name: string;
    photo: string;
    realName: string;
    weight: string;
  };
}

function Card({ data }: Props) {
  return (
    <div className={`m-right-8 m-bottom-10 ${styles.card}`}>
      <img className={styles.cardImage} src={data.photo} alt={name} />
      <div className={`column ${styles.cardContent}`}>
        <h3 className="small-title white-color">{data.name}</h3>
        <h6 className="base-text fw-bold blue-color">{data.realName}</h6>
        <p className="small-text light-gray-color m-bottom-2">{data.description}</p>
        <div className={`row ${styles.characterInfo}`}>
          <span className="small-text white-color m-right-5">{data.weight} kg</span>
          <span className="small-text white-color">{data.height} cm</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
