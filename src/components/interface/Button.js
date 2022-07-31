
export default function Button({children, onClick, ...rest}) {

  return (
    <button
      type="button"
      onClick={onClick}
      css={{
        padding: "10px 20px",
        fontSize: "44px",
        border: "unset",
        background: "transparent",
        fontFamily: "inherit"
      }}
      {...rest}
    >
      {children}
    </button>
  )
}