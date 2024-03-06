import React from 'react'
import loading from './loading.gif'

const Spinner = ()=> {
        return (
            <div className="loading">
                <img className="loading-img" src={loading} alt="loading" />
            </div>
        )
}

export default Spinner