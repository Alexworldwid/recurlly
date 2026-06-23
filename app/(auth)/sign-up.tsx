import {View, Text} from 'react-native'
import React from 'react';
import { Link } from 'expo-router';


const SignUp = () => {
    return (
        <View>
            <Text>Signin</Text>
            <Link href="/(auth)/sign-in" className='mt-4 bg-green-400 text-white p-4'>Sign in</Link>
        </View>
    )
}

export default SignUp