import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import HeaderComponent from '../components/HeaderComponent';
import {BASE_URL} from '../api/URL';
import {CHILEAN_FIRE, KENYAN_COPPER, INPUT} from '../components/Colors';

const HEIGHT = Dimensions.get('window').height;

const AddProduct = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('Iphone 5');
  const [isEdit, setIsEdit] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (route.params) {
      setIsEdit(route.params.edit);
      getProductById(route.params.id);
    }
  }, []);

  const onAddItem = () => {
    fetchData();

    setName('');
    setPrice('');
    setNote('');
    setCategory('Iphone 5');
  };

  const onEditItem = () => {
    updateProduct(product._id);

    setName('');
    setPrice('');
    setNote('');
    setCategory('Iphone 5');
  };

  const getProductById = async (id) => {
    try {
      let data = await axios.get(`${BASE_URL}/api/getItemById/${id}`);

      setProduct(data.data);
      setName(data.data.name);
      setPrice(data.data.price);
      setNote(data.data.note);
      setCategory(data.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id) => {
    try {
      let data = await axios.patch(`${BASE_URL}/api/updateItem/${id}`, {
        name,
        price,
        note,
        category,
      });
      if (data) {
        navigation.navigate('TabNavigation', {update: true});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      let data = await axios.post(`${BASE_URL}/api/addItem`, {
        name,
        price,
        note,
        category,
      });
      if (data) {
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        {isEdit ? (
          <HeaderComponent
            title="EDIT PRODUCT"
            back
            goBack={() => navigation.goBack()}
          />
        ) : (
          <HeaderComponent title="ADD PRODUCT" />
        )}

        <ScrollView
          style={{flex: 1, backgroundColor: CHILEAN_FIRE, padding: 10}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isEdit ? (
              <AntDesign name="edit" size={100} color={KENYAN_COPPER} />
            ) : (
              <MaterialIcons name="add-box" size={100} color={KENYAN_COPPER} />
            )}
            <Text style={{fontSize: 20, color: KENYAN_COPPER}}>
              You can {isEdit ? 'edit' : 'add'} product for the app
            </Text>

            <TextInput
              style={{
                width: '100%',
                backgroundColor: INPUT,
                padding: 10,
                borderRadius: 10,
                marginTop: 20,
              }}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={{
                width: '100%',
                backgroundColor: INPUT,
                padding: 10,
                borderRadius: 10,
                marginVertical: 20,
              }}
              placeholder="Price"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
            <TextInput
              style={{
                width: '100%',
                backgroundColor: INPUT,
                padding: 10,
                borderRadius: 10,
              }}
              placeholder="Note"
              value={note}
              onChangeText={(text) => setNote(text)}
            />
            <View
              style={{
                width: '100%',
                height: 50,
                marginTop: 20,
                borderColor: KENYAN_COPPER,
                borderWidth: 1,
              }}>
              <Picker
                selectedValue={category}
                style={{
                  height: 50,
                  flex: 8,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setCategory(itemValue)
                }>
                <Picker.Item label="Iphone 5" value="Iphone 5" />
                <Picker.Item label="Iphone 11" value="Iphone 11" />
              </Picker>
            </View>

            {isEdit ? (
              <Button
                style={{
                  width: '100%',
                  backgroundColor: KENYAN_COPPER,
                  marginTop: 20,
                  padding: 5,
                  borderRadius: 10,
                }}
                color="black"
                mode="outlined"
                onPress={() => onEditItem()}>
                Edit
              </Button>
            ) : (
              <Button
                style={{
                  width: '100%',
                  backgroundColor: KENYAN_COPPER,
                  marginTop: 20,
                  padding: 5,
                  borderRadius: 10,
                }}
                color="black"
                mode="outlined"
                onPress={() => onAddItem()}>
                Add
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddProduct;
