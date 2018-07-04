import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation'
import HomeScreen from './home'
import LikesScreen from './likes'

const RootNavigator = createMaterialTopTabNavigator({
    Home: createStackNavigator({Home: HomeScreen}),
    Likes: createStackNavigator({Likes: LikesScreen}),
}, {
    tabBarComponent: null
});

export default RootNavigator;