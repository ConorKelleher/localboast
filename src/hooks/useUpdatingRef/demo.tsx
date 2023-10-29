import useUpdatingRef from "."
import { Text } from "@mantine/core"
import React, { useEffect, useRef } from "react"

interface UseUpdatingRefDemoProps {
  value: unknown
}
interface MemoizedRefComponentProps {
  refObj: React.MutableRefObject<string | undefined>
}

const RefComponent: React.FC<MemoizedRefComponentProps> = ({ refObj }) => {
  const refObjCountRef = useRef(1)

  useEffect(() => {
    refObjCountRef.current++
  }, [refObj])

  return (
    <Text>
      Distinct ref objects:&nbsp;
      <strong data-testid="refsCount">{refObjCountRef.current}</strong>
    </Text>
  )
}

const MemoizedRefComponent = React.memo(RefComponent)

export const UseUpdatingRefDemo = ({ value }: UseUpdatingRefDemoProps) => {
  const updatingRef = useUpdatingRef<string>(value as string)
  return (
    <>
      <Text size="xl">
        props.value === "
        <strong data-testid="propsValueOutput">{value as "string"}</strong>"
      </Text>
      <Text size="xl">
        ref.current === "
        <strong data-testid="refValueOutput">{updatingRef.current}</strong>"
        &nbsp;(ref.current updated in effect, so won't have updated at render
        time)
      </Text>
      <MemoizedRefComponent refObj={updatingRef} />
    </>
  )
}
