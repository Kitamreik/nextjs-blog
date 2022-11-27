import styles from './alert.module.css';
import cn from 'clsx';

// use the classnames
export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {children}
    </div>
  );
}

// docs: https://nextjs.org/docs/basic-features/built-in-css-support