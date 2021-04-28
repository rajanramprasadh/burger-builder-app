import React, { Component, useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {

    // return (props) => {
    //     const [error, setError] = useState(null);
    //     const reqInterceptor = axios.interceptors.request.use(req => {
    //         setError(null);
    //         return req
    //     });
    //     const resInterceptor = axios.interceptors.response.use(res => res, error => setError(error));
    //     useEffect(() => {
    //         return () => {
    //             axios.interceptors.request.eject(reqInterceptor);
    //             axios.interceptors.response.eject(resInterceptor);
    //         }
    //     }, [reqInterceptor, resInterceptor]);

    //     function errorConfirmHandler(event) {
    //         event.preventDefault();
    //         setError(null)
    //     }

    //     return (
    //         <Aux>
    //             <Modal
    //                 show={error}
    //                 modalClosed={errorConfirmHandler}>
    //                 {error ? error.message : null}
    //             </Modal>
    //             <WrappedComponent {...props} />
    //         </Aux>
    //     )
    // };

    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            );
        }
    }
}

export default withErrorHandler;