import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const AddProduct = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');

  const onAddItem = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      let data = await axios.post('http://192.168.30.114:3000/api/addItem', {
        name,
        price,
        note,
      });
      if (data) navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'orange',
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            left: 20,
            top: 15,
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} />
        </TouchableOpacity>

        <Text style={{fontSize: 24}}>Add Product</Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TextInput
          style={{width: '100%'}}
          label="Name"
          mode="outlined"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={{width: '100%'}}
          label="Price"
          mode="outlined"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <TextInput
          style={{width: '100%'}}
          label="Note"
          mode="outlined"
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <Button
          style={{width: '100%', marginTop: 10}}
          mode="outlined"
          onPress={() => onAddItem()}>
          Add
        </Button>
      </View>
    </View>
  );
};

export default AddProduct;
