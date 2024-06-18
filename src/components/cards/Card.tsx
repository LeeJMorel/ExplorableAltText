import React from "react";
import classNames from "classnames";
import styles from "./Cards.module.scss";
import Button from "../buttons/button";

export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "row" | "column";
  imageUrl?: string;
  imageAltText?: string;
  buttons?: React.ReactNode[];
  title?: string;
  onButtonClick?: (index: number) => void;
  onCardClick?: () => void;
}

const Card: React.FC<ICardProps> = ({
  variant = "column",
  imageUrl,
  imageAltText = "Card Image",
  buttons,
  title,
  onButtonClick,
  onCardClick,
  children,
  className,
}) => {
  const renderImage = () => {
    if (!imageUrl) return null;
    return <img className={styles.image} src={imageUrl} alt={imageAltText} />;
  };

  const handleButtonClick = (index: number) => {
    if (onButtonClick) {
      onButtonClick(index);
    }
  };

  const renderButtons = () => {
    if (!buttons || buttons.length === 0) return null;
    return (
      <div className={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            className={styles.button}
            onClick={() => handleButtonClick(index)}
          >
            {button}
          </Button>
        ))}
      </div>
    );
  };

  const renderTitle = () => {
    if (!title) return null;
    return <h2 className={styles.title}>{title}</h2>;
  };

  return (
    <div
      className={classNames(styles.card, className, {
        [styles.row]: variant === "row",
        [styles.column]: variant === "column",
      })}
      onClick={onCardClick}
    >
      {renderImage()}
      <div className={styles.content}>
        {renderTitle()}
        {children}
        {renderButtons()}
      </div>
    </div>
  );
};

export default Card;
