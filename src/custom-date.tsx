import * as React from 'react';

function CustomDate() {
    let [date, setDate] = React.useState("");

    let getDate = () => {
        setDate(new Date().toDateString());
    } 

    return (
        <div>
            {date}
            <button onClick={getDate}>Get the date</button>
        </div>
    )
}

export default CustomDate;