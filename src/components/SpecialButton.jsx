import PropTypes from "prop-types";

function SpecialButton({type="button", className="", children, ...props}) {
    return (
        <button
          type={type}
          className={`mr-1 rounded bg-[#6b219f] px-3 py-2 text-center text-white transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto ${className}`}
          {...props}
        >
            {children}
        </button>
    )
}

SpecialButton.propTypes = {
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
    children: PropTypes.node, //any renderable content - text,element,etc
}

SpecialButton.defaultProps = {
    type: "button",
    className: "",
}

export default SpecialButton;