import React from 'react';
import './Todo.css';
import { Route, NavLink, HashRouter } from "react-router-dom";
import LifeCycleReact from "./Components/Pages/LifeCycleReact/LifeCycleReact";



class Todo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Lists: ["Karthick", "Sivan"],
            input: '',
            AddressList: []
        }
        this.takeAction = (ind) => {
            let updatedVal = this.state.Lists;
            updatedVal.splice(ind,1);
            console.log(updatedVal);
            this.setState ({
                Lists: updatedVal,
            }, () => {
                //console.log(this.state);
            });
        }
    }

    takeEdit(ind) {
        alert(ind);
        debugger
        console.log(this.props.children);
        let cpyUpdateStyle = { ...this.updateStyle};
        cpyUpdateStyle.display = 'block';
        this.updateStyle = cpyUpdateStyle;
        this.setState({
            //updateStyle: cpyUpdateStyle 
            value : 1
        })
    }
    
    addNew = () => {
        if(this.state.input!=="") {
            let newList = this.state.Lists;
            let addList = this.state.AddressList;
            newList.push(this.state.input);
            this.setState({
                Lists: newList,
                input: '',
                AddressList: addList
            });
            this.inputTitle.value = '';
        }
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    addOneMore = (index) => {
        debugger
        let addList = this.state.AddressList, indVal = 0;
        addList.length>0 ? indVal = addList[addList.length-1] : indVal = 0;
        addList.push(indVal + 1);
        this.setState({
            AddressList: addList
        });
    }

    removeOneItem = (index) => {
        let addList = this.state.AddressList;
        addList.splice(addList.indexOf(index), 1);
        this.setState({
            AddressList: addList
        })
    }


    
    render() {

        return (
            <HashRouter>
            <div className="body">
                <div className="listContainer">
                <p>Add new</p>
                <p><input type="text" onChange={this.handleChange} ref={el => this.inputTitle = el } /> &nbsp;<input type="button" value="Add to List" onClick={this.addNew}/></p>
                    <ul>
                    {
                        this.state.Lists.map((item, index) => 
                            <li key={index}>{item} &nbsp;&nbsp; <span className="close1 text-right" ><span className="text-right" title="edit" onClick={()=> this.takeEdit(index)}>&#x270E;</span> <span title="close" onClick={()=> this.takeAction(index)}>&times;</span></span></li>
                        )
                    }
                </ul>
                </div>
                <div className="modalView" style={this.updateStyle}>
                    <div className="updateInfo">
                    <p>
                        <input type="text" name="" / > &nbsp; <input type="button" value="Update" />
                    </p>
                    </div>
                </div>
                    <div className="content-part">
                    <p><NavLink to="/lcr">Component Page</NavLink></p>
                    
                    </div>
            </div>
            <Route path="/lcr" component={LifeCycleReact} />

            <p><label>Address Line 0 </label> <br /> <input type="text" name="address0" /> <input type="button" name="plus" value="+" onClick={() => this.addOneMore(0) } /></p>

            <br />
            <br />
            <div>
                {
                    this.state.AddressList.map((currentElement, index, array) => {
                        console.log(currentElement);
                        console.log(index);
                        console.log(array);
                        
                        //var labelVar = <label>Address Line {index}</label>;
                        //var inputVar = <input type="text" name="address{ index }" />;
                        //var newVar = React.createElement('p', { } , [labelVar, inputVar]);
                        var newVar = <p><label>Address Line { currentElement }</label> <br /> <input type="text" name="address{index}" /> <input type="button" name="plus" value="-" onClick={() => this.removeOneItem(currentElement) } /></p>;
                        return newVar;
                    })
                }

            </div>
            </HashRouter>
            
        )
    }
}

export default Todo;
