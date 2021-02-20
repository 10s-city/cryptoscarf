import React, { Component } from 'react';
import axios from "axios";

function DailyPrice(props) {

    return <div className={props.value.color} >
        <span>{props.value.ts}</span>
        <span>&nbsp; &nbsp;</span>
        <span>{props.value.pct}%</span>
    </div>
};

function CryptoScarf(props) {
    const dailyBtc = props.rows.map((row) =>
        <DailyPrice key={row.toString()} value={row.node} />
    );
    return (
        <div>
            {dailyBtc}
        </div>
    );
}

/**
 * graphQL query to pull dail custom price view
 */
const queryData = "{\"query\":\"query CryptoScarf { allCryptoscarves { edges { node { ts btc prev color pct } } }}\",\"variables\":null,\"operationName\":\"CryptoScarf\"}"

const headers = {
    'Content-Type': 'application/json',
    'Authorization': "96601f0a-6457-11eb-875b-5ffa8394bea5"
}

export default class ReadRemoteFile extends Component {
    componentDidMount() {
        axios.post('https://pegd.io/graphql', queryData,{ headers: headers } )
            .then((res) => {
                this.setState({rows: res.data.data.allCryptoscarves.edges })
            })
    }

    constructor(props) {
        super(props);
        this.state= {rows: []}
    }

    render() {
        if (!this.state) {
            return <pre />
        }

        return <CryptoScarf rows={this.state.rows} />
    }
}
