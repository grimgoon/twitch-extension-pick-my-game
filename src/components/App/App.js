import React, {Component} from 'react'
import './App.css'

class App extends Component {

    state = {
        finishedLoading: false,
        isVisible: true
    }

    twitch = window.Twitch ? window.Twitch.ext : null
    
    componentDidMount(){
        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{
            
            });
              
            this.twitch.listen('broadcast',(target,contentType,body)=>{
                this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
                // now that you've got a listener, do something with the result... 

                // do something...

            })

            this.twitch.onVisibilityChanged((isVisible,_c)=>{
                this.visibilityChanged(isVisible)
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

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    visibilityChanged(isVisible){
        this.setState(()=>{
            return {
                isVisible
            }
        })
    }

    render(){
        if(this.state.finishedLoading && this.state.isVisible){
            return (
                <div className="App">
                  
                </div>
            )
        }else{
            return (
                <div className="App">
                    <div className="header">
                        <div className="header--title">Title</div>
                        <div className="header--description">Description</div>
                        <div className="header--time">Ö 18:30 CET</div>
                    </div>
                    <div className="content">
                        <div className="content--header">Header</div>
                        <div className="content--game">Game 1</div>
                        <div className="content--game">Game 2</div>
                        <div className="content--game">Game 3</div>
                        <div className="content--footer">Pagination</div>
                    </div>
                    
                </div>
            )
        }

    }
}

export default App;