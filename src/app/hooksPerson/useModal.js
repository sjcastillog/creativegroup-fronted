import { useState } from 'react'

const useModal = () => {

    const [ isOpenModal, setOpenModal ] = useState(false);

    const handleOpenModal = ()=>{ setOpenModal(true) };

    const handleCloseModal = ()=>{ setOpenModal(false) };

    return [ isOpenModal, handleOpenModal, handleCloseModal ];
    
}

export default useModal; 
 