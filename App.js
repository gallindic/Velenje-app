import React, { Component } from 'react';
import { ActivityIndicator, ImageBackground, Text, StyleSheet, View, ScrollView } from 'react-native';

export default class App extends Component {
    
    constructor(props){
        super();
        this.state = { isLoading: true, lokalcData: '', bicyData: '' }
    }
    
    componentDidMount(){
        setInterval(() => this.getApiData(), 5000);
    }
    
    async getApiData()
    {
        //Prenesi podatke iz API-ja
        
        var lokalcPostajeAPI = 'http://oc.velenje.si/api/v1/organizations/lokalc-postaje';
        
        var bicyPostajeAPI = 'http://oc.velenje.si/api/v1/organizations/bicy';
        
        return fetch (lokalcPostajeAPI)
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                lokalcData: data,
            });
        }).then(()=>{
            fetch(bicyPostajeAPI).then((response) => response.json())
            .then((data) => {
              this.setState({
                 bicyData: data,
                 isLoading: false
              });  
            })
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

        else{
            return(
                <View style={styles.container}>
                    <ImageBackground 
                        style={styles.backgroundImage} 
                        source={require('./Slike/velenje_ozadje_v2.jpg')}
                        resizeMode='cover'
                        blurRadius={10}>
                        <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>

                              //Lokalc View
                                <View style={styles.panel}>
                                <Text style={styles.headline}>Številka postaje: {this.state.lokalcData.result[0].id.attr_value}</Text>
                                <Text style={styles.headline}>Naslov: {this.state.lokalcData.result[0].naslov.attr_value}</Text>
                              </View>
                              //Bicy View
                              <View style={styles.panel}>
                                <Text style={styles.headline}>Postaja: {this.state.bicyData[0].station.attr_value}</Text>
                                <Text style={styles.headline}>Število koles: {this.state.bicyData[0].available.attr_value}</Text>
                              </View>
                                <View style={styles.panel}>
                                <Text style={styles.headline}>Postaja: {this.state.bicyData[0].station.attr_value}</Text>
                                <Text style={styles.headline}>Število koles: {this.state.bicyData[0].available.attr_value}</Text>
                              </View>

                        </ScrollView>
                    </ImageBackground>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
      justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  panel: {
    height: 200,
    borderRadius: 4,
    padding: 20,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    backgroundColor: 'white',
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black'
  }
})
