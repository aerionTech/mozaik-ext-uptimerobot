import React, { Component } from 'react';
import reactMixin           from 'react-mixin';    // to be able to use Mixins on es6 classes
import { ListenerMixin }    from 'reflux';         // see https://github.com/reflux/refluxjs#convenience-mixin-for-react
import Mozaik               from 'mozaik/browser';

class Monitors extends Component {
    // we extend the constructor to set a default state 
    constructor(props) {
        super(props);
        
        this.state = { count: 0 };
    }

    // Before the component is mounted, the mixin will search for this method on the component.
    // This method MUST return an object with an `id` property.
    // It tells Mozaïk that this component is interested in data coming from `sample` generated with `sampleMethod`
    // The `id` MUST be unique across all Mozaïk extensions.
    getApiRequest() {
        return { id: 'sample.sampleMethod' };
    }

    // This method is automatically invoked each time the `sample.sampleMethod` has fetched some data. 
    // This assumes your method will return an object containing a `count` property.
    onApiData(data) {
        console.log(data);
        this.setState({ count: data.count });
    }

    render() {
        const { count } = this.state;       

        return (
        <div>
            <div className="widget__header">
            Uptime Robot
            <i className="fa fa-arrow-up" />
            </div>
            <div className="widget__body">
                <h2>{count}</h2>
            </div>
        </div>
        );
    }
}

// apply the mixins on the component
reactMixin(Monitors.prototype, ListenerMixin);
reactMixin(Monitors.prototype, Mozaik.Mixin.ApiConsumer);

export default Monitors;