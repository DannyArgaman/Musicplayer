import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMusic} from "@fortawesome/free-solid-svg-icons"

const Nav = ({libraryStatus, setLibraryStatus }) => {

    return (
         <div>
             <nav>
                <h1 className={`library-status ${libraryStatus? "h1-active" : ""}`}>Waves</h1>
                 <button onClick={ () =>setLibraryStatus(!libraryStatus)}
                 className={`library-status ${libraryStatus? "button-active" : ""}`}>
                      Library <FontAwesomeIcon icon={faMusic}/></button>
            </nav>
        </div>
    )
}

export default Nav;