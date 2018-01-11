/**
 * $[[ProjectName]] project.
 *
 * @date $[[Date]]
 */

import * as React from 'react';
import {ReactStyles, renderToHtml} from '../../base/AppBase';

const packageJson = require('../../../package.json');


export default class AboutPage extends React.Component<any, any> {

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.title}>
                    <img style={{width: 50, height: 50}}
                         src="../images/app-icon.png"/>

                    <span style={styles.app_name}>$[[ProjectName]]</span>
                </div>
                <span style={{marginTop: 20, color: '#666'}}>
                    {packageJson.version} @Author
                </span>
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    app_name: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10
    }
};


let aboutPage = renderToHtml(<AboutPage/>);
