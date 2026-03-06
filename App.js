import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpenses from './screens/ManageExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons'
import IconButton from './UI/IconButton';

export default function App() {


  function ExpensesOverview() {
    const navigation = useNavigation();
    return (
      <BottomTabs.Navigator screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: 'white',
        headerRight: ({ tintColor }) =>
          <IconButton name='add'
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageExpenses")}
          />

      }}>
        <BottomTabs.Screen name="Recent Expenses" component={RecentExpenses} options={{
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' color={color} size={size} />
        }} />
        <BottomTabs.Screen name="All Expenses" component={AllExpenses} options={{
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => <Ionicons name='calendar' color={color} size={size} />
        }} />
      </BottomTabs.Navigator>
    )
  }
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  return (
    <>
      <StatusBar style="inverted" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
        }}>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{ headerShown: false }} />
          <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={{
            presentation: 'modal'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
}

