import * as NextLink from 'next/link';
import { HoverPopover } from '../Popover';
import styles from './link.module.scss';

interface ILink extends NextLink.LinkProps {
  className?: string;
  children?: React.ReactNode;
  tooltipMessage?: React.ReactNode;
  text: string;
}

export function Link(props: ILink) {
  const { text, children, tooltipMessage, ...rest } = props;

  return (
    <span className={styles.linkContainer}>
      <HoverPopover content={tooltipMessage}>
        <NextLink.default
          className={`${styles.link} ${props.className}`}
          {...rest}
        >
          {text}
        </NextLink.default>
      </HoverPopover>
      <svg
        className={styles.path}
        viewBox="0 0 771 271"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M92.5 155C202.9 125 487.5 135.833 616 145"
          stroke-width="14"
          stroke-linecap="round"
          stroke-linejoin="round"
          pathLength="1"
        ></path>
      </svg>
    </span>
  );
}
