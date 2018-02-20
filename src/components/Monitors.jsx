import React, { Component } from 'react';
import reactMixin           from 'react-mixin';    // to be able to use Mixins on es6 classes
import { ListenerMixin }    from 'reflux';         // see https://github.com/reflux/refluxjs#convenience-mixin-for-react
import Mozaik               from 'mozaik/browser';

class Monitors extends Component {
    // we extend the constructor to set a default state 
    constructor(props) {
        super(props);
        
        this.state = { data: "" };
    }

    // Before the component is mounted, the mixin will search for this method on the component.
    // This method MUST return an object with an `id` property.
    // It tells Mozaïk that this component is interested in data coming from `uptimerobot` generated with `getMonitors`
    // The `id` MUST be unique across all Mozaïk extensions.
    getApiRequest() {
        let params = {};
    
        // Only want to set statuses params if we have statuses
        if (this.props.statuses) {
            params.statuses = this.props.statuses;
        }

        return { 
            id: 'uptimerobot.getMonitors', 
            params: params
        };
    }

    // This method is automatically invoked each time the `uptimerobot.getMonitors` has fetched some data. 
    // This assumes your method will return an object containing a `count` property.
    onApiData(data) {
        this.setState({ data: data.monitors });
    }

    renderUls()
    {
        let data = this.state.data || [];
        console.log(data);
        let uls = data.map((x)=> {
            let itemClass = x.status == 9 ? "fa fa-arrow-down" : "fa fa-arrow-up";
            console.log(itemClass);
            return (<li className="monitor"><i className={itemClass}></i>{x.friendly_name}</li>);
        });
        return uls;
    }

    render() {
        const { monitors } = this.state;
        console.log(monitors);

        return (
        <div>
            <div className="widget__header">
            Uptime Robot
            <i className="fa fa-arrow-up" />
            </div>
            <div className="widget__body uptimerobot">
                <ul className="monitor-list">
                    {this.renderUls()}
                </ul>
            </div>
        </div>
        );
    }
}


Monitors.propTypes = {
    statuses: React.PropTypes.string
};

// apply the mixins on the component
reactMixin(Monitors.prototype, ListenerMixin);
reactMixin(Monitors.prototype, Mozaik.Mixin.ApiConsumer);

export default Monitors;