import { useState } from 'react'

const usePage = () => {

    const [ page, setPage ] = useState(0);

    const increaseBy = (value)=>{
        setPage(Math.max(page + value, 0));
    }


    return {
        page,
        increaseBy,
    }
}

export default usePage;
