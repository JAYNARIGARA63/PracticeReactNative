import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useFetch from '../Hooks/useFetch';
import FastImage from 'react-native-fast-image';
import {WaveIndicator} from 'react-native-indicators';
import {debounce} from 'lodash';

const url = 'https://dummyjson.com/products';

const Home = () => {
  const {data, error, loading} = useFetch({url});
  const [productData, setProductData] = useState<any>([]);
  const [search, setSearch] = useState('');

  const debouncedSearch = useCallback(
    debounce((query: any) => {
      if (query == '') {
        setProductData(data?.products);
      } else {
        const filterData = data?.products?.filter((item: any) =>
          item?.title?.toLowerCase().includes(query.toLowerCase()),
        );
        setProductData(filterData);
      }
    }, 3000),
    [data],
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
      />
      <>
        {loading ? (
          <View style={styles.mainFlatList}>
            <WaveIndicator
              color="blue"
              count={4}
              size={40}
              waveFactor={0.7}
              waveMode="outline"
            />
          </View>
        ) : (
          <FlatList
            data={productData}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.card}>
                <FastImage
                  style={styles.image}
                  source={{
                    uri: item.images[0],
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            )}
          />
        )}
      </>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainFlatList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
  },
});
