import React from 'react'

import './LiveConfigPage.css'

export default class LiveConfigPage extends React.Component{
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
        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{
               
            })

            this.twitch.listen('broadcast',(target,contentType,body)=>{
                this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
                // now that you've got a listener, do something with the result... 

                // do something...

            })

            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })
        }
    }

    componentWillUnmount(){
        if(this.twitch){
            this.twitch.unlisten('broadcast', ()=>console.log('successfully unlistened'))
        }
    }
    
    render(){
        if(this.state.finishedLoading){
            return (
                <div className="LiveConfigPage">
                    <div className={this.state.theme === 'light' ? 'LiveConfigPage-light' : 'LiveConfigPage-dark'} >
                        <p>Hello world!</p>
                        <p>This is the live config page! </p>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="LiveConfigPage">
                </div>
            )
        }

    }
}