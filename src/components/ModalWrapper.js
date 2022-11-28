const ModalWrapper = ({ ariaLabel, callback, children }) => {
    return (
        <div
        aria-modal="true"
        aria-label={ariaLabel}
        role="dialog"
        className="absolute h-screen w-full flex justify-center items-center bg-black top-0 bg-opacity-50"
            
        >

            {children}
        </div>
    )
}