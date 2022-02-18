import React, {useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {authStartAction} from '../../redux/actions/authAction';
import RNFetchBlob from 'rn-fetch-blob';
import {troubleShootStartAction} from '../../redux/actions/troubleshoot/troubleShootAction';
import {Button, Heading, HStack, Image, Input, VStack} from 'native-base';
import SquerFormControl from '../../widgets/SquerFormControl';
import SquerInputControl from '../../widgets/SquerInputControl';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const LoginComponent = props => {
  const windowHeight = Dimensions.get('window').height;
  const [formData, setData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const validate = async () => {
    setErrors({});
    if (formData.username === undefined || formData.username.length === 0) {
      setErrors({
        ...errors,
        username: 'Username is required',
      });
      return false;
    }
    if (formData.password === undefined || formData.password.length === 0) {
      setErrors({
        ...errors,
        password: 'Password is required',
      });
      return false;
    }
    props.handleSignInPressed({
      username: formData.username,
      password: formData.password,
    });
    return true;
  };
  const handleTroubleShoot = async () => {
    const dirs = RNFetchBlob.fs.dirs;
    let RNFS = require('react-native-fs');
    console.log(RNFS.LibraryDirectoryPath);
    let base64data = await RNFS.readFile(
      `${dirs.LibraryDir}/LocalDatabase/infinity.db`,
      'base64',
    ).then();
    console.log('ffffff', base64data);
    props.handleTroubleShootStart({data: base64data});
  };
  return (
    <KeyboardAwareScrollView>
      <HStack>
        <VStack mx={10} my={40}>
          <Heading>Infinity</Heading>
          <SquerFormControl width={500} errorMessage={errors.username}>
            <SquerInputControl
              placeholder={'Username'}
              size={'2xl'}
              valueChanged={val => setData({...formData, username: val})}
              value={formData.username}
            />
          </SquerFormControl>
          <SquerFormControl width={500} errorMessage={errors.password}>
            <SquerInputControl
              valueChanged={val => setData({...formData, password: val})}
              value={formData.password}
              placeholder={'Password'}
              size={'2xl'}
              type={'password'}
            />
          </SquerFormControl>
          <Button size={'lg'} onPress={() => validate()}>
            SignIn
          </Button>
          <Button variant={'ghost'} onPress={() => handleTroubleShoot()}>
            Troubleshoot
          </Button>
        </VStack>
        <Image source={require('../../images/bg.png')} height={windowHeight} />
      </HStack>
    </KeyboardAwareScrollView>
  );
};

const mapState = state => {
  return {};
};

const actions = {
  handleSignInPressed: authStartAction,
  handleTroubleShootStart: troubleShootStartAction,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    width: Math.min(500, Dimensions.get('window').width * 0.9),
  },
});
export default connect(mapState, actions)(LoginComponent);
