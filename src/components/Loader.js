import React from 'react';
import { connect } from 'react-redux';

const Loader = props => {
    return (
        <>
            {
                props.loading && <div className="loader">
                    <section className="loading verticle-align text-center">
                        {/* <div className="circle">Loading...</div> */}
                        <div className="circle">Loading...</div>
                        {/* <div className="circle">Loading...</div> */}
                    </section>
                </div>
            }
        </>
    );
}


const mapStateToProps = state => ({
    loading: state.books.loading
})

export default connect(mapStateToProps, {})(Loader); 