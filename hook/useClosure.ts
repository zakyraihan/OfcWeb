import { useState } from "react";

const useDisClosure = () => {
    let [isOpen, setIsOpen] = useState<boolean>(false)

    const onOpen = () => {
        setIsOpen(!isOpen)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    return {onOpen, onClose, isOpen};
}

export default useDisClosure