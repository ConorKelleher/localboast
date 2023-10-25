import type { Meta, StoryObj } from '@storybook/react';
import useUpdatingRef from '.';
import { Text } from '@mantine/core';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

interface UseUpdatingRefDemoProps {
  value: unknown;
}
interface MemoizedRefComponentProps {
  refObj: React.MutableRefObject<string | undefined>;
}

const RefComponent: React.FC<MemoizedRefComponentProps> = ({ refObj }) => {
  const refObjCountRef = useRef(1)

  useEffect(() => {
    refObjCountRef.current++
  }, [refObj])

  return (
    <Text>Distinct ref objects:{refObjCountRef.current}</Text>
  )
}

const MemoizedRefComponent = React.memo(RefComponent)

const UseUpdatingRefDemo = ({ value }: UseUpdatingRefDemoProps) => {
  const updatingRef = useUpdatingRef<string>(value as string)
  return (
  <>
    <Text size="xl">props.value === "{value as "string"}"</Text>
    <Text size="xl">ref.current === "{updatingRef.current}" (ref.current updated in effect, so won't have updated at render time)</Text>
    <MemoizedRefComponent refObj={updatingRef} />
  </>
  )
}

const meta = {
  title: "Hooks/useUpdatingRef",
  component: UseUpdatingRefDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof UseUpdatingRefDemo>;

export default meta;
type Story = StoryObj<typeof UseUpdatingRefDemo>;

export const Primary: Story = {
  args: {
    value: "Initial Value",
  },
};