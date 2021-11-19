import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'


import Restaurants from '../screens/Restaurants'
import Favorites from '../screens/Favorites'
import TopRestaurants from '../screens/TopRestaurants'
import Search from '../screens/Search'
import Account from '../screens/Account'
import RestaurantsStack from './RestaurantsStack'
import FavoritesStack from './FavoritesStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'
import TopRestaurantsStack from './TopRestaurantsStack'

const Tab = createBottomTabNavigator()

export default function navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name = "restaurants"
                    component = {RestaurantsStack}
                    options={{ title: "Restaurantes"}}
                />
                <Tab.Screen
                    name = "favorites"
                    component = {FavoritesStack}
                    options={{ title: "Favoritos"}}
                />
                <Tab.Screen
                    name = "top-restaurants"
                    component = {TopRestaurantsStack}
                    options={{ title: "Tpo 5"}}
                />
                <Tab.Screen
                    name = "search"
                    component = {SearchStack}
                    options={{ title: "Buscar"}}
                />
                <Tab.Screen
                    name = "account"
                    component = {AccountStack}
                    options={{ title: "Cuenta"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
