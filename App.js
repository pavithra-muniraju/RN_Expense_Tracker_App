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
import ExpensesContextProvider from './store/ExpensesContext';
import Login from './screens/Login';
import Signup from './screens/Signup';
import AuthContextProvider, { AuthContext } from './store/AuthContext';
import { useContext } from 'react';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const isloggedIn = true;
function AuthStack() {
  return (

    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: GlobalStyles.colors.primary50 }
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>

  )
}


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

function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
    }}>
      <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{ headerShown: false }} />
      <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={{
        presentation: 'modal'
      }} />
    </Stack.Navigator>
  )
}

function Navigation() {

  const authContext = useContext(AuthContext)

  return (

    <NavigationContainer>
      {!authContext.isAuthenticated && <AuthStack /> }
      {authContext.isAuthenticated && <AuthenticatedStack /> }
    </NavigationContainer>

  )
}
export default function App() {

  return (
    <>
      <StatusBar style="inverted" />
      <AuthContextProvider>
        <ExpensesContextProvider>
          <Navigation />
        </ExpensesContextProvider>
      </AuthContextProvider>
    </>
  )

}

