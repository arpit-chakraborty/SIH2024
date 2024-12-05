import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {AuthContext} from '../appwrite/AuthContext'
import Snackbar from 'react-native-snackbar'

const CustomDrawerContent = (props: any) => {
    const {logout} = useContext(AuthContext)

    const handleLogout = () => {
        logout().then(() => {
          Snackbar.show({
            text: 'Logout Successful',
            duration: Snackbar.LENGTH_SHORT,
          });
        })
      }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.username}>User</Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItem
          label="My NYAAYVEER"
          onPress={() => props.navigation.navigate('Home')}
          labelStyle={styles.drawerLabel}
          icon={() => <Text style={styles.icon}>👤</Text>}
        />
        <DrawerItem
          label="Settings"
          onPress={() => {}}
          labelStyle={styles.drawerLabel}
          icon={() => <Text style={styles.icon}>⚙️</Text>}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700', // Yellow background color
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  drawerItems: {
    flex: 1,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  logoutButton: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CustomDrawerContent;
