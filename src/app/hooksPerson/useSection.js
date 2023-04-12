import { useState } from 'react'

const useSection = () => {

    const [ isOpenSection, setOpenSection ] = useState(false);

    const handleSection = ()=>{ setOpenSection(!isOpenSection) };
    

    return [ isOpenSection, handleSection];
}


export default useSection; 