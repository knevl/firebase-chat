import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {Slot, useRouter, useSegments} from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from '../context/authContext';

const MainLayout = ()=>{
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(()=>{
        //определяем авторизован ли пользователь или нет
        if (typeof isAuthenticated=='undefined') return;
        const inApp = segments[0]=='(app)';
        if (isAuthenticated && !inApp){
            //перенаправляем пользователя на страницу чатов
            router.replace('home');
        } else if(isAuthenticated==false){
            //перенаправляем на страницу входа
            router.replace('signIn');
        }
    },[isAuthenticated])

    return <Slot />
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
        <MainLayout />
    </AuthContextProvider>
  )
}