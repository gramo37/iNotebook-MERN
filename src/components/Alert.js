import React from 'react'

const Alert = (props) => {
    return (
        props.alert &&
        <>
            <div className={`alert alert-${props.alert.type}`} style={{ position: "absolute", width: "100%" }} role="alert">
                {props.alert.msg}
            </div>
        </>
    )
}

export default Alert
