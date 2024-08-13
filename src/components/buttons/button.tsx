import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import { Button } from "@ariakit/react/button";

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

  return (
    <Button className={buttonClass} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
