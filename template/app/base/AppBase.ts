/**
 * $[[ProjectName]] project.
 *
 * @date $[[Date]]
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';


export interface ReactStyles {
    [key: string]: React.CSSProperties
}


export function renderToHtml<T extends Element>(element: any): T {
    return ReactDOM.render(
        element, document.getElementById('react_container'));
}
