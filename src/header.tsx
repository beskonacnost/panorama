import * as React from 'react';

type HeaderProps = {
    text?: string
}
function Header(props: HeaderProps){
    //ispalice kada je komponenta u browseru
    React.useEffect(() => {
        alert(document.querySelector('#myHeader'));
    })
    
    return(
        <h1 id="myHeader" className="primary-header">{props.text}</h1>
    )
}

export default Header;