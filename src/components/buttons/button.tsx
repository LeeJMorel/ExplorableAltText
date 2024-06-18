import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  ...props
}) => {
  const buttonClass = classNames(styles.button, className);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={buttonClass} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default ButtonComponent;
