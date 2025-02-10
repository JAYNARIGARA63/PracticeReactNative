import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Product from '../screen/Product';
import Pagination from '../screen/Pagination';
import RandomOtp from '../screen/RandomOtp';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Product" component={Product} />
      {/* <Tab.Screen name="Pagination" component={Pagination} /> */}
      <Tab.Screen name="RandomOtp" component={RandomOtp} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
