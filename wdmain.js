import{cursorEnd,isStartSelection,isEndSelection,randomO}from"./index.js";export class WdMain extends React.Component{constructor(a){super(a),this.addChoice=this.addChoice.bind(this),this.mainKeys=this.mainKeys.bind(this),this.deleteChoice=this.deleteChoice.bind(this),this.checkTitleEmpty=this.checkTitleEmpty.bind(this),this.state={choices:[]},this.titleRef=React.createRef(),this.titlePlaceholderRef=React.createRef(),this.titleEmpty=!0,this.choicesId=0,this.choiceRefs={}}componentDidMount(){this.titleRef.current.focus()}addChoice(a){var b=1;this.choicesId++,isStartSelection()&&(b=0),this.state.choices.splice(this.state.choices.indexOf(a)+b,0,this.choicesId),this.setState({choices:this.state.choices})}deleteChoice(a){delete this.choiceRefs[a];var b=this.state.choices.indexOf(a);this.state.choices.splice(b,1),0==b?(this.titleRef.current.focus(),cursorEnd()):this.choiceRefs[this.state.choices[b-1]].focus(),this.setState({choices:this.state.choices})}mainKeys(a,b,c=!1){if(!this.state.outputMode)if("Enter"==a.key)a.preventDefault(),a.ctrlKey?this.getOutput():!c&&this.addChoice(b);else if("ArrowUp"!=a.key)"ArrowDown"==a.key?isEndSelection()&&this.choiceRefs[this.state.choices[this.state.choices.indexOf(b)+1]].focus():"Backspace"==a.key&&0==window.getSelection().anchorOffset&&0<b&&(a.preventDefault(),this.deleteChoice(b));else if(isStartSelection()){var d=this.state.choices.indexOf(b)-1;0>d?this.titleRef.current.focus():this.choiceRefs[this.state.choices[d]].focus()}}checkTitleEmpty(){this.state.outputMode||(0<this.titleRef.current.innerText.length&&this.titleEmpty?(this.titlePlaceholderRef.current.classList.add("hidden"),this.titleEmpty=!1):0==this.titleRef.current.innerText.length&&!this.titleEmpty&&(this.titlePlaceholderRef.current.classList.remove("hidden"),this.titleEmpty=!0))}getOutput(){this.setState({outputMode:1});var a=`${this.titleRef.current.innerText}`,b=1;for(var c in this.choiceRefs)a+=`<br>${b} ${this.choiceRefs[c].getText()}`,b++;this.titleRef.current.innerHTML=a,this.titleRef.current.focus()}render(){var a="";2<=this.state.choices.length&&(a="show");var b="",c="";return this.state.outputMode&&(b="hidden",c="output-mode"),React.createElement(React.Fragment,null,React.createElement("div",{className:"title-outer"},React.createElement("div",{className:`title ${c}`,contentEditable:"",onKeyDown:a=>{this.checkTitleEmpty(),this.mainKeys(a,0)},onKeyUp:this.checkTitleEmpty,ref:this.titleRef}),React.createElement("div",{className:"title-placeholder",ref:this.titlePlaceholderRef},"well, what is it?")),React.createElement("div",{className:`choices ${b}`},this.state.choices.map((a,b)=>React.createElement(Choice,{number:b+1,key:a,cid:a,mainKeys:this.mainKeys,addChoice:this.addChoice,ref:b=>{!this.choiceRefs[a]&&b&&(this.choiceRefs[a]=b,b.focus())}}))),React.createElement("div",{className:`ender ${a}`},React.createElement("i",null,"Ctrl+Enter to Choose")))}}class Choice extends React.Component{constructor(a){super(a),this.focus=this.focus.bind(this),this.checkEmpty=this.checkEmpty.bind(this),this.maininput=React.createRef()}focus(){this.maininput.current.focus(),cursorEnd()}checkEmpty(){return!(""!=this.maininput.current.innerText)}getText(){return this.maininput.current.innerText}render(){return React.createElement("div",{className:"choice"},React.createElement("span",null,this.props.number),React.createElement("div",{className:"input",contentEditable:"",onKeyDown:a=>{this.props.mainKeys(a,this.props.cid,this.checkEmpty())},ref:this.maininput}))}}