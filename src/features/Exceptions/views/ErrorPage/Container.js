import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';

class Container extends Component {
    render() {
        const router = this.props.router;
        const code   = router.location.pathname.replace("/errors/", "");

        return (
            <President
                code={code}
            />)
    }
}

function mapStateToProps(state) {
    return {
        router: state.router
    }
}

export default connect(mapStateToProps, {})(Container)