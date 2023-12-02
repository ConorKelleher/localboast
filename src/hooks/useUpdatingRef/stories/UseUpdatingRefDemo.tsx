interface UseUpdatingRefDemoProps {
  /**
   * Any arbitrary value. Set it and forget it. But we won't
   */
  value: unknown
}

export const UseUpdatingRefDemo = () => {
  return (
    <div
      ref={(ref) => {
        if (!ref) {
          return
        }
        const preview = ref.closest(".sbdocs-preview") as
          | HTMLElement
          | undefined
        const renderCanvas = preview?.children[0] as HTMLElement | undefined
        const story = ref.closest(".docs-story") as HTMLElement | undefined
        if (story) story.style.display = "none"
        if (preview) preview.style.paddingTop = "0"
        if (renderCanvas) renderCanvas.style.display = "none"
      }}
    >
      Yeah there's nothing to see here. The "Docs" page has the actual code.
      This one isn't intended to have an actual visible rendered story.
    </div>
  )
}

export const renderDemoArgs = (args: UseUpdatingRefDemoProps) => {
  return `
// Demo 1: how an updating ref can allow a custom hook to return a non-changing callback,
// despite making use of a changeable value within the callback
const useExample = () => {
  let changeableValue: any = ${
    typeof args.value === "string"
      ? `"${args.value}"`
      : (args.value as object).toString()
  }
  // this root ref object will never change (it's a ref) but the ".current" value will
  const updatingRef = useUpdatingRef(changableValue)

  // ...some time later

  const someCallback = useCallback(() => {
    // can use ref.current without busting memoization
    doSomething(updatingRef.current)
  }, [updatingRef]) // has to be in deps to avoid linter errors

  return someCallback
}

// Demo 2: how components can use updating refs to avoid setting state to an existing value
const SomeComponent = () => {
  const [userString, setUserString] = useState("")
  const userStringRef = useUpdatingRef(userString)

  // attempt 1: Just setting state when given a value
  const onChangeUserString = (newString: string) => {
    setUserString(newString)
  }
  // problem 1: callback not memoized, so child component can't be memoized
  // problem 2: calling setState even if setting current value (needless re-renders)

  // attempt 2: Memoized callback, setting state only if new, using state value
  const onChangeUserString = useCallback((newString: string) => {
    if (newString !== userString) {
      setUserString(newString)
    }
  }, [userString])
  // problem: callback memoized but will update when string updates - confusing, bug-prone API and probably needless renders

  // attempt 3: Memoized callback, setting state only if new, using ref value
  const onChangeUserString = useCallback((newString: string) => {
    if (newString !== userStringRef.current) {
      setUserString(newString)
    }
  }, [userStringRef])
  // problem: you tell me. This allows the callback to only evaluate once, yet always have up to date state value

  return <SomeInput onChange={onChangeUserString} />
}
`
}
