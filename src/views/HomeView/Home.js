import React from 'react';
import { loadNotification, clearNotification } from '../../actions/notification';
import { clearNotificationStarter } from '../../actions/auth';
import { connect } from 'react-redux';
import {firebaseConection} from '../../config/firebase';
import HeroSection from '../../components/HeroSection/HeroSection';
import { homeWelcome } from './Data';

const Home = props => {
    React.useEffect(() => {
        firebaseConection();         
        if (props.notification) {
            if (props.notification !== "Data not found") {
                props.clearNotificationStarter();
                props.clearNotification();
            }
        }
    }, [props]);

    return (
        <>
            <HeroSection {...homeWelcome} />             
        </>
    );
} 

const mapStateToProps = state => ({
    notificationType: state.auth.notificationType,
    notification: state.auth.notification,
    flash: state.notification.notification,
    type: state.notification.type
});

export default connect(mapStateToProps, { loadNotification, clearNotification, clearNotificationStarter })(Home);