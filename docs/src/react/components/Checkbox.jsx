import { useState, useEffect } from 'react';
import cn from '../style/classNames';

export default function Checkbox({
  label,
  checked,
  highlight,
  hover,
  className,
  onChange
}) {

  const [isChecked, setIsChecked] = useState(checked);

  const onClick = event => {
    event.stopPropagation();
    const value = !isChecked;
    setIsChecked(value);
    onChange(value);
  }

  useEffect(() => {
    setIsChecked(checked);
  }, [checked])

  const classNames = [className, cn.checkbox];
  isChecked && classNames.push(cn.isChecked);
  highlight && classNames.push(cn.isHighlighted);
  hover && classNames.push(cn.isHovering);

  return (
    <span
      className={classNames.join(' ')}
      role="checkbox"
      aria-label="label"
      tabIndex="0"
      aria-label={label}
      aria-checked={isChecked + ''}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>check</title><path d="M64,0a64,64,0,1,0,64,64A64,64,0,0,0,64,0Zm39.1,47.8L55.7,95.2a1,1,0,0,1-1.4,0L24.8,65.7a1,1,0,0,1,0-1.4l8.5-8.5a1,1,0,0,1,1.4,0L55,76.1,93.2,37.9a1,1,0,0,1,1.4,0l8.5,8.5A1,1,0,0,1,103.1,47.8Z"/></svg>
    </span>
  )
}

Checkbox.defaultProps = {
  highlight: false,
  hover: false,
  checked: false,
  onChange: () => {}
};