import {cursorEnd} from "./index.js";

//WhatDo main
export class WdMain extends React.Component
{
  constructor(props)
  {
    super(props);
    this.addChoice=this.addChoice.bind(this);
    this.mainKeys=this.mainKeys.bind(this);

    this.state={
      choices:[] //choice IDs in order
    };

    this.choicesId=0; //the last used choice id
    this.choiceRefs={};
  }

  //give it key to insert after
  addChoice(insertAfter)
  {
    this.choicesId++;

    //insert new id after the insertafter id
    this.state.choices.splice(this.state.choices.indexOf(insertAfter)+1,0,this.choicesId);

    this.setState({choices:this.state.choices});
  }

  //delete the given choice ID
  deleteChoice(cid)
  {
    delete this.choiceRefs[cid];

    var index=this.state.choices.indexOf(cid);
    this.state.choices.splice(index,1);

    if (index!=0)
    {
      this.choiceRefs[this.state.choices[index-1]].focus();
    }

    this.setState({choices:this.state.choices});
  }

  //main key handler for choices and title bar.
  //but also needs cid.
  //give isEmpty as result of checkempty, whether or not
  //the choice textbox is empty.
  mainKeys(e,cid,isEmpty=false)
  {
    if (e.key=="Enter")
    {
      e.preventDefault();

      if (!isEmpty)
      {
        this.addChoice(cid);
      }
    }

    else if (e.key=="Backspace" && window.getSelection().anchorOffset==0 && cid>0)
    {
      e.preventDefault();
      this.deleteChoice(cid);
    }
  }

  render()
  {
    return (<>
      <div className="title"
        contentEditable=""
        onKeyDown={(e)=>{
          this.mainKeys(e,0);
        }}
      >
        どうしよう
      </div>

      {this.state.choices.map((x,i)=>{
        return <Choice number={i+1} key={x} cid={x} mainKeys={this.mainKeys} addChoice={this.addChoice}
          ref={(ref)=>{
            if (!this.choiceRefs[x] && ref)
            {
              this.choiceRefs[x]=ref;
              ref.focus();
            }
          }}/>;
      })}
    </>);
  }
}

//choice(int number,int cid,function mainKeys,function addChoice)
//number: the number of the choice that visually appears on the left side
//cid: unique id of the choice. should be same as react-key
//mainKeys: function from parent
//addChoice: function from parent
class Choice extends React.Component
{
  constructor(props)
  {
    super(props);
    this.focus=this.focus.bind(this);
    this.checkEmpty=this.checkEmpty.bind(this);

    this.maininput=React.createRef();
  }

  //focus on the main input
  focus()
  {
    this.maininput.current.focus();
    cursorEnd();
  }

  //disallow creation of another choice if
  //this choice is empty
  checkEmpty()
  {
    if (this.maininput.current.innerText=="")
    {
      return true;
    }

    return false;
  }

  render()
  {
    return (
      <div className="choice">
        <span>{this.props.number}</span>
        <div className="input"
          contentEditable=""
          onKeyDown={(e)=>{
            this.props.mainKeys(e,this.props.cid,this.checkEmpty());
          }}
          ref={this.maininput}
        ></div>
      </div>
    );
  }
}