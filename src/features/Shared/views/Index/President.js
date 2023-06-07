import React, {Component} from 'react';
import {Card, Descriptions} from "antd";
import {connect} from "react-redux";

class President extends Component {
    render() {
        let shared = this.props.contact.shared

        let sharedData = shared.data ?? {}
        return (
            <div className="features feature-shared-card">
                <Card
                    className="shared-card"
                    size="small"
                    title="Contact Info"
                    loading={shared.loading}
                >
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Contact Name">{sharedData.name ?? "---"}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{sharedData.phone_number ?? "---"}</Descriptions.Item>
                        <Descriptions.Item label="Email">{sharedData.email ?? "---"}</Descriptions.Item>
                        <Descriptions.Item label="Created By">{sharedData.created_user_name ?? "---"}</Descriptions.Item>
                        <Descriptions.Item label="Last Update">{sharedData.updated_at ?? "---"}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contact: state.contact,
    }
}

export default connect(mapStateToProps, {})(President)