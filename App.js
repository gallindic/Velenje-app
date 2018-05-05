import React, { Component } from 'react';
import { ActivityIndicator, ImageBackground, Text, StyleSheet, View, ScrollView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

class lokalcScreen extends Component {
    constructor(props){
        super();
        this.state = { isLoading: true, lokalcData: '', bicyData: '' }
    }
    
    componentDidMount(){
        setInterval(() => this.getApiData(), 1000);
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
                <View style={styles.loadingContainer}>
                    <ImageBackground 
                        style={styles.backgroundImage, styles.loadingContainer} 
                        source={require('./Slike/velenje_ozadje_v2.jpg')}
                        resizeMode='cover'
                        blurRadius={10}>
                        
                        <ActivityIndicator size="large" color="#fff" />
                    </ImageBackground>
                    
                </View>
            );    
        }
        else{        
            return(
                <MapView
                      style={{ flex: 1 }}
                      initialRegion={{
                          latitude: 46.362274,
                          longitude: 15.110658,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
				        showsMyLocationButton={true}
                        >
                
                    <MapView.Marker
                        coordinate={{
                            latitude: parseFloat(this.state.lokalcData.result[0].geoLat.attr_value),
                            longitude: parseFloat(this.state.lokalcData.result[0].geoLon.attr_value)
                        }}
                        title={JSON.stringify(this.state.lokalcData.result[0].naslov.attr_value)}
                        description={"Postaja številka " + JSON.stringify(this.state.lokalcData.result[0].id.attr_value)}
                    />
                </MapView>
            );
        }
    }
}

class bicyScreen extends Component {
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
                <View style={styles.loadingContainer}>
                    <ImageBackground 
                        style={styles.backgroundImage, styles.loadingContainer} 
                        source={require('./Slike/velenje_ozadje_v2.jpg')}
                        resizeMode='cover'
                        blurRadius={10}>
                        
                        <ActivityIndicator size="large" color="#fff" />
                    </ImageBackground>
                    
                </View>
            );    
        }
        else{
            return(
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                      latitude: 46.362274,
                      longitude: 15.110658,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
				    showsMyLocationButton={true}
                  />
            );
        }
    }
}

export default createBottomTabNavigator(
  {
    Lokalc: { screen: lokalcScreen },
    Bicy: { screen: bicyScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Lokalc') {
          iconName = `ios-bus${focused ? '' : '-outline'}`;
        } else if (routeName === 'Bicy') {
          iconName = `ios-bicycle${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  }
);


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
    padding: 30,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    backgroundColor: '#f2f2f2',
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black'
  }
})
