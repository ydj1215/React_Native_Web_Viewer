import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  StatusBar,
  Platform,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView, RefreshControl, BackHandler } from "react-native";

const HOME_URL = "https://creer.kr/";
const BOARD_URL = "https://creer.kr/";
const CHAT_URL = "https://creer.kr/";
const SETTING_URL = "https://creer.kr/";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        activeTintColor: "#e91e63",
      }}
    >
      {/* 각 탭에 대한 화면 설정 */}
      <Tab.Screen
        name="Home"
        component={HomeMenu}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Feather name={"home"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Board"
        component={Board}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"clipboard"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatting"
        component={Chatting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"rocketchat"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name={"settings"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 공통된 로딩 애니메이션 컴포넌트
function LoadAnimation({ loading }) {
  return <Spinner visible={loading} />;
}

function HomeMenu({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [backButtonEnabled, setBackButtonEnabled] = useState(false); // 뒤로가기 가능?
  const [refreshing, setRefreshing] = useState(false);

  // 새로고침 함수
  const refreshPage = () => {
    setRefreshing(true);
    webViewRef.current.reload();
    setRefreshing(false);
  };

  // 탭 이동시 실행
  useFocusEffect(
    useCallback(() => {
      refreshPage();
    }, [])
  );

  // WebView가 로드될 때 로딩 상태 변경
  const handleLoad = () => {
    setLoading(false);
    setBackButtonEnabled(true);
  };

  // WebView의 내비게이션 상태가 변경될 때마다 호출
  function onNavigationStateChange(navState) {
    setBackButtonEnabled(navState.canGoBack);
  }

  useEffect(() => {
    // 뒤로가기 함수
    function backHandler() {
      if (backButtonEnabled) {
        webViewRef.current.goBack();
        return true;
      }
    }

    // 안드로이드 뒤로가기 버튼에 등록
    // IOS 일때에 대한 처리 필요
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    // 컴포넌트가 비활성화 상태 일때 리소스가 메모리에 남아있지 않게 하기 위해,
    // 즉, 메모리 누수 방지를 위한 이벤트 리스너 제거
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, [backButtonEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
        }
      >
        <WebView
          ref={webViewRef}
          onLoad={handleLoad}
          source={{ uri: HOME_URL }}
          onNavigationStateChange={onNavigationStateChange}
        />
      </ScrollView>
      {loading && <LoadAnimation loading={loading} />}
    </SafeAreaView>
  );
}

function Board({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [backButtonEnabled, setBackButtonEnabled] = useState(false); // 뒤로가기 가능?
  const [refreshing, setRefreshing] = useState(false);

  // 새로고침 함수
  const refreshPage = () => {
    setRefreshing(true);
    webViewRef.current.reload();
    setRefreshing(false);
  };

  // 탭 이동시 실행
  useFocusEffect(
    useCallback(() => {
      refreshPage();
    }, [])
  );

  // WebView가 로드될 때 로딩 상태 변경
  const handleLoad = () => {
    setLoading(false);
    setBackButtonEnabled(true);
  };

  // WebView의 내비게이션 상태가 변경될 때마다 호출
  function onNavigationStateChange(navState) {
    setBackButtonEnabled(navState.canGoBack);
  }

  useEffect(() => {
    // 뒤로가기 함수
    function backHandler() {
      if (backButtonEnabled) {
        webViewRef.current.goBack();
        return true;
      }
    }

    // 안드로이드 뒤로가기 버튼에 등록
    // IOS 일때에 대한 처리 필요
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    // 컴포넌트가 비활성화 상태 일때 리소스가 메모리에 남아있지 않게 하기 위해,
    // 즉, 메모리 누수 방지를 위한 이벤트 리스너 제거
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, [backButtonEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
        }
      >
        <WebView
          ref={webViewRef}
          onLoad={handleLoad}
          source={{ uri: BOARD_URL }}
          onNavigationStateChange={onNavigationStateChange}
        />
      </ScrollView>
      {loading && <LoadAnimation loading={loading} />}
    </SafeAreaView>
  );
}

function Chatting({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [backButtonEnabled, setBackButtonEnabled] = useState(false); // 뒤로가기 가능?
  const [refreshing, setRefreshing] = useState(false);

  // 새로고침 함수
  const refreshPage = () => {
    setRefreshing(true);
    webViewRef.current.reload();
    setRefreshing(false);
  };

  // 탭 이동시 실행
  useFocusEffect(
    useCallback(() => {
      refreshPage();
    }, [])
  );

  // WebView가 로드될 때 로딩 상태 변경
  const handleLoad = () => {
    setLoading(false);
    setBackButtonEnabled(true);
  };

  // WebView의 내비게이션 상태가 변경될 때마다 호출
  function onNavigationStateChange(navState) {
    setBackButtonEnabled(navState.canGoBack);
  }

  useEffect(() => {
    // 뒤로가기 함수
    function backHandler() {
      if (backButtonEnabled) {
        webViewRef.current.goBack();
        return true;
      }
    }

    // 안드로이드 뒤로가기 버튼에 등록
    // IOS 일때에 대한 처리 필요
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    // 컴포넌트가 비활성화 상태 일때 리소스가 메모리에 남아있지 않게 하기 위해,
    // 즉, 메모리 누수 방지를 위한 이벤트 리스너 제거
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, [backButtonEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
        }
      >
        <WebView
          ref={webViewRef}
          onLoad={handleLoad}
          source={{ uri: CHAT_URL }}
          onNavigationStateChange={onNavigationStateChange}
        />
      </ScrollView>
      {loading && <LoadAnimation loading={loading} />}
    </SafeAreaView>
  );
}

function Setting({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [backButtonEnabled, setBackButtonEnabled] = useState(false); // 뒤로가기 가능?
  const [refreshing, setRefreshing] = useState(false);

  // 새로고침 함수
  const refreshPage = () => {
    setRefreshing(true);
    webViewRef.current.reload();
    setRefreshing(false);
  };

  // 탭 이동시 실행
  useFocusEffect(
    useCallback(() => {
      refreshPage();
    }, [])
  );

  // WebView가 로드될 때 로딩 상태 변경
  const handleLoad = () => {
    setLoading(false);
    setBackButtonEnabled(true);
  };

  // WebView의 내비게이션 상태가 변경될 때마다 호출
  function onNavigationStateChange(navState) {
    setBackButtonEnabled(navState.canGoBack);
  }

  useEffect(() => {
    // 뒤로가기 함수
    function backHandler() {
      if (backButtonEnabled) {
        webViewRef.current.goBack();
        return true;
      }
    }

    // 안드로이드 뒤로가기 버튼에 등록
    // IOS 일때에 대한 처리 필요
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    // 컴포넌트가 비활성화 상태 일때 리소스가 메모리에 남아있지 않게 하기 위해,
    // 즉, 메모리 누수 방지를 위한 이벤트 리스너 제거
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, [backButtonEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
        }
      >
        <WebView
          ref={webViewRef}
          onLoad={handleLoad}
          source={{ uri: SETTING_URL }}
          onNavigationStateChange={onNavigationStateChange}
        />
      </ScrollView>
      {loading && <LoadAnimation loading={loading} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  tabBarStyle: {
    height: 60,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: Platform.OS === "ios" ? 10 : 0,
  },
});
