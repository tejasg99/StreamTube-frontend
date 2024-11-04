function Logo({ className, inline = false, mobile = false }) {
  return (
    <div
      className={`font-bold text-xl flex items-center justify-center w-full ${className} text-white `}
    >
      <div className="logo w-14 h-14">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M10 8.64L15.27 12L10 15.36V8.64M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>
      <div
        className={`flex ${inline ? "flex-row" : " flex-col"} ${
          mobile && "hidden md:block"
        }`}
      >
        <div className=" text-2xl">StreamTube</div>
      </div>
    </div>
  );
}

export default Logo;
