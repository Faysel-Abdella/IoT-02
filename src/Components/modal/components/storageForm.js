
import React from 'react'
import Cloud from './cloud';
import LocalStorage from './localStorage';

const StorageForm = ({ result ,currentDropItem,onClose}) => {
    if (result === 'Cloud') {
        return (
            <Cloud currentDropItem={currentDropItem} onClose={onClose} />
        )
    }
    else if (result === 'Localstorage') {
        return (
            <LocalStorage currentDropItem={currentDropItem} onClose={onClose} />
        )
    }


    return (
        <div></div>
    )
}

export default StorageForm