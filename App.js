import React, { Component } from 'react';
import { StyeSheet, Text, View, ActivityIndicator } from 'react-native';

export default class App extends Component {
    
    constructor(props)
    {
        super();
        this.state = { isLoading: true, jsonResponse: '' }
    }
    
    componentDidMount()
    {
	    
        setInterval(() => this.GetApiData(), 10000);
    }
    
    async GetApiData()
    {
	    //Prenesi podatke iz API-ja
        return fetch ('http://oc.velenje.si/api/v1/organizations/lokalc-postaje')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                jsonResponse: data, isLoading: false
            });
        })
        .catch((error) => {
           console.error(error); 
        });
    }
    
    render()
    {
        if(this.state.isLoading)
        {
            return (
                <View style={{flex: 1, padding: 30}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );    
        }
        else
        {
	        return (
                <View style={{flex: 1, padding: 30}}>
                   <Text>
                   Številka postaje: {this.state.jsonResponse.id.attr_value}
                   </Text>
                   
                   
                   <Text>
                   Trenutni čas: {new Date().toLocaleString()}
                   </Text>
                </View>
            );   
        }
    }
}