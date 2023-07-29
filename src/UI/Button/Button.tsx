import React, {PropsWithChildren} from 'react';
import './Button.css';


interface Props extends PropsWithChildren{
  type?:  "submit" | "reset",
  clicked?: React.MouseEventHandler,
  classes: string
}

const Button: React.FC<Props> = ({type, clicked, children, classes}) => {
  return (
      <button
          type={type ? type : 'button'}
          onClick={clicked}
          className= {`Button ${classes}`}
      >
        {children}
      </button>
  )
};

export default Button;