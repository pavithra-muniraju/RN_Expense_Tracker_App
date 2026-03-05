import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpenses from './screens/ManageExpenses';


export default function App() {
  function ExpensesOverview() {
    return (
      <BottomTabs.Navigator>
        <BottomTabs.Screen name="Recent Expenses" component={RecentExpenses} />
        <BottomTabs.Screen name="All Expenses" component={AllExpenses} />
      </BottomTabs.Navigator>
    )
  }
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
          <Stack.Screen name="Manage Expenses" component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
}

