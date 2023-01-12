import { ReactNode } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Popover } from '@mantine/core';

export function HoverPopover({
  children,
  content
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  const [opened, { close, open }] = useDisclosure(false);
  if (!content) return <>{children}</>;
  return (
    <Popover width={350} position="top" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <span onMouseEnter={open} onMouseLeave={close} className="inline-block">
          {children}
        </span>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        {content}
      </Popover.Dropdown>
    </Popover>
  );
}
