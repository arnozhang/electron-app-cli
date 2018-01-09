/**
 * ${{ProjectName}} project.
 *
 * @date ${{Date}}
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ReactStyles} from './base/AppBase';


export default class Homepage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div style={styles.root}>
                <span style={styles.text}>Hello World</span>
            </div>
        );
    }
}

const styles: ReactStyles = {
    root: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 100,
        color: '#3C3F41'
    }
};


let homePage = ReactDOM.render(
    <Homepage/>,
    document.getElementById('react_container'));
