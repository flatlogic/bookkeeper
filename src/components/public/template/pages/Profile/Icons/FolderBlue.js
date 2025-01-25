import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FolderPic from '../../../../../../images/folder.svg';

const styles = (theme) => ({
    root: {
        position: 'relative',
        marginRight: 20,
        '& > svg': {
            width: 143,
            '@media (max-width: 1440px)': {
                width: 135,
            }
        }
    },
    folderContent: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        color: '#fff',
        '@media (max-width: 1440px)': {
            bottom: 22
        }
    },
    folderTitle: {
        fontSize: 18,
    },
    folderValue: {
        fontSize: 13,
    },
    folderLabel: {
        fontSize: 10
    },
    parag: {
        margin: 0
    }
})

const Forlder = ({ classes, color, title, value, label }) => {
    return (
        <div className={classes.root}>
            <svg height="110" viewBox="0 0 143 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M36.9676 0.0693359H9.43853C4.22577 0.0693359 0 4.29511 0 9.50787V26.8702V31.5311V88.8893C0 94.9479 0.605586 97.2993 1.74571 99.519L1.89101 99.796C3.12491 102.103 4.93561 103.914 7.24281 105.148C9.45772 106.332 11.6554 106.985 17.4112 107.036L18.1495 107.039H124.215C130.274 107.039 132.625 106.433 134.845 105.293L135.122 105.148C137.429 103.914 139.24 102.103 140.474 99.796C141.658 97.5811 142.311 95.3834 142.361 89.6276L142.365 88.8893V26.8702C142.365 20.8117 141.759 18.4603 140.619 16.2406L140.474 15.9636C139.24 13.6564 137.429 11.8457 135.122 10.6118C132.815 9.37786 130.526 8.72075 124.215 8.72075L47.35 8.72132L36.9676 0.0693359Z" fill="#88C0FF"/>
                <path opacity="0.247814" fill-rule="evenodd" clip-rule="evenodd" d="M0 54.5311C8.88973 51.3223 20.4636 46.3114 35.1478 36.5231C43.1863 31.1647 43.2531 22.5268 43.3299 12.6085C43.3476 10.3192 43.3659 7.96169 43.4828 5.56055L47.3517 8.78468L124.215 8.78412C130.526 8.78412 132.815 9.44122 135.122 10.6751C137.429 11.909 139.24 13.7197 140.474 16.0269L140.619 16.304C141.759 18.5236 142.365 20.8751 142.365 26.9336V40.134C140.249 45.4185 137.519 50.5019 134.794 55.3052C133.951 56.7902 132.794 58.1222 131.642 59.4489C129.766 61.6087 127.902 63.7545 127.426 66.5245C126.656 71.0046 127.248 75.5659 127.841 80.1362L127.841 80.1365C128.349 84.0482 128.857 87.9665 128.514 91.8462C127.918 98.572 119.408 103.607 110.74 107.102H18.1495L17.4112 107.099C11.6554 107.049 9.45772 106.396 7.24281 105.211C4.93561 103.977 3.12491 102.167 1.89101 99.8594L1.74571 99.5823C0.605586 97.3626 0 95.0112 0 88.9527V54.5311Z" fill="#4B9FFE"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M115.871 46.7406C123.87 46.7406 130.355 40.2558 130.355 32.2565C130.355 24.2572 123.87 17.7725 115.871 17.7725C107.871 17.7725 101.387 24.2572 101.387 32.2565C101.387 40.2558 107.871 46.7406 115.871 46.7406Z" fill="#4B9FFE"/>
                <g opacity="0.800014">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M120.567 25.5508H111.18C110.069 25.5508 109.168 26.4514 109.168 27.5625V30.2447V36.9503C109.168 38.0613 110.069 38.9619 111.18 38.9619H120.567C121.678 38.9619 122.579 38.0613 122.579 36.9503V30.2458L122.579 30.2447L122.579 30.2435V27.5625C122.579 26.4514 121.678 25.5508 120.567 25.5508ZM110.509 36.9503V30.9152H113.191V37.6208H111.18C110.809 37.6208 110.509 37.3206 110.509 36.9503ZM114.532 37.6208H120.567C120.938 37.6208 121.238 37.3206 121.238 36.9503V30.9152H114.532V37.6208ZM113.862 29.5741H121.238V27.5625C121.238 27.1921 120.938 26.8919 120.567 26.8919H111.18C110.809 26.8919 110.509 27.1921 110.509 27.5625V29.5741H113.862Z" fill="black"/>
                    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="109" y="25" width="14" height="14">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M120.567 25.5508H111.18C110.069 25.5508 109.168 26.4514 109.168 27.5625V30.2447V36.9503C109.168 38.0613 110.069 38.9619 111.18 38.9619H120.567C121.678 38.9619 122.579 38.0613 122.579 36.9503V30.2458L122.579 30.2447L122.579 30.2435V27.5625C122.579 26.4514 121.678 25.5508 120.567 25.5508ZM110.509 36.9503V30.9152H113.191V37.6208H111.18C110.809 37.6208 110.509 37.3206 110.509 36.9503ZM114.532 37.6208H120.567C120.938 37.6208 121.238 37.3206 121.238 36.9503V30.9152H114.532V37.6208ZM113.862 29.5741H121.238V27.5625C121.238 27.1921 120.938 26.8919 120.567 26.8919H111.18C110.809 26.8919 110.509 27.1921 110.509 27.5625V29.5741H113.862Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0)">
                        <rect x="107.826" y="24.21" width="16.0934" height="16.0934" fill="white"/>
                    </g>
                </g>
            </svg>
            <div className={classes.folderContent}>
                <span className={classes.folderTitle}>{title}</span>
                <p className={classes.parag}>
                    <span className={classes.folderValue}>{value}</span>{' '}
                    <span className={classes.folderLabel}>{label}</span>
                </p>
            </div>
        </div>
    )
}

export default withStyles(styles)(Forlder);