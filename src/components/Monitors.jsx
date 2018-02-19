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
        return { id: 'uptimerobot.getMonitors' };
    }

    // This method is automatically invoked each time the `sample.sampleMethod` has fetched some data. 
    // This assumes your method will return an object containing a `count` property.
    onApiData(data) {
        this.setState({ data: data.monitors });
    }

    renderUls()
    {
        let data = this.state.data || [];
        let uls = data.map((x)=> {
            return (<li>{x.friendly_name}</li>);
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
            <div className="widget__body">
                <ul>
                    {this.renderUls()}
                </ul>
            </div>
        </div>
        );
    }
}

// apply the mixins on the component
reactMixin(Monitors.prototype, ListenerMixin);
reactMixin(Monitors.prototype, Mozaik.Mixin.ApiConsumer);

export default Monitors;