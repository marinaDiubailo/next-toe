import React, { forwardRef } from 'react';
import clsx from 'clsx';
import s from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'primary';

export type ButtonProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      children,
      variant = 'primary',
      disabled,
      fullWidth,
      ...rest
    } = props;

    const classNames = clsx(
      s.button,
      className,
      s[variant],
      fullWidth && s.fullWidth,
    );

    return (
      <button
        type={'button'}
        className={classNames}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
