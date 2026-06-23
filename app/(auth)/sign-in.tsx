import {View, Text} from 'react-native'
import React from 'react';
import { Link } from 'expo-router';


const Signin = () => {
    return (
        <View>
            <Text>Signin</Text>
            <Link href="/(auth)/sign-up" className='mt-4 bg-green-400 text-white p-4'>Create Account</Link>
        </View>
    )
}

export default Signin