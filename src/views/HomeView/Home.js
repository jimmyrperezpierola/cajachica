import React from 'react';
import { loadNotification, clearNotification } from '../../actions/notification';
import { clearNotificationStarter } from '../../actions/auth';
import { connect } from 'react-redux';

const Home = props => {
    React.useEffect(() => {
        if (props.notification) {
            if (props.notification !== "Data not found") {
                props.clearNotificationStarter();
                props.clearNotification();
            }
        }
    }, [props]);

    return (
        <>
            <h1>Home4</h1>
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