import React, { useEffect } from 'react'

const About = (props) => {
    useEffect(() => {
        props.alertShow("Something about us", "success", 1600)
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            This is about Us
        </div>
    )
}

export default About
