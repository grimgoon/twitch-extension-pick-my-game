import React from 'react'

import './Config.css'

export default class ConfigPage extends React.Component{
    constructor(props){
        super(props)

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light'
        }
    }

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    componentDidMount(){
        // do config page setup as needed here
        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{

            })
    
            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })
        }
    }

    render(){
        if(this.state.finishedLoading){
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        There is no configuration needed for this extension!
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        Loading...
                    </div>
                </div>
            )
        }
    }
}