import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const usernameRef = useRef('');
  const profileRef = useRef('');

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert('Регистрация', 'Пожалуйста, заполните все поля');
      return;
    }
    //регистрация
  };
  return (
    <CustomKeyboardView>
      <StatusBar style='dark' />
      <View
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
        className='flex-1 gap-12'
      >
        <View className='items-center'>
          {/* изображение */}
          <Image
            style={{ height: hp(20) }}
            resizeMode='contain'
            source={require('../assets/images/register.png')}
          />
        </View>
        <View className='gap-10'>
          <Text
            style={{ fontSize: hp(4) }}
            className='font-bold tracking-wider text-center text-neutral-800'
          >
            Регистрация
          </Text>
          {/* форма ввода */}
          <View className='gap-4'>
            <View
              style={{ height: hp(7) }}
              className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
            >
              <Feather name='user' size={hp(2.7)} color='gray' />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Имя'
                placeholderTextColor={'gray'}
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
            >
              <Octicons name='mail' size={hp(2.7)} color='gray' />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Электронная почта'
                placeholderTextColor={'gray'}
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
            >
              <Octicons name='lock' size={hp(2.7)} color='gray' />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Пароль'
                secureTextEntry
                placeholderTextColor={'gray'}
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
            >
              <Feather name='image' size={hp(2.7)} color='gray' />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{ fontSize: hp(2) }}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Фотография'
                placeholderTextColor={'gray'}
              />
            </View>
            {/* кнопка войти*/}

            <View>
              {loading ? (
                <View className='flex-row justify-center'>
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
                  style={{ height: hp(6.5) }}
                  className='bg-indigo-500 rounded-xl justify-center items-center'
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className='text-white font-bold tracking-wider'
                  >
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* надпись */}
            <View className='flex-row justify-center'>
              <Text
                style={{ fontSize: hp(1.8) }}
                className='font-semibold text-neutral-500'
              >
                Уже есть аккаунт?{' '}
              </Text>
              <Pressable onPress={() => router.push('signIn')}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className='font-bold text-indigo-500'
                >
                  Войти
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
