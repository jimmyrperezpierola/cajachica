//import axios from 'axios';
import { firebaseConection, signInWithGoogle, generateUserDocument } from "../config/firebase";
import firebase from 'firebase';

import {
    USER_LOADING,
    CLEAR_NOTIFICATION_STARTER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILED,
    START_LOADING,
    STOP_LOADING
} from './types';

//const auth = firebase.auth();

export const loadUser = () => async (dispatch, getState) => {
    //User Loading
    dispatch({ type: USER_LOADING });
}


// Login User
export const login = (email, password) => async (dispatch, getState) => {
    //const url = getState().getEndPoint;

    firebaseConection();     
    dispatch({ type: START_LOADING })
    console.log('Inside actions/auth/login');
    //console.log('url login: ' + url);
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ email, password })
    console.log('...........auth/login.....');
    try {
        firebase.auth().signInWithEmailAndPassword(email, password).then((u)=>{  							
            //this.setState({isSignedIn: true, uid: firebase.auth().currentUser != null? firebase.auth().currentUser.uid: null});  

            const emailVerified = firebase.auth().currentUser.emailVerified;
            //this.setState({emailVerified: emailVerified});   							
            
            // if(!emailVerified)
            // {                   
            //     const payload = "El email no ha sido verificado, revise su buzon de email, ya siga el procedimiento de activacion.";
            //     let data = { data: payload, errors: {data: "Email no verificado"}};
            //     console.log('Email no verificado.!!!!!!!!!!!!!!!!!!!!!!');

            //     dispatch({
            //         type: LOGIN_FAIL,
            //         payload: data
            //     });                
            // }
            // else {  
                const payload = "LOGIN_SUCCESS!";
                let data = { data: payload, errors: {}};
                console.log('<<<<<<<<<<<<<<<<<<<<LOGIN_SUCCESS>>>>>>>>>>>>>>>>>>>>>>>>');

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data
                });                  
                //return <Redirect to="/Home" />								
            //}
        }).catch((err) => {
            dispatch({
                type: LOGIN_FAIL,
                payload: err
            });   
            console.log(err);
        })

        console.log('STOP_LOADING!');
        //const res = await axios.post(`${url}/login/`, body, config);
        dispatch({ type: STOP_LOADING })



        // if (res.data.status) {
        //     dispatch({
        //         type: LOGIN_SUCCESS,
        //         payload: res.data
        //     });
        // }
        // else {
        //     dispatch({
        //         type: LOGIN_FAIL,
        //         payload: res.data.data.message
        //     })
        // }
    } catch (e) {
        dispatch({ type: LOGIN_FAIL, payload: e });
        console.log('<<<<<LOGIN_FAIL: ' + e);
    }
}


export const logout = () => async (dispatch, getState) => {
    const url = getState().getEndPoint

    // Get token from state
    const access = getState().auth.accessToken;
    const refresh = getState().auth.refreshToken;


    // Request Body
    const body = JSON.stringify({ 'refreshToken': refresh, 'accessToken': access })

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        }
    }

    try {
        //const res = await axios.post(`${url}/logout/`, body, config);
        const payload = "LOGOUT_SUCCESS!";
        let data = { data: payload, errors: {} };

        dispatch({
            type: LOGOUT_SUCCESS,
            payload: data
        });

        // if (res.data.status) {
        //     dispatch({
        //         type: LOGOUT_SUCCESS,
        //         payload: res
        //     });
        // }
        // else {
        //     dispatch({
        //         type: LOGOUT_FAIL,
        //         payload: res.data.data
        //     });
        // }
    } catch (e) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: e
        })
    }
};


export const signUp = (data) => async (dispatch, getState) => {
    //const url = getState().getEndPoint;

    // Start loading for loading styles in frontend.
    dispatch({ type: START_LOADING })
    const body = data;

    firebaseConection(); 

    try {
        //const res = await axios.post(`${url}/register/`, body);
        const {user} = await firebase.auth().createUserWithEmailAndPassword(body.email, body.password);

        if (true) {
            generateUserDocument(user, body.first_name, body.last_name);

            // Stop loading for loading styles in frontend after data is fetched. 
            dispatch({ type: STOP_LOADING })

            const payload = "SIGN_UP_SUCCESS!";
            let data = { data: payload, errors: {} };    
 
                dispatch({
                    type: SIGN_UP_SUCCESS, 
                    payload: data //res.data
                });

                console.log('SignUp successfully.');
            //   })
            //   .catch((error) => {
            //     var errorCode = error.code;
            //     var errorMessage = error.message;
            //     console.log('Error Signing up with email and password_ ' + error);
            //     dispatch({
            //         type: SIGN_UP_FAILED,
            //         payload: "Error Signing up with email and password." //res.data.data.message
            //     })
            //   });                  
        }
        else {
            dispatch({
                type: SIGN_UP_FAILED//,
                //payload: "Error Signing up with email and password." //res.data.data.message
            })
            console.log('Error Signing up with email and password.');
        }
    } catch (e) {
        dispatch({ type: SIGN_UP_FAILED, payload: e });
        console.log('Something went wrong.');
    }
}

export const clearNotificationStarter = () => async (dispatch, getState) => {
    dispatch({ type: CLEAR_NOTIFICATION_STARTER })
}