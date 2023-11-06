interface ButtonProps {
  /**
   * Test Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * Button contents
   */
  label: string
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary = false, label, ...props }: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary"
  return (
    <button
      type="button"
      className={["storybook-button", "storybook-button--medium", mode].join(
        " ",
      )}
      {...props}
    >
      {label}
    </button>
  )
}
