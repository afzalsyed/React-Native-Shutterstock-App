import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, ListView } from 'react-native'
import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload';

class MyPresentationalComponent extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            listItems: ds.cloneWithRows(props.listItems),
            count: 10
        }
    }

    renderRow(item) {
        return (
            <View>
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <Image
                        style={styles.image}
                        source={{ uri: item.assets.large_thumb.url }} />
                </View>
            </View>
        )
    }

    nextDataSet() {
        // if(this.state.test==false){
        return fetch('https://api.shutterstock.com/v2/images/search?per_page=' + this.state.count + '&query=drum&view=full'
            , {
                headers: {
                    'Authorization': 'Basic ' + 'MzM1MmFlZmZiZDI0ZDMzZjg4NTk6MDk3ZjgzMjI0MmFkMzcxZDlmMDEyNzcwY2FiZGIxZTZjZWJjNDMzYQ==',
                },
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //this.props.listItems = this.props.listItems.concat(responseJson.data);
                this.setState({
                    listItems: this.state.listItems.cloneWithRows(this.props.listItems.concat(responseJson.data)),
                    count: this.state.count + 10
                });
            })
            .catch((error) => {
                console.error(error);
            });
        // }
    }


    /*Scroll View that is displayed*/
    render() {
        return (
            <ListView
                dataSource={this.state.listItems}
                renderRow={(rowData) => this.renderRow(rowData)}
                onEndReached={() => this.nextDataSet()}
            />
        )
    }
}
/*Set of all CSS properties utilized in the application*/
const styles = StyleSheet.create({
    item: {
        margin: 20,
        padding: 20,
        height: 10,
        borderColor: 'black',
        borderWidth: 10
    },
    image: {
        height: 200,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: 'cover',
        backgroundColor: '#eee'
    }
})

export default MyPresentationalComponent