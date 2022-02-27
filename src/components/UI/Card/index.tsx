import {
    FC,
    createElement,
} from 'react';
import './styles/card.css';

/**
 * 
 * This component is a wrapper component of the whole application 
 * which just shows the Card container(rounded corners + box shadows) 
 * layout.
 */
export const Card: FC<{
    className: string;
}> = ({ className, children }) => {
    //Append all the classes on Card component, don't forget the space
    const classes = 'card ' + className;
    return (
        <div className={classes}>
            {children}
        </div>
    );

    /**
     * This is how JSX works behind the scenes.
     * 
     * return React.createElement('div', { className: classes }, children);
     */
  };
  