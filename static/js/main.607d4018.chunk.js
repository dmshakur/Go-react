(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports={GameBoard:"GameBoard_GameBoard__Z03nT",White:"GameBoard_White__1T_pI",Black:"GameBoard_Black__2ze2o",outer_board:"GameBoard_outer_board__2MdoP"}},18:function(e,t,a){e.exports=a.p+"static/media/go.4c850590.png"},19:function(e,t,a){e.exports={White:"Stone_White__jVRmy",Black:"Stone_Black__1O17h"}},20:function(e,t,a){e.exports=a(31)},3:function(e,t,a){e.exports={_app:"App__app__305KV",_sidebar:"App__sidebar__2r77O",_landing:"App__landing__30zfq",_main:"App__main__1f8_r",_button:"App__button__378BS",_user:"App__user__1hE50",_para:"App__para__2wJjY",_game:"App__game__3IzVA"}},30:function(e,t,a){},31:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(17),o=a.n(s),r=a(5),c=a(6),l=a(8),u=a(7),h=a(9),d=a(12),m=a.n(d);a(25),a(28);m.a.initializeApp({apiKey:"AIzaSyA3adSr3gKePH7J07FjS_SZVvpXAjyYQno",authDomain:"go-react-alphabeta.firebaseapp.com",databaseURL:"https://go-react-alphabeta.firebaseio.com",projectId:"go-react-alphabeta",storageBucket:"go-react-alphabeta.appspot.com",messagingSenderId:"947800282985",appId:"1:947800282985:web:05d213de6ecf7202"});var p=m.a,f=a(3),b=a.n(f),g=(a(30),a(18)),_=a.n(g),v=function(e){return i.a.createElement("div",null)},y=a(2),k=a(4),w=a.n(k),C=function(e){return i.a.createElement("div",{className:w.a.square,onClick:e.handlePointClick,pos:e.pos},i.a.createElement("div",{className:w.a.nw}),i.a.createElement("div",{className:w.a.ne}),i.a.createElement("div",{className:w.a.sw}),i.a.createElement("div",{className:w.a.se}))},P=a(19),E=a.n(P),T=function(e){return i.a.createElement("div",{className:E.a.Stone})},I=a(13),A=a.n(I),G={easy:[81,{height:324,width:324},41,9],medium:[169,{height:468,width:468},85,13],go:[361,{height:684,width:684},181,19]},S={piece:"free",chainId:null,openLinks:null,topIff:"free",rightIff:"free",bottomIff:"free",leftIff:"free"},j=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).boardGen=function(e){for(var t=[],n={},s=function(e){n[e]=S,t.push(i.a.createElement(C,{handlePointClick:function(t){return a.handlePointClick(e,t)},pos:e}))},o=0;o<e;o++)s(o);a.setState({boardPointsTact:n,boardPoints:t,stonesCount:{whiteReserves:G[a.props.gameDiff][2]-1,blackReserves:G[a.props.gameDiff][2]}})},a.handleTurnChange=function(){"black"===a.state.playerTurn?a.setState({playerTurn:"white",waitingPlayer:"black"}):a.setState({playerTurn:"black",waitingPlayer:"white"})},a.boardRender=function(e){var t,n=a.state.boardPoints;for(t in n)"free"!==a.state.boardPointsTact[t].piece&&(n[t]=i.a.createElement(C,null,i.a.createElement(T,{className:A.a[a.state.boardPointsTact[t].piece]})));a.setState({boardPoints:n})},a.handleChainLinks=function(e,t){var n,i=[],s=a.state.chains;t.forEach(function(e){this.state.boardPointsTact[e].piece===this.state.playerTurn&&i.push(this.state.boardPointsTact[e].chainId)}),null!==e.chainId&&i.push(e.chainId),i.length>1?(i.map(function(e){for(n in void 0)(void 0).chainId===e&&((void 0).chainId=a.state.currentChain+1,s[0]!==a.state.currentChain+1&&s.unshift(a.state.currentChain+1))}),a.setState({currentChain:a.state.currentChain+1,chains:s})):1===i.length&&(e.chainId=i[0])},a.handleTactChange=function(e,t){var n=G[a.props.gameDiff][3],i=e,s=[];return i.rightIff=a.state.boardPointsTact[t-1].piece,i.topIff=a.state.boardPointsTact[t-n].piece,i.leftIff=a.state.boardPointsTact[t+1].piece,i.bottomIff=a.state.boardPointsTact[t+n].piece,i.rightIff===a.state.playerTurn&&null!==i.rightIff&&s.push(a.state.boardPointsTact[t-1].chainId),i.topIff===a.state.playerTurn&&null!==i.topIff&&s.push(a.state.boardPointsTact[t-n].chainId),i.leftIff===a.state.playerTurn&&null!==i.leftIff&&s.push(a.state.boardPointsTact[t+1].chainId),i.bottomIff===a.state.playerTurn&&null!==i.bottomIff&&s.push(a.state.boardPointsTact[t+n].chainId),s.length>0?(a.handleChainLinks(i,s),i):(i.chainId=a.state.currentChain+1,a.setState({currentChain:a.state.currentChain+1}),i)},a.handlePointClick=function(e,t){if(t.preventDefault(),"black"!==a.state.boardPointsTact[e].piece&&"white"!==a.state.boardPointsTact[e].piece){var n=a.state.boardPointsTact;n[e].piece=a.state.playerTurn;var i=a.handleTactChange(n[e],e);n[e]=i,a.setState({boardPointsTact:n}),a.handleTurnChange(),a.boardRender()}},a.state={playerTurn:"black",waitingPlayer:"white",myColor:"",boardPoints:[],boardPointsTact:[],prevBoardPointsTact:[],chains:[],currentChain:0,elapsedTime:0,turnCount:0,isTiming:!0,stonesCount:{whiteCaptures:0,whiteReserves:null,blackCaptures:0,blackReserves:null},turnData:[]},a.handleChainLinks=a.handleChainLinks.bind(Object(y.a)(Object(y.a)(a))),a.boardGen=a.boardGen.bind(Object(y.a)(Object(y.a)(a))),a.handleTurnChange=a.handleTurnChange.bind(Object(y.a)(Object(y.a)(a))),a.handleTactChange=a.handleTactChange.bind(Object(y.a)(Object(y.a)(a))),a.handleChainLinks=a.handleChainLinks.bind(Object(y.a)(Object(y.a)(a))),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){this.boardGen(G[this.props.gameDiff][0])}},{key:"render",value:function(){return i.a.createElement("div",{style:G[this.props.gameDiff][1],className:A.a.GameBoard},this.state.boardPoints)}}]),t}(n.Component),O=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={timers:{},user:null,username:null,gameDiff:"",isGame:!1,isAuthenticated:!1},a.handleLogin=function(){var e=new p.auth.GoogleAuthProvider;p.auth().signInWithPopup(e).then(function(e){a.setState({username:e.displayName}),console.log("User Logged In Successfully",a.state.user)}).catch(function(e){console.log("Something Went Wrong: ",e.message)})},a.handleLogout=function(){p.auth().signOut().then(function(){console.log("User logged out successfully")}).catch(function(e){console.log("Something went wrong: ",e.message)})},a.handleGame=function(e){e.preventDefault(),a.setState({gameDiff:e.target.value}),a.state.isGame?a.setState({isGame:!1}):a.setState({isGame:!0})},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;p.auth().onAuthStateChanged(function(t){t?(e.setState({user:t.displayName,isAuthenticated:!0}),p.storage().ref("go-react-alphabeta/user/"+t).put({name:t.displayName,email:t.email,profilePic:t.photoURL})):e.setState({user:null,isAuthenticated:!1})})}},{key:"render",value:function(){return i.a.createElement("div",{className:b.a._app},i.a.createElement("div",{className:b.a._sidebar}," ",i.a.createElement("h1",null,"GO"),i.a.createElement("div",{className:b.a._user},this.state.user),i.a.createElement("div",null,i.a.createElement("button",{className:b.a._button,onClick:this.state.isAuthenticated?this.handleLogout:this.handleLogin},this.state.isAuthenticated?i.a.createElement("span",null,"Logout"):i.a.createElement("span",null,"Login"))),this.state.isAuthenticated&&!this.state.isGame?i.a.createElement("div",null,i.a.createElement("div",null,"Start a new game"),i.a.createElement("button",{className:b.a._button,value:"easy",onClick:this.handleGame},"Easy"),i.a.createElement("button",{className:b.a._button,value:"medium",onClick:this.handleGame},"Medium"),i.a.createElement("button",{className:b.a._button,value:"go",onClick:this.handleGame},"Go")):this.state.isAuthenticated?i.a.createElement("div",null):i.a.createElement("div",null,"Login to start a new game"))," ",i.a.createElement("div",{className:b.a._main},this.state.isAuthenticated?i.a.createElement("div",{className:b.a._board},this.state.isGame?i.a.createElement(j,{gameDiff:this.state.gameDiff,user:this.state.user,className:b.a._game}):i.a.createElement(v,null)):i.a.createElement("div",{className:b.a._landing},i.a.createElement("img",{alt:"A small go board",src:_.a}),i.a.createElement("p",{className:b.a._para},"Go is one of the oldest board games played by humankind. It has stood the test of time and to this day remains of the most popular and challenging games of strategy. Originating in the Zhou dynasty of 1046-256 BC, it is quite possibly the oldest continuously played board games on Earth. I recommend that you read about it on wikipedia here. ",i.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Go_(game)"},"Go Wiki Page")))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},4:function(e,t,a){e.exports={square:"Point_square__2g__y",nw:"Point_nw__13zAV",ne:"Point_ne__25AV8",sw:"Point_sw__2Leo4",se:"Point_se__2DVoE"}}},[[20,1,2]]]);
//# sourceMappingURL=main.607d4018.chunk.js.map