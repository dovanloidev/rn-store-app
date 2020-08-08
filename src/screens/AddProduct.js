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
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import HeaderComponent from '../components/HeaderComponent';
import {BASE_URL} from '../api/URL';
import {CHILEAN_FIRE, KENYAN_COPPER, INPUT} from '../components/Colors';
import pick from '../api/picker';
import uploadFile from '../api/upload';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const AddProduct = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('Iphone 5');
  const [isEdit, setIsEdit] = useState(false);
  const [product, setProduct] = useState({});
  const [image, setImage] = useState({avatarSource: null, data: null});

  useEffect(() => {
    if (route.params) {
      setIsEdit(route.params.edit);
      getProductById(route.params.id);
    }
  }, []);

  const onAddItem = () => {
    upload();

    setName('');
    setPrice('');
    setNote('');
    setCategory('Iphone 5');
    setImage({avatarSource: null});
  };

  const onEditItem = () => {
    updateProduct(product._id);

    setName('');
    setPrice('');
    setNote('');
    setCategory('Iphone 5');
  };

  const show = () => {
    pick((source, data) => setImage({avatarSource: source, data: data}));
  };

  const upload = () => {
    uploadFile([
      {name: 'avatar', filename: 'avatar.png', data: image.data},
      {name: 'name', data: name},
      {name: 'price', data: price},
      {name: 'note', data: note},
      {name: 'category', data: category},
    ])
      .then((res) => {
        if (res) {
          navigation.goBack();
        }
      })
      .catch((err) => console.log(err));
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
      let data = await axios.post(
        `${BASE_URL}/api/addItem`,
        {
          image,
          name,
          price,
          note,
          category,
        },
        {
          headers: {'content-type': 'multipart/form-data'},
        },
      );
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

            <View style={{alignItems: 'center'}}>
              {!image.avatarSource ? null : (
                <Image
                  source={image.avatarSource}
                  style={{height: 200, width: 200}}
                  resizeMode="contain"
                />
              )}
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: KENYAN_COPPER,
                  width: WIDTH - 20,
                  padding: 5,
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onPress={() => show()}>
                <Text style={{textAlign: 'center'}}>Choose Image </Text>
              </TouchableOpacity>
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
